import * as firebase from 'firebase'
import loadPosts from './modules/loadPosts'
import './modules/settings'

const postBtn = document.getElementById('add-post')
const list = document.getElementById('list')

function saveToDB(title) {
  firebase.database().ref('posts').push(title)
}

postBtn.addEventListener('click', () => {
  const input = document.getElementById('input-title')
  const listItem = document.createElement('li')

  listItem.innerHTML = input.value
  list.append(listItem)

  saveToDB(input.value)
  input.value = ''
})

loadPosts()
