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
    })
}
