import Users from "../database/model/users.js"

class UserController {
  async getUsers() {
    return await Users.findAll()
  }
  async getUser(args) {
    return await Users.findOne(args)
  }

  async createUser(user) {
    const findUser = await this.getUser({ where: {telegram_id: user.id}})
    if (findUser) {
      return findUser
    }
    await Users.create({
      telegram_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username
    })
    return await this.getUser({ where: {telegram_id: user.id}})
  }
}

export default new UserController()