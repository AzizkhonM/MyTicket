import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './models/customer.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/customer_self.guard';

@ApiTags("Xaridorlar metodlari")
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @ApiOperation({ summary: "Yangi xaridorni ro'yxatdan o'tkazish" })
  @Post("register")
  register(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.register(createCustomerDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @Post("login")
  login(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.login(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Barcha xaridorlarni ko'rish" })
  @Get("all")
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Xaridorlarni ID si bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @UseGuards(UserSelfGuard)
  @ApiOperation({ summary: "Xaridor ma'lumotlarini o'zgartirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @UseGuards(UserSelfGuard)
  @ApiOperation({ summary: "Xaridorni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
