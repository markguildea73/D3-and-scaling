    var w = 500;
    var h = 500;
    var barPadding = 1;
    var dataset = [
        450, 100, 100, 279, 500, 25, 350, 120, 80, 130,
        110, 102, 375, 200, 175, 168, 180, 230, 205,600, 
    ];
     //scales important
     
     var scale = d3.scale.linear()
                .domain([0, 600 ])
                .range([0, 500 ])
     
    var colWidth = w / dataset.length;
    var barWidth = colWidth - barPadding;
    var svg = d3.select("#draw-here")
                .append("svg")
                .attr("height", h)
                .attr("width", w);
                
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * colWidth;
        })
        .attr("y", function(d) {
            return h - scale(d);
        })
        .attr("height", function(d) {
            return scale(d);
        })
        .attr("width", barWidth);
        
    svg.selectAll("text")
        .data(dataset)
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
            return h - scale(d) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");
        
       
        
        
        
        