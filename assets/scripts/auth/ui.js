const store = require('../store.js')

const displayLogin = function (event) {
  event.preventDefault()

  _navBarShift($('#nav-home'), $('#nav-login'))
  _flipViews($('#intro'), $('#login'))
}

const displayHome = function (event) {
  event.preventDefault()

  _navBarShift($('#nav-login'), $('#nav-home'))
  _flipViews($('#login'), $('#intro'))
}

const _navBarShift = function (li1, li2) {
  li1.removeClass('active')
  li2.addClass('active')
}

const _flipViews = function (view1, view2) {
  view1.hide()
  view2.show()
}

module.exports = {
  displayLogin,
  displayHome
}
