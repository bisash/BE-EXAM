import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Patch,
  Get,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { createRecordDTO } from './dto/record.dto';
import { RecordService } from './record.service';

@Controller('api/v1/record')
export class RecordController {
  constructor(private service: RecordService) {}

  @Post('/create')
  async createRecord(@Res() res, @Body() body: createRecordDTO) {
    const rs = await this.service.create(body);
    return res.status(HttpStatus.OK).json(rs);
  }

  @Patch('/update/:id')
  async updateRecord(
    @Res() res,
    @Param('id') params,
    @Body() body: createRecordDTO,
  ) {
    const rs = await this.service.update(params, body);
    if (!rs) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json(rs);
  }

  @Get('/all')
  async getRecords(@Res() res, @Body() body: createRecordDTO) {
    const rs = await this.service.getAll();
    return res.status(HttpStatus.OK).json(rs);
  }

  @Get('search/')
  async getRecord(@Res() res, @Body() params: any) {
    const rs = await this.service.getBy(params);
    if (!rs) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json(rs);
  }

  @Delete('/:id')
  async deleteRecord(@Res() res, @Param('id') params) {
    const rs = await this.service.delete(params);
    if (!rs) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json(rs);
  }
}
