import "dotenv/config";
import express from 'express';
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { apiRouter } from './routes/api-router';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolvers";
import { InterviewResolver } from "./InterviewResolvers";
import * as config from './config';
import { createConnection } from 'typeorm';
import cookieParser from "cookie-parser";

console.log(`*******************************************`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`config: ${JSON.stringify(config, null, 2)}`);
console.log(`*******************************************`);

(async () =>{
    const app = express();
    app.set('view engine', 'ejs');

    app.use(cookieParser());
    
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, InterviewResolver]
        }),
        context: ({ req, res }) => ( {req, res} )
    });

    apolloServer.applyMiddleware({ app });

    app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
    app.use(apiRouter());
    app.use(staticsRouter());
    app.use(pagesRouter());

    app.listen(config.SERVER_PORT, () => {
        console.log(`App listening on port ${config.SERVER_PORT}!`);
    });
})();