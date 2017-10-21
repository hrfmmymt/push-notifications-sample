importScripts('//www.gstatic.com/firebasejs/4.6.0/firebase-app.js')
importScripts('//www.gstatic.com/firebasejs/4.6.0/firebase-database.js')
importScripts('//www.gstatic.com/firebasejs/4.6.0/firebase-messaging.js')

// ON NOTIFICATION CLICK
self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(
    self.clients.openWindow('https://google.co.jp')
  )
})

firebase.initializeApp({
  apiKey: 'AIzaSyC7W0Fgf3Sf2XXR3GLxLy1MLVFADG-7ml8',
  authDomain: 'push-notifications-sampl-39a33.firebaseapp.com',
  databaseURL: 'https://push-notifications-sampl-39a33.firebaseio.com',
  projectId: 'push-notifications-sampl-39a33',
  storageBucket: 'push-notifications-sampl-39a33.appspot.com',
  messagingSenderId: '979896802364'
})

const messaging = firebase.messaging()
