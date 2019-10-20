import * as mongoose from 'mongoose';
import { properties } from '../properties';
import logger from '../shared/logger.service';

export class MongoConfig {
    private mongo = properties.mongo;
    private mongoUrl: string = `mongodb://${ this.mongo.host }:${ this.mongo.port }/${ this.mongo.base }`;

    public async mongoSetup() {
        try {
            await mongoose.connect(this.mongoUrl, {
                useNewUrlParser: true,
                useFindAndModify: false
            });
            logger.debug('Connected on mongo:', this.mongoUrl);
        } catch (error) {
            logger.error(error);
        }
    }
}
