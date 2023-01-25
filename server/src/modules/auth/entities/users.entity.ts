import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  birthDate: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  havingExperience: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  yourExperience: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  companyName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  jopTitle: string;
}
