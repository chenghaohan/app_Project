// Load in stock data (json)
var stockData = "/api/main/stockdata";

// Show data with d3
d3.json(stockData, function(data) {
  console.log(data)});



function buildPlot(stock) {

  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: name,
    x: dates,
    y: closingPrices,
    line: {
      color: "#17BECF"
    }
  };

  // Candlestick Trace
  var trace2 = {
    type: "candlestick",
    x: dates,
    high: highPrices,
    low: lowPrices,
    open: openingPrices,
    close: closingPrices
  };

  var data = [trace1, trace2];

  var layout = {
    title: `${stock} closing prices`,
    xaxis: {
      range: [startDate, endDate],
      type: "date"
    },
    yaxis: {
      autorange: true,
      type: "linear"
    }
  };

  Plotly.newPlot("plot", data, layout);

}





























// // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("body").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.node().value;

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