import { useSelector } from "react-redux";
import styled from "styled-components";

import songService from "../../services/songService";
import { userSelect } from "../../store/usersSlice";

import Like from "./like";
import option from "../../media/option.svg";

interface Props {
  duration?: string;
  likedBy: string[];
  songId: string;
}

function LikeOptionCount(props: Props) {
  const { duration, likedBy, songId } = props;

  const { id: userId } = useSelector(userSelect.currentUser);

  const { length: count } = likedBy;
  const liked = likedBy.some((id) => id === userId);

  const countText =
    count === 0 ? "" : count === 1 ? `1 like` : `${count} likes`;

  const countClasses = duration ? "like-count" : "like-count-player";

  const handleLike = () => {
    songService.likeSong({ songId, userId, like: !liked });
  };

  return (
    <Wrapper duration={duration}>
      {duration && <div className="like-duration">{duration} mins</div>}

      {countText && <div className={countClasses}>{countText}</div>}

      <div className="like-icons">
        <Like liked={liked} onLike={handleLike} />

        <img
          data-option="option"
          src={option}
          alt="option img"
          style={{ cursor: "pointer", width: "20px", height: "20px" }}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ duration: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ duration }) =>
    duration ? "space-between" : "flex-start"};
  padding: 1rem;

  .like-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60px;
  }

  .like-count,
  .like-count-player {
    color: rgba(153, 153, 153, 1);
  }

  .like-count-player {
    margin-right: 10px;
  }

  @media screen and (max-width: 1126px) {
    .like-count {
      display: none;
    }
  }

  @media screen and (max-width: 1112px) {
    .like-count {
      display: inline;
    }
  }

  @media screen and (max-width: 780px) {
    justify-content: ${(props) => (props.duration ? "flex-end" : "flex-start")};
    .like-duration,
    .like-count {
      display: none;
    }
  }
`;

export default LikeOptionCount;
