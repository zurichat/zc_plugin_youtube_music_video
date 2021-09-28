import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { uiDispatch, uiSelect } from "../store/uiSlice";
import httpService from "../services/httpService";

import menu from "../media/menu.svg";
import message from "../media/message.svg";
import RoomIcon from "../media/musicRoomIcon.svg";
import avatar1 from "../media/avatar-1.svg";
import avatar2 from "../media/avatar-2.svg";
import avatar3 from "../media/avatar-3.svg";

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

  return (
    <Wrapper>
      <div className="header-left">
        <img
          src={menu}
          alt="icon"
          className="header-icon menu"
          onClick={undefined}
        />

        <img src={RoomIcon} alt="icon" className="header-icon hide-2" />

        <span className="header-link">Music Room</span>
      </div>
      <div className="header-right">
        <div
          className="header-right-flex"
          onClick={() => uiDispatch.showMemberList(true)}
        >
          <div className="header-avatar">
            <div className="pc-avatars">
              <img className="avatar-1" src={avatar1} alt="avatar name" />
              <img className="avatar-2" src={avatar2} alt="avatar name" />
              <img className="avatar-3" src={avatar3} alt="avatar name" />
            </div>
            <div className="mobile-avatar">
              <img src={avatar3} alt="" />
            </div>
          </div>
          <div className="header-user-count">{userCount}</div>
        </div>
        <div>
          {/*  for pc */}
          {!showChat && (
            <img
              style={{ cursor: "pointer" }}
              src={message}
              alt="message count"
              className="header-message-count"
              onClick={() => uiDispatch.showChat(true)}
              />
              )}

          {/* for mobile */}
          <img
            src={message}
            alt="message count"
            className="header-message-count-mobile"
            onClick={() => uiDispatch.showChat(true)}
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
  align-items: center;
  justify-content: space-between;
  background: #00b87c;
  border-radius: 1px 0px;
  height: 44px;
  padding: 0 16px;
  color: #fff;
  z-index: 1;

  img {
    height: 24px !important;
  }

  .header-icon {
    display: block;
    margin-right: 8px;
  }

  .header-icon.menu {
    display: none;
    cursor: pointer;
  }

  .mobile-avatar {
    display: none;
  }

  .header-link {
    display: flex;
    align-items: center;
    font-weight: 700;
    line-height: 32px;
    border-radius: 4px;
    font-size: 18px;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  .header-link img {
    margin-left: 10px;
    width: 20px;
    height: 20px;
  }

  .header-right {
    display: flex;
    align-items: center;
    .header-message-count {
      margin-left: 24px;
    }
  }

  .header-right,
  .header-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-right-flex {
    display: flex;
    align-items: center;
    padding: 0 8px 0 3px;
    background: #01d892;
    border: 1px solid #01d892;
    box-sizing: border-box;
    border-radius: 4px;
    height: 30px;
    cursor: pointer;
  }

  .header-avatar {
    display: flex;
    height: -webkit-fill-available;
    align-items: center;
    position: relative;
    width: 64px;
  }

  .header-user-count {
    font-size: 15px;
    line-height: 12px;
    text-align: center;
    margin-left: 5px;
  }

  .pc-avatars {
    display: flex;
    align-items: center;
    height: -webkit-fill-available;
  }

  .avatar-1,
  .avatar-2,
  .avatar-3 {
    position: absolute;
    width: 24px;
    border: 1px solid #01d892;
    border-radius: 4px;
  }

  .avatar-1 {
    z-index: 10;
  }

  .avatar-2 {
    z-index: 5;
    left: 19px;
  }

  .avatar-3 {
    left: 39px;
  }

  /* .mobile {
    display: none;
  } */

  .header-message-count {
    margin-left: 40px !important;
    display: block;
  }

  .header-message-count-mobile {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    .mobile-avatar {
      display: flex;
    }

    .header-icon.menu {
      display: block;
      margin-right: 24px;
      width: 18px;
      fill: white;
    }

    /* .mobile {
      display: none !important;
    } */

    .pc-avatars,
    .arrow {
      display: none;
    }

    .header-link {
      font-size: 15px;
      line-height: 15px;
      color: #ffffff;
    }

    .header-right-flex {
      background-color: transparent;
      border-color: #ffffff;
      padding: 0px 3px;
    }

    .header-avatar {
      width: 24px;
    }

    .header-user-count {
      font-size: 15px;
      line-height: 12px;
    }

    .header-message-count-mobile {
      display: block !important;
      margin-left: 24px !important;
    }

    .header-message-count {
      display: none;
    }
  }
`;

export default roomHeader;
