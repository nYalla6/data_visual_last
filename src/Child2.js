import React, { Component} from "react";
import * as d3 from "d3"
import "./App.css"
class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedCategory: 'sex'
      };
  }
  componentDidMount() {
    console.log("options")

  }
  componentDidUpdate() {
    const categories = ["A" ,"B", "C"];

    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


    var y = d3.scaleLinear()
    .domain([0, 16])
    .range([ 20, 0]);

  // Add dots
  d3.select('.child2').selectAll("circle").data(this.state.data)
        .join("circle") // Directly using "circle" here tells D3 to append circles for new data
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
          .attr("r", 10)
          .attr("fill", 'green')


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
      .on("mouseout", () => tooltip.style("visibility", "hidden"));


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
      <svg className="child2" width="500" height="500">
        <select
          onChange={(event) =>
            this.setState({ selected_cat: event.target.value })
          }
        >
          <option value="A"> A </option>
          <option value="B"> B </option>
          <option value="C"> C </option>
        </select>
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
