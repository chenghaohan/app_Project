// Creating map object
  var canMap = L.map("map", {
      center: [62.24, -96.28],
      zoom: 3.2
    });
  
// Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v9",
    accessToken: API_KEY
  }).addTo(canMap);

// Adding a popup on each province

function onEachFeature(feature, layer) {

    if (feature.properties && feature.properties.PRENAME) {
        layer.bindPopup("<h3>" + feature.properties.PRENAME + "</h3><hr><p> Cases: </p><p> Deaths:</p><p> Vaccines Administered: </p>");
    }
}

//GeoJson data for coordinates outlining Provinces

d3.json("/api/main/canmap").then(function(dataset) {

  L.geoJSON(dataset, {
    onEachFeature: onEachFeature
  }).addTo(canMap)    
});

// App route with total cases, deaths, and vaccines to output into HTML at top of dashboard

d3.json("/api/main/cancovid").then (function(data) {

  
  var total_cases = (data.Total_Cases)
  //console.log(total_cases)
  var total_deaths = (data.Total_Deaths)
  //console.log(total_deaths)


});


  
// Grab provincial covid data (cases, deaths, vaccines) with d3
d3.json("/api/main/provcovid").then (function(data) {

  var province = data.map(d =>d.Province);
  var cases = data.map(d =>d.cases);
  var deaths = data.map(d =>d.deaths);
  var vaccinces = data.map(d =>d.vaccines);

  console.log(province)

});

