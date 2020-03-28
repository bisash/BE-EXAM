import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pet } from './interface/pet.interface';
import { createPetDTO } from './dto/pet.dto';

@Injectable()
export class PetService {
  constructor(@InjectModel('Pet') readonly petModel: Model<Pet>) {}

  async getAll(): Promise<Pet[]> {
    const pets = await this.petModel.find();
    return pets;
  }

  async getBy(args: any): Promise<Pet> {
    const pet = await this.petModel.findOne({ ...args });
    return pet;
  }

  async create(pet: createPetDTO): Promise<Pet> {
    const result = await new this.petModel(pet);
    return result.save();
  }

  async delete(id: string): Promise<Pet> {
    return await this.petModel.findByIdAndDelete({
      _id: Types.ObjectId(id),
    });
  }

  async update(id: string, newBody: createPetDTO): Promise<Pet> {
    const updated = this.petModel.findByIdAndUpdate(
      Types.ObjectId(id),
      newBody,
      { new: true },
    );
    return updated;
  }
}
