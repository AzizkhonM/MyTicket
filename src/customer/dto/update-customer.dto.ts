import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    first_name: string;
    last_name: string;
    phone_number: string;
    birth_date: Date;
    gender_id: number;
    lang_id: number
}