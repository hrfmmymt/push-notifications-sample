importScripts('//www.gstatic.com/firebasejs/4.3.0/firebase.js')
var config = {
  apiKey: "AIzaSyC7W0Fgf3Sf2XXR3GLxLy1MLVFADG-7ml8",
  authDomain: "push-notifications-sampl-39a33.firebaseapp.com",
  databaseURL: "https://push-notifications-sampl-39a33.firebaseio.com",
  projectId: "push-notifications-sampl-39a33",
  storageBucket: "push-notifications-sampl-39a33.appspot.com",
  messagingSenderId: "979896802364"
};
firebase.initializeApp(config);

self.addEventListener('notificationclick', event => {
  event.notification.close()

  event.waitUntil(
    self.clients.openWindow('https://www.google.co.jp/')
  )
})
