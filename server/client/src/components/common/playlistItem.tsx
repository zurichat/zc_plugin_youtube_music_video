import styled from "styled-components";

import Like from "./like";

import Song from "../../types/song";
import option from "../../media/option.svg";

import { playerAction } from "../../store/playerSlice";
import songService from "../../services/songService";
import { useSelector } from "react-redux";
import { userSelect } from "../../store/usersSlice";

interface Props {
  song: Song;
}

function PlaylistItem(props: Props) {
  const {
    title,
    addedBy,
    duration,
    albumCover,
    id: songId,
    likedBy,
  } = props.song;

  const { id: userId } = useSelector(userSelect.currentUser);

  const { length: count } = likedBy;
  const liked = likedBy.some((id) => id === userId);

  const countText = (count: number) =>
    count === 0 ? "" : count === 1 ? `1 like` : `${count} likes`;

  const handleLike = () => {
    songService.likeSong({ songId, userId, like: !liked });
  };

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
          Added by <span>{addedBy || "Pidoxy"}</span>
        </div>
      </div>

      <div className="item-group">
        <div className="item-duration">{duration} mins</div>

        <div className="item-like">{countText(count)}</div>

        <div className="item-icons">
          <Like liked={liked} onLike={handleLike} />

          <img
            data-option="option"
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
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 70%;
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

  .item-group {
    flex-grow: 1;
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
      justify-content: flex-end;
    }
    .item-duration,
    .item-like {
      display: none;
    }
  }

  @media screen and (max-width: 547px) {
    .item-info {
      width: 150px;
    }
  }

  @media screen and (max-width: 460px) {
    .item-title {
      font-weight: 600;
      /* font-size: 14px; */
      margin-bottom: 6px;
    }

    .item-albumCover {
      display: block;
      margin-right: 10px;
      /* width: 50px;
      height: 100%; */
    }
  }
`;

export default PlaylistItem;
