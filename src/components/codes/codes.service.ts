import axios, { AxiosResponse } from 'axios';
import { Code } from './code';
import { StatusEnum } from '../enums/status.enum';
import { Pagination } from '../paginate/paginate.type';

export class CodesService {

    private static get URL() {
        if ('production' === process.env.NODE_ENV) {
            return '/api/codes';
        }
        return 'http://localhost:3001/api/codes';
    }

    findAll(params: Pagination, text: string): Promise<AxiosResponse<{ count: number, data: Code[] }>> {
        if (params.filter.text !== text) {
            params.start = 0;
        }
        params.filter = { text };
        return axios.get<{ count: number, data: Code[] }>(CodesService.URL, { params });
    }

    useCode(id: string): Promise<AxiosResponse<{ success: boolean }>> {
        return axios.put(`${ CodesService.URL }/${ id }`, { status: StatusEnum.READY });
    }

    cancelCode(id: string): Promise<AxiosResponse<{ success: boolean }>> {
        return axios.put(`${ CodesService.URL }/${ id }`, { status: StatusEnum.CANCELLED });
    }

    create(value: number): Promise<AxiosResponse<{ success: boolean }>> {
        return axios.post(`${ CodesService.URL }`, { value });
    }
}
