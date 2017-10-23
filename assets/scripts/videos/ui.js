const alert = require('../alert')

const showAdd = function () {
  $('#addVideoForm').show()
}

const hideAdd = function () {
  _clearAdd()
  $('#addVideoForm').hide()
}

const createVideo = function (data) {
  hideAdd()
  alert('success', 'Video added!')
  _buildVideo(data.video)
  _buildVideoMenuItem(data.video)
}

const createVideoFailure = function () {
  alert('danger', 'Oh no. We couldn\'t add a video. This is bad.')
}

const displayVideos = function (data) {
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
}

const changeMenuText = function (event) {
  $('#selectVideo').html($(event.currentTarget).text() +
  ' <span class="caret" id="hack"></span>')
}

const _buildVideoMenuItem = function (video) {
  $('#selectVideoMenu').append(
    '<li><a class="dropdown-item" href="#">' + video.id + '. ' + video.title +
      '</a></li>'
  )
}

const _buildVideo = function (video) {
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

module.exports = {
  showAdd,
  hideAdd,
  createVideo,
  createVideoFailure,
  displayVideos,
  indexFailure,
  resetVideoComponents,
  changeMenuText
}
