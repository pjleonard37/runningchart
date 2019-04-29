var data = d3.range(30).map(function(i) {
    return {x: i, y: 5*Math.pow((i/1),1.06), z: i/(5*Math.pow((i/1),1.06))};
});


var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .domain(d3.extent(data, function (d) {
        return d.x;
    }))
    .range([100, width]);

var y = d3.scaleLinear()
    .domain(d3.extent(data, function (d) {
        return d.y;
    }))
    .range([height, 0]);

var z = d3.scaleLinear()
    .domain(d3.extent(data, function (d) {
        return d.z;
    }))
    .range([height, 0]);

var line = d3.line(data)
    //.defined(function(d) { return d; })
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var linePace = d3.line(data)
    //.defined(function(d) { return d; })
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.z); });

console.log(data);
var svg = d3.select("svg")
    .datum(data)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(100,0)")
    .call(d3.axisLeft(y))
    //.tickFormat(d3.format(".0%"));

svg.append("g")
    .attr("class", "axis axis--z")
    .attr("transform", "translate(" + width + ",0)")
    .call(d3.axisRight(z))
    //.tickFormat(d3.format(".0%"));

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Miles");

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Minutes");
 
// svg.append("path")
//     .attr("class", "line")
//     .attr("d", line);

svg.selectAll(".dot")
  .data(data.filter(function(d) { return d; }))
  .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", line.x())
    .attr("cy", line.y())
    .attr("r", 3.5);

svg.selectAll(".dot")
  .data(data.filter(function(d) { return d; }))
  .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", linePace.x())
    .attr("cy", linePace.y())
    .attr("r", 12.5);
