import React from "react";
import styled from "styled-components";
import CopyIcon from "../../media/copy-icon.svg";
import ShareIcon from "../../media/share-icon.svg";
import DeleteIcon from "../../media/delete-icon.svg";

const OptionMenu = () => {
  return (
    <Wrapper>
      <div className="option-item">
        <img src={CopyIcon} alt="" />
        <span>Copy link</span>
      </div>
      <div className="option-item">
        <img src={ShareIcon} alt="" />
        <span>Share</span>
      </div>
      <div className="option-item">
        <img src={DeleteIcon} alt="" />
        <span>Delete</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  // bottom: 30px;
  width: 100%;
  max-width: 200px;
  right: 0px;
  box-shadow: 0px 2px 10px #d7d7d7;
  border-radius: 4px;
  background: #ffffff;

  .option-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    height: 40px;
    &:hover {
      background: #f6f6f6;
      cursor: pointer;
    }
  }

  span {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 170%;
    color: #1d1c1d;
    margin-left: 16px;
  }
`;

export default OptionMenu;
