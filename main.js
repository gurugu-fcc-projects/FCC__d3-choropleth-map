//--> Main data sources
const countyDataUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationDataUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

d3.queue()
  .defer(d3.json, countyDataUrl)
  .defer(d3.json, educationDataUrl)
  .awaitAll(function (err, res1, res2) {
    if (err) throw err;

    console.log(res1);
    console.log(res2);
  });

d3.json(countyDataUrl).then(res => {
  console.log(res);
});
