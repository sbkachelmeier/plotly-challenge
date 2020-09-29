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

// Make table and chart
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


function buildchart(sampleid){

}
function optionChanged(newid){
  buildtable(newid)
  buildchart(newid) 
}