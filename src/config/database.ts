import { Sequelize } from 'sequelize'
import mysql2 from 'mysql2'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPass = process.env.DB_PASS as string
const dbHost = process.env.DB_HOST as string

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql',
  dialectModule: mysql2,
})

export default sequelize
