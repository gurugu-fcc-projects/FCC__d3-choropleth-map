//--> Main data sources
const countyDataUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationDataUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

//--> Set up main elements
const path = d3.geoPath();
const svg = d3
  .select(".content")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 600);

// d3.queue()
//   .defer(d3.json, countyDataUrl)
//   .defer(d3.json, educationDataUrl)
//   .awaitAll(function (err, results) {
//     if (err) throw err;

//     console.log(results);
//   });

const chart = async () => {
  const [topology, edu] = await Promise.all([
    d3.json(countyDataUrl),
    d3.json(educationDataUrl),
  ]);

  svg
    .selectAll("path")
    .data(topojson.feature(topology, topology.objects.states).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("stroke", "tomato")
    .classed("county", true)
    .attr("data-fips", d => d.id);
};

chart();
