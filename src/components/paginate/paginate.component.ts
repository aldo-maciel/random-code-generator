import React from 'react';
import { Pagination, Props } from './paginate.type';

export class PaginateComponent extends React.Component<Props> {
    protected pagination: Pagination = { start: 0, step: this.props.step, filter: '' };

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
                if (this.pagination.start >= this.props.totalRecords) {
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
}
