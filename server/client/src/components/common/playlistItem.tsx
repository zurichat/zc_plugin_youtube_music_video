import styled from "styled-components";

import Song from "../../types/song";

import { playerAction } from "../../store/playerSlice";
import LikeOptionCount from "./likeOptionCount";
import OptionMenu from "./optionMenu";
import { useEffect, useState } from "react";

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
    url,
  } = props.song;

  const [showOption, setShowOption] = useState(false);

  const handlePlay = (e) => {
    if (e.target.dataset.like) return;
    if (e.target.dataset.option) return;

    playerAction.changeSong(props.song);
    playerAction.dispatchShowPlayer(true);
    playerAction.dispatchPlaying(true);
  };

  const handleOption = (e) => {
    setShowOption(e);
  };

  useEffect(() => {
    const onClickOutside = () => {
      setShowOption(false);
    };
    window.addEventListener("click", onClickOutside), false;
    return () => {
      window.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <OptionMenu
        option={showOption}
        toggleOption={handleOption}
        {...{ addedBy, url, songId }}
      />
      <div className="item-group-1">
        <img src={albumCover} alt="album cover" className="item-albumCover" />
        <div className="item-info">
          <div className="item-title">{title}</div>

          <div className="item-addedBy">
            Added by <span>{addedBy /*.trim()*/ || "Pidoxy"}</span>
          </div>
        </div>
      </div>

      <LikeOptionCount {...{ songId, duration, likedBy, handleOption }} />
      <div className="handle-play" onClick={handlePlay}></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: #fff;
  font-family: "Lato", sans-serif;
  transition: all 200ms ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 36, 24, 0.04);
  height: 50px;
  margin-bottom: 8px;
  cursor: pointer;

  .handle-play {
    position: absolute;
    width: -webkit-fill-available;
    height: 100%;
    &:hover {
      box-shadow: 0 4px 6px rgba(0, 184, 124, 0.4);
    }
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
