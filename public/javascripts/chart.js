/**
 * Created by tehsoto on 29/03/15.
 */
var margin = {top: 10, right: 70, bottom: 20, left: 100},
  width = 700 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom,
  x = d3.time.scale()
    .range([0, width]),
  y = d3.scale.linear()
    .range([height, 0]),
  color = d3.scale.category20(),
  publications,
  xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom"),
  yAxis = d3.svg.axis()
    .scale(y)
    .orient("left"),
  line = d3.svg.line()
    .interpolate("basis")
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.value);
    }),
  parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse;

if (!sessionStorage.getItem("graphData")) {
  d3.json('http://localhost:3000/api/get/data', function (error, data) {
    data = data.response;
    drawChart(data);
  });
} else {
  drawChart(JSON.parse(sessionStorage.getItem('graphData')).response);
}


function drawChart(data) {
  d3.select('#svggraph').html('');
  var svg = d3.select('#svggraph').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//   {
//    "post_impressions": [],
//    "post_impressions_organic": [],
//    "post_impressions_paid": [],
//    "post_impressions_viral": []
//   }

  var arr = [];
  data.forEach(function (el) {
    d3.keys(el).forEach(function (d) {
      arr.push({key: d, date: el[d][0].timestamp,
        value: el[d][0].value});
    });
  });

  publications = d3.nest()
    .key(function (d) {
      return d.key;
    })
    .key(function (d) {
      return d.date;
    }).sortKeys(d3.ascending)
    .entries(arr);

  publications.forEach(function (s) {
    s.values.forEach(function (d) {
      d.sumValues = d3.sum(d.values, function (d) {
        return d.value;
      });
    });
  });

  var dateArr = [];
  publications.forEach(function (s) {
    var i = 0;
    s.values.forEach(function (d) {
      if (dateArr[i] === undefined) {
        dateArr[i] = {date: parseDate(d.key)};
      }
      i++;
      d.date = parseDate(d.key);
      d.value = +d.sumValues;
    });

    s.maxValue = d3.max(s.values, function (d) {
      return d.value;
    });
    s.sumValue = d3.sum(s.values, function (d) {
      return d.value;
    });
  });

// Sort by maximum price, descending.
//publications.sort(function(a, b) { return b.maxPrice - a.maxPrice; });
  x.domain(d3.extent(dateArr, function (d) {
    return d.date;
  }));

// Compute the minimum and maximum date across publications.
  y.domain([
    d3.min(publications, function (d) {
      return d3.min(d.values, function (v) {
        return v.value;
      })
    }),
    d3.max(publications, function (d) {
      return d3.max(d.values, function (v) {
        return v.value;
      })
    })
  ]);


  svg.append("g")
    .attr("class", "x axis")
    .attr("style", "display: none;")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "1em")
    .style("text-anchor", "end");

  var post = svg.selectAll(".post")
    .data(publications)
    .enter().append("g")
    .attr("class", "post");

  post.append("path")
    .attr("class", "line")
    .attr("style", "fill:none;stroke-width: .15em;")
    .attr("d", function (d) {
      return line(d.values);
    })
    .style("stroke", function (d) {
      return color(d.key);
    });


  post.append("text")
    .datum(function (d) {
      return {name: d.key, value: d.values[d.values.length - 1]};
    })
    .attr("transform", function (d) {
      return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")";
    });

  var legend = svg.selectAll(".legend")
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
      return "translate(0," + i * 20 + ")";
    });

  legend.append("rect")
    .attr("x", 200 + 10)
    .attr("y", 8)
    .attr("width", 5)
    .attr("height", 5)
    .style("fill", color);

  legend.append("text")
    .attr("x", 200)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) {
      d = replaceAll('_', ' ', d);
      d = d.charAt(0).toUpperCase() + d.slice(1);
      return d;
    });
}

/**
 *  Socket Data
 */

socket.removeAllListeners("some event"); // remove listeners to avoid double binding
socket.on('some event', function (datasock) {
  var newData = JSON.parse(sessionStorage.getItem('graphData'));
  newData.response.push(datasock);
  sessionStorage.setItem('graphData', JSON.stringify(newData));
  d3.select('#svggraph').html('');
  console.log(newData);
  drawChart(newData.response);
});

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}