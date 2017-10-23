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
  $('#videoArea').append(_buildVideo(data.video))
}

const createVideoFailure = function () {
  alert('danger', 'Oh no. We couldn\'t add a video. This is bad.')
}

const displayVideos = function (data) {
  data.videos.forEach((video) => {
    $('#videoArea').append(_buildVideo(video))
  })
}

const indexFailure = function () {
  alert('danger', 'Unable to load your favorites...')
}

const clearVideoArea = function () {
  $('#videoArea').empty()
}

const _buildVideo = function (video) {
  const newRow = document.createElement('div')
  return $(newRow).addClass('row').html('<div class="col-xs-6">' + video.title +
    '</div><div class="col-xs-6"><a href="' + video.url + '" target="_blank">' +
    video.url + '</div>')
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
  clearVideoArea
}
