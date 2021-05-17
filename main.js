//--> Main data sources
const countyDataUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationDataUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

//--> Set up main elements
const width = 1000;
const height = 600;

const path = d3.geoPath();

const svg = d3
  .select(".content")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const legend = svg
  .append("g")
  .attr("id", "legend")
  .attr("transform", `translate(${width / 2}, 20)`);

//--> Load data
const chart = async () => {
  const [topology, edu] = await Promise.all([
    d3.json(countyDataUrl),
    d3.json(educationDataUrl),
  ]);

  //--> Min and max education values
  const [eduMin, eduMax] = d3.extent(edu, d => d.bachelorsOrHigher);

  //--> Color scale
  const colorScale = d3
    .scaleThreshold()
    .domain(d3.range(eduMin, eduMax, (eduMax - eduMin) / 8))
    .range(d3.schemeReds[9]);

  //--> Display geo data
  svg
    .selectAll("path")
    .data(topojson.feature(topology, topology.objects.counties).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("stroke", "tomato")
    .attr("fill", d => {
      const result = edu.find(item => item.fips === d.id);

      return colorScale(result.bachelorsOrHigher)[0];
    })
    .classed("county", true)
    .attr("data-fips", d => d.id)
    .attr("data-education", d => {
      const result = edu.find(item => item.fips === d.id);

      return result.bachelorsOrHigher;
    });

  //--> Legend
  legend
    .selectAll("rect")
    .data(
      colorScale.range().map(d => {
        d = colorScale.invertExtent(d);

        if (!d[0]) d[0] = 0;
        if (!d[1]) d[1] = eduMax;

        return d;
      })
    )
    .enter()
    .append("rect")
    .attr("x", (_, i) => i * 40)
    .attr("width", 40)
    .attr("height", 20)
    .attr("fill", d => colorScale(d[0]));
};

chart();
