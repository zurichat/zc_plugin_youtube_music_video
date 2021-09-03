<<<<<<< HEAD
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
=======
import React, { Component } from "react";
import styled from "styled-components";
>>>>>>> b11de28b02e7b2bba0b6f9c3334af0f2e25b7bdb

class App extends Component {
  render() {
    return (
      <Wrapper>
        <h1>Frontend Setup Test Complete</h1>

        <h3>Team Pythagoras</h3>

        <em>Waiting for PRs...now from team members.</em>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 40px;
`;

<<<<<<< HEAD
ReactDOM.render(<App />, document.getElementById('app'));
=======
export default App;

// ReactDOM.render(<App />, document.getElementById("app"));
>>>>>>> b11de28b02e7b2bba0b6f9c3334af0f2e25b7bdb
