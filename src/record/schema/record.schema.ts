import { Schema, Types } from 'mongoose';

export const RecordSchema = new Schema({
  type: { type: String },
  client: {
    type: Types.ObjectId,
    ref: 'Person',
  },
  pet: {
    type: Types.ObjectId,
    ref: 'Pet',
  },
  vet: {
    type: Types.ObjectId,
    ref: 'Person',
  },
  notes: { type: String },
  vaccine: { type: String },
  recordDate: { type: Date, default: Date.now },
});
