import "reflect-metadata"
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection().then(async (connection) => {
    const userRepository = connection.getRepository(User);

    const userOne = new User();
    userOne.name = 'Mahmood Shilleh';
    userOne.email = 'Shilleh@gmail.com';
    userOne.password = 'Shilleh@gmail.com';
    userRepository.save(userOne);

    const userTwo = new User();
    userTwo.name = 'Trever Bolton'
    userTwo.email = 'Bolton@gmail.com';
    userTwo.password = 'Bolton@gmail.com';
    userRepository.save(userTwo);

    const userThree = new User();
    userThree.name = 'Qusai Amer';
    userThree.email = 'Qusai@gmail.com';
    userThree.password = 'Qusai@gmail.com'
    userRepository.save(userThree);

    const userFour = new User();
    userFour.name = 'Kyle Albin';
    userFour.email = 'Albin@gmail.com';
    userFour.password = 'Albin@gmail.com';
    userRepository.save(userFour);

    const userFive = new User();
    userFive.name = 'Hank Walker';
    userFive.email = 'Walker@gmail.com';
    userFive.password = 'Professor@gmail.com'
    userRepository.save(userFive);

    const userSix = new User();
    userSix.name = 'Faris Shatat';
    userSix.email = 'Shatat@gmail.com';
    userSix.password = 'Shatat@gmail.com';
    userRepository.save(userSix);

    const userSeven = new User();
    userSeven.name = 'Shilleh Bean';
    userSeven.email = 'ShillehBean@gmail.com';
    userSeven.password = 'ShillehBean@gmail.com'
    userRepository.save(userSeven);

    const userEight = new User();
    userEight.name = 'Chef Shilleh';
    userEight.email = 'ShefShilleh@gmail.com';
    userEight.password = 'ShefShilleh@gmail.com'
    userRepository.save(userEight);

    const userNine = new User();
    userNine.name = 'CoachShelleh';
    userNine.email = 'CoachShelleh@gmail.com';
    userNine.password = 'CoachShelleh@gmail.com';
    userRepository.save(userNine);
    
    const userTen = new User();
    userTen.name = 'Shmileh';
    userTen.email = 'Shmileh@gmail.com';
    userTen.password = 'Shmileh@gmail.com';
    userRepository.save(userTen);


}).catch((error) => console.log(error));

