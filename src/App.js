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
