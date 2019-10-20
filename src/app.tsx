import React from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import './app.scss';
import { AppService } from './app.service';
import { Code } from './code';
import { StatusEnum } from './status.enum';
import { AxiosResponse } from 'axios';

export class App extends React.Component {
    private service: AppService = new AppService();
    private pagination = { start: 0, numOfPages: 0, totalRecords: 0, step: 10, filter: {} };
    private filter: string = '';
    public state = { rows: Array<Code>(), value: 0, start: 0, totalRecords: 0 };

    componentDidMount() {
        this.find();
    }

    find(value: string = '') {
        this.pagination.filter = { text: value };
        this.service.findAll(this.pagination)
            .then((value: AxiosResponse<{ count: number, data: Code[] }>) => {
                this.pagination.totalRecords = value.data.count;
                this.pagination.numOfPages = Math.ceil(value.data.count / this.pagination.step);
                this.setState({
                    rows: value.data.data,
                    start: this.pagination.start,
                    totalRecords: this.pagination.totalRecords
                });
            });
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

    useCode(code: Code) {
        Swal
            .fire({
                title: 'Confirmar',
                text: `Você deseja realmente utilizar o código '${ code.code }'?`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            })
            .then(async ({ value }) => {
                if (value) {
                    await this.service.useCode(code._id);
                    this.find();
                }
            });
    }

    cancelCode(code: Code) {
        Swal
            .fire({
                title: 'Confirmar',
                text: `Você deseja realmente cancelar o código '${ code.code }'?`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            })
            .then(async ({ value }) => {
                if (value) {
                    await this.service.cancelCode(code._id);
                    this.find(this.filter);
                }
            });
    }

    create() {
        try {
            if (this.state.value) {
                this.service
                    .create(this.state.value)
                    .then(() => {
                        Swal
                            .fire({
                                title: 'Gerado',
                                text: 'Registro gerado com sucesso!',
                                type: 'success'
                            })
                            .then(() => {
                                this.setState({ value: 0 });
                                this.find(this.filter);
                            });
                    });
            }
        } catch (error) {
            console.error(error);
        }
    }

    paginate(option: number) {
        switch (option) {
            case 1: {
                if ((this.pagination.start + this.pagination.step) > this.pagination.totalRecords) return;
                this.pagination.start += this.pagination.step;
                break;
            }
            case 2: {
                if (this.pagination.start <= 0) return;
                this.pagination.start -= this.pagination.step;
                break;
            }
            case 3: {
                this.pagination.start = Math.ceil(this.pagination.totalRecords / this.pagination.step) * this.pagination.step;
                if (this.pagination.start > this.pagination.totalRecords) {
                    this.pagination.start -= this.pagination.step;
                }
                break;
            }
            default: {
                this.pagination.start = 0;
            }
        }
        this.find(this.filter);
    }

    render() {
        return (<div className="app card">
                <header className="card-header">
                    <h3>Gerador</h3>
                </header>
                <div className="app-body table-responsive card-body">
                    <div className="app-body-actions d-flex justify-content-between">
                        <div>
                            <input onChange={ event => {
                                this.filter = event.target.value;
                                this.find(event.target.value);
                            } } className="form-control-sm" type="text"
                                   placeholder="Pesquise aqui..."/>
                        </div>
                        <div>
                            <input onChange={ event => this.setState({ value: parseFloat(event.target.value) }) }
                                   className="form-control-sm" type="text" placeholder="Digite um valor aqui..."/>
                            <button className="btn btn-outline-success btn-sm" type="submit" onClick={ () => this.create() }>Gerar</button>
                        </div>
                    </div>
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
                            { this.state.rows.map((code, index) => {
                                return (
                                    <tr key={ index }>
                                        <td>{ moment(code.createdAt).format('lll') } </td>
                                        <td>{ code.code }</td>
                                        <td>{ this.moneyMask(code.value) }</td>
                                        <td>{ this.getStatusIcon(code.status) }</td>
                                        <td>{ this.getActionsIcons(code) }</td>
                                    </tr>
                                );
                            }) }
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
                                    <div className="d-flex justify-content-between">
                                        <div>Mostrando { !this.state.start ? this.state.rows.length > 0 ? 1 : 0 : this.state.start + 1 } até { (this.state.start + this.pagination.step) > this.state.totalRecords ? this.state.totalRecords : (this.state.start + this.pagination.step) } de { this.state.totalRecords } </div>
                                        <div>
                                            <button disabled={ this.pagination.start < this.pagination.step } onClick={ () => this.paginate(0) }
                                                    className="btn btn-link" title="Primeira">
                                                <em className="fa fa-angle-double-left fa-2x"/>
                                            </button>
                                            <button disabled={ this.pagination.start < this.pagination.step } onClick={ () => this.paginate(2) }
                                                    className="btn btn-link" title="Anterior">
                                                <em className="fa fa-angle-left fa-2x"/>
                                            </button>
                                            <button disabled={ this.pagination.totalRecords <= (this.pagination.step + this.pagination.start) }
                                                    onClick={ () => this.paginate(1) }
                                                    className="btn btn-link" title="Próxima">
                                                <em className="fa fa-angle-right fa-2x"/>
                                            </button>
                                            <button disabled={ this.pagination.totalRecords <= (this.pagination.step + this.pagination.start) }
                                                    onClick={ () => this.paginate(3) }
                                                    className="btn btn-link" title="Última">
                                                <em className="fa fa-angle-double-right fa-2x"/>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}
