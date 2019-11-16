import React from 'react';
import Swal from 'sweetalert2';
import { AxiosResponse } from 'axios';
import { Code } from './code';
import { CodesService } from './codes.service';
import { onError, onSuccess } from '../../shared/toastr-util';
import { Pagination } from '../paginate/paginate.type';

export class CodesComponent extends React.Component {
    private pagination!: Pagination;
    protected service: CodesService = new CodesService();
    protected totalRecords: number = 0;
    public state = { rows: Array<Code>() };

    async find(filter: string) {
        try {
            const value: AxiosResponse<{ count: number, data: Code[] }> = await this.service.findAll(this.pagination, filter);

            this.totalRecords = value.data.count;
            this.setState({ rows: value.data.data });
        } catch (error) {
            onError(error);
        }
    }

    async useCode(code: Code) {
        const { value } = await this._confirm(`Você deseja realmente utilizar o código '${ code.code }'?`);

        if (value) {
            this._doRequest(this.service.useCode, code._id);
        }
    }

    async cancelCode(code: Code) {
        const { value } = await this._confirm(`Você deseja realmente cancelar o código '${ code.code }'?`);

        if (value) {
            this._doRequest(this.service.cancelCode, code._id);
        }
    }

    async _doRequest(event: Function, param: any) {
        try {
            await event(param);
            this.find('');
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }

    onChangePaginate(pagination: Pagination) {
        this.pagination = pagination;
        this.find('');
    }

    _confirm(message: string, title: string = 'Confirmar') {
        return Swal.fire({
            title: title,
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        });
    }
}
