import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Venue } from "../../venue/models/venue.model";

interface DistrictAttr{
    id: number;
    name: string
}

@Table({tableName: "districts"})
export class District extends Model<DistrictAttr> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING
    })
    name: string

    @HasMany(() => Venue)
    venues: Venue[]

}