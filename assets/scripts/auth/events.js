const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const store = require('../store.js')

const addEventHandlers = function () {
  $('#nav-login').on('click', ui.displayLogin)
  $('#nav-home').on('click', ui.displayHome)
}

module.exports = {
  addEventHandlers
}
