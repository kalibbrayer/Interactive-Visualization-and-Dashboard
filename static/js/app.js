function init() {
    var data = [
      {
        values: [1],
        labels: [1],
        type: 'pie',
      },
    ];
  
    var layout = {
      // height: 600,
      // width: 800,
    };
  
    Plotly.plot('pie', data, layout);
  
  
    var data_bubble = [
      {
        x: [1],
        y: [1],
        mode: 'markers',
        type: 'scatter',
      },
    ];
  
    var bubble_layout = {
      xaxis: {
          title: 'OTU ID'
      },
      yaxis: {
          ttile: 'Sample Size'
      },
      // width: 800,
      // height: 600
    };
  
    Plotly.plot('scatter', data_bubble, bubble_layout);
  }
  
  init();
  
  function updatePlotly(newdata) {
      console.log('Data:', newdata);
    var PIE = document.getElementById('pie');
    Plotly.restyle(PIE, newdata, 0);
  }
  
  function updatePlotlyBubble(newdata) {
      console.log('Data:', newdata);
    var BUBBLE = document.getElementById('scatter');
    Plotly.restyle(BUBBLE, newdata, 0);
  }
  
  function optionChanged(sample) {
      console.log('sample: ' + sample);
      var url = '/samples/'+sample;
      var url_otu = '/otu'
      var url_meta = '/metadata/'+sample
    Plotly.d3.json(url, function(error, response) {
        Plotly.d3.json(url_otu, function(error, response_otu) {
            console.log(response_otu);
        
      console.log(response);
      var trace1 = {
        type: 'pie',
         values: [response[0].sample_values.slice(0,10)],
         labels: [response[0].otu_ids.slice(0,10)],
         hovertext: [response_otu.slice(0,10)],
      };
  
      var trace2 = {
          type: 'scatter',
          y: [response[0].sample_values],
          x: [response[0].otu_ids],
          hovertext: [response_otu],
          mode: 'markers',
          marker: {
              size: response[0].sample_values.map(data_scatter=>data_scatter*30),
              sizemode: 'area',
              color: response[0].otu_ids,
          }
      };
  
      var data = trace1;
      var data_scatter = trace2;
       updatePlotly(data);
       updatePlotlyBubble(data_scatter);
    });
  });
      d3.json(url_meta, function(error, response) {
          console.log(response);
      var meta_table = document.getElementById("sample_metadata")
      meta_table.innerHTML = "";
      for(var key in response) {
          var row = document.createElement("tr");
          var el = document.createElement("th");
          var el2 = document.createElement("td");
          el.textContent = key
          el2.textContent = " " + response[key];
          row.appendChild(el);
          row.appendChild(el2);
          meta_table.appendChild(row);
      }
      })
  }
  
  optionChanged("BB_940");