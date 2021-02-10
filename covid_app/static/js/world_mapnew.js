 var myMap = L.map("global_map", {
        center: [40.7, -73.95],
        zoom: 2
      });
      
      // Adding tile layer to the map
      L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      }).addTo(myMap);


        // Adding Covid 19 Casses and deaths data 
  var covid_data = "/api/main/globalcovid";
  
  // Grab data with d3
  d3.json(covid_data).then(function(data){

    // console.log(data.World_Coordinates[0][0][0])
    // console.log(data.World_Coordinates[0][0][1])
    // console.log(data.World_Coordinates[0][0][2])
    console.log(data)
    var markers = L.marker();

    for ( i = 0 ; i < data.length ; i ++) {

    L.marker(data.World_Coordinates[0][i][1],data.World_Coordinates[0][i][2])
    .bindPopup(data.World_Coordinates[0][i][0])
    .addTo(myMap)
    }
  })
  

  // // Add our marker cluster layer to the map
  //     myMap.addLayer(markers);
  //   })







