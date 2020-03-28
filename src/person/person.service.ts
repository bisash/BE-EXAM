import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Person } from './interface/person.interface';
import { createPersonDTO } from './dto/person.dto';
@Injectable()
export class PersonService {
  constructor(@InjectModel('Person') readonly personModel: Model<Person>) {}

  async getAll(): Promise<Person[]> {
    const persons = await this.personModel.find();
    return persons;
  }

  async getBy(args: any): Promise<Person> {
    const person = await this.personModel.findOne({ ...args });
    return person;
  }

  async create(person: createPersonDTO): Promise<Person> {
    const result = await new this.personModel(person);
    return result.save();
  }

  async delete(id: string): Promise<Person> {
    return await this.personModel.findByIdAndDelete({
      _id: Types.ObjectId(id),
    });
  }

  async update(id: string, newBody: createPersonDTO): Promise<Person> {
    const updated = this.personModel.findByIdAndUpdate(
      Types.ObjectId(id),
      newBody,
      { new: true },
    );
    return updated;
  }
}
