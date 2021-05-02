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



function buildcharts(sampleid) {
    d3.json("samples.json").then(function(data) {
        // console.log(data);
        var samples = data.samples
        var filterdata = samples.filter(x => x.id==sampleid)[0] 
        console.log (filterdata)
        var trace1 = {
            x: filterdata.otu_ids,
            y: filterdata.sample_values,
            type: "bar"
          };
          
          

    })
}


``
function optionChanged(newid){
buildtable(newid)
buildcharts(newid)

}




dropdownmenu()