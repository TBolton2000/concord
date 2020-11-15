import "reflect-metadata"
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Event } from './entity/Event';
import { UserData } from '../../shared/Users.seed'
import { EventData } from '../../shared/Events.seed'

createConnection().then(async (connection) => {
    const userRepository = connection.getRepository(User);
    for (let userData of UserData) {
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        await userRepository.save(user);
    }
    const eventRepository = connection.getRepository(Event);
    for (let eventData of EventData) {
        const event = new Event();
        event.title = eventData.title;
        event.time = eventData.time;
        event.description = eventData.description;
        event.videoChatLink = eventData.videoChatLink;
        await eventRepository.save(event);
    }
    process.exit(0);
}).catch((error) => console.log(error));
