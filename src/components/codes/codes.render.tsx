import React from 'react';
import { CodesColumnCreator } from './codes-column-creator';
import { CodesComponent } from './codes.component';
import { dictionary } from '../../shared/dictionary';
import { CodesHeaderRender } from './codes-header/codes-header.render';
import { PaginateRender } from '../paginate/paginate.render';
import { Pagination } from '../paginate/paginate.type';

export class CodesRender extends CodesComponent {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <div className="codes card">
                <div className="codes-body table-responsive card-body">
                    <div className="card-header text-white">
                        <h3>{ dictionary.CODES_TITLE }</h3>
                    </div>
                    <div className="card-body">
                        <CodesHeaderRender find={ filter => this.find(filter) }/>
                        <table className="table table-hover table-striped table-striped table-borderless">
                            <thead>
                                <tr>
                                    <th>{ dictionary.CODES_STATUS }</th>
                                    <th>{ dictionary.CODES_DATA }</th>
                                    <th>{ dictionary.CODES_CODIGO }</th>
                                    <th>{ dictionary.CODES_VALOR }</th>
                                    <th>{ dictionary.CODES_ACOES }</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.rows.map(row => {
                                        return (
                                            <tr key={ row._id }>
                                                <td>{ CodesColumnCreator.getStatusIcon(row.status) }</td>
                                                <td>{ CodesColumnCreator.formatDate(row.createdAt) } </td>
                                                <td>{ row.code }</td>
                                                <td>{ CodesColumnCreator.moneyMask(row.value) }</td>
                                                <td>{ CodesColumnCreator.getActionsIcons(row, this.useCode.bind(this), this.cancelCode.bind(this)) }</td>
                                            </tr>
                                        );
                                    })
                                }
                                {
                                    this.state.rows.length === 0 &&
                                    <tr>
                                        <td colSpan={ 5 }>{ dictionary.NENHUM_REGISTRO_ENCONTRADO }</td>
                                    </tr>
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={ 5 }>
                                        <PaginateRender onChange={ (pagination: Pagination) => this.onChangePaginate(pagination) }
                                                        step={ 10 }
                                                        totalRecords={ this.totalRecords }/>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
