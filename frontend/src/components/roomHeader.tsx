import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import store from "../store";
import { toggleChat } from "../store/uiSlice";

import avatarSvg from "../media/header-avatar.svg";
import groupIconSvg from "../media/header-group-icon.svg";
import menu from "../media/menu.svg";
import message from "../media/message.svg";

const roomHeader = () => {
  return (
    <Wrapper className="header">
      <div className="header-left">
        <img
          src={menu}
          alt="icon"
          className="header-icon menu"
          onClick={undefined}
        />

        <img src={groupIconSvg} alt="icon" className="header-icon hide-2" />

        <Link to="/" className="header-link">
          Music Room
        </Link>
      </div>

      <div className="header-right">
        <div className="header-avatar">
          <img
            src={avatarSvg}
            alt="avatars"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="header-user-count">1</div>
        <div>
          <img
            src={message}
            alt="message count"
            className="header-message-count"
            onClick={() =>
              store.dispatch({ type: toggleChat.type, payload: { chat: true } })
            }
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: -1px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 1px 0px;
  height: 20px;
  color: #27ae60;
  padding: 20px;
  margin-bottom: 10px;
  z-index: 100;

  .header-icon {
    display: block;
    margin-right: 10px;
  }

  .header-icon.menu {
    display: none;
    cursor: pointer;
  }

  .header-link {
    display: block;
    font-weight: 700;
    line-height: 8px;
    padding: 12px;
    border-radius: 4px;
    font-size: 20px;
    text-decoration: none;
    color: inherit;
  }

  .header-right,
  .header-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-avatar-div {
    background-color: #ffffff;
    width: 50px;
    height: 50px;
  }

  .header-user-count {
    font-size: 18px;
    margin-right: 8px;
  }

  .header-message-count {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    background-color: #27ae60;
    color: #ffffff;

    .header-icon.menu {
      display: block;
      margin-right: 20px;
      fill: white;
    }

    .header-icon.hide-2 {
      display: none;
    }

    .header-link {
      color: white;
      font-size: 18px;
    }

    .header-message-count {
      display: block;
    }
  }
`;

export default roomHeader;
