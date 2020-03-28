import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordSchema } from './schema/record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Record',
        schema: RecordSchema,
      },
    ]),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
