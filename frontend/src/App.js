import React, { Component } from "react";
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

export default App;

// ReactDOM.render(<App />, document.getElementById("app"));
