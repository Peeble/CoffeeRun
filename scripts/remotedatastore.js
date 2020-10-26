(function (window) {
  'use strict'

  var App = window.App || {}
  var $ = window.jQuery
  // config located in app.js
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
  var firestore = firebase.firestore()
  const docRef = firestore.collection('coffee')

  class RemoteDataStore {
    constructor (url) {
      console.log('running the DataStore function')
      if (!url) {
        throw new Error('No remote URL supplied.')
      }

      this.serverURL = url
    }

    add (key, val) {
      console.log('the key is ' + key)

      var myQuery = docRef.where('emailAddress', '==', key)

      myQuery.get().then(function (querySnapshot) {
        console.log(querySnapshot)
        if (querySnapshot.empty) {
          console.log('no documents found')
          // docRef.withConverter(dataConverter).add(val).then(function (docRef) {
          docRef.add(val).then(function (docRef) {
            console.log('Document written with ID: ', docRef.id)
          })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        } else {
          console.log('i found stuff')
          querySnapshot.forEach(function (doc) {
            doc.ref.set(val)
          })
        }
      })
    }

    remove (key) {
      var query = docRef.where('emailAddress', '==', key)

      query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete()
        })
      })
    }

    /*
    ajaxposthelper (type, url, val) {

      $.ajax({
        type: type,
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(val),
        success: function (response) {
          console.log('function returned: ' + JSON.stringify(response))
        }
      })
    }
*/
    /*
       ajaxhelper (type, url, cb) {
         // deletes from firebase, no longer working
       /*  docRef.update({
           type: firebase.firestore.FieldValue.delete()
         }) */
    /*
      $.ajax({
        type: type,
        url: url,
        contentType: 'application/json',
        success: function (response) {
          console.log('function returned: ' + JSON.stringify(response))
          if (cb !== undefined) { cb(response) }
        }
      })
    }
/*
    add (key, val) { //insert firebase stuff here
      this.ajaxposthelper('POST', this.serverURL, val) }
    get (key, cb) { this.ajaxhelper('GET', this.serverURL + '/' + key, cb) }
    getAll (cb) { this.ajaxhelper('GET', this.serverURL, cb) }
    */
    /*
    remove (key) {console.log('removing ' + key);
    this.ajaxhelper('DELETE', this.serverURL + '/' + key)}
*/
  }
  /*
    var dataConverter = {
      toFirestore: function (data) {
        return {
          coffee: data.coffee,
          emailAddress: data.emailAddress,
          flavor: data.flavor,
          size: data.size,
          strength: data.strength
        }
      },
      fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options)
        return new myData(data.coffee, data.emailAddress, data.flavor, data.size, data.strength)
      }
    } */

  App.RemoteDataStore = RemoteDataStore
  window.App = App
})(window)
