import { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import { Route, Switch, Redirect } from "react-router-dom";

import RoomHeader from "./components/roomHeader";
import MusicRoom from "./components/musicRoom";

import chatMediaQuery from "./utils/chatMedia";

import { uiSelect } from "./store/uiSlice";
import authService from "./services/authService";
import eventService from "./services/eventService";

import "moment-timezone";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";

function App() {
  useEffect(() => {
    authService.signin();
    eventService.connect();
  }, []);

  chatMediaQuery(); // toggle chat display based on screen size.
  const isLoading = useSelector(uiSelect.isLoading);

  return (
    <Wrapper>
      <div className="loader-wrapper">
        {isLoading && (
          <Loader
            visible
            type="BallTriangle"
            color="#27ae60"
            height={80}
            width={80}
          />
        )}
      </div>

      <div>
        <ToastContainer theme="colored" />

        {/* {showModal && <EnterRoom setUserCount={setUserCount} />} */}

        <RoomHeader />

        <Switch>
          <Route path="/music" component={MusicRoom} />
          <Redirect from="/" to="/music" />
        </Switch>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 0;

  & > * {
    flex-grow: 1;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #00b87c;
  }

  .loader-wrapper {
    position: absolute;
    top: 100px;
    z-index: 111;
  }
`;

export default App;
