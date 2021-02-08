// Load in stock data (json)
var stockData = "/api/main/stockdata";

//Show data with d3
d3.json(stockData).then(function(data) {
  console.log(data)
});


d3.json(stockData).then(function(data) {
    var zoomOpen = data.map(d => d.zoom_Open);
    var zoomClose = data.map(d => d.zoom_Close);
    var zoomHigh = data.map(d => d.zoom_High);
    var zoomLow = data.map(d => d.zoom_Low);
    var zoomDate = data.map(d => d.zoom_Date)
    var startDate = "2020-01-02";
    var endDate = "2021-01-29";

    //Closing Price line
    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: "Closing Price",
        x: zoomDate[0],
        y: zoomClose[0],
        line: {
            color: "#17BECF"
            }
        };

  // Candlestick Trace
    var trace2 = {
        type: "candlestick",
        x: zoomDate[0],
        high: zoomHigh[0],
        low: zoomLow[0],
        open: zoomOpen[0],
        close: zoomClose[0]
    };

    var data = [trace1, trace2];

    var layout = {
        title: `closing prices`,
        xaxis: {
        range: [startDate, endDate],
        type: "date"
        },
        yaxis: {
        autorange: true,
        type: "linear"
        }}
    
    Plotly.newPlot("stockPlot", data, layout);
});

// d3.selectAll("#stockPlot").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
    // var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
    // var dataset = dropdownMenu.node().value;

//   var CHART = d3.selectAll("#stockPlot").node();

//   // Initialize x and y arrays
//   var x = [];
//   var y = [];

//   switch(dataset) {
//     case "zoom":
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 4, 8, 16];
//       break;

//     case "slack":
//       x = [10, 20, 30, 40, 50];
//       y = [1, 10, 100, 1000, 10000];
//       break;

//     case "cisco":
//       x = [100, 200, 300, 400, 500];
//       y = [10, 100, 50, 10, 0];
//       break;
    
//     case "shopify":
//       x = [100, 200, 300, 400, 500];
//       y = [10, 100, 50, 10, 0];
//       break;

//     default://put zoom here 
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 3, 4, 5];
//       break;
//   }}




    // var ciscoOpen = data.map(d => d.cisco_Open);
    // var ciscoClose = data.map(d => d.cisco_Close);
    // var ciscoHigh = data.map(d => d.cisco_High);
    // var ciscoLow = data.map(d => d.cisco_Low);
    // var ciscoDate = data.map(d => d.cisco_Date)

    // var slackOpen = data.map(d => d.slack_Open);
    // var slackClose = data.map(d => d.slack_Close);
    // var slackHigh = data.map(d => d.slack_High);
    // var slackLow = data.map(d => d.slack_Low);
    // var slackDate = data.map(d => d.slack_Date)

    // var shopifyOpen = data.map(d => d.shopify_Open);
    // var shopifyClose = data.map(d => d.shopify_Close);
    // var shopifyHigh = data.map(d => d.shopify_High);
    // var shopifyLow = data.map(d => d.shopify_Low);
    // var shopifyDate = data.map(d => d.shopify_Date)

    // var trace2 = {
    //     type: "candlestick",
    //     x: ciscoDate[1],
    //     high: ciscoHigh[1],
    //     low: ciscoLow[1],
    //     open: ciscoOpen[1],
    //     close: ciscoClose[1]
    // };
    // var trace2 = {
    //     type: "candlestick",
    //     x: slackDate[2],
    //     high: slackHigh[2],
    //     low: slackLow[2],
    //     open: slackOpen[2],
    //     close: slackClose[2]
    // };
    // var trace2 = {
    //     type: "candlestick",
    //     x: shopifyDate[3],
    //     high: shopifyHigh[3],
    //     low: shopifyLow[3],
    //     open: shopifyOpen[3],
    //     close: shopifyClose[3]
    // };
