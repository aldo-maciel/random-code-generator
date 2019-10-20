import { codesModel } from './codes.model';
import logger from './../../shared/logger.service';

export class CodesService {
    /**
     * Get all records on database
     */
    public async findAll(pagination: any) {
        logger.debug(pagination.filter);
        const filter = { code: { $regex: pagination.filter.text, $options: 'i' } };
        const data = await codesModel
            .find(filter)
            .limit(pagination.step || 10)
            .skip(pagination.start)
            .sort(pagination.sort || { createdAt: -1 });
        const count = await codesModel.countDocuments(filter);
        return { count, data };
    }

    /**
     * Update data by id on the database
     */
    public async update(id, { status }) {
        const record = { status };
        await codesModel.findOneAndUpdate({ _id: id }, record);
    }

    /**
     * Create new data on the database
     */
    public async create({ value }) {
        const record = { code: this.generate(value), value };
        await codesModel.create(record);
    }

    private generate(value: number) {
        const random = () => Math.ceil(Math.random() * alphabet.length);
        const shuffle = value => [...value].reduceRight((res, _, __, arr) => [...res, arr.splice(~~(Math.random() * arr.length), 1)[0]], []).join('');
        const date = new Date();
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const initialKey = Math.abs((value * date.getSeconds()) / date.getMinutes()).toFixed(0);
        const codes = [initialKey];

        for (let val = 0; val < 10; val++) {
            codes.push(alphabet.charAt(random()));
        }

        return shuffle(codes.join('')).substr(1, 10);
    }
}
