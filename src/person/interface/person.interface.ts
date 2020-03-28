import { Document } from 'mongoose';

export interface Person extends Document {
  name: string;
  lastName: string;
  phone: string;
  specialty: string;
  type: string;
}
