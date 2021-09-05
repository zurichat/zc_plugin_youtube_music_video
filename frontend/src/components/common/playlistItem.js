// @ts-nocheck

import React from "react";
import styled from "styled-components";

import Like from "./like";

import option from "../../media/option.svg";

function PlaylistItem({ title, addedBy, duration, liked, albumCover, onLike }) {
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
<<<<<<< HEAD
          <Like liked={liked} />
          <img
            src={option}
            alt="option img"
            style={{
              cursor: "pointer",
              width: "20px",
              height: "20px",
              marginLeft: "0.5rem",
            }}
=======
          <Like liked={liked} onLike={onLike} />
          <img
            src={option}
            alt="option img"
            style={{ cursor: "pointer", width: "20px", height: "20px" }}
>>>>>>> 5c9119958bf5b5c5cb780e3ec53f4464b34e1a43
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
  height: 77px;
  font-family: "Lato", sans-serif;
  /* box-shadow: 0 4px 4px rgba(0, 36, 24, 0.04); */
  transition: all 150ms ease-in-out;

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
    height: 70%;

    ${media.mobile} {
      width: 80%;
      padding: 0.5rem;
      justify-content: center;
      margin-right: 0.5rem;
    }

    ${mediaTwo.mobile} {
      width: 75%;
      padding: 0.5rem;
      justify-content: center;
      margin-right: 0.5rem;
    }
  }

  .item-title {
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 6px;

    ${media.mobile} {
      width: 100%;
      height: auto;
      font-size: 12px;
    }

    ${mediaTwo.mobile} {
      width: 100%;
      height: auto;
      font-size: 10px;
    }
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

    ${media.mobile} {
      width: 25%;
      height: auto;
      padding: 0.5rem;

      ${mediaTwo.mobile} {
        width: 30%;
        padding: 1rem;

        .item-duration {
          font-size: 12px;
          width: 50%;
        }
      }
    }
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
`;

export default PlaylistItem;
