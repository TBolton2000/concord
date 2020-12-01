import "dotenv/config";
import "reflect-metadata";

import express from 'express';
import path from 'path';

import { ApolloServer } from 'apollo-server-express';
import { apiRouter } from './routes/api-router';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolvers";
import { EventResolver } from "./EventResolvers";
import * as config from './config';
import { createConnection } from 'typeorm';
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from 'http';

console.log(`*******************************************`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`config: ${JSON.stringify(config, null, 2)}`);
console.log(`*******************************************`);

(async () => {
    const app = express();
    app.set('view engine', 'ejs');

    app.use(cookieParser());

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, EventResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app });

    app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
    app.use(apiRouter());
    app.use(staticsRouter());
    app.use(pagesRouter());

    // Web sockets
    const server = http.createServer(app);
    const io = new Server(server);
    const rooms: Room[] = [];
    io.on('connection', socket => {
        socket.on("joinRoom", ({ name, roomId }) => {
            let room = rooms.find(room => room.id === roomId);
            let numOfParticipants = 3;
            if (!room) {
                rooms.push({id: roomId, users: [], data: ["import " + (Array.from({ length: numOfParticipants }, (_, i) => i + 1)).map(element => "participant" + element).join(", ") + "\n",
                ...Array(numOfParticipants).fill(
                    "# define functions here" +
                    "\n\n\n" + 
                    "if __name__ == \"__main__\":\n" +
                    "\t# put individual test code here\n" +
                    "\tprint(\"Hello World!\")")]});
                room = rooms.find(room => room.id === roomId);
            }
            const user: SockUser = { name, room: roomId, id: socket.id, participantNo: room.users.length+1, active: true};
            room.users.push(user);
            socket.join(roomId);
            socket.emit("init", room);
        });

        socket.on("update", ({roomId, idx, newCode}) => {
            const room = rooms.find(room => room.id === roomId);
            if (room) {
                room.data[idx] = newCode;
                socket.broadcast
                .to(room.id)
                .emit("changeOne", {newCode, idx});
            }
        });

        socket.on("disconnect", () => {
            const room = rooms.find(room => room.users.find(user => user.id === socket.id));
            if (room) {
                const user = room.users.find(user => user.id === socket.id);
                if (user) {
                    user.active = false;
                }
                const roomDone = room.users.every(user => !user.active);
                if (roomDone) {
                    const idx = rooms.findIndex(room_it => room_it.id === room.id);
                    // Ideally save code to database here
                    console.log("Destroyed room");
                    rooms.splice(idx,1);
                }
            }
        });
    })

    server.listen(config.SERVER_PORT, () => {
        console.log(`App listening on port ${config.SERVER_PORT}!`);
    });
})();