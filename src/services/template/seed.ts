import "reflect-metadata"
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { UserData } from '../../shared/Users.seed'
import { hash } from "bcryptjs";

createConnection().then(async (connection) => {
    const userRepository = connection.getRepository(User);

    for (let userData of UserData) {
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.password = await hash(userData.password, 12);
        userRepository.save(user);
    }
    
}).catch((error) => console.log(error));

