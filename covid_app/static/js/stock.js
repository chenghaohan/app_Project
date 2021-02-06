// Load in stock data (json)
var stockData = "/api/main/stockdata";

// Show data with d3
d3.json(stockData, function(data) {
  console.log(data)});