/**
 * User choice for page update when service worker is updated.
 */
let userChoice = false

/**
 * delay service worker's initial registration untill after the first page has loaded
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    new ServiceWorkerController()
  })
}

/**
 * ServiceWorkerController class to handle service worker
 */
function ServiceWorkerController () {
  this._registerServiceWorker()
}

/**
 * _registerServiceWorker function to register service worker
 */
ServiceWorkerController.prototype._registerServiceWorker = function () {
  /**
   * Checks if browser supports service worker or not
   */
  if (!navigator.serviceWorker) {
    return
  }
  let serviceWorkerController = this

  /**
   * Register new service worker if not present in given scope.
   */
  navigator.serviceWorker.register('./sw.js')
    .then((reg) => {
      console.log(`Service worker has been registered with scope: ${reg.scope}`)
      /**
       * If there is no controller that means this page didn't load
       * using service worker hence the content is loaded from network
       */
      if (!navigator.serviceWorker.controller) {
        return
      }
      // Check if there is any service worker waiting. if yes then inform user to update it.
      if (reg.waiting) {
        serviceWorkerController._updateReady(reg.waiting)
        return
      }
      // check if there is any service worker is installing. if yes then track it's state
      if (reg.installing) {
        serviceWorkerController._trackInstalling(reg.installing)
        return
      }
      /**
       * listen for the service worker's updatefound event
       * if an update is found, track it's state
       */
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing
        serviceWorkerController._trackInstalling(newWorker)
      })
      /**
       * This reload the page when the service worker controlling this page has 
       * changed. Eg a new service worker has skipped waiting and become a new
       * service worker.
       */
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    })
    // handle the error if service worker registration fails
    .catch((err) => {
      console.log(`Service Worker registration failed ${err}`)
    })
}

/**
 * @param {*} worker service worker
 * It tracks the state of worker that is installing. if worker  is installed then it will inform
 * user about the update.
 */
ServiceWorkerController.prototype._trackInstalling = function _trackInstalling (worker) {
  let ServiceWorkerController = this
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed') {
      ServiceWorkerController._updateReady(worker)
    }
  })
}

/**
 * @param {*} worker service worker
 * It inform the user about new update of service worker.
 */
ServiceWorkerController.prototype._updateReady = function _updateReady (worker) {
  // confirm the user that he want to update the page or not.
  userChoice = confirm('New version available. Do you want to update?')
  if (!userChoice) return
  // if want to update. This send a message to service worker to skip waiting and bring new changes
  worker.postMessage('SWupdate')
}
