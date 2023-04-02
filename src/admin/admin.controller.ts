import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Admin metodlari")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Admin qo'shish" })
  @Post("add")
  async create(@Body() createAdminDto: CreateAdminDto){
    console.log(createAdminDto.login);
    
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: "Adminlar ro'yxatini olish" })
  @Get("all")
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll()
  }

  @ApiOperation({ summary: "Adminni id raqami bo'yicha olish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Admin ma'lumotlariga o'zgartirish kiritish" })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni o'chirib tashlash" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
