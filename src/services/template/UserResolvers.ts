import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './auth';
import { MyContext } from './MyContext';
import { isAuth } from './isAuth';
import { sendRefreshToken } from './sendRefreshToken';
import crypto from "crypto";
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';
import nodemailer from "nodemailer";

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
    async resetPasswordToken(
        @Arg("email") email: string
    ) {
        const buf = crypto.randomBytes(20)
        const token = buf.toString('hex');

        try {
            const user = await User.findOne({ email: email });
            user.resetPasswordToken = token;
            user.resetPasswordExpires = BigInt(Date.now() + 3600000);
            await user.save()
            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail', 
                auth: {
                  user: 'concordnoreply@gmail.com',
                  pass: process.env.EMAIL_PASSWORD,
                }
            });

            const mailOptions = {
                to: user.email,
                from: 'concordnoreply@gmail.com',
                subject: 'Concord Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    process.env.NODE_ENV !== 'production' ? "http://localhost:3000" + '/resetpassword/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n' 
                    : "https://concord-app.herokuapp.com/" + '/resetpassword/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            smtpTransport.sendMail(mailOptions);
            console.log('mail sent');

        } catch (error) {
            console.log(error);
            return false;
        }

        return true;
    }

    @Mutation(() => Boolean)
    async resetPassword(
        @Arg("newPassword") newPassword: string,
        @Arg("token") token: string,
    ) {  
      try {
        if (token === "") {
            throw new Error("Token is Invalid");
        }
        const user = await User.findOne({where: { resetPasswordToken: token }})
        if (!user || Date.now() > user.resetPasswordExpires) {
            throw new Error("Token Invalid");
        }
        await User.update(user, { 
            password: await hash(newPassword, 12),
            resetPasswordToken: "",
            resetPasswordExpires: BigInt(0)
        })

        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'concordnoreply@gmail.com',
              pass: process.env.EMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            to: user.email,
            from: 'concordnoreply@gmail.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' + 
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };

        smtpTransport.sendMail(mailOptions);
        console.log('mail sent');

     } catch (error) {
         console.log(error);
         return false;
     }
    console.log('reset worked');
    return true
   }
}