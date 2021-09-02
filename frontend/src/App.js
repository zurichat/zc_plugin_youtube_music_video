import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

// components
import PlaylistHeader from './components/playlist-header';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <h1>Frontend Setup Test Complete</h1>

        <h3>Team Pythagoras</h3>

        <em>Waiting for PRs...now from team members.</em>
      </Wrapper>
      <PlaylistHeader/>
    );
  }
}

const Wrapper = styled.div`
  padding: 40px;
`;

ReactDOM.render(<App />, document.getElementById("app"));
