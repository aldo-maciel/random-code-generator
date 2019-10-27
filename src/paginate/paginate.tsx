import React from 'react';


export interface Pagination {
    start: number,
    step: number,
    filter: any
}

type Props = {
    onChange(pagination: Pagination): void,
    totalRecords: number,
    step: 10
}

export class Paginate extends React.Component<Props> {
    private pagination: Pagination = { start: 0, step: this.props.step, filter: '' };

    componentDidMount() {
        this.callSearch();
    }

    callSearch() {
        this.props.onChange(this.pagination);
    }

    paginate(option: number) {
        switch (option) {
            case 1: {
                if ((this.pagination.start + this.props.step) > this.props.totalRecords) return;
                this.pagination.start += this.props.step;
                break;
            }
            case 2: {
                if (this.pagination.start <= 0) return;
                this.pagination.start -= this.props.step;
                break;
            }
            case 3: {
                this.pagination.start = Math.ceil(this.props.totalRecords / this.props.step) * this.props.step;
                if (this.pagination.start > this.props.totalRecords) {
                    this.pagination.start -= this.props.step;
                }
                break;
            }
            default: {
                this.pagination.start = 0;
            }
        }
        this.callSearch();
    }

    getInfo() {
        const from = this.props.totalRecords > 0 ? (this.pagination.start || 0) + 1 : 0;
        const of = (this.pagination.start + this.props.step) > this.props.totalRecords ? this.props.totalRecords : (this.pagination.start + this.props.step);
        return (
            <div className="mt-auto">
                Mostrando { from } até { of } de { this.props.totalRecords }
            </div>
        );
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return <div className="d-flex justify-content-between">
            { this.getInfo() }
            <div>
                <button disabled={ this.pagination.start < this.props.step } onClick={ () => this.paginate(0) }
                        className="btn btn-link" title="Primeira">
                    <em className="fa fa-angle-double-left fa-2x"/>
                </button>
                <button disabled={ this.pagination.start < this.props.step } onClick={ () => this.paginate(2) }
                        className="btn btn-link" title="Anterior">
                    <em className="fa fa-angle-left fa-2x"/>
                </button>
                <button disabled={ this.props.totalRecords <= (this.props.step + this.pagination.start) }
                        onClick={ () => this.paginate(1) }
                        className="btn btn-link" title="Próxima">
                    <em className="fa fa-angle-right fa-2x"/>
                </button>
                <button disabled={ this.props.totalRecords <= (this.props.step + this.pagination.start) }
                        onClick={ () => this.paginate(3) }
                        className="btn btn-link" title="Última">
                    <em className="fa fa-angle-double-right fa-2x"/>
                </button>
            </div>
        </div>;
    }
}
