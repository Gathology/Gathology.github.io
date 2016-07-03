          //simsim

      google.charts.load('current', {'packages':['corechart']});
      //google.charts.setOnLoadCallback(drawChart);
      
datat = location.search;
datat=datat.replace("?","");
   function draw(x){
datachart=x;
    drawChart();}
      function drawChart() {
 switch(clicked){
  case 0: 
        var data = google.visualization.arrayToDataTable(datachart);

        var options = {
          title:  datachart[0][0]+' vs. '+datachart[0][1],
          hAxis: {title:datachart[0][0]},
          vAxis: {title: datachart[0][1]},
          /*hAxis: {title: 'Age', minValue: 1900, maxValue: 2000},
          vAxis: {title: 'Weight', minValue: 1900, maxValue: 2000},*/
          legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('scatter'));

        chart.draw(data, options);
    break;
    case 1:

      var data = google.visualization.arrayToDataTable(datachart);

      var options = {
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(data, options);

break;
case 4:

   var data = google.visualization.arrayToDataTable(datachart);

        var options = {
          isStacked: true
        };

        var chart = new google.visualization.SteppedAreaChart(document.getElementById('steparea'));

        chart.draw(data, options);
        break;
case 3:

var data=google.visualization.arrayToDataTable(datachart);

        var options = {
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('area'));
       
        chart.draw(data, options);
      
break;
case 5:

 var data = google.visualization.arrayToDataTable(datachart);

        var options = {
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('linee'));

        chart.draw(data, options);
break;
case 6:
var data = google.visualization.arrayToDataTable(datachart);

        var options = {
          title: datat
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
break;
case 7:
 var data = google.visualization.arrayToDataTable(datachart, true);

    var options = {
      legend:'none'
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('candle'));

    chart.draw(data, options);
    break;

case 2:
  var data = google.visualization.arrayToDataTable(datachart);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

     var options = {
        width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("stackedcol"));
      chart.draw(view, options);
      break;
}

  }