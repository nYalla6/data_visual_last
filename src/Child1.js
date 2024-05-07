import React, { Component} from "react";
import * as d3 from "d3"
import "./App.css"
class Child1 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    d3.selectAll("g_1")
      .join("rect")
      .data(this.state.data)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 10)
      .attr("fill", "green");

  }

  render() {
    return (
      <svg width="500" height="500" transform="translate(200, 0)">
        <g className="g_1" transform="translate(0,50)"></g>
      </svg>
    );
  }
}

export default Child1;
