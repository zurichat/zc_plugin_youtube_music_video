import React from "react";
import styled from "styled-components";

import Like from "./like";

// @ts-ignore
import option from "../../media/option.svg";

function PlaylistItem(props) {
  const { title, addedBy, duration, liked, albumCover } = props;

  const handleLike = () => {};

  return (
    <Wrapper>
      <img src={albumCover} alt="album cover" className="item-albumCover" />

      <div className="item-info">
        <div className="item-title">{title}</div>
        <div className="item-addedBy">
          Added by <span>{addedBy}</span>
        </div>
      </div>

      <div className="item-group">
        <div className="item-duration">{duration} mins</div>
        <div className="item-like">{235} likes</div>
        <div className="item-icons">
          <Like liked={liked} onLike={handleLike} />
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
  background: #fff;
  font-family: "Lato", sans-serif;
  transition: all 200ms ease-in-out;
  margin-bottom: 8px;
  box-shadow: 0px 4px 6px rgba(0, 36, 24, 0.04);
  height: 66px;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 184, 124, 0.4);
    /* transform: translateX(2px); */
  }

  .item-albumCover {
    display: block;
    margin-right: 20px;
    margin-left: 10px;
    width: 100%;
    max-width: 50px;
    flex-grow: 0;
    height: 50px;
  }

  .item-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 70%;
  }

  .item-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 6px;
    width: 200px;
  }

  .item-addedBy {
    font-size: 13px;
    span {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .item-group {
    flex-basis: 48%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .item-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60px;
  }

  .item-like {
    color: rgba(153, 153, 153, 1);
  }

  @media screen and (max-width: 780px) {
    .item-group {
      flex-basis: 60px;
    }
    .item-duration,
    .item-like {
      display: none;
    }
  }

  @media screen and (max-width: 460px) {
    .item-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 6px;
    }

    .item-albumCover {
      display: block;
      margin-right: 10px;
      width: 50px;
      height: 100%;
    }
  }
`;

export default PlaylistItem;
