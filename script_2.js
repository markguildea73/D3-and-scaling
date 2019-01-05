    var w = 500;
    var h = 300;
    var barPadding = 1;
    var numberOfBars = 19;
    
    var colWidth = w / numberOfBars;
    var barWidth = colWidth / barPadding;
    
    
    var svg = d3.select("#draw-here")
            .append("svg")
            .attr("height", h)
            .attr("width", w);
    
    
    

    
    

    
    // First call to change_data will plot the initial chart
    change_data();

    // Generates a random set of data and plots it as a bar chart
    // Called once on page load, and then each time the button is clicked
    function change_data() {
        var data = generate_random_data(numberOfBars);
        plot_data(data);
    }
    
        var scale = d3.scale.linear()
                         .domain([0, d3.max(data)])
                         .range([0, h])

    // Generates a random set of data and filters it before plotting it as a bar chart
    // Removes any bars less than the value in the filter input box
    function filter_data() {
        var data = generate_randon_data(numberOfBars);
        data = data.filter(function (d) { return d >= get_filter_value(); });
        plot_data(data);
    }

    function plot_data(data) {
        // Bind the data to the collections of rectangles and text in the SVG element
        var bars = svg.selectAll("rect")
                      .data(data);
        var labels = svg.selectAll("text")
                        .data(data);
        
        // Remove any unneeded rectangles and labels (if new data has more items then the existing chart)
        bars.exit().remove();
        labels.exit().remove();

        // Append any new rectangles and labels that are needed (if new data has more items than existing charts)
        create_bars(bars);
        create_labels(labels);

        // There should be the right number of rectangles and labels.
        // Resize and position each one of the new data items
        resize_bars(bars, data);
        position_labels(labels, data);
    }

    function create_bars(bars) {
        bars.enter()
            .append("rect");
    }

    //The code necessary to resize an already existing rect to the correct size
    function resize_bars(bars, data) {
        bars.transition()
            .duration(500)
            .attr("x", function(d, i) {
                return i * colWidth;
            })
            .attr("y", function(d) {
                return h - d;
            })
            .attr("width", barWidth)
            .attr("height", function(d) {
                return d;
            });
    }

    // Create text labels (these are the properties that don't change when the bar is resized)
    function create_labels(labels) {
        labels.enter()
              .append("text")
              .attr("text-anchor", "middle")
              .attr("font-family", "sans-serif")
              .attr("font-size", "11px")
              .attr("fill", "white");
    }

    // Position the text labels (these are the properties that do change when the bar is resized)
    function position_labels(labels, data) {
        labels.transition()
              .duration(500)
              .text(function(d) {
                  return d;
              })
              .attr("x", function(d, i) {
                  return i * colWidth * barWidth / 2;
              })
              .attr("y", function(d) {
                  return h - d + 14;
              });
    }

    // Return an array on n integers
    function generate_random_data(n) {
        var data = [];

        for (var i=0; i<n; i++) {
            var value = Math.floor ((Math.random() * 500) + 1);
            data.push(value);
        }
        return data;
    }

    function get_filter_value() {
        var value = null;
        var x = document.getElementById("filter_value").value;
        value = parseInt(x, 10);

        if (isNaN(value))
            value=100;
        
        return value;
    }

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * colWidth;
        })
        .attr("y", function(d) {
            return h - d;
        })
        .attr("height", function(d) {
            return d;
        })
        .attr("width", barWidth);

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return i * colWidth + barWidth / 2;
        })
        .attr("y", function(d) {
            return h - d + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");