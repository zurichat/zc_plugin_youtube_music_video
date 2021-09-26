import styled from "styled-components";
import Illustration from "../../media/emptyScreen.svg";

import { uiDispatch } from "../../store/uiSlice";

import PasteUrl from "./pasteUrl";

const EmptyScreen = () => {
  const handleClick = () => {
    uiDispatch.showPasteUrl(true);
  };

  return (
    <Wrapper>
      <PasteUrl />

      <div className="empty_container">
        <img src={Illustration} alt="add songs illustration" />
        <h3 className="heading_3">There are no songs here!</h3>
        <p className="text">Start adding your songs</p>
        <button className="btn" onClick={handleClick}>
          Add songs
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  padding: 40px 0 84px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .empty_container {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    max-width: 309px;
    height: fit-content;
  }

  .heading_3 {
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #242424;
    margin: 24px 0 0 0;
  }

  .btn {
    background: #00b87c;
    box-shadow: 2px 2px 2px rgba(0, 36, 24, 0.04);
    border-radius: 3px;
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    padding: 12px 18px;
    border: none;
    cursor: pointer;
  }

  .btn {
    display: none;
  }

  .text {
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #999999;
    margin: 16px 0 0;
  }

  @media screen and (max-width: 540px) {
    padding: 32px 0 224px;
    background: transparent;
    .text {
      font-size: 12px;
      line-height: 14px;
      margin: 8px 0 24px;
    }

    img {
      max-width: 179px;
    }

    .btn {
      display: block;
      padding: 16.5px 70.5px;
    }

    .heading_3 {
      font-size: 18px;
      line-height: 21px;
    }
  }
`;

export default EmptyScreen;
