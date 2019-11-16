import React from 'react';
import debounce from '../../../shared/debounce';
import NumberFormat from 'react-number-format';
import { dictionary } from '../../../shared/dictionary';
import { CodesHeaderComponent } from './codes-header.component';

export class CodesHeaderRender extends CodesHeaderComponent {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <form className="form" onSubmit={ $event => this.create($event) } onReset={ () => {
                this.setState({ filter: '' });
                debounce(() => this.props.find(this.state.filter), 500)();
            } }>
                <div className="row">
                    <div className="col-xl-4 col-sm-6 col-md-5 col-lg-4 form-group">
                        <div className="input-group">
                            <input className="form-control"
                                   type="text"
                                   placeholder={ dictionary.PESQUIRE_AQUI }
                                   value={ this.state.filter }
                                   onChange={ event => {
                                       this.setState({ filter: event.target.value });
                                       debounce(() => this.props.find(this.state.filter), 500)();
                                   } }/>
                            <div className="input-group-append">
                                <button disabled={ !this.state.filter } className="btn btn-outline-warning" type="reset">
                                    <em className="fa fa-trash-o fa-lg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-md-5 col-lg-4 offset-sm-0 offset-md-2 offset-xl-4 offset-lg-4 form-group">
                        <div className="input-group">
                            <NumberFormat value={ this.state.value }
                                          thousandSeparator={ '.' }
                                          decimalSeparator={ ',' }
                                          prefix={ dictionary.SIMBOLO_MOEDA }
                                          fixedDecimalScale={ true }
                                          decimalScale={ 2 }
                                          onValueChange={ values => this.onChangeValue(values) }
                                          className="form-control" type="text" placeholder={ dictionary.DIGITE_UM_VALOR_AQUI }/>
                            <div className="input-group-append">
                                <button disabled={ !this.state.value } className="btn btn-outline-success" type="submit">
                                    <em className="fa fa-check-circle-o fa-lg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
