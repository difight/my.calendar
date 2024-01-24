import db from '../init.js'
import DataType from 'sequelize'

const Users = db.define('users', {
  'id': {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  'telegram_id': {
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  'first_name': {
    type: DataType.STRING,
  },
  'last_name': {
    type: DataType.STRING,
  },
  'username': {
    type: DataType.STRING,
  }
})

await Users.sync()

export default Users