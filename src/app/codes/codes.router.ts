import { Router } from 'express';
import { CodesController } from './codes.controller';

export class CodesRouter {

    private router: Router = Router();
    private path: string = '/codes';
    private readonly ctrl: CodesController = new CodesController();

    constructor() {
        this.createRoutes();
    }

    get routes(): Router {
        return this.router;
    }

    private createRoutes() {
        this.router
            .get(`${ this.path }`, this.ctrl.findAll)
            .put(`${ this.path }/:id`, this.ctrl.update)
            .post(this.path, this.ctrl.create);
    }
}
