import { Request, Response } from 'express';
import { CodesService } from './codes.service';
import handleError from '../../shared/error.service';

export class CodesController {
    private static service: CodesService = new CodesService();

    /**
     * Get all records on database
     *
     * @param req
     * @param res
     */
    public async findAll(req: Request, res: Response) {
        try {
            const { pagination } = req.params;
            res.json(await CodesController.service.findAll(JSON.parse(pagination)));
        } catch (error) {
            handleError(res, error);
        }
    }

    /**
     * Update data by id on the database
     *
     * @param req
     * @param res
     */
    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            await CodesController.service.update(id, { status });
            res.json({ success: true });
        } catch (error) {
            handleError(res, error);
        }
    }

    /**
     * Create new data on the database
     *
     * @param req
     * @param res
     */
    public async create(req: Request, res: Response) {
        try {
            const { value } = req.body;
            await CodesController.service.create({ value });
            res.json({ success: true });
        } catch (error) {
            handleError(res, error);
        }
    }
}
