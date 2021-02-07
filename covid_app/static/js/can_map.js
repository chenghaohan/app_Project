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
  

console.log("PROCESS STARTED")
function provinces(){

    d3.json("/api/main/canmap").then(function(canGeoJSON) {
        console.log(canGeoJSON);
        L.geoJson(canGeoJSON).addTo(canMap);
});
}

provinces()
  // Create a new choropleth layer
console.log("PROCESS ENDED")
  // Load in geojson data
  var geoData = "/api/main/cancovid";

  
  //d3.json("canada_provinces.geoJSON", data => console.log(data));
  
  // Grab data with d3
  d3.json(geoData, function(data) {



    geojson = L.choropleth(data, {
  
    // Define what  property in the features to use
    valueProperty: "Canadian_Cases",
  
    // Set color scale
    scale: ["#ffffb2", "#b10026"],
  
    // Number of breaks in step range
    steps: 10,
  
    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
    // Border color
    color: "#fff",
    weight: 1,
    fillOpacity: 0.8
       },
  
    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
         layer.bindPopup("Cases: " + feature.Canadian_Cases);
       }
    }).addTo(canMap);
  
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];
  
    // Add min & max
    var legendInfo = "<h1>Canadian Cases</h1>" +
    "<div class=\"labels\">" +
    "<div class=\"min\">" + limits[0] + "</div>" +
    "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
     "</div>";
  
    div.innerHTML = legendInfo;
  
    limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });
  
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
    };
  
    // // Adding legend to the map
    legend.addTo(canMap);
  
  });
  
  