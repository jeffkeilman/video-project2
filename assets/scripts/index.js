'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')

$(() => {
  setAPIOrigin(location, config)
  authEvents.addEventHandlers()
  // default state
  $('#login').hide()
  $('#db').hide()
  $('#login').hide()
  $('#nav-logout').hide()
  $('#nav-changePass').hide()
  $('#nav-videos').hide()
  $('#programInfo').hide()
  $('#confirmPassword').hide()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
