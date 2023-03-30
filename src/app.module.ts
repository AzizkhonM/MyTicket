import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/models/admin.model';
import { VenueModule } from './venue/venue.module';
import { SeatModule } from './seat/seat.module';
import { SeatTypeModule } from './seat-type/seat-type.module';
import { VenuePhotoModule } from './venue-photo/venue-photo.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { CustomerModule } from './customer/customer.module';
import { GenderModule } from './gender/gender.module';
import { LangModule } from './lang/lang.module';
import { CustomerAddressModule } from './customer_address/customer_address.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Admin],
      autoLoadModels: true,
      logging: true
    }),
    AdminModule,
    VenueModule,
    SeatModule,
    SeatTypeModule,
    VenuePhotoModule,
    RegionModule,
    DistrictModule,
    CustomerModule,
    GenderModule,
    LangModule,
    CustomerAddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
