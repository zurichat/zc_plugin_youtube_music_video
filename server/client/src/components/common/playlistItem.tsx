import styled from "styled-components";

import Song from "../../types/song";

import { playerAction } from "../../store/playerSlice";
import LikeOptionCount from "./likeOptionCount";

interface Props {
  song: Song;
}

function PlaylistItem(props: Props) {
  const {
    title,
    addedBy,
    albumCover,
    id: songId,
    duration,
    likedBy,
  } = props.song;

  const handlePlay = (e) => {
    if (e.target.dataset.like) return;
    if (e.target.dataset.option) return;

    playerAction.changeSong(props.song);
    playerAction.dispatchShowPlayer(true);
    playerAction.dispatchPlaying(true);
  };

  return (
    <Wrapper onClick={handlePlay}>
      <img src={albumCover} alt="album cover" className="item-albumCover" />

      <div className="item-info">
        <div className="item-title">{title}</div>

        <div className="item-addedBy">
          Added by <span>{addedBy.trim() || "Pidoxy"}</span>
        </div>
      </div>

      <div className="item-likeOptionCount">
        <LikeOptionCount {...{ songId, duration, likedBy }} />
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
  cursor: pointer;

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
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 70%;
    margin-right: 100px;
  }

  .item-title {
    flex-basis: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 6px;
  }

  .item-addedBy {
    font-size: 13px;
    span {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .item-likeOptionCount {
    flex-grow: 1;
  }

  @media screen and (max-width: 614px) {
    .item-info {
      width: 150px;
      margin-right: 50px;
    }
  }

  @media screen and (max-width: 460px) {
    .item-info {
      margin-right: 30px;
    }

    .item-title {
      margin-bottom: 6px;
    }

    .item-albumCover {
      display: block;
      margin-right: 10px;
    }
  }
`;

export default PlaylistItem;
