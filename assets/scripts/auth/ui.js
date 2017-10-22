const store = require('../store')
const alert = require('../alert')

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
  store.user = null
  restoreInitial()
}

const signOffFailure = function () {
  alert('danger', 'Failed to sign off. Something went very wrong.')
}

const changePassSuccess = function () {
  alert('success', 'Password changed!')
  _clearChangePass()
}

const changePassFailure = function () {
  alert('danger', 'Failed to change password. Perhaps old password didn\'t match?')
  _clearChangePass()
}

const restoreInitial = function () {
  // default state
  _hideViews()
  _hideNav()
  _clearLogin(true, false)
  _clearChangePass()
  $('#programInfo').hide()
  $('#addVideoForm').hide()
  $('#nav-home').show()
  $('#nav-login').show()
  $('#intro').show()
}

const registerSuccess = function () {
  alert('success', 'All set! Please login and get started!')

  _clearLogin()
}

const registerFailure = function () {
  alert('danger', 'Hmm... We might already have an account under that email address.')

  _clearLogin()
}

const passwordMismatch = function () {
  alert('danger', 'Hmm... Those two passwords didn\'t match.')

  _clearLogin(false, true)
}

const signOnFailure = function () {
  alert('danger', 'Email/password combination not found.')

  _clearLogin()
}

const showHidePassConf = function () {
  if ($('#isRegister').is(':checked')) {
    $('#confirmPassword').show()
  } else {
    $('#confirmPassword').hide()
  }
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

const _clearChangePass = function () {
  $('#newPassText').val('')
  $('#oldPassText').val('')
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
  signOffFailure,
  displayChangePass,
  changePassSuccess,
  changePassFailure
}
