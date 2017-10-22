const programInfo = $('#programInfo')

const alert = function (type, message) {
  programInfo.addClass('alert-' + type)
  programInfo.text(message)
  programInfo.show().delay(5000).fadeOut(() => {
    programInfo.removeClass('alert-' + type)
    programInfo.text('')
  })
}

module.exports = alert
