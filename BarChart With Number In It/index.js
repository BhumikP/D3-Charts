var Data = [
  {
    Categories: "Cat 1",
    1: 34,
    2: 76,
    3: 87,
    4: 54,
    5: 66,
    6: 72,
  },
  {
    Categories: "cat 2",
    1: 239,
    2: 254,
    3: 225,
    4: 152,
    5: 362,
    6: 98,
  },
  {
    Categories: "cat 3",
    1: 457,
    2: 234,
    3: 83,
    4: 327,
    5: 88,
    6: 99,
  },
  {
    Categories: "cat 4",
    1: 132,
    2: 286,
    3: 222,
    4: 150,
    5: 363,
    6: 95,
  },
];
var height = 600,
  width = 600,
  margin = { left: 10, right: 10, top: 20, bottom: 20 };

var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.2);

var y = d3.scaleLinear().rangeRound([height, 0]);

var color = d3.scaleOrdinal().range(d3.schemeReds[7]);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y).tickFormat(d3.format(".2s"));

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var update = function (data) {
  color.domain(
    d3.keys(data[0]).filter(function (key) {
      return key !== "Categories";
    })
  );

  data.forEach(function (d) {
    var y0 = 0;
    d.stores = color.domain().map(function (name) {
      return { name: name, y0: y0, y1: (y0 += +d[name]) };
    });
    d.total = d.stores[d.stores.length - 1].y1;
  });

  data.sort(function (a, b) {
    return b.total - a.total;
  });

  x.domain(
    data.map(function (d) {
      return d.Categories;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.total;
    }),
  ]);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis.tickSize(0).tickPadding(6));
  let diff = 82;
  var categories = svg
    .selectAll(".categories")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "g")
    .attr("transform", function (d, index) {
      //   if (index == 0) {
      //     return "translate(" + x(d.Categories) + ",0)";
      //   }
      console.log(x(d.Categories));
      return "translate(" + diff * index + ",0)";
    });

  categories
    .selectAll("rect")
    .data(function (d) {
      return d.stores;
    })
    .enter()
    .append("rect")
    .attr("width", x.bandwidth() - 60)
    .attr("y", function (d) {
      return y(d.y1);
    })
    .attr("height", function (d) {
      return y(d.y0) - y(d.y1);
    })
    .style("fill", function (d) {
      return color(d.name);
    });

  categories
    .selectAll("text")
    .data(function (d) {
      return d.stores;
    })
    .enter()
    .append("text")
    .attr("y", function (d) {
      return y((d.y0 + d.y1) / 2);
    })
    .attr("x", x.bandwidth() / 2 - 30)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("fill", "#fff")
    .text(function (d) {
      return d.y1 - d.y0;
    });

  categories
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", x.bandwidth() / 2 - 30)
    .attr("y", function (d) {
      return y(d.total);
    })
    .attr("dy", "-0.5em")
    .style("fill", "black")
    .text(function (d) {
      return d.total;
    });
};

update(Data);
