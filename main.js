
var data = [
  { product: 'Malaga', sales: 800,"color":"green" },
  { product: 'Cadiz', sales: 700, "color":"red"},
  { product: 'Huelva', sales: 650,"color":"blue" },
  { product: 'Granada', sales: 350,"color":"black" },
  { product: 'Sevilla', sales: 850,"color":"orange" },
  { product: 'Almeria', sales: 650,"color":"pink" },
  { product: 'Jaen', sales: 300,"color":"yellow" },
  { product: 'Cordoba', sales: 250,"color":"gray" },
  
  ];

var margin = {top: 100, right: 200, bottom: 200, left:200},
width = 800 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;

var svg = d3.select('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var rects = svg.selectAll('rect')
  .data(data);
 
var maxSales = d3.max(data, function(d, i) {
  return d.sales;
});

var y = d3.scaleLinear()
  .range([height,0])
  .domain([0, maxSales]);
      

var x = d3.scaleBand()
  .rangeRound([0, width-20])
  .domain(data.map(function(d, i) {
    return d.product;
  }))
  .paddingInner(0.3);
  
var newRects = rects.enter();
  
 newRects.append('rect')
 .attr('x', function(d, i) {
    return x(d.product);
  })
 .attr('y',function(d){
    return y(d.sales);
  })
  .attr('width', x.bandwidth)
  .attr('height', function(d) {
    return height-y(d.sales);
  })
  .style("fill",function(d){return d.color;});

 svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg.append("g")
  .call(d3.axisLeft(y));

var legend = svg.selectAll('.legend')
  .data(data)
  .enter().append('g')
  .attr("class", "legend")
  .attr("transform", function (d, i) {
  {
      return "translate(0," + i * 25 + ")"
  }
})

legend.append('rect')
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", function (d) {
  return d.color
})
  .style("stroke",function(d){return d.color})
  .attr("transform", "translate(" + (width - 15) + ",20)");

  legend.append('text')
  .attr("x", 20)
  .attr("y", 10)
  .text(function (d) {
  return d.product
})
  .attr("class", "textselected")
  .style("text-anchor", "start")
  .style("font-size", 15)
  .attr("transform", "translate(" + (width - 15) + ",20)");


svg.append("svg:text")
  .attr("class", "title")
  .attr("y", 25)
  .attr("x", 25)
  .text("SALES JULY");

