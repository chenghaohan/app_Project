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

    markers_config=data.World_Coordinates[0]
    console.log(markers_config)

    for ( i = 0 ; i < markers_config.length ; i ++) {
      //console.log(data.World_Coordinates[0][i][1])
    L.marker([markers_config[i][1],markers_config[i][2]])
    .bindPopup(markers_config[i][0])
    .addTo(myMap)
    }

    console.log(data.GlobalDeaths);
    
    worldDeath = data.Global_Deaths;
    worldCases = data.Global_Cases;
    worldLatLong = data.World_Coordinates[0];
    
    // Create a new choropleth layer
    var output = []
    //coordinates countryname cases deaths 

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    worldLatLong.forEach(function(countrySet) {

      var countryName = countrySet[0]
      var coordinates = [countrySet[1], countrySet[2]]

      worldCases.forEach(function(countryCase) {
        if (countryName == countryCase[0]) {
          var cases = countryCase[2]
        }
      });

      worldDeath.forEach(function(countrydeath) {
        if (countryName == countrydeath[0]) {
          var deaths = countrydeath[2]
        }
      });
      
      markers.addlayer(L.Marker(coormarkers_config).bindPopup(countryName, cases, deaths))
    });

  // Add our marker cluster layer to the map
      myMap.addLayer(markers);
  
  });