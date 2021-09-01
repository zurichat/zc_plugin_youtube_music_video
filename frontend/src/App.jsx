import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return (
      <>
        <h1>Hello world!!</h1>
        <h2>Team Pythagoras</h2>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
