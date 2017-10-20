const store = require('../store')

const programViews = [
  'intro',
  'login',
  'changePass',
  'db'
]

const programNav = [
  'nav-login',
  'nav-videos',
  'nav-changePass',
  'nav-logout'
]

const programInfo = $('#programInfo')

const displayLogin = function () {
  _navBarShift($('#nav-login'))
  _flipViews($('#login'))
}

const displayHome = function () {
  _navBarShift($('#nav-home'))
  _flipViews($('#intro'))
}

const displayVideos = function () {
  // TODO: Database queries perhaps (each time? Just after login?) and display
  _navBarShift($('#nav-videos'))
  _flipViews($('#db'))
}

const displayChangePass = function () {
  _navBarShift($('#nav-changePass'))
  _flipViews($('#changePass'))
}

const signOnSuccess = function (data) {
  store.user = data.user

  const navVideos = $('#nav-videos')

  navVideos.show()
  $('#nav-changePass').show()
  $('#nav-logout').show()
  $('#nav-login').hide()
  _navBarShift(navVideos)
  _flipViews($('#db'))

  // TODO: Display db UI
}

const signOffSuccess = function () {
  // delete user, restore initial state of app
  store.user = null
  restoreInitial()
}

const restoreInitial = function () {
  // default state
  _hideViews()
  _hideNav()
  _clearLogin(true, false)
  $('#programInfo').hide()
  $('#nav-home').show()
  $('#nav-login').show()
  $('#intro').show()
}

const registerSuccess = function () {
  _alert('success', 'All set! Please login and get started!')

  _clearLogin()
}

const registerFailure = function () {
  _alert('danger', 'Hmm... We might already have an account under that email address.')

  _clearLogin()
}

const passwordMismatch = function () {
  _alert('danger', 'Hmm... Those two passwords didn\'t match.')

  _clearLogin(false, true)
}

const signOnFailure = function () {
  _alert('danger', 'Email/password combination not found.')

  _clearLogin()
}

const showHidePassConf = function () {
  if ($('#isRegister').is(':checked')) {
    $('#confirmPassword').show()
  } else {
    $('#confirmPassword').hide()
  }
}

const _alert = function (type, message) {
  programInfo.addClass('alert-' + type)
  programInfo.text(message)
  programInfo.show().delay(5000).fadeOut(() => {
    programInfo.removeClass('alert-' + type)
    programInfo.text('')
  })
}

const _navBarShift = function (li) {
  $('.active').removeClass('active')
  li.addClass('active')
}

const _flipViews = function (newView) {
  _hideViews()
  newView.show()
}

const _hideViews = function () {
  programViews.forEach((view) => {
    $('#' + view).hide()
  })
}

const _hideNav = function () {
  programNav.forEach((nav) => {
    $('#' + nav).hide()
  })
}

const _clearLogin = function (all, passwordMismatch) {
  $('#passwordText').val('')
  $('#passwordConfText').val('')
  if (!passwordMismatch) {
    $('#isRegister').prop('checked', false)
    $('#confirmPassword').hide()
  }
  if (all) { $('#emailLabel').val('') }
}

module.exports = {
  displayLogin,
  displayHome,
  registerSuccess,
  registerFailure,
  showHidePassConf,
  passwordMismatch,
  signOnSuccess,
  signOnFailure,
  displayVideos,
  restoreInitial,
  signOffSuccess,
  displayChangePass
}
