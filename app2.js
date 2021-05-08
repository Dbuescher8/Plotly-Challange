function dropdownmenu() {
    d3.json("samples.json").then(function(data) {
        console.log(data);
        var samplenames = data.names
        var menu = d3.select("#selDataset")
        samplenames.forEach(x=> {
            menu.append ("option").text(x).property("value",x)
            
        });
        buildtable(samplenames[0])
        buildcharts(samplenames[0])
      });
      
}
function buildtable(sampleid) {
    d3.json("samples.json").then(function(data) {
        var samplemeta = data.metadata
        var menu = d3.select("#sample-metadata")
        console.log(samplemeta)
        var filterdata = samplemeta.filter(x => x.id==sampleid)[0] 
        console.log (filterdata)
        menu.html("")
        Object.entries(filterdata).forEach(([key,value]) =>{
            var row = menu.append("tr")
            row.append("td").html(key)
            row.append("td").html(value)
        })
    })
}



function buildCharts(sample) {

    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultsarray = samples.filter(sampleobject =>
            sampleobject.id == sample);
        var result = resultsarray[0]

        var ids = result.otu_ids;
        var labels = result.otu_labels;
        var values = result.sample_values;

        var LayoutBubble = {
            margin: { t: 0 },
            xaxis: { title: "OTU ID" },
            hovermode: "closest",
        };

        var DataBubble = [{
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                size: values,
            }
        }];

        Plotly.newPlot("bubble", DataBubble, LayoutBubble);

        var bar_data = [{
            y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: values.slice(0, 10).reverse(),
            text: labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"

        }];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", bar_data, barLayout);
    });
}

function init() {
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use to build the initial plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialize the dashboard
init();