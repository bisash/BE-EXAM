import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Record } from './interface/record.interface';
import { createRecordDTO } from './dto/record.dto';

@Injectable()
export class RecordService {
  constructor(@InjectModel('Record') readonly recordModel: Model<Record>) {}

  async getAll(): Promise<Record[]> {
    const persons = await this.recordModel.find().populate('client pet vet');
    return persons;
  }

  async getBy(args: any): Promise<Record> {
    const person = await this.recordModel
      .findOne({ ...args })
      .populate('client pet vet');
    return person;
  }

  async create(person: createRecordDTO): Promise<Record> {
    const result = await new this.recordModel(person);
    return (await result.save()).populate('vet client pet');
  }

  async delete(id: string): Promise<Record> {
    return await this.recordModel
      .findByIdAndDelete({
        _id: Types.ObjectId(id),
      })
      .populate('vet client pet');
  }

  async update(id: string, newBody: createRecordDTO): Promise<Record> {
    const updated = this.recordModel
      .findByIdAndUpdate(Types.ObjectId(id), newBody, { new: true })
      .populate('vet client pet');
    return updated;
  }
}
