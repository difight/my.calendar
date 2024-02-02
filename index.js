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
  ctx.reply(`Добро пожаловать ${user.last_name} ${user.first_name}!`)
})

bot.command('calendar', (ctx, next) => {
  const chat_id = ctx.update.message.chat.id
  ctx.reply('', markupController.calendarMarkup(chat_id))
});

bot.on('callback_query', async (ctx, next) => {
  let request_data = ctx?.update?.callback_query?.data
  request_data = request_data.split("_")
  const chat_id = ctx?.update?.callback_query?.message?.chat?.id
  const message_id = ctx?.update?.callback_query?.message?.message_id
  if (request_data[0] === 'cal') {
    ctx.telegram.editMessageText(chat_id,message_id, 0, '', markupController.calendarMarkup(chat_id, request_data[1], request_data[2]))
  }
  if (request_data[0] === 'info') {
    let date = 'Выбрана дата '+request_data[1]
    ctx.editMessageText(date)
  }
  await next()
})

bot.launch({
  allowedUpdates: ['callback_query'],
})