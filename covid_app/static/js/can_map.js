// Read in provincial data on cases, deaths, vaccines

d3.json("/api/main/provcovid").then (function(data) {
  

// Creating map object
  var canMap = L.map("map", {
      center: [62.24, -96.28],
      zoom: 3.4
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

// Adding a popup on each province with cases, deaths, vaccines

function onEachFeature(feature, layer) {


    if (feature.properties && feature.properties.PRENAME) {
      const allowed = feature.properties.PRENAME;

     prov_data= Object.keys(data)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});

        

      layer.bindPopup("<h3>" + feature.properties.PRENAME + `</h3><hr><p> Cases : ${prov_data[allowed].cases.toLocaleString()} </p><p> Deaths : ${prov_data[allowed].deaths.toLocaleString()}</p><p> Vaccines Administered : ${prov_data[allowed].vaccines.toLocaleString()}</p>`);
      }
}


//GeoJson data for coordinates outlining Provinces

d3.json("/api/main/canmap").then(function(dataset) {

  L.geoJSON(dataset, {
    onEachFeature: onEachFeature, 
    color: "blue", 
    opacity: 0.25
  }).addTo(canMap)    
});

})

// App route with total cases, deaths, and vaccines to output into HTML at top of dashboard

d3.json("/api/main/cancovid").then (function(cancovid) {

  var total_cases = cancovid.Total_Cases
  document.getElementById("totalCases").innerText = total_cases.toLocaleString()

  var total_deaths = cancovid.Total_Deaths
  document.getElementById("totalDeaths").innerText = total_deaths.toLocaleString()

  var total_vaccine = cancovid.Total_Vaccine
  document.getElementById("totalVaccine").innerText = total_vaccine.toLocaleString()


});



