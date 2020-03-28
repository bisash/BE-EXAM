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
import { createPersonDTO } from './dto/person.dto';
import { PersonService } from './person.service';

@Controller('api/v1/person')
export class PersonController {
  constructor(private service: PersonService) {}

  @Post('/create')
  async createPerson(@Res() res, @Body() body: any) {
    const rs = await this.service.create(body);
    return res.status(HttpStatus.OK).json(rs);
  }

  @Patch('/update/:id')
  async updatePerson(
    @Res() res,
    @Param('id') params,
    @Body() body: createPersonDTO,
  ) {
    const rs = await this.service.update(params, body);
    if (!rs) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json(rs);
  }

  @Get('/all')
  async getPersons(@Res() res, @Body() body: createPersonDTO) {
    const rs = await this.service.getAll();
    return res.status(HttpStatus.OK).json(rs);
  }

  @Get('search/')
  async getPerson(@Res() res, @Body('args') object) {
    const rs = await this.service.getBy(object);
    if (!rs) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json(rs);
  }

  @Delete('delete/:id')
  async deletePerson(@Res() res, @Param('id') params) {
    const rs = await this.service.delete(params);
    if (!rs) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json(rs);
  }
}
