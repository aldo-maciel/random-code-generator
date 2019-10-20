import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import { RoutesMiddleware } from './config/app.config';
import { MongoConfig } from './config/mongo.config';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private async config(): Promise<any> {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        await new MongoConfig().mongoSetup();
        new RoutesMiddleware().config(this.app);
    }
}

export default new App().app;
