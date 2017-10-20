const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')

const _onLoginRegister = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  $('#isRegister').is(':checked') ? _register(data) : _login(data)
}

const _register = function (data) {
  if (data.credentials.password === data.credentials.password_confirmation) {
    api.register(data)
      .then(ui.registerSuccess)
      .catch(ui.registerFailure)
  } else {
    ui.passwordMismatch()
  }
}

const _login = function (data) {
  // login, ensure data is cleaned of password_conf
  data = {
    credentials: {
      email: data.credentials.email,
      password: data.credentials.password
    }
  }
  api.login(data)
    .then(ui.signOnSuccess)
    .catch(ui.signOnFailure)
}

const addEventHandlers = function () {
  $('#nav-login').on('click', ui.displayLogin)
  $('#nav-home').on('click', ui.displayHome)
  $('#nav-videos').on('click', ui.displayVideos)
  $('#loginRegisterForm').on('submit', _onLoginRegister)
  $('#isRegister').on('change', ui.showHidePassConf)
}

module.exports = {
  addEventHandlers
}
