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
    markers_pop1=data.Global_Cases[0]
    markers_pop2=data.Global_Deaths[0]
  
  // Creating the loop to attach deaths and cases
    for ( i = 0 ; i < markers_config.length ; i ++) {
    
      for (c = 0 ; c < markers_pop1.length ; c ++) {
        if (markers_config[i][0] ==  markers_pop1[c][0]) {
          var cases = markers_pop1[c][2]}}
         

      for (d = 0 ; d < markers_pop2.length ; d ++) {
          if (markers_config[i][0] == markers_pop2[d][0]) {
            var deaths = markers_pop2[d][2]}}
            

    L.circle([markers_config[i][1],markers_config[i][2]],{radius: cases*0.05})
    .bindPopup("<h3>" + markers_config[i][0] + `</h3><hr><p> Cases : ${cases.toLocaleString()} </p><p> Deaths : ${deaths.toLocaleString()}</p>`)
  
    .addTo(myMap)
    }


  });


  d3.json("/api/main/globalcovid").then (function(globalcovid) {

    var total_global_cases = globalcovid.Total_Global_Cases
    document.getElementById("totalGlobalCases").innerText = total_global_cases.toLocaleString()
  
    var total_global_deaths = globalcovid.Total_Global_Deaths
    document.getElementById("totalGlobalDeaths").innerText = total_global_deaths.toLocaleString()
  
  
  
  });
  