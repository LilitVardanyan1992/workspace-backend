import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Workspace } from 'src/workspace/workspace.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    unique: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Workspace)
  workspaces: Workspace[];
}
