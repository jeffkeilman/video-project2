'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const videoEvents = require('./videos/events')
const authUI = require('./auth/ui')

$(() => {
  setAPIOrigin(location, config)
  authEvents.addEventHandlers()
  videoEvents.addEventHandlers()
  authUI.restoreInitial()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
