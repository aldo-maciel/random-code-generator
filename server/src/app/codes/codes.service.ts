import { codesModel } from './codes.model';
import logger from '../../shared/logger.service';
import { StatusEnum } from '../enums/status.enum';

export class CodesService {
    /**
     * Get all records on database
     */
    public async findAll(pagination: any) {
        logger.debug(pagination);
        const { text = '' } = JSON.parse(pagination.filter || '{}');
        const filter = { code: { $regex: text, $options: 'i' } };
        const data = await codesModel
            .find(filter)
            .skip(parseInt(pagination.start))
            .limit(parseInt(pagination.step) || 10)
            .sort(pagination.sort || { createdAt: -1 })
            .lean(true);
        const count = await codesModel.countDocuments(filter);
        logger.debug(count, data);
        return { count, data };
    }

    /**
     * Update data by id on the database
     */
    public async update(id: string, status: StatusEnum) {
        const record = { status };
        await codesModel.findOneAndUpdate({ _id: id }, record);
    }

    /**
     * Create new data on the database
     */
    public async create(value: number) {
        const record = { code: this.generate(value), value };
        await codesModel.create(record);
    }

    private generate(value: number) {
        const codeLength = 10;
        const random = () => Math.ceil(Math.random() * alphabet.length);
        const shuffle = (value: string) => value.split('').sort(() => 0.5 - Math.random()).join('');
        const date = new Date();
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const initialKey = Math.abs((value * date.getSeconds()) / date.getMinutes()).toFixed(0);
        const codes = [initialKey];

        for (let val = 0; val < codeLength; val++) {
            codes.push(alphabet.charAt(random()));
        }

        return shuffle(codes.join('')).substr(1, 10);
    }
}
