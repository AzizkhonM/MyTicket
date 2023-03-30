import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from "bcrypt"

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminRepo: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const candidate = await this.getUserByEmail(createAdminDto.login)

    if(candidate){
      throw new HttpException("Bunday foydalanuvchi tizimda mavjud", HttpStatus.BAD_REQUEST)
    }

    let admin = this.adminRepo.create(createAdminDto)

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    console.log(admin);
    
    let res = await this.adminRepo.update({hashed_password}, {where:{ id:(await admin).dataValues.id}, returning:true})
    console.log(res);
    
    return admin
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminRepo.findAll()
    return admins
  }

  async findOne(id: number): Promise<Admin> {
    const company = await this.adminRepo.findByPk(id)
    return company
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const company = await this.adminRepo.update(updateAdminDto, {where: {id}, returning: true})

    return company
  }

  async remove(id: number) {
    return this.adminRepo.destroy({where: {id}})
  }

  private async getUserByEmail(login: string){
    const admin = await this.adminRepo.findOne({
      where: {login},
      include: {
        all: true
      }
    })
    return admin
  }
}
