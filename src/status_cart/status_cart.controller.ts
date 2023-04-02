import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusCartService } from './status_cart.service';
import { CreateStatusCartDto } from './dto/create-status_cart.dto';
import { UpdateStatusCartDto } from './dto/update-status_cart.dto';

@Controller('statuscart')
export class StatusCartController {
  constructor(private readonly statusCartService: StatusCartService) {}

  @Post("add")
  create(@Body() createStatusCartDto: CreateStatusCartDto) {
    return this.statusCartService.create(createStatusCartDto);
  }

  @Get("all")
  findAll() {
    return this.statusCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusCartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusCartDto: UpdateStatusCartDto) {
    return this.statusCartService.update(+id, updateStatusCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusCartService.remove(+id);
  }
}
