// function get_province_data () {  
//   // Grab provincial covid data (cases, deaths, vaccines) with d3
//   d3.json("/api/main/provcovid").then (function(data) {
  
//     //console.log(data)
//     console.log(data['Ontario'])
  
//     var province = JSON.stringify(data.map(d =>d.Province));
//     var cases = parseInt(data.map(d =>d.cases));
//     var deaths = parseInt(data.map(d =>d.deaths));
//     var vaccinces = parseInt(data.map(d =>d.vaccines));
//     var coordinates = data.map(d =>d.coordinates);
  
//     // console.log(province)
//     // console.log(cases)
//     // console.log(deaths)
//     // console.log(coordinates)
//     //console.log(vaccinces)
  
//     for (var i = 0; i < data.length; i++) {
  
//       // L.circle(data[i].coordinates, {
//       //   radius: 1000
//       // }).addTo(canMap);
  
//     //console.log(JSON.stringify(province))
    
//   }
  
//   })
//   };


d3.json("/api/main/provcovid").then (function(data) {
  console.log(data)




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

// Adding a popup on each province

function onEachFeature(feature, layer) {


    if (feature.properties && feature.properties.PRENAME) {
      const allowed = feature.properties.PRENAME;

     prov_data= Object.keys(data)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});

        console.log(prov_data)

      layer.bindPopup("<h3>" + feature.properties.PRENAME + `</h3><hr><p> Cases : ${prov_data[allowed].cases} </p><p> Deaths : ${prov_data[allowed].deaths}</p><p> Vaccines Administered : ${prov_data[allowed].vaccines}</p>`);
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
  // console.log(total_cases)

  var total_deaths = cancovid.Total_Deaths
  document.getElementById("totalDeaths").innerText = total_deaths.toLocaleString()
  // console.log(total_deaths)

  var total_vaccine = cancovid.Total_Vaccine
  document.getElementById("totalVaccine").innerText = total_vaccine.toLocaleString()

  // console.log(total_vaccine)
  
  // console.log(cancovid.Canadian_Cases)

});



