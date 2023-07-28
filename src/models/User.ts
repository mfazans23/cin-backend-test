import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface UserAttributes {
  id?: number
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number
  public name!: string
  public email!: string
  public password!: string
  public createdAt?: Date
  public updatedAt?: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
)

export default User
