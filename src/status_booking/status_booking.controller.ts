import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusBookingService } from './status_booking.service';
import { CreateStatusBookingDto } from './dto/create-status_booking.dto';
import { UpdateStatusBookingDto } from './dto/update-status_booking.dto';

@Controller('statusbooking')
export class StatusBookingController {
  constructor(private readonly statusBookingService: StatusBookingService) {}

  @Post("add")
  create(@Body() createStatusBookingDto: CreateStatusBookingDto) {
    return this.statusBookingService.create(createStatusBookingDto);
  }

  @Get("all")
  findAll() {
    return this.statusBookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusBookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusBookingDto: UpdateStatusBookingDto) {
    return this.statusBookingService.update(+id, updateStatusBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusBookingService.remove(+id);
  }
}
