// Creating map object
var myMap = L.map("global_map", {
    center: [40.52, 34.34],
    zoom: 1.8
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v9",
    accessToken: API_KEY
  }).addTo(myMap);

  // Adding Covid 19 Casses and deaths data 
var covid_data = "/api/main/globalcovid";
  
  // Grab data with d3
  d3.json(covid_data).then(function(data){
    console.log(data.Global_Deaths);
    console.log(data.Global_Cases);
    console.log(data.World_Coordinates);
    // Create a new choropleth layer
    
    //coordinates countryname cases deaths 

    var output = []
    var country = output.push(L.Marker(coordinates).bindPopup(countryname, cases, deaths))
    var countries = L.layerGroup(output)
  
  });