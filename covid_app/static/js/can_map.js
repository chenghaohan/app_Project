
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
  
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    console.log(feature, layer)
    if (feature.properties && feature.properties.PRENAME) {
        layer.bindPopup("<h3>" + feature.properties.PRENAME + "</h3><hr><p> Cases: </p><p> Deaths:</p><p> Vaccines Administered: </p>");
    }
}


d3.json("/api/main/canmap").then(function(dataset) {
  //createFeatures(dataset.features);
  console.log(dataset);
  L.geoJSON(dataset, {
    onEachFeature: onEachFeature
  }).addTo(canMap)    
});



  // Create a new choropleth layer

// Load in geojson data
var geoData = "/api/main/cancovid";
  
  // Grab data with d3
d3.json("/api/main/cancovid").then (function(data) {

  console.log(data.Canadian_Cases)

});