import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerCardDto } from './create-customer_card.dto';

export class UpdateCustomerCardDto extends PartialType(CreateCustomerCardDto) {
    is_active: boolean;
    is_main: boolean
}