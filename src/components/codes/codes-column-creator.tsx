import { StatusEnum } from '../enums/status.enum';
import React from 'react';
import moment from 'moment';
import { Code } from './code';
import { dictionary } from '../../shared/dictionary';

export class CodesColumnCreator {
    private static noop() {
    }

    static moneyMask(value: number = 0) {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    static getStatusIcon(value: number) {
        if (value === StatusEnum.CANCELLED) {
            return <em className='eva eva-minus-circle-outline eva-lg text-danger' title={ dictionary.CODES_CANCELED_STATUS }/>;
        } else if (value === StatusEnum.READY) {
            return <em className='eva eva-checkmark-circle-outline eva-lg text-success' title={ dictionary.CODES_REDEEMED_STATUS }/>;
        } else {
            return <em className="eva eva-question-mark-circle-outline eva-lg text-warning" title={ dictionary.CODES_PENDING_STATUS }/>;
        }
    }

    static formatDate(date: Date, format = 'lll') {
        return moment(date).format(format);
    }

    static getActionsIcons(code: Code, useCode: Function = this.noop, cancelCode: Function = this.noop) {
        return <div>
            <button disabled={ code.status !== StatusEnum.PENDING } className="btn btn-link" title={ dictionary.CODES_USED_CODE }
                    onClick={ () => useCode(code) }>
                <em className="eva eva-done-all-outline eva-2x text-success"/>
            </button>
            <button disabled={ code.status !== StatusEnum.PENDING } className="btn btn-link" title={ dictionary.CODES_CANCELED_CODE }
                    onClick={ () => cancelCode(code) }>
                <em className="eva eva-close-outline eva-2x text-danger"/>
            </button>
        </div>;
    }

}
