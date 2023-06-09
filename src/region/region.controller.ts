import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './models/region.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Viloyatlar metodlari")
@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: "Viloyat qo'shish" })
  @Post("add")
  create(@Body() createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: "Barcha viloyatlarni ko'rish" })
  @Get("all")
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: "Viloyatni ID si bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Region> {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: "Viloyat ma'lumotini o'zgartirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: "Viloyatni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
