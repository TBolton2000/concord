import { Arg, Field, Mutation, Query, Resolver, InputType } from "type-graphql";
import { Event } from './entity/Event';


@InputType()
export class UpdateEventInfo {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  time?: string;

  @Field({ nullable: true })
  link?: string;
}

@Resolver()
export class EventResolver {
    @Query(()=>String)
    One() { 
        return "hello";
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
        @Arg("id") id: string,
        @Arg("data") data: UpdateEventInfo
    ) 
    { 
      try {
         const event = await Event.findOne(id)
         await Event.update(id, data)
         
     } catch (error) {
         console.log(error);
         return false;
     }
    return true
   }

}
