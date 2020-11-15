import "reflect-metadata"
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { UserData } from '../../shared/Users.seed'

createConnection().then(async (connection) => {
    const userRepository = connection.getRepository(User);

    for (let userData of UserData) {
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        userRepository.save(user);
    }
    

}).catch((error) => console.log(error));

