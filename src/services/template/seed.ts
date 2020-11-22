import "reflect-metadata"
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Interview } from './entity/Interviews';
import { UserData } from '../../shared/Users.seed'
import {InterviewData} from '../../shared/Interviews.seed'
createConnection().then(async (connection) => {
    const userRepository = connection.getRepository(User);
    for (let userData of UserData) {
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        await userRepository.save(user);
    }
    const interviewRepository = connection.getRepository(Interview);
    for (let interviewData of InterviewData) {
        const interview = new Interview();
        interview.title = interviewData.title;
        interview.time = interviewData.time;
        interview.description = interviewData.description;
        interview.videoChatLink = interviewData.videoChatLink;
        interview.owner = await User.findOne({email: interviewData.owner});
        const cands = []
        for(let emailCand of interviewData.candidates)
	{
        cands.push(await User.findOne({email: emailCand}));
    }
        interview.candidates = cands;
        const intervs = []
        for(let emailInt of interviewData.interviewers)
	{
        cands.push(await User.findOne({email: emailInt}));
    }
        interview.interviewers = intervs;
        await interviewRepository.save(interview);
    }
    process.exit(0);
}).catch((error) => console.log(error));
