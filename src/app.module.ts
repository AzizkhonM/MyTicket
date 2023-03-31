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
import { CountryModule } from './country/country.module';
import { Venue } from './venue/models/venue.model';
import { Seat } from './seat/models/seat.model';
import { SeatType } from './seat-type/models/seat-type.model';
import { VenuePhoto } from './venue-photo/models/venue-photo.model';
import { Region } from './region/models/region.model';
import { District } from './district/models/district.model';
import { Customer } from './customer/models/customer.model';
import { Gender } from './gender/models/gender.model';
import { Lang } from './lang/models/lang.model';
import { CustomerAddress } from './customer_address/models/customer_address.models';
import { Country } from './country/models/country.model';
import { CustomerCardModule } from './customer_card/customer_card.module';

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
      models: [Admin, Venue, Seat, SeatType, VenuePhoto, Region, District, Customer, Gender, Lang, CustomerAddress, Country],
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
    CustomerAddressModule,
    CountryModule,
    CustomerCardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
