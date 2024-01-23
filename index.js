import 'dotenv/config'
import pkg from 'telegraf';
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
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()