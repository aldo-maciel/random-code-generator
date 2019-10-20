import axios, { AxiosResponse } from 'axios';
import { Code } from './code';
import { StatusEnum } from './status.enum';

export class AppService {

    private static get URL() {
        return 'http://localhost:3001/api/codes';
    }

    findAll(pagination: Object): Promise<AxiosResponse<{ count: number, data: Code[] }>> {
        return axios.get<{ count: number, data: Code[] }>(`${ AppService.URL }/${ JSON.stringify(pagination) }`);
    }

    useCode(id: string) {
        return axios.put(`${ AppService.URL }/${ id }`, { status: StatusEnum.READY });
    }

    cancelCode(id: string) {
        return axios.put(`${ AppService.URL }/${ id }`, { status: StatusEnum.CANCELLED });
    }

    create(value: number) {
        return axios.post(`${ AppService.URL }`, { value });
    }
}
