import { Schema } from 'mongoose';

export const PetSchema = new Schema({
  name: {
    type: String,
  },
  specie: {
    type: String,
  },
  breed: {
    type: String,
  },
  owner: {
    type: String,
  },
});
