//Load in data from json 
// Create the dropdown 
function start(){
  d3.json("samples.json").then(function(data) {
    var samplenames = data.names
    console.log(samplenames);
    var location = d3.select("#selDataset")
    samplenames.forEach((x)=> {
      location.append("option").text(x).property("value", x)
    })
    var firstid = samplenames[0]
    buildtable(firstid)
    // buildchart(firstid)

  });  
}
start()

// //Initialization function?
// function InitDashboard()
// {
//   console.log('Calling InitDashboard()');
//   var selector = d3.select("#selDataset");

//   d3.json("samples.json").then((data) => {
//     console.log(data);

//     var sampleNames = data.names;

//     //Populate the selector
//     sampleNames.forEach((sampleId) => {
//       selector.append("option")
//       .text(sampleId)
//       .property("value", sampleId);
    
//   });
  // //Get the first sample Id
  // var sampleId = sampleNames[0];
  // console.log("Starting sample: ", sampleId);

  // //Draw the graphs
  // DrawBargraph(sampleId);
  // DrawBubbleChart(sampleId);

// Make table 
function buildtable(sampleid){
  d3.json("samples.json").then(function(data){
    var demographics = data.metadata
    console.log(demographics);
    var filterData = demographics.filter(x => x.id == sampleid)
    console.log(filterData[0])
    var location = d3.select("#sample-metadata")
    Object.entries(filterData[0]).forEach(([key, value]) => {
      var row = location.append("tr");
      var cell = row.append("td");
      cell.text(value);
  });
  })
}

// Make bubble chart
function DrawBubbleChart(sampleId)
{
   console.log('DrawBubbleChart(${sampleId})');

}
DrawBubbleChart();
// //The following code is borrowed with permission from office hours with Dom on Thursday, October 1.
// //Make bar chart
function DrawBargraph(sampleID)
{
  console.log('DrawBargraph(${sampleId})');
//   d3.json("samples.json").then((data)) => {

//     var samples = data.samples;
//     var resultArray = samples.filter(s => s.id == sampleId);
//     var result = resultArray[0];

//     var otu_ids = result.otu_ids;
//     var otu_labels = result.otu_labels;
//     var sample_values = result.sample_values;
//     var yticks = otu_ids.slice(0, 10).map(otuId) => 'OTU ${otuId}').reverse();

//     var barData = {
//       x: sample_values.slice(0, 10).reverse(),
//       y: yticks,
//       type: "bar",
//       text: otu_labels.slice(0, 10).reverse(),
//       orientation: "h"
//     }
//     var barLayout = {
//       title: "Top 10 Bacteria Cultures",
//       margin: {t: 30, l: 150}
//     }
//     Plotly.newPlot("bar", [barData], barLayout);
//   });
}
DrawBargraph();
// // Make changed option event handler
function optionChanged(newSampleId)
{
  console.log('User selected ${newSampleId}');
  DrawBubbleChart(newSampleId);
  DrawBargraph(newSampleId);
}
