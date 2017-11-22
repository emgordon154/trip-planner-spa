const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoiaGt3d2ViZXIiLCJhIjoiY2phOXRuaHRmMGJycDJ3cXR5bG43ZnJ3OCJ9.9neIakt1D1GK-lPDN6sh5Q";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

var places = {}

fetch('/api')
  .then(result => result.json())
  .then(result => {
    [hotels, activities, restaurants] = result
    places = {hotels, activities, restaurants}
    // console.log(data)
    hotels.forEach(hotel => {
      let hotelEl = document.createElement('option')
      hotelEl.textContent = hotel.name
      document.getElementById('hotels-choices').append(hotelEl);
    })
    activities.forEach(activity => {
      let activityEl = document.createElement('option')
      activityEl.textContent = activity.name
      document.getElementById('activities-choices').append(activityEl);
    })
    restaurants.forEach(restaurant => {
      let restaurantEl = document.createElement('option')
      restaurantEl.textContent = restaurant.name
      document.getElementById('restaurants-choices').append(restaurantEl);
    })

  })
  .catch(console.error)

Array.from(document.getElementsByClassName('options-btn')).forEach(button =>
  button.addEventListener('click', event => {
    let newLi= document.createElement('li')
    newLi.classList.add('itinerary-li')

    let typeOfPlace = button.id.split('-')[0]
    let whichItineraryPart = document.getElementById(typeOfPlace + '-list')
    let selectElement = document.getElementById(typeOfPlace + '-choices')
    let placeName = selectElement.value
    let newItineraryItem = document.createElement('h4')
    newItineraryItem.classList.add('itinerary-place')
    newItineraryItem.textContent = placeName
    newLi.append(newItineraryItem)


    let newButton = document.createElement('button')
    newButton.classList.add('remove-btn')
    newButton.id = 'remove-' + placeName
    newButton.textContent = 'x'
    newButton.onclick = () => {
      newLi.remove()
    }
    newLi.append(newButton)

    whichItineraryPart.append(newLi)

   
    let place = places[typeOfPlace].find(place => place.name == placeName)
    let newMarker = buildMarker(typeOfPlace, place.place.location) // forgive us Tom and Kate
    newMarker.addTo(map)
  })
)