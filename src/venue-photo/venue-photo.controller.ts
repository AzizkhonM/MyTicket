import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenuePhotoService } from './venue-photo.service';
import { CreateVenuePhotoDto } from './dto/create-venue-photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue-photo.dto';
import { VenuePhoto } from './models/venue-photo.model';

@Controller('venuephotos')
export class VenuePhotoController {
  constructor(private readonly venuePhotoService: VenuePhotoService) {}

  @Post("add")
  create(@Body() createVenuePhotoDto: CreateVenuePhotoDto): Promise<VenuePhoto> {
    return this.venuePhotoService.create(createVenuePhotoDto);
  }

  @Get("all")
  findAll(): Promise<VenuePhoto[]> {
    return this.venuePhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuePhotoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenuePhotoDto: UpdateVenuePhotoDto) {
    return this.venuePhotoService.update(+id, updateVenuePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venuePhotoService.remove(+id);
  }
}
