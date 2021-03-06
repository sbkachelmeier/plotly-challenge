//Load in data from json 
// Create the dropdown 
function start(){
  d3.json("samples.json").then(function(data) {
    var samplenames = data.names
    var location = d3.select("#selDataset")
    samplenames.forEach((sampleId)=> {
      location.append("option").text(sampleId).property("value", sampleId)
    })
    var sampleId = samplenames[0]
    buildtable(sampleId)
    DrawBubbleChart(sampleId)
    DrawBargraph(sampleId)

  });  
}
start()



// Make table 
function buildtable(sampleid){
  d3.json("samples.json").then(function(data){
    var demographics = data.metadata
    var filterData = demographics.filter(x => x.id == sampleid)
    var location = d3.select("#sample-metadata")
    location.html("")


    Object.entries(filterData[0]).forEach(([key, value]) => {
      var row = location.append("tr");
      var cell = row.append("td");
      cell.text(`${key}:  ${value}`);;
  });
  })
}

// Make bubble chart
function DrawBubbleChart(sampleId)
{
  d3.json("samples.json").then((data) => 
  { 
    function filterSample(sampleData)
    {
      return sampleData.id == sampleId;
    }
  
    var sampleData = data.samples.filter(filterSample);
    var bubbleDiv = d3.select("#bubble");
    bubbleDiv.html("");
    otuIDs = sampleData[0].otu_ids;
    sampleValues = sampleData[0].sample_values;
    Labels = sampleData[0].otu_labels;
    var bubbleData = 
    {
      x: otuIDs,
      y: sampleValues,
      text: Labels,
      mode: 'markers',
      number: { prefix: "OTU "},
      marker: 
      {
        size: sampleValues,
        color: otuIDs
      }
    };
        
    var bubbledata = [bubbleData];
    var layout = 
    {
      title: 'OTU Size Chart',
      xaxis: {title: 'OTU ID'},
      yaxis: {title: 'OTU Size'}
    };
    Plotly.newPlot('bubble', bubbledata, layout);

  });
}


// //The following code is borrowed with permission from office hours with Dom on Thursday, October 1.
// //Make bar chart
function DrawBargraph(sampleID)
{
  
  d3.json("samples.json").then((data) => {

    var samples = data.samples;
    var resultArray = samples.filter(s => s.id == sampleID);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

    var barData = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      type: "bar",
      text: otu_labels.slice(0, 10).reverse(),
      orientation: "h"
    }
    var barLayout = {
      title: "Top 10 Bacteria Cultures",
      margin: {t: 30, l: 150}
    }
    Plotly.newPlot("bar", [barData], barLayout);
  });
}

// // Make changed option event handler
function optionChanged(newSampleId)
{
  
  DrawBubbleChart(newSampleId);
  buildtable(newSampleId)
  DrawBargraph(newSampleId);
}

