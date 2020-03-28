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
import { createPetDTO } from './dto/pet.dto';
import { PetService } from './pet.service';

@Controller('api/v1/pet')
export class PetController {
  constructor(private service: PetService) {}

  @Post('/create')
  async createPet(@Res() res, @Body() body: createPetDTO) {
    const rs = await this.service.create(body);
    return res.status(HttpStatus.OK).json(rs);
  }

  @Patch('/update/:id')
  async updatePet(@Res() res, @Param('id') params, @Body() body: createPetDTO) {
    const rs = await this.service.update(params, body);
    if (!rs) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json(rs);
  }

  @Get('/all')
  async getPets(@Res() res, @Body() body: createPetDTO) {
    const rs = await this.service.getAll();
    return res.status(HttpStatus.OK).json(rs);
  }

  @Get('search/')
  async getPerson(@Res() res, @Body('args') object) {
    const rs = await this.service.getBy(object);
    if (!rs) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json(rs);
  }

  @Delete('/:id')
  async deletePet(@Res() res, @Param('id') params) {
    const rs = await this.service.delete(params);
    if (!rs) throw new NotFoundException('Record not found');
    return res.status(HttpStatus.OK).json(rs);
  }
}
