import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({ example: "admin", description: "Admin logini" })
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({ example: "password", description: "Admin paroli" })
    @MinLength(8, {})
    @IsString()
    @IsStrongPassword()
    password: string
}