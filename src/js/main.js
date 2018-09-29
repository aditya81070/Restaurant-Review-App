let restaurants,
  neighborhoods,
  cuisines
var newMap
var markers = []

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initMap() // added 
  fetchNeighborhoods()
  fetchCuisines()
})

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error)
    } else {
      self.neighborhoods = neighborhoods
      fillNeighborhoodsHTML()
    }
  })
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select')
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option')
    option.innerHTML = neighborhood
    option.value = neighborhood
    select.append(option)
  })
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error)
    } else {
      self.cuisines = cuisines
      fillCuisinesHTML()
    }
  })
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select')

  cuisines.forEach(cuisine => {
    const option = document.createElement('option')
    option.innerHTML = cuisine
    option.value = cuisine
    select.append(option)
  })
}

/**
 * Initialize leaflet map, called from HTML.
 */
initMap = () => {
  self.newMap = L.map('map', {
    center: [40.722216, -73.987501],
    zoom: 12,
    scrollWheelZoom: false
  })
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
    mapboxToken: 'pk.eyJ1IjoiYWRpdHlhODEwNzAiLCJhIjoiY2ptMGJhZmdhMjRsaTNwbDg1bTFxNjh5cCJ9.1f0IbEwkns8Do3ptLiYdbg',
    maxZoom: 18,
    attributionControl: false,
    id: 'mapbox.streets'
  }).addTo(newMap)

  updateRestaurants()
  document.querySelector('.leaflet-control-attribution').remove()
}
/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select')
  const nSelect = document.getElementById('neighborhoods-select')

  const cIndex = cSelect.selectedIndex
  const nIndex = nSelect.selectedIndex

  const cuisine = cSelect[cIndex].value
  const neighborhood = nSelect[nIndex].value

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error)
    } else {
      resetRestaurants(restaurants)
      fillRestaurantsHTML()
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = []
  const ul = document.getElementById('restaurants-list')
  ul.innerHTML = ''

  // Remove all map markers
  if (self.markers) {
    self.markers.forEach(marker => marker.remove())
  }
  self.markers = []
  self.restaurants = restaurants
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const row = document.getElementById('restaurants-list')
  const sampleRow = document.createDocumentFragment('div')
  restaurants.forEach(restaurant => {
    sampleRow.append(createRestaurantHTML(restaurant))
  })
  row.append(sampleRow)
  addMarkersToMap()
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
  const div = document.createElement('div')
  const info = document.createElement('div')
  div.className='col-lg-3 col-md-4 col-sm-6 restaurant mx-1 py-2 my-2'
  info.className = 'px-2 py-2 mt-1'
  const image = document.createElement('img')
  image.className = 'restaurant-img img-fluid img-thumbnail'
  image.src = DBHelper.imageUrlForRestaurant(restaurant)
  image.alt = restaurant.name + ' image'
  div.append(image)

  const name = document.createElement('h1')
  name.innerHTML = restaurant.name
  name.tabIndex = 0
  name.className='restaurant-name'
  info.append(name)

  const neighborhood = document.createElement('p')
  neighborhood.innerHTML = restaurant.neighborhood
  info.append(neighborhood)

  const address = document.createElement('p')
  address.innerHTML ='<strong>Address: </strong>'+ restaurant.address
  info.append(address)

  const more = document.createElement('a')
  more.innerHTML = 'View Details'
  more.className= 'btn view-more'
  more.href = DBHelper.urlForRestaurant(restaurant)
  info.append(more)
  div.append(info)
  return div
}

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.newMap)
    marker.tabindex= -1
    marker.on('click', onClick)
    function onClick () {
      window.location.href = marker.options.url
    }
    self.markers.push(marker)
  })
}
