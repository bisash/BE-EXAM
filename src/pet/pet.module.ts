import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './schema/pet.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema }])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
