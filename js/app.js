(function () {

  // initialize the map centered on northern camera array
  var map = L.map('map', {
    zoomSnap: .1,
    center: [38.004, -122.665],
    zoom: 13.4,
    minZoom: 11,
    maxZoom: 14,
    //maxBounds: L.latLngBounds([-122.75, 38.05], [-122.60, 37.97])
  });

  // mapbox API access Token
  var accessToken = 'pk.eyJ1IjoiemFjc3RhbmxleSIsImEiOiJCS20zaVR3In0._oaGhAVLz04gbE3M2HKHGA'

  // request a mapbox raster tile layer and add to map
  L.tileLayer(`https://api.mapbox.com/styles/v1/zacstanley/ckbclel26038a1ilref7j1vfs/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: accessToken
  }).addTo(map);


  // make global
  let species = 'all'



  omnivore.csv('Data/DetectionRates_BCGF_V7.csv')
    .on('ready', function (e) {
      // access geoJson here
      drawMap(e.target.toGeoJSON());
      drawLegend(e.target.toGeoJSON());
      // console.log(e.target.toGeoJSON()) 
      // console.log(e.target)
      // all data loaded into the layer
    })
    .on('error', function (e) {
      // if the error can't be parsed or loaded over AJAX
      //  console.log(e.error[0].message);
    })

  function drawMap(data) {
    // console.log(data)
    const options = {
      pointToLayer: function (feature, ll) {
        // Letters instead of numbers
        return L.circleMarker(ll, {

          weight: 2,
          fillOpacity: .3,
          opacity: 1,


        });
      }

    }

    // create 4 separate layers
    const bobcatLayer = L.geoJson(data, options)
    coyoteLayer = L.geoJson(data, options)
    foxLayer = L.geoJson(data, options)
    interactiveLayer = L.geoJson(data, options).addTo(map);


    // fit the bounds to one of the layers
    map.fitBounds(interactiveLayer.getBounds());


    interactiveLayer.setStyle({
      weight: 2,
      color: '#222'


    });

    // adjust zoom level
    map.setZoom(map.getZoom() - .4);

    // set initial circle size in map
    resizeCircles(interactiveLayer, 9, species)

    // call sequenceUI function
    sequenceUI(interactiveLayer)
    dropDownUI(interactiveLayer)


  } // end drawMap

  function calcRadius(val) {
    const radius = Math.sqrt(val / Math.PI);
    return radius * 10; // adjust scale factor
  }
  // resize circles based on detection rates using radius scaling
  function resizeCircles(interactiveLayer, monthYear, species) {

    if (species == "all") {
      interactiveLayer.eachLayer(function (layer) {

        layer.setStyle({
          color: '#173560'

        })

        const props = layer.feature.properties
        const relativeDetRate = Number(props['b' + monthYear]) + Number(props['c' + monthYear]) + Number(props['f' + monthYear])
        const radius = calcRadius(relativeDetRate);
        if (radius == 0) {
          layer.setStyle({
            color: '#555',
            radius: 0.5
          })
        } else {
          layer.setRadius(radius);
        }

      });
    } else {

      interactiveLayer.eachLayer(function (layer) {

        const props = layer.feature.properties
        const relativeDetRate = Number(props[species + monthYear])
        const radius = calcRadius(relativeDetRate);
        const color = function (species) {
          if (species == 'b') {
            return '#BB952F'
          } else if (species == 'c') {
            return '#A21E36';
          } else if (species == 'f') {
            return '#3A4B56';
          } else {
            return '#333'
          }
        }

        // console.log(color(species), species)
        if (radius == 0) {
          layer.setStyle({
            color: '#555',
            radius: 0.5
          })
        } else {
          layer.setRadius(radius)
          layer.setStyle({
            color: color(species)
          })

        }

      });

    }
    retrieveInfo(interactiveLayer, monthYear)
  }

  function dropDownUI(interactiveLayer) {

    // add species filter
    var speciesControl = L.control({
      position: 'topright'
    });

    speciesControl.onAdd = function (map) {
      var dropDownSpecies = L.DomUtil.get("species-dropdown-ui")

      L.DomEvent.disableScrollPropagation(dropDownSpecies);
      L.DomEvent.disableClickPropagation(dropDownSpecies);

      return dropDownSpecies
    }


    speciesControl.addTo(map)

    // select slider input and listen for change
    $('#species-dropdown-ui select')
      .on('change', function () {

        // current value of slider is the month and year level
        species = this.value;
        //console.log(species)
        resizeCircles(interactiveLayer, 9, species)
        $('#current-month').css('display', 'inherit')
        $('#slider').css('display', 'inherit')
      });

  }

  // select the current month and year 
  const month = $('#current-month span');

  function sequenceUI(interactiveLayer) {

    // do the same thing for the UI slider
    const sliderControl = L.control({
      position: 'bottomleft'
    });

    sliderControl.onAdd = function (map) {

      const controls = L.DomUtil.get("slider");

      L.DomEvent.disableScrollPropagation(controls);
      L.DomEvent.disableClickPropagation(controls);

      return controls;

    }
    // add it to the map
    sliderControl.addTo(map);

    // create Leaflet control for the current month and year
    const monthYear = L.control({
      position: 'bottomleft'
    });

    // same as above
    monthYear.onAdd = function (map) {

      const month = L.DomUtil.get("current-month");

      L.DomEvent.disableScrollPropagation(month);
      L.DomEvent.disableClickPropagation(month);

      return month;

    }

    monthYear.addTo(map);

    // select slider input and listen for change
    $('#slider input[type=range]')
      .on('input', function () {

        // current value of slider is current month and year 
        var monthYear = this.value;

        month.html(mY[monthYear])

        // resize the circles with updated rate of detection
        // console.log(species)
        resizeCircles(interactiveLayer, monthYear, species);
      });

  }

  // draw legend function
  function drawLegend(data) {

    // create leaflet control for legend
    var legendControl = L.control({
      position: 'bottomright'
    });

    // when the legend control is added to the map
    legendControl.onAdd = function (map) {

      // empty array to hold values
      const dataValues = [];

      // loop through all camera detections
      data.features.forEach(function (camera) {
        // for each month in with a detection
        for (let month in camera.properties) {
          // shorthand to each value
          const value = camera.properties[month];
          // if the value can be converted to a number 
          // the + operator in front of a number returns a number
          if (+value) {
            //return the value to the array
            dataValues.push(+value);
          }

        }
      })

      // sort our array
      const sortedValues = dataValues.sort(function (a, b) {

        return b - a;
      });
      // console.log(sortedValues)


      // round the highest number and use as our large circle diameter
      const maxValue = Math.round(sortedValues[0] / 2) * 2;
      // console.log(maxValue)

      // calc the diameters
      const largeDiameter = calcRadius(maxValue) * 2,
        smallDiameter = largeDiameter / 2;

      // select our circles container and set the height
      $(".legend-circles").css('height', largeDiameter.toFixed());

      // set the width and height for large circle
      $(".legend-large").css({
        'width': largeDiameter.toFixed(),
        'height': largeDiameter.toFixed()
      });
      // set width and height for small circle position
      $(".legend-small").css({
        'width': smallDiameter.toFixed(),
        'height': smallDiameter.toFixed(),
        'top': largeDiameter - smallDiameter,
        'left': smallDiameter / 2
      })

      // label the max and median value
      $(".legend-large-label").html(maxValue.toLocaleString());
      $(".legend-small-label").html((maxValue / 2).toLocaleString());

      // adjust the position of the large circle label based on size of circle
      $(".legend-large-label").css({
        'top': - 11,
        'left': largeDiameter + 50
      });

      // adjust the position of the small circle label based on size of circle
      $(".legend-small-label").css({
        'top': smallDiameter - 11,
        'left': largeDiameter + 50
      });

      // insert two hr elements and use to connect value label to top of each circle
      $("<hr class='large'>").insertBefore(".legend-large-label").css('top', - 5)
      $("<hr class='small'>").insertBefore(".legend-small-label").css('top', largeDiameter - smallDiameter - 5);

      // verify your results!
      //console.log(dataValues);

      // select legend using id attribute of legend
      var legend = L.DomUtil.get("legend");

      // disable scroll and click functionnality
      L.DomEvent.disableScrollPropagation(legend);
      L.DomEvent.disableClickPropagation(legend);

      // return the selection
      return legend;

    }

    legendControl.addTo(map);

  }

  function retrieveInfo(interactiveLayer, monthYear) {

    // select the element and reference with variable
    // and hide it from view initially
    const info = $('#info').hide();

    // use bobcatLayer to detect mouseover events
    interactiveLayer.on('mouseover', function (e) {

      // remove the none class to display and show
      info.show();

      // access properties of target layer
      const props = e.layer.feature.properties;

      // populate HTML elements with relevant info
      $('#info span').html(`<b>${props.Camera}</b>`);
      $(".bobcat span:first-child").html('');
      $(".coyote span:first-child").html('');
      $(".greyfox span:first-child").html('');

      $(".bobcat span:last-child").html(Number(props['b' + monthYear]).toLocaleString());
      $(".coyote span:last-child").html(Number(props['c' + monthYear]).toLocaleString());
      $(".greyfox span:last-child").html(Number(props['f' + monthYear]).toLocaleString());

      // raise opacity level as visual affordance
      e.layer.setStyle({
        fillOpacity: .6
      });

      // empty arrays for boys and girls values
      const bobcatValues = [],
        coyoteValues = [],
        foxValues = []

      // loop through the grade levels and push values into those arrays
      for (let i = 9; i <= 45; i++) {
        bobcatValues.push(props['b' + i]);
        coyoteValues.push(props['c' + i]);
        foxValues.push(props['f' + i]);
      }

      // add bobcat sparklines with options
      $('.bobcatspark').sparkline(bobcatValues, {
        width: '155px',
        height: '30px',
        lineColor: '#BB952F',
        fillColor: '#BB952F',
        spotRadius: 0,
        lineWidth: 2
      });

      // add coyote sparklines with options
      $('.coyotespark').sparkline(coyoteValues, {
        width: '155px',
        height: '30px',
        lineColor: '#A21E36',
        fillColor: '#A21E36',
        spotRadius: 0,
        lineWidth: 2
      })

      // add coyote sparklines with options
      $('.foxspark').sparkline(foxValues, {
        width: '155px',
        height: '30px',
        lineColor: '#3A4B56',
        fillColor: '#3A4B56',
        spotRadius: 0,
        lineWidth: 2
      })

      // hide the info panel when mousing off layergroup and remove affordance opacity
      interactiveLayer.on('mouseout', function (e) {

        // hide the info panel
        info.hide();

        // reset the layer style
        e.layer.setStyle({
          fillOpacity: .3
        });
      });

    });

    // when the mouse moves on the document
    $(document).mousemove(function (e) {
      // first offset from the mouse position of the info window
      info.css({
        "left": e.pageX + 6,
        "top": e.pageY - info.height() - 25
      });

      // if it crashes into the top, flip it lower right
      if (info.offset().top < 4) {
        info.css({
          "top": e.pageY + 15
        });
      }
      // if it crashes into the right, flip it to the left
      if (info.offset().left + info.width() >= $(document).width() - 40) {
        info.css({
          "left": e.pageX - info.width() - 80
        });
      }
    });

  }



})();