const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')

const _onVideoSubmit = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  data.user_id = store.user.id

  api.create(data)
    .then(ui.createVideo)
    .catch(ui.createVideoFailure)
}

const _onInfoClick = function () {
  const id = $('#selectVideo').text().split('.')[0]
  if (!isNaN(id)) {
    api.show(id)
      .then(ui.showInfoModal)
      .catch(ui.showFailure)
  } else { ui.noID() }
}

const addEventHandlers = function () {
  $('#addButton').on('click', ui.showAdd)
  $('#addCancelButton').on('click', ui.hideAdd)
  $('#selectVideoMenu').on('click', '.dropdown-item', ui.changeMenuText)
  $('#infoButton').on('click', _onInfoClick)
  $('#addVideoForm').on('submit', _onVideoSubmit)
}

module.exports = {
  addEventHandlers
}
