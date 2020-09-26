(function (window) {
  'use strict'
  var App = window.App || {}
  var $ = window.jQuery

  class FormHandler {
    constructor (selector) {
      // Code will go here
      if (!selector) {
        throw new Error('No selector provided')
      }

      this.$formElement = $(selector)
      if (this.$formElement.length === 0) {
        throw new Error('Could not find element with selector: ' + selector)
      }
    }

    addSubmitHandler (fn) {
      console.log('Setting submit handler for form')
      this.$formElement.on('submit', function (event) {
        event.preventDefault()

        var data = {}
        var myUser
        var myTitle
        $(this).serializeArray().forEach(function (item) {
          data[item.name] = item.value
          console.log(item.name + ' is ' + item.value)
          if (item.name === 'username') {
            myUser = item.value
          }
          if (item.name === 'title') {
            myTitle = item.value
          }
        })
        console.log(data)
        fn(data)
        this.reset()

        var name = 'Thank you for your order ' + myTitle + ' ' + myUser

        var $p = $('<p></p>')

        $p.append(name)
        console.log('it is' + $p)

        $('#ex1').modal().empty()
        $('#ex1').modal().append($p)
      })
    }
  }

  App.FormHandler = FormHandler
  window.App = App
})(window)
