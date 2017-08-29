// Initialize Firebase
const config = {
  apiKey: "AIzaSyC7W0Fgf3Sf2XXR3GLxLy1MLVFADG-7ml8",
  authDomain: "push-notifications-sampl-39a33.firebaseapp.com",
  databaseURL: "https://push-notifications-sampl-39a33.firebaseio.com",
  projectId: "push-notifications-sampl-39a33",
  storageBucket: "push-notifications-sampl-39a33.appspot.com",
  messagingSenderId: "979896802364"
};
firebase.initializeApp(config);


const pushBtn   = document.getElementById('push-button')
const database  = firebase.database()
const messaging = firebase.messaging()


let userToken  = null
let isSubscribed = false

// UPADTE SUBSCRIPTION BUTTON
const updateBtn = () => {

  if (Notification.permission === 'denied') {
    pushBtn.textContent = 'Subscription blocked'
    return
  }

  pushBtn.textContent = isSubscribed ? 'Unsubscribe' : 'Subscribe'
  pushBtn.disabled = false
}


// UPDATE SUBSCRIPTION ON SERVER
const updateSubscriptionOnServer = token => {

  if (isSubscribed) {
    return database.ref('device_ids')
      .equalTo(token)
      .on('child_added', snapshot => snapshot.ref.remove())
  }

  database.ref('device_ids').once('value')
    .then(snapshots => {
      let deviceExists = false

      snapshots.forEach(childSnapshot => {
        if (childSnapshot.val() === token) {
          deviceExists = true
          return console.log('Device already registered.');
        }
      })

      if (!deviceExists) {
        console.log('Device subscribed');
        return database.ref('device_ids').push(token)
      }
  })
}


// SUBSCRIBE
const subscribeUser = () => {

  messaging.requestPermission()
    .then(() => messaging.getToken())
    .then(token => {

      updateSubscriptionOnServer(token)
      isSubscribed = true
      userToken = token
      localStorage.setItem('pushToken', token)
      updateBtn()
    })
    .catch(err => console.log('Denied', err))
}


// UNSUBSCRIBE
const unsubscribeUser = () => {

  messaging.deleteToken(userToken)
    .then(() => {
      updateSubscriptionOnServer(userToken)
      isSubscribed = false
      userToken = null
      localStorage.removeItem('pushToken')
      updateBtn()
    })
    .catch(err => console.log('Error unsubscribing', err))
}


// INIT PUSH
const initializePush = () => {

  userToken = localStorage.getItem('pushToken')

  isSubscribed = userToken !== null
  updateBtn()

  // CHANGE SUBSCRIPTION ON CLICK
  pushBtn.addEventListener('click', () => {
    pushBtn.disabled = true

    if (isSubscribed) return unsubscribeUser()

    return subscribeUser()
  })
}


// REGISTER SW
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        messaging.useServiceWorker(registration)

        initializePush()
      })
      .catch(err => console.log('Service Worker Error', err))
  } else {
    pushBtn.textContent = 'Push not supported.'
  }
})
