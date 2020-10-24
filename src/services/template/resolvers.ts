import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './auth';
import { MyContext } from './MyContext';
import { isAuth } from './isAuth';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnection } from 'typeorm';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query(()=>String)
    hello() {
        return "Hello World";
    }

    @Query(()=>String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() {payload}: MyContext
    ) {
        return `Goodbye, ${payload.userId}`;
    }

    @Query(()=> [User])
    users() {
        return User.find();
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokenForUser(
        @Arg('userId', () => Int) userId: number
    ) {
        await getConnection().getRepository(User).increment({id: userId}, "tokenVersion", 1);
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() {req, res}: MyContext
    ): Promise<LoginResponse> {
        
        const user = await User.findOne({where: { email }});

        if (!user) {
            throw new Error("User not found");
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error("bad password");
        }

        // Login successful
        sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user)
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const hashedPassword = await hash(password, 12);

        try {
            await User.insert({
                email,
                password: hashedPassword
            })
        } catch (error) {
            console.log(error);
            return false;
        }

        return true;
    }
}