import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    @ApiProperty({ example: "FirstName", description: "Xaridorning ismi (keyinroq kiritiladi)" })
    @IsString()
    first_name: string;

    @ApiProperty({ example: "LastName", description: "Xaridorning familiyasi (keyinroq kiritiladi)" })
    @IsString()
    last_name: string;

    @ApiProperty({ example: "+998901234567", description: "Xaridorning telefon raqami (keyinroq kiritiladi)" })
    @IsString()
    phone_number: string;

    @ApiProperty({ example: "01-01-2001", description: "Xaridorning tug'ilgan sanasi (keyinroq kiritiladi)" })
    @IsDateString()
    birth_date: Date;

    @ApiProperty({ example: "1", description: "Xaridor jinsining ID raqami (keyinroq kiritiladi)" })
    @IsNumber()
    gender_id: number;

    @ApiProperty({ example: "1", description: "Xaridor tushunadigan tilning ID raqami (keyinroq kiritiladi)" })
    @IsNumber()
    lang_id: number
}