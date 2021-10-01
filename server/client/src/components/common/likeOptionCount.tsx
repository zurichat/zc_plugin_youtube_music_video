import { useSelector } from "react-redux";
import styled from "styled-components";

import songService from "../../services/songService";
import { userSelect } from "../../store/usersSlice";

import Like from "./like";
import option from "../../media/option.svg";

// interface Props {
//   duration?: string;
//   likedBy: string[];
//   songId: string;
//   handleOption: any;
// }

function LikeOptionCount(props) {
  let { duration, likedBy = [], songId, handleOption } = props;

  console.log({ likedBy });

  const { id: userId } = useSelector(userSelect.currentUser);

  const { length: count } = likedBy;
  const liked = likedBy.some((id) => id === userId);

  const countText =
    count === 0 ? "" : count === 1 ? `1 like` : `${count} likes`;

  const countClasses = duration ? "like-count" : "like-count-player";

  const handleLike = () => {
    songService.likeSong({ songId, userId, like: !liked });
  };

  const formatDuration = (duration: string) => {
    const [h, ...rest] = duration.split(":");
    return (h === "0" ? "" : `${h}:`) + rest.join(":");
  };

  return (
    <Wrapper duration={duration}>
      {duration && (
        <div className="like-duration">{formatDuration(duration)} mins</div>
      )}

      {countText && <div className={countClasses}>{countText}</div>}

      <div>
        <Like className="like-button" liked={liked} onLike={handleLike} />
      </div>

      <img
        onClick={(e) => {
          e.stopPropagation();
          handleOption((state) => !state);
        }}
        data-option="option"
        src={option}
        alt="option img"
        style={{ cursor: "pointer", width: "20px", height: "20px" }}
        className="like-option"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ duration: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;

  & > * {
    margin-right: 25px;
  }

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

  .like-option {
    margin-right: 0;
  }

  @media screen and (max-width: 700px) {
    .like-duration {
      display: none;
    }
  }

  @media screen and (max-width: 506px) {
    .like-count {
      display: none;
    }
  }
`;

export default LikeOptionCount;
