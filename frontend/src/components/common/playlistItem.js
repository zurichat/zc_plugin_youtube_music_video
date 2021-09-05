// @ts-nocheck

import React from "react";
import styled from "styled-components";

import Like from "./like";

import option from "../../media/option.svg";

function PlaylistItem({
  title,
  addedBy,
  duration,
  liked,
  albumCover,
  onLike,
  likes,
}) {
  return (
    <Wrapper>
      <img src={albumCover} alt="album cover" className="item-albumCover" />

      <div className="item-info">
        <div className="item-title">{title}</div>
        <div className="item-addedBy">Added by {addedBy}</div>
      </div>

      <div className="item-group">
        <div className="item-duration">{duration} mins</div>
        <div className="item-like">{likes} likes</div>
        <div className="item-icons">
          <Like liked={liked} onLike={onLike} />
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

const media = {
  mobile: "@media(max-width: 768px)",
};

const mediaTwo = {
  mobile: "@media(max-width: 975px)",
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;

  transition: all 150ms ease-in-out;
  margin-bottom: 3px;

  ${media.mobile} {
    width: 375px;
    height: 77px;
    padding: 1rem;
  }

  ${mediaTwo.mobile} {
    padding: 1rem;
  }

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 184, 124, 0.3);
  }

  .item-albumCover {
    display: block;
    margin-right: 20px;
    width: 70px;
    height: 100%;

    ${media.mobile} {
      width: 32px;
      height: 32px;
      margin-right: 0.5rem;
    }
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

    ${media.mobile} {
      width: 100%;
      height: 11px;
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

    ${media.mobile} {
      width: 30px;
      height: auto;
      padding: 0.5rem;
      justify-content: center;
    }
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
