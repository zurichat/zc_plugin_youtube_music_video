import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Frontend Setup Test</h1>
        <h3>Team Pythagoras</h3>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
