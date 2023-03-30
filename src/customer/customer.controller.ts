import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './models/customer.model';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post("register")
  register(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.register(createCustomerDto);
  }

  @Post("login")
  login(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.login(createCustomerDto);
  }

  @Get("all")
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
