import React from "react";

import like from "../../media/like.svg";
import like_filled from "../../media/like-filled.svg";

interface Props {
  liked: boolean;
  onLike: () => void;
  className?: string;
}

function Like({ liked, onLike, className }: Props) {
  return (
    <img
      data-like="like" // do not remove this.
      src={liked ? like_filled : like}
      alt="liked"
      onClick={onLike}
      className={className}
      style={{
        zIndex: 1,
        display: "block",
        cursor: "pointer",
        width: "20px",
        height: "20px",
        transition: "all 200ms ease-in-out",
      }}
    />
  );
}

export default Like;
