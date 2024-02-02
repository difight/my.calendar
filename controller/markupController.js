import pkg from 'telegraf';
const { Markup } = pkg;
import calendarComponent from "../components/calendarComponent.js"

class MarkupController {
  calendarMarkup (chat_id, year = (new Date()).getFullYear(), month = (new Date()).getMonth()) {
    let calendar = calendarComponent.viewCal(year, month, chat_id)
    return calendar
  }
}

export default new MarkupController();