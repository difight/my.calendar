import pkg from 'telegraf';
const { Markup } = pkg;

class MarkupController {
  welcomeMarkup () {
    return Markup.inlineKeyboard([
      Markup.callbackButton('Coke', 'Coke'),
      Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
      Markup.callbackButton('Pepsi', 'Pepsi')
    ])
    .extra()
  }
}

export default new MarkupController();