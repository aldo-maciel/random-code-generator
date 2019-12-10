import { CodesRouter } from '../app/codes/codes.router';
import { Application } from 'express';

export class RoutesMiddleware {
    public codesRouter = new CodesRouter();

    public config(app: Application): void {
        const baseUrl = '/api';
        app.use(baseUrl, this.codesRouter.routes);
    }
}
