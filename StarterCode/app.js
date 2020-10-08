// Load in data from json 

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
    buildchart(firstid)

  });  
}
start()

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
//The following code is borrowed with permission from office hours with Dom on Thursday, October 1.
// Make bubble chart
function DrawBubbleChart(sampleId){
  console.log('DrawBubbleChart(${sampleId})');

}
//Make bar chart
function DrawBargraph(sampleID)
{
  console.log('Drawbargraph(${sampleID})');
}

function optionChanged(newSampleId)
{
  console.log('User selected ${newSampleId}')
  // buildtable(newid)
  // buildchart(newid) 
}

//Make bubble chart