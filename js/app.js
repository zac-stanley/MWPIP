(function(){

 // initialize the map centered on northern camera array
 var map = L.map('map', {
  zoomSnap: .1, 
  center: [38.004, -122.665],
  zoom: 13, 
  minZoom: 11,
  maxZoom: 14,
  // maxBounds: L.latLngBounds([-6.22, 27.72], [5.76, 47.83])
});

// mapbox API access Token
var accessToken = 'pk.eyJ1IjoiemFjc3RhbmxleSIsImEiOiJCS20zaVR3In0._oaGhAVLz04gbE3M2HKHGA'

// request a mapbox raster tile layer and add to map
L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${accessToken}`, {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.light',
  accessToken: accessToken
}).addTo(map);

omnivore.csv('Data/DetectionRates_BCGF.csv')
.on('ready', function(e){
//  console.log(e.target)
// all data loaded into the layer
})
.on('error', function(e){
// if the error can't be parsed or loaded over AJAX
  console.log(e.error[0].message);
})
.addTo(map);

// create leaflet control for legend
var legendControl = L.control({
        position: 'bottomright'
});

// when the legend control is added to the map
legendControl.onAdd = function(map) {

  // select legend using id attribute of legend
  var legend = L.DomUtil.get("legend");

  // disable scroll and click functionnality
  L.DomEvent.disableScrollPropagation(legend);
  L.DomEvent.disableClickPropagation(legend);

  // return the selection
  return legend;

}

legendControl.addTo(map);

// do the same thing for the UI slider
var sliderControl = L.control({
    position: 'bottomleft'
});

sliderControl.onAdd = function(map) {

  var controls = L.DomUtil.get("slider");

  L.DomEvent.disableScrollPropagation(controls);
  L.DomEvent.disableClickPropagation(controls);

  return controls;

}

sliderControl.addTo(map);

// do the same thing for the UI slider
var yearControl = L.control({
position: 'topright'
});

yearControl.onAdd = function(map) {

var dropDownYear = L.DomUtil.get("year-dropdown-ui");

L.DomEvent.disableScrollPropagation(dropDownYear);
L.DomEvent.disableClickPropagation(dropDownYear);

return dropDownYear;

}

yearControl.addTo(map);

// do the same thing for the UI slider
var cameraControl = L.control({
  position: 'topright'
});

cameraControl.onAdd = function(map) {

var dropDownCamera = L.DomUtil.get("camera-dropdown-ui");

L.DomEvent.disableScrollPropagation(dropDownCamera);
L.DomEvent.disableClickPropagation(dropDownCamera);

return dropDownCamera;

}

cameraControl.addTo(map);

})();