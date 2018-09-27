let userChoice = false

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    new ServiceWorkerController()
  })
}

function ServiceWorkerController () {
  this._registerServiceWorker()
}

ServiceWorkerController.prototype._registerServiceWorker = function () {
  if (!navigator.serviceWorker) {
    return
  }
  let serviceWorkerController = this
  navigator.serviceWorker.register('./sw.js')
    .then((reg) => {
      console.log(`Service worker has been registered with scope: ${reg.scope}`)
      if (!navigator.serviceWorker.controller) {
        return
      }
      if (reg.waiting) {
        serviceWorkerController._updateReady(reg.waiting)
        return
      }
      if (reg.installing) {
        serviceWorkerController._trackInstalling(reg.installing)
        return
      }
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing
        serviceWorkerController._trackInstalling(newWorker)
      })
    })
    .catch((err) => {
      console.log(`Service Worker registration failed ${err}`)
    })
}

ServiceWorkerController.prototype._trackInstalling = function _trackInstalling (worker) {
  let ServiceWorkerController = this
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed') {
      ServiceWorkerController._updateReady(worker)
    }
  })
}

ServiceWorkerController.prototype._updateReady = function _updateReady (worker) {
  userChoice = confirm('New version available. Do you want to update?')
  if (!userChoice) return
  worker.postMessage('SWupdate')
}
