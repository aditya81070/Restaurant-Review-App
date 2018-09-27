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
        serviceWorkerController._updateReady()
        return
      }
      if (reg.installing) {
        serviceWorkerController._trackInstalling()
        return
      }
      reg.addEventListener('updatefound', () => {
        serviceWorkerController._trackInstalling(reg.installing)
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
      ServiceWorkerController._updateReady()
    }
  })
}

ServiceWorkerController.prototype._updateReady = function _updateReady () {
  alert('there is a new update')
}
