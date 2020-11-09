import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from './entity/User';
import { Event } from './Entity/Event';
import { createAccessToken, createRefreshToken } from './auth';
import { MyContext } from './MyContext';
import { isAuth } from './isAuth';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

@ObjectType()
class NewEvent {
    @Field()
    accessToken: string;
    @Field(()=> Event)
    event: Event;
}

@Resolver()
export class EventResolver {
    @Query(()=>String)
    One() { 
        return "test2";
    }
    
    @Query(()=>String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() {payload}: MyContext
    ) {
        return `done!, ${payload.userId}`;
    }

    @Query(()=> [Event])
    events() {
        return Event.find();
    }

    
   //  @Mutation(() => NewEvent)
   //  async login(
   //      @Arg("title") title: string,
   //      @Arg("time") time: string,
   //      @Ctx() {req, res}: MyContext
   //  ): Promise<NewEvent> {
        
   //      const event = await Event.findOne();

   //      if (!event) {
   //          throw new Error("User not found");
   //      }

   //      const valid = await compare(password, user.password);

   //      if (!valid) {
   //          throw new Error("Password is not valid");
   //      }

   //      // Login successful
   //      sendRefreshToken(res, createRefreshToken(user));

   //      return {
   //          accessToken: createAccessToken(user),
   //          user
   //      };
   //  }
    
    
    
    @Mutation(() => Boolean)
    async add(
        @Arg("title") title: string,
        @Arg("time") time: string,
        @Arg("description") description: string,
        @Arg("videoChatLink") link: string
    ) 
    
    {
      try {
         await Event.insert({
             title,
             time,
             description,
             videoChatLink:link
         })
     } catch (error) {
         console.log(error);
         return false;
     }


    return true
}

// @Mutation(() => Boolean)
//     async delete(
//         @Arg("title") title: string,
//         @Arg("time") time: string,
//         @Arg("description") description: string,
//         @Arg("videoChatLink") link: string
//     ) 
    
//     {
//       try {
//          await Event.remove({
//              title,
//              time,
//              description,
//              videoChatLink:link
//          })
//      } catch (error) {
//          console.log(error);
//          return false;
//      }
//     return true
// }

}