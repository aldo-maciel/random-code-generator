import * as HttpStatus from 'http-status-codes';
import { Response } from 'express';
import logger from './logger.service';

export default function handleError(res: Response,
                                    error: Error,
                                    status: number = HttpStatus.BAD_REQUEST,
                                    message: string = '') {
    logger.error('Error on request:', error);
    res.status(status).json(message || error.message);
};
