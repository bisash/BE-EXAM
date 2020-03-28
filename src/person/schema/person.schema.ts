import { Schema } from 'mongoose';

export const PersonSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Vet', 'Client'],
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  specialty: {
    type: String,
  },
});
