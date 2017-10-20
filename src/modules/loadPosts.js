import * as firebase from 'firebase'

export default function() {
  const database = firebase.database()
  const connectedRef = database.ref('.info/connected')

  const readDB = () => {
    console.log('read');
    database.ref('posts').once('value').then(snapshots => {

      snapshots.forEach(childSnapshot => {
        const data = childSnapshot.val()
        const listItem = document.createElement('li')
        const list = document.getElementById('list')

        listItem.innerHTML = data
        list.appendChild(listItem)
      })
    })
  }

  connectedRef.on('value', function(snap) {
    if (snap.val() === true) {
      console.log('connected')
      // database.goOnline()
    } else {
      console.log('not connected')
      // database.goOffline()
    }
  })
  readDB()
}
