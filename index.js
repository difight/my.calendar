import 'dotenv/config'
import pkg from 'telegraf'
import userController from './controller/userController.js'
import markupController from './controller/markupController.js'
import menuComponent from './components/menuComponent.js'


const { Telegraf } = pkg;
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('Response time: %sms', ms)
})
bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})
bot.telegram.setMyCommands(menuComponent)
bot.start(async (ctx) => {
  const user = await userController.createUser(ctx?.update?.message?.from)
  ctx.reply(`Добро пожаловать ${user.last_name} ${user.first_name}!`, markupController.welcomeMarkup())
})

bot.action('Dr Pepper', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()