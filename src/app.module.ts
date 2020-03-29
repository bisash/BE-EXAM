import { Module } from '@nestjs/common';
import { PetModule } from './pet/pet.module';
import { PersonModule } from './person/person.module';
import { RecordModule } from './record/record.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PetModule,
    PersonModule,
    RecordModule,
    MongooseModule.forRoot('mongodb://localhost/veterinary', {
      userNewUrlParser: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
