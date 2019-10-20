import * as mongoose from 'mongoose';
import { ModelEnum } from '../enums/model.enum';
import { StatusEnum } from '../enums/status.enum';

const Schema = mongoose.Schema;

const schema = new Schema({
    code: { type: String, required: true },
    value: { type: Number, required: true },
    status: { type: StatusEnum, default: StatusEnum.PENDING }
}, {
    collection: ModelEnum.CODES,
    timestamps: true,
    versionKey: false
});

export const codesModel = mongoose.model(ModelEnum.CODES, schema);
