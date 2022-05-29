const dummyData = [
  { id: "d1", value: 10, region: "Gujarat" },
  { id: "d2", value: 12, region: "Maharashtra" },
  { id: "d3", value: 18, region: "Telangana" },
  { id: "d4", value: 20, region: "Chennai" },
  { id: "d5", value: 13, region: "Bhopal" },
];

const xScale = d3
  .scaleBand()
  .domain(dummyData.map((d) => d.region))
  .rangeRound([0, 250])
  .padding(0.5);
const yScale = d3.scaleLinear().domain([0, 25]).range([250, 0]);

// d3.select("div")
//   .selectAll("p")
//   .data(dummyData)
//   .enter() // if p tag not exist create one...
//   .append("p")
//   .text((d) => d.region);

const container = d3.select("#simple-bar").classed("container", true);
//   .style("border", "2px solid blue");

container
  .selectAll(".bar")
  .data(dummyData)
  .enter()
  .append("rect")
  .classed("bar", true)
  .transition()
  .duration(1000)
  .delay(function (d, i) {
    return i * 15;
  })
  .attr("width", xScale.bandwidth())
  .attr("height", (data) => 250 - yScale(data.value))
  .attr("x", (data) => xScale(data.region))
  .attr("y", (data) => yScale(data.value));
