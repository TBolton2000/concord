import { Arg, Field, Mutation, Query, Resolver, InputType, ArgsType, Args } from "type-graphql";
import { Interview } from './entity/Interviews';
import { User } from './entity/User';

@ArgsType() 
export class AddInterviewsArgs {

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    time: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    videoChatLink: string;

    @Field(type => String,{ nullable: true })
    ownerId: string;

    @Field(type => [String],{ nullable: true })
    intIds: [string];

    @Field(type => [String],{ nullable: true })
    canIds: [string];
}
@InputType()
export class UpdateInterviewInfo {
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
export class InterviewResolver {    
    @Query(()=> [Interview])
    interviews() {
        return Interview.find();
    }
    
    @Mutation(() => Boolean)
    async add( 
        @Args() {title, time, description, videoChatLink, ownerId, intIds, canIds} :AddInterviewsArgs
    ) 
    {
      try {
        const owner = await User.findOne(ownerId)
        const candidates = await User.findByIds(intIds)
        const interviewers = await User.findByIds(canIds)

        await Interview.insert({title, time, description, videoChatLink, owner, interviewers, candidates})
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
         const interview = await Interview.findOne(id);
         if(interview) { Interview.remove(interview);} else {console.log("Interview does not exist");}
      
     } catch (error) {
         console.log(error);
         return false;
     }
    return true
}

@Mutation(() => Boolean)
    async edit(
        @Arg("id") id: string,
        @Arg("data") data: UpdateInterviewInfo
    ) 
    { 
      try {
         const interview = await Interview.findOne(id)
         await Interview.update(id, data)
         
     } catch (error) {
         console.log(error);
         return false;
     }
    return true
   }

}
