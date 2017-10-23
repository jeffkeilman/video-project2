const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')

const _onVideoSubmit = function (event) {
  console.log(event.target)
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

const _onUpdateClick = function () {
  // Run a show to get info and prefill
  const id = $('#selectVideo').text().split('.')[0]
  if (!isNaN(id)) {
    api.show(id)
      .then(ui.showAddPrefill)
      .catch(ui.showFailure)
  } else { ui.noID() }
}

const _onUpdateSubmit = function (event) {
  const data = getFormFields(document.getElementById('addVideoForm'))
  const updateCount = _cleanupVideo(data.video)

  if (updateCount > 0) {
    api.update(data)
      .then(ui.updateSuccess)
      .catch(ui.updateFailure)
  } else { ui.noUpdate() }
}

const _onDeleteClick = function () {
  const id = $('#selectVideo').text().split('.')[0]
  if (!isNaN(id)) {
    api.deleteVideo(id)
      .then(ui.deleteSuccess)
      .catch(ui.deleteFailure)
  } else { ui.noID() }
}

const _cleanupVideo = function (video) {
  let updateCount = 0
  for (const key in video) {
    if (store.user.currVideo[key] === video[key]) {
      delete video[key]
    } else { updateCount++ }
  }

  return updateCount
}

const addEventHandlers = function () {
  $('#addButton').on('click', ui.showAdd)
  $('#addCancelButton').on('click', ui.hideAdd)
  $('#selectVideoMenu').on('click', '.dropdown-item', ui.changeMenuText)
  $('#infoButton').on('click', _onInfoClick)
  $('#updateButton').on('click', _onUpdateClick)
  $('#updateButtonSubmit').on('click', _onUpdateSubmit)
  $('#deleteButton').on('click', _onDeleteClick)
  $('#addVideoForm').on('submit', _onVideoSubmit)
}

module.exports = {
  addEventHandlers
}
