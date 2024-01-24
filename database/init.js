import Sequilize from 'sequelize'

const db = new Sequilize('db_bot', 'telegramBot', 'telegramBot123', {
  host: 'db',
  dialect: 'postgres',
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
})

db.authenticate()
  .catch(error => console.error(error))

export default db