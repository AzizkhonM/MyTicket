import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LangService } from './lang.service';
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';
import { Lang } from './models/lang.model';

@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @Post("add")
  create(@Body() createLangDto: CreateLangDto): Promise<Lang> {
    return this.langService.create(createLangDto);
  }

  @Get("all")
  findAll(): Promise<Lang[]> {
    return this.langService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lang> {
    return this.langService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLangDto: UpdateLangDto) {
    return this.langService.update(+id, updateLangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.langService.remove(+id);
  }
}
