import { Document } from 'mongoose';

export interface Pet extends Document {
  name: String;
  specie: String;
  breed: String;
  owner: String;
}
