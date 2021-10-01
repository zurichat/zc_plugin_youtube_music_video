import styled from "styled-components";
import Song from "../../types/song";

import { playerAction } from "../../store/playerSlice";
import LikeOptionCount from "./likeOptionCount";
import { useSelector } from "react-redux";
import { userSelect } from "../../store/usersSlice";

interface Props {
  song: Song;
}

function PlaylistItem(props: Props) {
  const {
    title,
    addedBy,
    albumCover,
    id: songId,
    userId,
    duration,
    likedBy,
  } = props.song;

  const user = useSelector(userSelect.userById(userId));

  const handlePlay = (e) => {
    if (e.target.dataset.like) return;
    if (e.target.dataset.option) return;

    playerAction.changeSong(props.song);
    playerAction.dispatchShowPlayer(true);
    playerAction.dispatchPlaying(true);
  };

  return (
    <Wrapper onClick={handlePlay}>
      <div className="item-group-1">
        <img src={albumCover} alt="album cover" className="item-albumCover" />

        <div className="item-info">
          <div className="item-title">{title}</div>

          <div className="item-addedBy">
            Added by <span>{user?.name ?? addedBy}</span>
          </div>
        </div>
      </div>

      <LikeOptionCount {...{ songId, duration, likedBy }} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fff;
  font-family: "Lato", sans-serif;
  transition: all 200ms ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 36, 24, 0.04);
  height: 50px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 184, 124, 0.4);
  }

  .item-group-1 {
    display: flex;
    justify-items: center;
  }

  .item-albumCover {
    display: block;
    margin-right: 20px;
    margin-left: 10px;
    width: 100%;
    max-width: 50px;
    flex-grow: 0;
    border-radius: 4px;
  }

  .item-info {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .item-title {
    flex-basis: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 15px;
  }

  .item-addedBy {
    font-size: 13px;
    span {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 700px) {
    .item-info {
      width: 200px;
    }
  }

  @media screen and (max-width: 600px) {
    .item-info {
      width: 150px;
    }
    .item-albumCover {
      margin-left: 0;
      margin-right: 10px;
    }
  }
`;

export default PlaylistItem;
