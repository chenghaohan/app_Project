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

// Event handling on mouseover and mouseout

    function mouseOverActions(e) {
      var layer = e.target;
      // change region style when hover over
      layer.setStyle({
          color: color, 
          dashArray: '',
          weight: 2,
          opacity: 1, 
          fillOpacity: 1
      });
      layer.openPopup();
    }

    function mouseOutActions(e) {
      var layer = e.target;
      // change region style when hover out - back to default
      layer.setStyle({
        fillcolor: color, 
        color: color,
        opacity:1,
        fillOpacity: 0.7
      });
      
    }

    layer.on({
        mouseover: mouseOverActions,
        mouseout: mouseOutActions
        }).addTo(canMap);      
    

    //Set color of province layers based on number of cases
    var color = "";
    if (prov_data[allowed].cases < 50000) {
      color = "#fdb674";
    }
    else if (prov_data[allowed].cases < 100000) {
      color = "#bad5a9";
    }
    else if (prov_data[allowed].cases < 150000) {
      color = "#84cbbb";
    }
    else if (prov_data[allowed].cases < 200000) {
      color = "#48b7c1";
    }
    else if (prov_data[allowed].cases < 250000) {
      color = "#3382b5";
    }
    else {
      color = "#253c90";
    }
    
    layer.setStyle({
      fillcolor: color, 
      color: color,
      opacity:1,
      fillOpacity: 0.7
    });
    layer.bindPopup("<h3>" + feature.properties.PRENAME + `</h3><hr><p> Cases : ${prov_data[allowed].cases.toLocaleString()} </p><p> Deaths : ${prov_data[allowed].deaths.toLocaleString()}</p><p> Vaccines Administered : ${prov_data[allowed].vaccines.toLocaleString()}</p>`);
    }
    
}

//GeoJson data for coordinates outlining Provinces

d3.json("/api/main/canmap").then(function(dataset) {

  var provinces = L.geoJSON(dataset, {
    onEachFeature: onEachFeature, 

  }).addTo(canMap)    
});

// color function to be used when creating the legend
function getColor(d) {
  return d > 250000? '#253c90' :
         d > 200000 ? '#3382b5' :
         d > 150000 ? '#48b7c1' :
         d > 100000  ? '#84cbbb' :
         d > 50000  ? '#bad5a9' :
                  '#fdb674';
}

// Add legend to the map
var legend = L.control({ position: "bottomright" });
  
legend.onAdd = function (canMap) {
  
      var div = L.DomUtil.create("div", "info legend");
          mags = [0, 50000, 100000, 150000, 200000, 250000];
          labels = [`<strong><h5>Case Count</h5></strong>`];
  
      // loop through intervals and generate a label with a colored square for each interval
      for (var i = 0; i < mags.length; i++) {
          div.innerHTML +=
          labels.push(
              '<i style="background:' + getColor(mags[i] + 1) + '"></i> ' +
              mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+'));
      }
        div.innerHTML = labels.join('<br>');
      return div;
};
  
legend.addTo(canMap);


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




