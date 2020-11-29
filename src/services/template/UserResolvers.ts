import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware, InputType } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './auth';
import { MyContext } from './MyContext';
import { isAuth } from './isAuth';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

@InputType()
export class UpdateUserInfo {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(()=> User)
    user: User;
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

    @Query(()=> User, {nullable: true})
    me(
        @Ctx() context: MyContext
    ) {
        const authorization = context.req.headers["authorization"];

        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET);
            return User.findOne(payload.userId);
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() {res}: MyContext
    ) {
        sendRefreshToken(res, "");
        return true;
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
            throw new Error("Password is not valid");
        }

        // Login successful
        sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user),
            user
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("name") name: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        // check that email is unique
        if (password.length < 8 || password.length > 30) {
            throw new Error("Password is not between 8 and 30 characters, inclusive");
        }

        const existing = await User.findOne( { where: { email } } );
        if (existing) {
            throw new Error("Account already exists for this email");
        }

        const hashedPassword = await hash(password, 12);

        try {
            await User.insert({
                name,
                email,
                password: hashedPassword
            })
        } catch (error) {
            console.log(error);
            return false;
        }

        return true;
    }
    
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async changePassword(
        @Arg("oldPassword") oldPassword: string,
        @Arg("newPassword") newPassword: string,
        @Ctx() {payload}: MyContext
    ) {  
      try {
        const user = await User.findOne(payload.userId)
        const valid = await compare(oldPassword, user.password)
        if (!valid) {
            throw new Error("Old Password is not Correct");
        }
        await User.update(payload.userId, {
            password: await hash(newPassword, 12)
        })
     } catch (error) {
         console.log(error);
         return false;
     }
    return true
   }
}