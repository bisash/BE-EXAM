import { Document } from 'mongoose';

export interface Record extends Document {
  type: string;
  client: string;
  pet: string;
  vet: string;
  notes: string;
  vaccine: string;
  recordDate: Date;
}
