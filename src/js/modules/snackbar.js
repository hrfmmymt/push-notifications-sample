import 'material-design-lite'

export default function(payload) {
  const snackbarContainer = document.getElementById('snackbar')

  let data = {
    message: payload.notification.title,
    timeout: 5000,
    actionHandler(event) {
      location.reload()
    },
    actionText: 'Reload'
  }
  snackbarContainer.MaterialSnackbar.showSnackbar(data)
}
