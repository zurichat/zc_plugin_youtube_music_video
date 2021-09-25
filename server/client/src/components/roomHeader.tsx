import { Link } from "react-router-dom";
import styled from "styled-components";

import { uiDispatch, uiSelect } from "../store/uiSlice";

import Exit from "../components/common/exit";

import avatarSvg from "../media/header-avatar.svg";
import groupIconSvg from "../media/header-group-icon.svg";
import menu from "../media/menu.svg";
import arrow from "../media/arrow-down.svg";
import message from "../media/message.svg";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import httpService from "../services/httpService";

const roomHeader = () => {
  const { userCountEndpoint } = httpService.endpoints;
  const [userCount, setUserCount] = useState(0);
  const showChat = useSelector(uiSelect.showChat);

  useEffect(() => {
    httpService
      .get(userCountEndpoint)
      .then((res) => {
        setUserCount(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const showExitModal = useSelector(uiSelect.showExitModal);

  return (
    <Wrapper className="header">
      <div className="header-left">
        {showExitModal && <Exit />}

        <img
          src={menu}
          alt="icon"
          className="header-icon menu"
          onClick={undefined}
        />

        <img src={groupIconSvg} alt="icon" className="header-icon hide-2" />

        <Link
          to="#"
          onClick={() => uiDispatch.showExitModal(true)}
          className="header-link"
        >
          Music Room
          <img src={arrow} alt="icon" className="arrow" />
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
        <div className="header-user-count">{userCount}</div>
        { !showChat &&
        <div>
          <img
            src={message}
            alt="message count"
            className="header-message-count"
            onClick={() => uiDispatch.showChat(true)}
          />
        </div>
        }
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
  z-index: 1;

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
    display: block;
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
  }
`;

export default roomHeader;
