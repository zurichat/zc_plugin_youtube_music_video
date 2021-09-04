// @ts-nocheck

import React from "react";
import styled from "styled-components";

import Like from "./like";

import option from "../../media/option.svg";

function PlaylistItem({ title, addedBy, duration, liked, albumCover }) {
  return (
    <Wrapper>
      <img src={albumCover} alt="album cover" className="item-albumCover" />

      <div className="item-info">
        <div className="item-title">{title}</div>
        <div className="item-addedBy">Added by {addedBy}</div>
      </div>

      <div className="item-group">
        <div className="item-duration">{duration} mins</div>

        <div className="item-icons">
          <Like liked={liked} />
          <img
            src={option}
            alt="option img"
            style={{ cursor: "pointer", width: "20px", height: "20px" }}
          />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 77px;

  .item-albumCover {
    display: block;
    margin-right: 20px;
    width: 70px;
    height: 100%;
  }

  .item-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 70%;
  }

  .item-title {
    font-weight: 500;
    font-size: 16px;
  }

  .item-addedBy {
    font-size: 13px;
  }

  .item-group {
    flex-basis: 48%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .item-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60px;
  }
`;

export default PlaylistItem;
