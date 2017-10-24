const alert = require('../alert')
const store = require('../store')

const videoCRUD = [
  'selectVideo',
  'infoButton',
  'updateButton',
  'deleteButton',
  'addButton'
]

const showAdd = function (event) {
  _crudButtonsDisabled(true)
  $('#addVideoForm').show()
}

const hideAdd = function () {
  _crudButtonsDisabled(false)
  _clearAdd()
  $('#addVideoForm').hide()
  $('#updateButtonSubmit').hide()
  $('#submitAddButton').show()
  $('#selectVideo').prop('disabled', false)
}

const showAddPrefill = function (data) {
  _crudButtonsDisabled(true)
  const video = data.video
  store.user.currVideo = video

  $('#titleText').val(video.title)
  $('#urlText').val(video.url)
  $('#youtuberText').val(video.youtuber)
  $('#descriptionText').val(video.description)

  $('#submitAddButton').hide()
  $('#updateButtonSubmit').show()
  $('#addVideoForm').show()
}

const createVideo = function (data) {
  _crudButtonsDisabled(false)
  hideAdd()
  alert('success', 'Video added!')
  _buildVideo(data.video)
  _buildVideoMenuItem(data.video)
  store.user.videos.push(data.video)
}

const createVideoFailure = function () {
  alert('danger', 'Oh no. We couldn\'t add a video. This is bad.')
}

const displayVideos = function (data) {
  store.user.videos = data.videos
  data.videos.forEach((video) => {
    _buildVideo(video)
    _buildVideoMenuItem(video)
  })
}

const indexFailure = function () {
  alert('danger', 'Unable to load your favorites...')
}

const resetVideoComponents = function () {
  $('#videoArea').empty()
  $('#selectVideoMenu').empty()
  $('#selectVideo').html('Videos ' + '<span class="caret" id="hack"></span>')
  $('#addVideoForm').hide()
  _clearAdd()
  $('#updateButtonSubmit').hide()
  $('#submitAddButton').show()
  _crudButtonsDisabled(false)
}

const changeMenuText = function (event) {
  $('#selectVideo').html('<div data-id="' + $(event.currentTarget).attr('data-id') +
  '">' + $(event.currentTarget).text() + ' <span class="caret"></span></div>')
}

const showInfoModal = function (data) {
  const video = data.video
  $('#infoModalTitle').text(video.title)
  _buildModalBody(video)
  $('#infoModal').modal()
}

const showFailure = function () {
  alert('danger', 'Couldn\'t load video info. It\'s time to panic.')
}

const noID = function () {
  alert('danger', 'Please select a video before trying that.')
}

const updateSuccess = function () {
  resetVideoComponents()
  displayVideos({ videos: store.user.videos })
  alert('success', 'Video updated!')
}

const updateFailure = function () {
  alert('danger', 'Unable to update video...')
  _crudButtonsDisabled(false)
}

const noUpdate = function () {
  alert('warning', 'No fields changed... did you mean to do that?')
}

const deleteSuccess = function () {
  _removeVideo(store.user.videos, +$('#selectVideo').attr('data-id'))
  resetVideoComponents()
  displayVideos({ videos: store.user.videos })
  alert('success', 'Video deleted!')
}

const deleteFailure = function () {
  alert('danger', 'Unable to delete video...')
}

const deployVideo = function () {
  $('#videoModal').modal()
}

const _removeVideo = function (videos, id) {
  for (let x = 0; x < videos.length; x++) {
    if (videos[x].id === id) {
      videos.splice(x, 1)
      break
    }
  }
}

const updateVideos = function (video) {
  for (let x = 0; x < store.user.videos.length; x++) {
    if (store.user.currVideo.id === store.user.videos[x].id) {
      for (const key in video) {
        store.user.videos[x][key] = video[key]
      }
      break
    }
  }
}

const _crudButtonsDisabled = function (option) {
  videoCRUD.forEach((button) => {
    $('#' + button).prop('disabled', option)
  })
}

const _buildModalBody = function (video) {
  $('#infoModalBody').html(
    '<div class="row">' +
    '<div>Youtuber: ' + video.youtuber + '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div>Description: ' + video.description + '</div>' +
    '</div>'
  )
}

const _buildVideoMenuItem = function (video) {
  _prettifyVideo(video)
  $('#selectVideoMenu').append(
    '<li><a class="dropdown-item" href="#" data-id="' + video.id + '">' + video.title +
      '</a></li>')
}

const _buildVideo = function (video) {
  _prettifyVideo(video)
  const newRow = document.createElement('div')
  $(newRow).addClass('row').html('<div class="col-xs-6">' + video.title +
    '</div><div class="col-xs-6"><a href="' + video.url + '" target="_blank">' +
    video.url + '</div>')
  $('#videoArea').append(newRow)
}

const _clearAdd = function () {
  $('#titleText').val('')
  $('#urlText').val('')
  $('#youtuberText').val('')
  $('#descriptionText').val('')
}

const _prettifyVideo = function (video) {
  if (video.title.length > 10) {
    video.title = video.title.substring(0, 10) + '...'
  }
}

module.exports = {
  showAdd,
  hideAdd,
  createVideo,
  createVideoFailure,
  displayVideos,
  indexFailure,
  resetVideoComponents,
  changeMenuText,
  showInfoModal,
  showFailure,
  noID,
  showAddPrefill,
  updateSuccess,
  updateFailure,
  noUpdate,
  deleteSuccess,
  deleteFailure,
  updateVideos,
  deployVideo
}
