import React from "react";

import like from "../../media/like.svg";
import like_filled from "../../media/like-filled.svg";

interface Props {
  liked: boolean;
  onLike: () => void;
}

function Like({ liked, onLike }: Props) {
  return (
    <img
      src={liked ? like_filled : like}
      alt="liked"
      onClick={onLike}
      style={{
        cursor: "pointer",
        width: "20px",
        height: "20px",
        transition: "all 200ms ease-in-out",
      }}
    />
  );
}

export default Like;
