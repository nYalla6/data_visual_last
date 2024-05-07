import React, { Component} from "react";
import * as d3 from "d3"
import "./App.css"
import SampleDataset from "./SampleDataset.csv"
import Child1 from "./Child1"
import Child2 from "./Child2"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {

    Promise.all([d3.csv(SampleDataset)])
      .then((resolved_data) => {
        const temp_data = resolved_data[0]
        this.setState({ data: temp_data });
        this.state.data = temp_data
        console.log(this.state.data)
      })
      .catch((error) => console.error("Error loading the data: ", error));

  }
  

  render() {
    return (
      <div>
        <Child1
          data={this.state.data}
        ></Child1>
        <Child2
          data={this.state.data}
        ></Child2>
      </div>
    );
  }

}

export default App;
