// Load in stock data (json)
var canCases = "/api/main/cancovid";

//Show data with d3
d3.json(canCases).then(function(data) {
  console.log(data)
});


d3.json(canCases).then(function(data) {
//var zoomOpen = data.map(d => d.zoom_Open);
var startDate = "2020-01-02";
var endDate = "2021-01-31";

    //Trend Line
    var trace = {
        type: "line",
        mode: "lines",
        name: "Canadian Cases",
        //x: Provinces,
        //y: Date ,
        line: {
            color: "#17BECF"
            }
        };
    var data = [trace];

    // var layout = {
    //     title: `Canadian Cases`,
    //     xaxis: {
    //     range: [Provinces],
    //     type: "string"
    //     },
    //     yaxis: {
    //     range: [startDate, endDate]
    //     type: "linear"
    //     }}
    
Plotly.newPlot("canCases", data, layout);
});