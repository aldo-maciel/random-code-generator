import './app.scss';
import toastr from 'toastr';
import React, { FormEvent } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';
import { AxiosResponse } from 'axios';
import { AppService } from './app.service';
import { Code } from './code';
import { StatusEnum } from './status.enum';
import { Paginate, Pagination } from './paginate/paginate';

export class App extends React.Component {
    private service: AppService = new AppService();
    private totalRecords: number = 0;
    private pagination!: Pagination;
    public state = { rows: Array<Code>(), value: '', filter: '' };

    async find() {
        try {
            const value: AxiosResponse<{ count: number, data: Code[] }> = await this.service.findAll(this.pagination, this.state.filter);

            this.totalRecords = value.data.count;
            this.setState({ rows: value.data.data });
        } catch (error) {
            this._onError(error);
        }
    }

    moneyMask(value: number = 0) {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    getStatusIcon(value: number) {
        if (value === StatusEnum.CANCELLED) {
            return <em className='eva eva-minus-circle-outline eva-lg text-danger' title='Cancelado'/>;
        } else if (value === StatusEnum.READY) {
            return <em className='eva eva-checkmark-circle-outline eva-lg text-success' title='Resgatado'/>;
        } else {
            return <em className="eva eva-question-mark-circle-outline eva-lg text-warning" title='Pendente'/>;
        }
    }

    getActionsIcons(code: Code) {
        return <div>
            <button disabled={ code.status !== StatusEnum.PENDING } className="btn btn-link" title="Definir como utilizado"
                    onClick={ () => this.useCode(code) }>
                <em className="eva eva-done-all-outline eva-2x"/>
            </button>
            <button disabled={ code.status !== StatusEnum.PENDING } className="btn btn-link" title="Cancelar código"
                    onClick={ () => this.cancelCode(code) }>
                <em className="eva eva-close-outline eva-2x"/>
            </button>
        </div>;
    }

    async useCode(code: Code) {
        const { value } = await Swal.fire({
            title: 'Confirmar',
            text: `Você deseja realmente utilizar o código '${ code.code }'?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        });

        if (value) {
            this._request(this.service.useCode, code._id);
        }
    }

    async cancelCode(code: Code) {
        const { value } = await Swal.fire({
            title: 'Confirmar',
            text: `Você deseja realmente cancelar o código '${ code.code }'?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        });

        if (value) {
            this._request(this.service.cancelCode, code._id);
        }
    }

    async create($event: FormEvent) {
        $event.preventDefault();
        const value = parseFloat(this.state.value);
        if (value) {
            this._request(this.service.create, value);
            this.setState({ value: '' });
        }
    }

    async _request(event: Function, param: any) {
        try {
            await event(param);
            this.find();
            this._onSuccess();
        } catch (error) {
            this._onError(error);
        }
    }

    _onSuccess() {
        toastr.success('Operação realizada com sucesso!', 'Sucesso');
    }

    _onError(error: Error) {
        console.error(error);
        toastr.error('Ocorreu um erro na requisição!', 'Erro');
    }

    onChangeValue(values: any) {
        const { floatValue } = values;
        this.setState({ value: floatValue });
    }

    onChangePaginate(pagination: Pagination) {
        this.pagination = pagination;
        this.find();
    }

    debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
        let timeout: NodeJS.Timeout;

        return (...args: Parameters<F>): Promise<ReturnType<F>> =>
            new Promise(resolve => {
                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() => resolve(func(...args)), waitFor);
            });
    }

    render() {
        return (<div className="app card">
                <div className="app-body table-responsive card-body">
                    <div className="card-header text-white">
                        <h3>Gerador</h3>
                    </div>
                    <form className="form" onSubmit={ $event => this.create($event) } onReset={ () => {
                        this.setState({ filter: '' });
                        this.debounce(this.find.bind(this), 500)();
                    } }>
                        <div className="row">
                            <div className="col-xl-4 col-sm-6 col-md-5 col-lg-4 form-group">
                                <div className="input-group">
                                    <input className="form-control"
                                           type="text"
                                           placeholder="Pesquise aqui..."
                                           value={ this.state.filter }
                                           onChange={ event => {
                                               this.setState({ filter: event.target.value });
                                               this.debounce(this.find.bind(this), 500)();
                                           } }/>
                                    <div className="input-group-append">
                                        <button disabled={ !this.state.filter } className="btn btn-danger" type="reset">
                                            <em className="fa fa-ban"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-md-5 col-lg-4 offset-sm-0 offset-md-2 offset-xl-4 offset-lg-4 form-group">
                                <div className="input-group">
                                    <NumberFormat value={ this.state.value }
                                                  thousandSeparator={ '.' }
                                                  decimalSeparator={ ',' }
                                                  prefix={ 'R$ ' }
                                                  fixedDecimalScale={ true }
                                                  decimalScale={ 2 }
                                                  onValueChange={ values => this.onChangeValue(values) }
                                                  className="form-control" type="text" placeholder="Digite um valor aqui..."/>
                                    <div className="input-group-append">
                                        <button disabled={ !this.state.value } className="btn btn-outline-success" type="submit">Gerar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <table className="table table-hover table-striped table-striped table-borderless">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Código</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.rows.map(code => {
                                    return (
                                        <tr key={ code._id }>
                                            <td>{ moment(code.createdAt).format('lll') } </td>
                                            <td>{ code.code }</td>
                                            <td>{ this.moneyMask(code.value) }</td>
                                            <td>{ this.getStatusIcon(code.status) }</td>
                                            <td>{ this.getActionsIcons(code) }</td>
                                        </tr>
                                    );
                                })
                            }
                            {
                                this.state.rows.length === 0 &&
                                <tr>
                                    <td colSpan={ 5 }>Nenhum registro encontrado!</td>
                                </tr>
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={ 5 }>
                                    <Paginate onChange={ (pagination: Pagination) => this.onChangePaginate(pagination) }
                                              step={ 10 }
                                              totalRecords={ this.totalRecords }/>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}
