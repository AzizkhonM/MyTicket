import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatTypeService } from './seat-type.service';
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';
import { SeatType } from './models/seat-type.model';

@Controller('seattypes')
export class SeatTypeController {
  constructor(private readonly seatTypeService: SeatTypeService) {}

  @Post("add")
  create(@Body() createSeatTypeDto: CreateSeatTypeDto): Promise<SeatType> {
    return this.seatTypeService.create(createSeatTypeDto);
  }

  @Get("all")
  findAll() {
    return this.seatTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatTypeDto: UpdateSeatTypeDto) {
    return this.seatTypeService.update(+id, updateSeatTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatTypeService.remove(+id);
  }
}
