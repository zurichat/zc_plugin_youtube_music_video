// @ts-nocheck

import React from "react";

import like from "../../media/like.svg";
import like_filled from "../../media/like-filled.svg";

function Like({ liked, onClick }) {
  return (
    <img
      src={liked ? like_filled : like}
      alt="liked"
      onClick={() => onClick(liked)}
      style={{ cursor: "pointer", width: "20px", height: "20px" }}
    />
  );
}

export default Like;
