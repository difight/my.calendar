class CalendarComponent {
  /**
   * Выведем календарь
   * @param month
   * @param year
   * @param chat_id
   * @param cbq_id
   * @param message_id
   */
  viewCal(year, month, chat_id, cbq_id = null, message_id = null) {
    // получаем массив дней месяца
    let dayLines = this.getDays(year, month);
    // определим переданную дату
    let currentMonthDate = new Date(+year, +month);
    // дата предыдущего месяца
    let prevMonthDate = (new Date((new Date(currentMonthDate)).setMonth(currentMonthDate.getMonth() - 1)))
    // дата следующего месяца
    let nextMonthDate = (new Date((new Date(currentMonthDate)).setMonth(currentMonthDate.getMonth() + 1)))
    // определим параметры переданного месяца
    let current_info = this.setBeforeZero(currentMonthDate.getMonth() + 1) + "-" + currentMonthDate.getFullYear();
    // определим кнопки
    let buttons = [];
    // первый ряд кнопок это навигация календаря
    buttons.push([
      {
        text: "<<<",
        callback_data: "cal_" + prevMonthDate.getFullYear() + "_" + prevMonthDate.getMonth()
      },
      {
        text: current_info,
        callback_data: "info_" + current_info
      },
      {
        text: ">>>",
        callback_data: "cal_" + nextMonthDate.getFullYear() + "_" + nextMonthDate.getMonth()
      }
    ]);
    // переберем дни
    dayLines.forEach(function(line) {
      // добавим ряд кнопок
      buttons[buttons.length] = [];
      // переберем линию дней
      line.forEach(function(day) {
        // добавим кнопку
        buttons[buttons.length - 1].push({
          text: day,
          callback_data: day > 0
            ? "info_" + this.setBeforeZero(day) + "-" + current_info
            : "inline"
        });
      }, this);
    }, this);
    // готовим данные
    let data = {
      chat_id: chat_id,
      text: "<b>Календарь:</b>\n\n" + currentMonthDate.toLocaleString('ru', {month: 'long', year: 'numeric'}),
      parse_mode: "html",
      reply_markup: {inline_keyboard: buttons}
    };
    return data
  }

  /**
   * Получаем массив дней для календаря
   * @param year
   * @param month
   * @returns {Array}
   */
  getDays(year, month) {
    // получаем дату
    let d = new Date(year, month);
    // объявляем массив
    let days = [];
    // добавляем первую строку
    days[days.length] = [];
    // добавляем в первую строку пустые значения
    for (let i = 0; i < this.getNumDayOfWeek(d); i++) {
      days[days.length - 1].push("-");
    }
    // выходим пока месяц не перешел на другой
    while (d.getMonth() === +month) {
      // добавляем в строку дни
      days[days.length - 1].push(d.getDate());
      // вс, последний день - перевод строки
      if (this.getNumDayOfWeek(d) % 7 === 6) {
        // добавляем новую строку
        days[days.length] = [];
      }
      // переходим на следующий день
      d.setDate(d.getDate() + 1);
    }
    // дозаполняем последнюю строку пустыми значениями
    if (this.getNumDayOfWeek(d) !== 0) {
      for (let i = this.getNumDayOfWeek(d); i < 7; i++) {
        days[days.length - 1].push("-");
      }
    }
    // вернем массив
    return days;
  }

  /**
   * Переопределим номер дня недели
   * @param date
   * @return int
   */
  getNumDayOfWeek(date) {
    // получим день недели
    let day = date.getDay();
    // вернем на 1 меньше [0 - вск]
    return (day === 0) ? 6 : day - 1;
  }

  /**
   * Добавим ноль вперед
   * @param num
   * @returns {string}
   */
  setBeforeZero(num) {
    return ("0" + (num)).slice(-2);
  }
}

export default new CalendarComponent()