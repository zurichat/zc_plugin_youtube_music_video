import React, { createRef, useEffect, useRef } from "react";
import styled from "styled-components";
import CopyIcon from "../../media/copy-icon.svg";
import ShareIcon from "../../media/share-icon.svg";
import DeleteIcon from "../../media/delete-icon.svg";
import { uiDispatch } from "../../store/uiSlice";
import { toast } from "react-toastify";


const OptionMenu = ({ toggleOption, option, copyUrl }) => {

  let ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      toggleOption && toggleOption();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("contextmenu", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("contextmenu", handleClickOutside, true);
    };
  });

  if (!option) return null;

  function handleCopy() {
    return (
      navigator.clipboard.writeText(copyUrl) &&
      toast.success("Link copied to clipboard")
    );
  }

  function handleDelete() {
    return uiDispatch.showDeleteModal(true);
  }

  return (
    <Wrapper
      ref={ref}
      role="menu"
      onBlur={() => {
        toggleOption(false);
      }}
    >
      <button onClick={handleCopy} className="option-item">
        <img src={CopyIcon} alt="" />
        <span>Copy link</span>
      </button>
      <button className="option-item" onClick={handleDelete}>
        <img src={DeleteIcon} alt="" />
        <span>Delete</span>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 35px;
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
    width: 100%;
    background: transparent;
    border: none;
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

  @media screen and (max-width: 540px) {
    max-width: 160px;
  }
`;

export default OptionMenu;
