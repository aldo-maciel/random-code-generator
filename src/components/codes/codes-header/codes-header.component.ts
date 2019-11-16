import React, { FormEvent } from 'react';
import { CodesService } from '../codes.service';
import { onError, onSuccess } from '../../../shared/toastr-util';
import { Props, State } from './codes-header.type';

export class CodesHeaderComponent extends React.Component<Props, State> {
    private service: CodesService = new CodesService();
    public state = { value: '', filter: '' };

    protected async create($event: FormEvent) {
        $event.preventDefault();
        const value = parseFloat(this.state.value);
        if (value) {
            try {
                await this.service.create(value);
                this.props.find(this.state.filter);
                this.setState({ value: '' });
                onSuccess();
            } catch (error) {
                onError(error);
            }
        }
    }

    protected onChangeValue(values: any) {
        const { floatValue } = values;
        this.setState({ value: floatValue });
    }
}
