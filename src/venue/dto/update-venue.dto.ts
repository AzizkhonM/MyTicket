import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueDto } from './create-venue.dto';

export class UpdateVenueDto extends PartialType(CreateVenueDto) {
    schema?: string;
    site?: string
    region_id?: number;
    district_id?: number
    venue_type_id?: number;
}
