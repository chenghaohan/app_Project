// Load in stock data (json)
var stockData = "/api/main/stockdata";

function init() {
    d3.json(stockData).then(function(data) {
        var zoomOpen = data.map(d => d.zoom_Open);
        var zoomClose = data.map(d => d.zoom_Close);
        var zoomHigh = data.map(d => d.zoom_High);
        var zoomLow = data.map(d => d.zoom_Low);
        var zoomDate = data.map(d => d.zoom_Date)
        const startDate = "2020-01-02";
        const endDate = "2021-01-29";

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


        var plot_data = [trace1, trace2];

        var plot_layout = {
            title: `Zoom Performance`,
            xaxis: {
            range: [startDate, endDate],
            type: "date",
            rangeselector: {
                x: 0,
                y: 1.2,
                xanchor: 'left',
                font: {size:8},
                buttons: [{
                step: 'month',
                stepmode: 'backward',
                count: 1,
                label: '1 month'
                }, {
                step: 'month',
                stepmode: 'backward',
                count: 6,
                label: '6 months'
                    }, {
            step: 'all',
            label: 'All dates'
                    }]
            }
            },
            yaxis: {
            autorange: true,
            type: "linear"
            }}
        
        
        

        var graphdiv = document.getElementById("stockPlot");

        Plotly.newPlot(graphdiv, plot_data, plot_layout, {scrollZoom: true})
    });
};

// ------------------------------------------------------------------------------
d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {
    d3.json(stockData).then( function (data) {

        var dropdownMenu = d3.select("#selDataset");

        var dataset = dropdownMenu.node().value;

        var date = [];
        var high = [];
        var low = [];
        var open = [];
        var close = [];
        const startDate = "2020-01-02";
        const endDate = "2021-01-29";
        var stockname = String(dataset).toUpperCase();

    switch(dataset) {
        case "zoom":
            date = data.map(d => d.zoom_Date)[0]
            high = data.map(d => d.zoom_High)[0];
            low = data.map(d => d.zoom_Low)[0];
            open = data.map(d => d.zoom_Open)[0];
            close = data.map(d => d.zoom_Close)[0];
        break;

        case "slack":
            date = data.map(d => d.slack_Date)[2];
            high = data.map(d => d.slack_High)[2];
            low = data.map(d => d.slack_Low)[2];
            open = data.map(d => d.slack_Open)[2];
            close = data.map(d => d.slack_Close)[2];
        break;

        case "cisco":
            date = data.map(d => d.cisco_Date)[1];
            high = data.map(d => d.cisco_High)[1];
            low = data.map(d => d.cisco_Low)[1];
            open = data.map(d => d.cisco_Open)[1];
            close = data.map(d => d.cisco_Close)[1];
        break;
        
        case "shopify":
            date = data.map(d => d.shopify_Date)[3];
            high = data.map(d => d.shopify_High)[3];
            low = data.map(d => d.shopify_Low)[3];
            open = data.map(d => d.shopify_Open)[3];
            close = data.map(d => d.shopify_Close)[3];
        break;
    };

    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: "Closing Price",
        x: date,
        y: close,
        line: {
            color: "#17BECF"
            }
        };

    var trace2 = {
        type: "candlestick",
        x: date,
        high: high,
        low: low,
        open: open,
        close: close
        };
    
    var plot_layout = {
            title: `${stockname} Performance`,
            xaxis: {
            range: [startDate, endDate],
            type: "date",
            rangeselector: {
                x: 0,
                y: 1.2,
                xanchor: 'left',
                font: {size:8},
                buttons: [{
                step: 'month',
                stepmode: 'backward',
                count: 1,
                label: '1 month'
                }, {
                step: 'month',
                stepmode: 'backward',
                count: 6,
                label: '6 months'
                    }, {
            step: 'all',
            label: 'All dates'
                    }]
            }
            },
            yaxis: {
                autorange: true,
                type: "linear"
                }
        }

    var graphdiv = document.getElementById("stockPlot");

    Plotly.restyle(graphdiv, "x", [date]);
    Plotly.restyle(graphdiv, "high", [high]);
    Plotly.restyle(graphdiv, "low", [low]);
    Plotly.restyle(graphdiv, "open", [open]);
    Plotly.restyle(graphdiv, "close", [close]);
    Plotly.restyle(graphdiv, "y", [close]);
    Plotly.relayout(graphdiv, plot_layout)
})
};

init();

//---------------------------------------------------------------------------------

// var newsData = "/api/main/news";

// var button = d3.select("#filter-btn")
// // Select the form
// var form = d3.select("form");
// // Select the table body
// var tableBody = d3.select("tbody")
// // Create event handles
// button.on("click", runEnter);
// form.on("submit", runEnter);
// // Complete the event handler for the form
// function runEnter() {
//     // Prevent the page from refreshing
//     d3.event.preventDefault();
//     // Select the input element 
//     var inputDate = d3.select("#inputDate");
//     // Get the value property of the input element
//     var inputValue = inputDate.property("value");
//     // Filter data based on input date
//     var filteredData = newsData.filter(data => data.news_Date === inputValue);
//     // Clear table body of previous filter
//     tableBody.html(" ");
//     //Loop through filtered data and add to table data
//     filteredData.forEach(function(item) {
//         var row = tableBody.append("tr");
//         Object.entries(item).forEach(function([key, value]){
//             var cell = row.append("td");
//             cell.text(value);
//         });
//     });
// };