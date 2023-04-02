import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({ example: "email", description: "Yangi foydalanuvchining elektron pochta manzili" })
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @ApiProperty({ example: "password", description: "Yangi foydalanuvchi uchun beriladigan vaqtinchalik parol" })
    @IsNotEmpty()
    @IsString()
    password: string
}