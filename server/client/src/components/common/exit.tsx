import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { uiDispatch } from "../../store/uiSlice";

import search from "../../media/search.svg";
import beat from "../../media/beat.svg";
import close from "../../media/close-popup.svg";

import log from "../../services/logService";
import userService from "../../services/userService";

const Exit = () => {
  const [change, setChange] = useState("about");

  const handleLeaveRoom = () => {
    log.success("Goodbye user");

    userService.removeUserFromRoom();
    uiDispatch.showExitModal(false);
    uiDispatch.loading(true);

    setTimeout(() => {
      toast.dismiss();
      uiDispatch.loading(false);
    }, 1800);

    setTimeout(() => {
      uiDispatch.showModal(true);
    }, 2500);
  };

  return (
    <Modal className="leave-container">
      <div className="leave">
        <div className="title">
          <h1>
            <img src={beat} alt="icon" />
            Music room
          </h1>
          <img
            src={close}
            alt="icon"
            onClick={() => uiDispatch.showExitModal(false)}
            className="close"
          />
        </div>
        <nav>
          <button
            onClick={() => setChange("about")}
            className={` ${change === "about" ? "room-active" : ""}`}
          >
            About
          </button>
          <button
            onClick={() => setChange("member")}
            className={` ${change === "member" ? "room-active" : ""}`}
          >
            Members12
          </button>
        </nav>
        {change === "about" ? (
          <div className="main">
            <div className="room">
              <p>Room name</p>
              <h3>Music room</h3>
            </div>
            <div className="room-desc">
              <div>
                Description
                <p>Edit</p>
              </div>
              <input type="text" placeholder="Add a description..." />
            </div>
            <div className="leave-room" onClick={handleLeaveRoom}>
              Leave room
            </div>
          </div>
        ) : null}
        {change === "member" ? (
          <div className="room-member">
            <div className="search">
              <img src={search} alt="icon" />
              <input placeholder="Find People" />
            </div>
            <div className="member">
              <p>memeber</p>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default Exit;

const Modal = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  margin: 0;
  padding: 0;

  .leave {
    padding: 0 10px;
    background: white;
    max-width: 500px;
    margin: 80px auto;
    min-height: 300px;
  }

  .leave h1 {
    color: #1d1c1d;
    font-size: 28px;
  }

  .leave h1 img {
    padding-right: 10px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  .close {
    cursor: pointer;
  }

  nav {
    display: flex;
    border-bottom: 1px solid #f6f6f6;
    padding: 0;
    margin: 0;
  }

  nav button {
    border: none;
    background: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    padding-left: 0;
    margin-right: 30px;
    padding-right: 3px;
    font-weight: bold;
    padding-bottom: 5px;
  }

  .main {
    margin: 10px 0;
    border: 1px solid #f6f6f6;
  }

  .room,
  .room-desc {
    border-bottom: 1px solid #f6f6f6;
    padding: 0 10px;
    margin: 0;
  }

  .room-desc p {
    color: #00b87c;
    font-size: 14px;
  }

  .room p,
  .room h3,
  .room-desc {
    color: #616061;
    font-size: 14px;
    margin: 5px;
  }

  .room-desc input {
    font-size: 15px;
    padding: 0;
    margin: 0;
  }

  .room-desc div {
    display: flex;
    justify-content: space-between;
    color: #616061;
    align-items: center;
  }

  .room-desc input {
    border: none;
    outline: none;
    color: #1d1c1d;
    font-weight: bold;
  }

  .leave-room {
    padding: 15px;
    color: #f40101;
    cursor: pointer;
    font-weight: bold;
  }

  .room-member {
    padding: 10px 0;
  }

  .search {
    display: flex;
    border: 1px solid #00b87c;
    align-items: center;
    padding: 5px;
  }

  .search input {
    background: none;
    border: none;
    outline: none;
    width: 90%;
  }

  .member {
    padding: 10px;
    color: black;
  }
  .room-active {
    border-bottom: 2px solid #f40101;
  }

  .arrow {
    cursor: pointer;
    padding: 0 5px;
    transform: translateY(3px);
  }
`;
