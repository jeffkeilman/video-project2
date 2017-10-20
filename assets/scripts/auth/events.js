const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')

const _onLoginRegister = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  $('#isRegister').is(':checked') ? _register(data) : _login(data)
}

const _onLogout = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.logout(data)
    .then(ui.signOffSuccess)
    .catch(ui.signOffFailure)
}

const _onChangePass = function (event) {
  // make API call and UI call
  event.preventDefault()
  const data = getFormFields(event.target)

  api.changePass(data)
    .then(ui.changePassSuccess)
    .catch(ui.changePassFailure)
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
  $('#nav-changePass').on('click', ui.displayChangePass)
  $('#nav-logout').on('click', _onLogout)
  $('#loginRegisterForm').on('submit', _onLoginRegister)
  $('#changePass').on('submit', _onChangePass)
  $('#isRegister').on('change', ui.showHidePassConf)
}

module.exports = {
  addEventHandlers
}
