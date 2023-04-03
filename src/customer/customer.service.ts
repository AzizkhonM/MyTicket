import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private readonly customerRepo: typeof Customer, private readonly jwtService: JwtService) { }

  async register(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { email, password } = createCustomerDto

    const customer = await this.getUserByEmail(email)
    if (customer) {
      throw new HttpException("Bunday foydalanuvchi tizimda mavjud", HttpStatus.BAD_REQUEST)
    }

    let custom = this.customerRepo.create(createCustomerDto)

    const hashed_password = await bcrypt.hash(password, 7);
    console.log(custom);

    let res = this.customerRepo.update({ hashed_password }, { where: { id: (await custom).dataValues.id }, returning: true })
    console.log(res);

    return custom

  }

  async login(createCustomerDto: CreateCustomerDto) {

    console.log("Salom");

    const { email, password } = createCustomerDto

    const candidate = await this.customerRepo.findOne({ where: { email: email } })
    console.log(candidate);

    if (!candidate) {
      throw new HttpException("Bunday foydalanuvchi tizimda mavjud emas", HttpStatus.BAD_REQUEST)
    }

    const IsMatchPass = await bcrypt.compare(password, candidate.hashed_password)
    if (!IsMatchPass) {
      throw new UnauthorizedException("Parol noto'g'ri")
    }    

    const tokens = await this.getTokens(candidate)

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updatedAdmin = await this.customerRepo.update(
      { hashed_refresh_token: hashed_token },
      { where: { id: candidate.id }, returning: true }
    )

    return {
      token: tokens.refresh_token,
      updatedAdmin
    }

  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Customer> {
    return this.customerRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const candidate = this.customerRepo.findByPk(id)
    if (!candidate) {
      throw new HttpException("Bunday foydalanuvchi tizimda mavjud emas", HttpStatus.BAD_REQUEST)
    }

    return this.customerRepo.update(updateCustomerDto, { where: { id }, returning: true });
  }

  async remove(id: number) {
    return this.customerRepo.destroy({ where: { id } });
  }

  private async getUserByEmail(email: string) {
    const admin = await this.customerRepo.findOne({
      where: { email },
      include: {
        all: true
      }
    })
    return admin
  }

  async getTokens(candidate: Customer) {
    const jwtPayload = {
      gender_id: candidate.gender_id,
      lang_id: candidate.lang_id,
      id: candidate.id
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }

}
