import * as firebase from 'firebase'

export default function() {
  const database = firebase.database()
  const connectedRef = database.ref('.info/connected')
  connectedRef.on('value', function(snap) {
    if (snap.val()) {
      console.log('connected');
    } else {
      console.log('not connected');
    }
  })
  readDB()

  function readDB() {
    console.log('read');
    database.ref('posts').once('value').then(snapshots => {
      snapshots.forEach(childSnapshot => {
        const data = childSnapshot.val()
        const listItem = document.createElement('li')
        listItem.innerHTML = data
        list.append(listItem)
      })
    })
  }
}
