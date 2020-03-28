import { Module } from '@nestjs/common';
import { PetModule } from './pet/pet.module';
import { PersonModule } from './person/person.module';
import { RecordModule } from './record/record.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PetModule,
    PersonModule,
    RecordModule,
    MongooseModule.forRoot('mongodb://localhost/veterinary', {
      userNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
