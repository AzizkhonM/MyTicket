import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @ApiProperty({ example: "Ism", description: "Admin ismi (ixtiyoriy)" })
    @IsString()
    name?: string;

    @ApiProperty({ example: "true", description: "Adminning faol yoki faol emasligi" })
    @IsBoolean()
    is_active?: boolean;

    @ApiProperty({ example: "false", description: "Adminning loyihaning egasi yoki egasi emasligi" })
    @IsBoolean()
    is_creator?: boolean
}