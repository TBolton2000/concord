import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from './entity/User';
import { Event } from './entity/Event';
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
        return "hello";
    }
    
    @Query(()=>String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() {payload}: MyContext
    ) {
        return `bye, ${payload.userId}`;
    }

    @Query(()=> [Event])
    events() {
        return Event.find();
    }
    
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

@Mutation(() => Boolean)
    async delete(
        @Arg("id") id: string
    ) 
    {
      try {
         const event = await Event.findOne(id);
         if(event) { Event.remove(event);} else {console.log("Event does not exist");}
      
     } catch (error) {
         console.log(error);
         return false;
     }
    return true
}

@Mutation(() => Boolean)
    async edit(
        @Arg("id") id: string
    ) 
    { 
      try {
         const event = await Event.findOne(id)
         await Event.update(id, {title: 'updated name'})
         
     } catch (error) {
         console.log(error);
         return false;
     }
    return true
   }

}
