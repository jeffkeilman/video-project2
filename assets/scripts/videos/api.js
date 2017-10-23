const config = require('../config')
const store = require('../store')

const create = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/videos',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const loadVideos = function () {
  return $.ajax({
    url: config.apiOrigin + '/videos',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  create,
  loadVideos
}
