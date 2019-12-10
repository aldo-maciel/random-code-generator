import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { RoutesMiddleware } from './config/app.config';
import { MongoConfig } from './config/mongo.config';
import logger from './shared/logger.service';

class App {
    public app: Application = express();

    constructor() {
        this.app = express();
        this.config();
    }

    private async config(): Promise<any> {
        this.app.use(cors());

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        logger.info(process.cwd() + '\\view\\build');
        this.app.use(express.static(process.cwd() + '\\view\\build'));

        await new MongoConfig().mongoSetup();
        new RoutesMiddleware().config(this.app);
    }
}

export default new App().app;
