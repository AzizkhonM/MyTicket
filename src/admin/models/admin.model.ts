import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AdminAttr{
    id: number;
    name: string;
    login: string;
    hashed_password: string;
    is_active: boolean;
    is_creator: boolean;
    hashed_refresh_token: string
}

@Table({tableName: "admin"})
export class Admin extends Model<AdminAttr>{
    
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING,
    })
    name: string

    @Column({
        type: DataType.STRING,
    })
    login: string

    @Column({
        type: DataType.STRING,
    })
    hashed_password: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    is_active: boolean

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_creator: boolean

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string

}