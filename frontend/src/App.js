import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

// components
import PlaylistHeader from './components/playlist-header';

class App extends Component {
  render() {
    return (
      <PlaylistHeader/>
    );
  }
}

const Wrapper = styled.div`
  padding: 40px;
`;

ReactDOM.render(<App />, document.getElementById("app"));
