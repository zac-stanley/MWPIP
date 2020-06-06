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
// access geoJson here
  drawMap(e.target.toGeoJSON());
// console.log(e.target.toGeoJSON()) 
// console.log(e.target)
// all data loaded into the layer
})
.on('error', function(e){
// if the error can't be parsed or loaded over AJAX
  console.log(e.error[0].message);
})

function drawMap(data) {
 // console.log(data)
 const options = {
  pointToLayer: function (feature, ll) {
    // Letters instead of numbers
    return L.circleMarker(ll, {
      opacity: 1,
      weight: 2,
      fillOpacity: 0
    });
  }

}

 // create 3 separate layers
  const bobcatLayer = L.geoJson(data, options).addTo(map),
    coyoteLayer = L.geoJson(data, options).addTo(map),
    foxLayer = L.geoJson(data, options).addTo(map);

  // fit the bounds to one of the layers
  map.fitBounds(foxLayer.getBounds());

  // set layer colors
  bobcatLayer.setStyle({
        color: '#BB952F'
  });

  coyoteLayer.setStyle({
    color: '#A21E36'
  });

  foxLayer.setStyle({
    color: '#3A4B56'
  });

  // adjust zoom level
  map.setZoom(map.getZoom() - .4);

} // end drawMap

function calcRadius(val) {
  const radius = Math.sqrt(val / Math.PI);
  return radius * .5; // adjust scale factor
}



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