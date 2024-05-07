import React, { Component} from "react";
import * as d3 from "d3"
import "./App.css"
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var data = {
      name: "Root",
      children: [
        {
          name: "Branch 1",
          children: [
            {
              name: "Leaf 1",
              size: 10,
              color: "red",
            },
            {
              name: "Leaf 2",
              size: 20,
              color: "blue",
            },
          ],
        },
        {
          name: "Branch 2",
          children: [
            {
              name: "Leaf 3",
              size: 15,
              color: "green",
            },
            {
              name: "Leaf 4",
              size: 25,
              color: "purple",
              children: [
                {
                  name: "Subleaf",
                  size: 5,
                  color: "orange",
                },
              ],
            },
          ],
        },
      ],
    };

    var width = 220,
      height = 700;

    var root = d3.hierarchy(data);
    var treeLayout = d3.tree().size([height, width]);
    
    // console.log(root); // Adds tree related information
    treeLayout(root); // Adds layout positions
    // console.log(root); // Adds tree related information

    // Links
    d3.select(".parent")
      .selectAll(".link")
      .data(root.links())
      .join("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    // Labels
    d3.select(".parent")
      .selectAll(".label")
      .data(root.descendants())
      .join("text")
      .attr("class", "label")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y - 10)
      .text((d) => d.data.name);

    // Nodes
    d3.select(".parent")
      .selectAll(".node")
      .data(root.descendants())
      .join("circle")
      .attr("class", "node")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 4)
      .on("mouseover", (event, d) => {
        tooltip.html(d.data.name)
        tooltip.style("visibility", "visible");  
        // alert(d.data.name)
      })
      .on("mousemove", (event) =>
        tooltip
          .style("top", event.pageY - 10 + "px") 
          .style("left", event.pageX + 10 + "px")  // positions the tooltip to the right of the cursor
      )
      .on("mouseout", () => tooltip.style("visibility", "hidden"));  // hides the tooltip on mouseout

    var tooltip = d3
      .select("body")
      .selectAll(".tooltip_div")
      .data([0]) // binds a single element to the tooltip
      .join("div") // joins the data to a div element
      .attr("class", "tooltip_div") // adds a CSS class for styling
      .style("position", "absolute") // uses absolute positioning
      .style("visibility", "hidden"); // starts as hidden
  }
  

  render() {
    return (
      <svg width="700" height="350">
        <g className="parent" transform="translate(0,50)"></g>
      </svg>
    );
  }

}

export default App;


// import React, { Component } from "react";
// import * as d3 from "d3";
// import AAPL from "./data/AAPL.csv";
// import AMZN from "./data/AMZN.csv";
// import GOOGL from "./data/GOOGL.csv";
// import META from "./data/META.csv";
// import MSFT from "./data/MSFT.csv";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       all_data: {},
//       selected_company: "Apple", // All data will be stored in this single object
//     };
//   }

//   componentDidMount() {
//     Promise.all([
//       d3.csv(AAPL),
//       d3.csv(AMZN),
//       d3.csv(GOOGL),
//       d3.csv(META),
//       d3.csv(MSFT),
//     ])
//       .then((resolved_data) => {
//         //when the promise goes through
//         var temp_data = {
//           Apple: resolved_data[0],
//           Amazon: resolved_data[1],
//           Google: resolved_data[2],
//           Meta: resolved_data[3],
//           Microsoft: resolved_data[4],
//         };
//         this.setState({ all_data: temp_data });
//       })
//       .catch((error) => console.error("Error loading the data: ", error));
//   }
//   componentDidUpdate() {
//     console.log(this.state.selected_company);
//     const { all_data, selected_company } = this.state;
  
//     if (selected_company && all_data[selected_company]) {
//       const data = all_data[selected_company].map((item) => ({
//         Date: d3.timeParse("%Y-%m-%d")(item.Date),
//         Open: parseFloat(item.Open),
//         Close: parseFloat(item.Close),
//       }));
  
//       const svg = d3.select("#demo2");
//       const width = +svg.attr("width");
//       const height = +svg.attr("height");
  
//       const x_scale = d3.scaleTime()
//         .domain(d3.extent(data, (d) => d.Date))
//         .range([0, width]);
  
//       const y_scale = d3.scaleLinear()
//         .domain(d3.extent(data, (d) => Math.max(d.Open, d.Close)))
//         .range([height, 0]);
  
//       const colorScale = d3.scaleOrdinal()
//         .domain(["Open", "Close"])
//         .range(["green", "red"]);
  
//       // Clear previous content
//       svg.selectAll("*").remove();
  
//       // Draw lines
//       const linesGroup = svg.append("g").attr("class", "lines_g");
  
//       ["Open", "Close"].forEach((type) => {
//         const line = d3.line()
//           .x((d) => x_scale(d.Date))
//           .y((d) => y_scale(d[type]));
  
//         linesGroup.append("path")
//           .datum(data)
//           .attr("class", "line")
//           .attr("d", line)
//           .attr("fill", "none")
//           .attr("stroke", colorScale(type))
//           .attr("stroke-width", 1);
//       });
  
//       // Draw legend
//       const legendGroup = svg.append("g").attr("class", "legend_g")
//         .attr("transform", "translate(400, 20)");
  
//       const legendItems = legendGroup.selectAll(".item")
//         .data(["Open", "Close"])
//         .enter().append("g")
//         .attr("class", "item")
//         .attr("transform", (d, i) => `translate(0, ${i * 25})`);
  
//       legendItems.append("rect")
//         .attr("x", 0)
//         .attr("width", 10)
//         .attr("height", 10)
//         .attr("fill", (d) => colorScale(d));
  
//       legendItems.append("text")
//         .attr("x", 15)
//         .attr("y", 10)
//         .text((d) => d);
//     }
//   }
  

//   render() {
//     return (
//       <div>
//         <select
//           onChange={(event) =>
//             this.setState({ selected_company: event.target.value })
//           }
//         >
//           <option value="Amazon"> Amazon </option>
//           <option value="Apple"> Apple </option>
//         </select>
//         <svg id="demo2" width="450" height="300"></svg>
//       </div>
//     );
//   }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";
// import AAPL from "./data/AAPL.csv";
// import AMZN from "./data/AMZN.csv";
// import GOOGL from "./data/GOOGL.csv";
// import META from "./data/META.csv";
// import MSFT from "./data/MSFT.csv";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       all_data: {},
//       selected_company: "Google", // Default selected company
//     };
//   }

//   componentDidMount() {
//     Promise.all([
//       d3.csv(AAPL),
//       d3.csv(AMZN),
//       d3.csv(GOOGL),
//       d3.csv(META),
//       d3.csv(MSFT),
//     ])
//       .then((resolved_data) => {
//         const temp_data = {
//           Apple: resolved_data[0],
//           Amazon: resolved_data[1],
//           Google: resolved_data[2],
//           Meta: resolved_data[3],
//           Microsoft: resolved_data[4],
//         };
//         this.setState({ all_data: temp_data });
//       })
//       .catch((error) => console.error("Error loading the data: ", error));
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.selected_company !== this.state.selected_company) {
//       this.updateChart();
//     }
//   }

//   updateChart() {
//     const { all_data, selected_company } = this.state;
//     const data = all_data[selected_company].map((item) => ({
//       Date: d3.timeParse("%Y-%m-%d")(item.Date),
//       Open: parseFloat(item.Open),
//       Close: parseFloat(item.Close),
//     }));

//     const svg = d3.select("#demo2");
//     const width = +svg.attr("width");
//     const height = +svg.attr("height");

//     const xScale = d3.scaleTime()
//       .domain(d3.extent(data, (d) => d.Date))
//       .range([0, width]);

//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, (d) => Math.max(d.Open, d.Close))])
//       .range([height, 0]);

//     svg.selectAll("*").remove(); // Clear previous content

//     const line = d3.line()
//       .x((d) => xScale(d.Date))
//       .y((d) => yScale(d.Open));

//     svg.append("path")
//       .datum(data)
//       .attr("class", "line")
//       .attr("d", line)
//       .attr("fill", "none")
//       .attr("stroke", "green")
//       .attr("stroke-width", 1);
//   }

//   render() {
//     return (
//       <div>
//         <select
//           value={this.state.selected_company}
//           onChange={(event) =>
//             this.setState({ selected_company: event.target.value })
//           }
//         >
//           <option value="Amazon">Amazon</option>
//           <option value="Google">Google</option>
//         </select>
//         <svg id="demo2" width={400} height={300}></svg>
//       </div>
//     );
//   }
// }

// export default App;


// // import React, { Component } from "react";
// // import * as d3 from "d3";

// // class App extends Component {
// //   componentDidMount() {
// //     var data1 = [
// //       { x: 20, y: 20 },
// //       { x: 60, y: 20 },
// //       { x: 100, y: 60 },
// //       { x: 170, y: 80 },
// //     ];

// //     d3.select('.mysvg').selectAll("circle").data(data1)
// //       .join("circle") // Directly using "circle" here tells D3 to append circles for new data
// //         .attr("cx", d => d.x)
// //         .attr("cy", d => d.y)
// //         .attr("r", 10)
// //         .attr("fill", 'green')
// //   }

// //   render() {
// //     return (
// //       <div className="mydiv">
// //         <svg className="mysvg" width="760" height="600">
// //           <circle className="c3" cx="120" cy="250" r="10" fill="gray" />
// //           <circle id="c_id4" cx="240" cy="250" r="10" fill="gray" />
// //         </svg>
// //       </div>
// //     );
// //   }
// // }

// // export default App;

// // import React, { Component } from 'react';
// // import * as d3 from 'd3';

// // class App extends Component {
// //   componentDidMount() {
// //     const data1 = [
// //       { x: 20, y: 20, text: 'Text 1' },
// //       { x: 80, y: 40, text: 'Text 2' },
// //       { x: 140, y: 60, text: 'Text 3' },
// //       { x: 200, y: 80, text: 'Text 4' },
// //     ];

// //     d3.select('.mysvg').selectAll('text').data(data1)
// //       .join('text')
// //       .attr('x', d => d.x)
// //       .attr('y', d => d.y)
// //       .text(d => d.text)
// //       .attr("fill", 'green');
// //   }

// //   render() {
// //     return (
// //       <div className='mydiv'>
// //         <svg className='mysvg' width='760' height='600'>
// //         </svg>
// //       </div>
// //     );
// //   }
// // }

// // export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//   componentDidMount() {
//     const data1 = [
//       { x: 20, y: 0, width: 50, height: 30 },
//       { x: 72, y: 0, width: 50, height: 45 },
//       { x: 124, y:0, width: 50, height: 50 },
//       { x: 176, y: 0, width: 50, height: 30 },
//     ];

//     d3.select(".mysvg").selectAll("rect")
//       .data(data1)
//       .join('rect')
//       .attr('x', d => d.x)
//       .attr('y', d => d.y)
//       .attr('width', d => d.width)
//       .attr('height', d => d.height)
//       .attr("fill", 'green');
//       // Your code here

//   }

//   render() {
//     return (
//       <div className="mydiv">
//         <svg className="mysvg" width="760" height="600"></svg>
//       </div>
//     );
//   }
// }

// export default App;

// area chart with slider

/**
import React, { Component } from "react";
import * as d3 from "d3";
import NTDOY from "./NTDOY.csv";
import { sliderBottom } from 'd3-simple-slider';

class App extends Component {
    constructor(props){
        super(props)
        this.state={original_data:[],filtered_data:[]}
    }
componentDidMount(){
    d3.csv(NTDOY).then((data) => {
        const parseDate = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
          d.Date = parseDate(d.Date);
          d.Close = +d.Close;
        })
        this.setState({original_data:data,filtered_data:data})
    })
}
  componentDidUpdate() {
    var data=this.state.filtered_data
    const margin = { top: 70, right: 60, bottom: 50, left: 80 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3.select("#chart-container")
      .selectAll("svg")
      .data([null])
      .join("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .selectAll("g")
      .data([null])
      .join("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      x.domain(d3.extent(data, (d) => d.Date));
      y.domain([0, d3.max(data, (d) => d.Close)]);

      svg.selectAll(".x-axis")
        .data([null])
        .join("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));

      svg.selectAll(".y-axis")
        .data([null])
        .join("g")
          .attr("class", "y-axis")
          .attr("transform", `translate(${width},0)`)
          .call(d3.axisRight(y).tickFormat(d => isNaN(d) ? "" : `$${d.toFixed(2)}`));

      const line = d3.line().x(d => x(d.Date)).y(d => y(d.Close));
      const area = d3.area().x(d => x(d.Date)).y0(height).y1(d => y(d.Close));

      svg.selectAll(".area")
        .data([data])
        .join("path")
          .attr("class", "area")
          .attr("d", area)
          .style("fill", "#85bb65")
          .style("opacity", 0.5);

      svg.selectAll(".line")
        .data([data])
        .join("path")
          .attr("class", "line")
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", "#85bb65")
          .attr("stroke-width", 1);

      const sliderRange = sliderBottom()
        .min(d3.min(data, d => d.Date))
        .max(d3.max(data, d => d.Date))
        .width(300)
        .tickFormat(d3.timeFormat('%Y-%m-%d'))
        .ticks(3)
        .default([d3.min(data, d => d.Date), d3.max(data, d => d.Date)])
        .fill('#85bb65')
        .on('onchange', val => {
            const f_data = this.state.original_data.filter(d => d.Date >= val[0] && d.Date <= val[1]);
            this.setState({filtered_data:f_data})
        });

      const gRange = d3.select('.slider-range').attr('width', 500).attr('height', 100)
      .selectAll('.slider-g').data([null]).join('g').attr('class', 'slider-g').attr('transform', 'translate(90,30)');

      gRange.call(sliderRange);    

  }

  render() {
    return <div>
            <svg className="slider-range"></svg>
            <div id="chart-container"></div>
        </div>;
  }
}

export default App;

 */

// stacked area chart
/** 
import React, { Component } from "react";
import * as d3 from "d3";

class App extends Component {
  componentDidMount() {
    var data = [
      {month: new Date(2018, 1, 1), apples: 10, bananas: 20, oranges: 15},
      {month: new Date(2018, 2, 1), apples: 15, bananas: 15, oranges: 15},
      {month: new Date(2018, 3, 1), apples: 20, bananas: 25, oranges: 15}
     ];

     var stackGen = d3.stack().keys(["apples", "bananas", "oranges"]);

     var stackedSeries = stackGen(data);
     console.log(stackedSeries)
     var xScale = d3.scaleTime().domain([data[0].month, data[2].month]).range([50, 275]);
     var yScale = d3.scaleLinear().domain([0,60]).range([275, 25]);

     var colorScale = d3.scaleOrdinal()
      .domain(["apples", "bananas", "oranges"])
      .range(["red", "yellow", "orange"]);

     var areaGen = d3.area()
      .x((d) => xScale(d.data.month))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]));

     d3.select("#demo1")
      .selectAll(".areas")
      .data(stackedSeries)
      .join("path")
      .attr('class','areas')
      .attr("d", d => areaGen(d))
      .attr("fill", (d) => colorScale(d.key))
      .on('click',d=>console.log(d.key))

    }

  render() {
    return (
      <svg id="demo1" width="300" height="300"></svg>
    );
  }
}

export default App;
*/

// //Pie Chart
// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//   componentDidMount() {
//     var fruits = [
//       { name: "Apples", quantity: 20 },
//       { name: "Bananas", quantity: 40 },
//       { name: "Cherries", quantity: 50 },
//       { name: "Damsons", quantity: 10 },
//       { name: "Elderberries", quantity: 30 },
//     ];

//     var pieGenerator = d3.pie().value((d) => d.quantity).sort((a, b) => a.name.localeCompare(b.name));
//     var arcData = pieGenerator(fruits);
//     console.log(arcData)

//     var arcGenerator = d3.arc().innerRadius(10).outerRadius(100);

//     d3.select("g").selectAll("path.pie-part").data(arcData).join("path")
//       .attr("class", "pie-part").attr("d", d=>arcGenerator(d)).attr('fill','orange').attr('stroke','white')

//     d3.select("g").selectAll("text.pie-label").data(arcData).join("text").attr("class", "pie-label")
//       .each(function (d) {
//         var centroid = arcGenerator.centroid(d);
//         d3.select(this)
//           .attr("x", centroid[0])
//           .attr("y", centroid[1])
//           .attr("dy", "0.33em").attr('text-anchor','middle').style('font-size',12).attr('fill','white')
//           .text(d.data.name);
//       });
//   }

//   render() {
//     return (
//       <svg width="700" height="220">
//         <g transform="translate(300, 110)"></g>
//       </svg>
//     );
//   }
// }

// export default App;
