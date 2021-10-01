import styled from "styled-components";
import HeaderIcon from "../media/member-list-icon.svg";
import CloseIcon from "../media/close-black.svg";
import SearchIcon from "../media/search.svg";
import MemberItem from "./common/memberItem";
import { uiDispatch, uiSelect } from "../store/uiSlice";
import { useEffect, useState } from "react";
import httpService from "../services/httpService";
import { useSelector } from "react-redux";

const MemberList = () => {
  const showMemberList = useSelector(uiSelect.showMemberList);
  const { membersListEndpoint } = httpService.endpoints;
  const [memberList, setMemberList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(" ");

  useEffect(() => {
    httpService
      .get(membersListEndpoint)
      .then((res) => {
        setMemberList(res.data.data);
      })
      .catch((err) => console.log(err.message));
  }, [showMemberList]);

  if (!showMemberList) return null;

  const handleEscape = (e) => {
    if (e.code === "Escape" || e.target.dataset.close === "close") {
      uiDispatch.showMemberList(false);
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();
    const searchWord = event.target.value;
    setSearchTerm(searchWord);
    const newMemberList = memberList.filter((value) => {
      return value.user_name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setSearchList(newMemberList);
  };

  return (
    <Wrapper onClick={handleEscape} data-close="close">
      <div className="container">
        <div className="header-container">
          <div className="title-container">
            <div className="align-center">
              <img src={HeaderIcon} alt=" Header icon" /> <h3>Music room</h3>
            </div>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                uiDispatch.showMemberList(false);
              }}
              src={CloseIcon}
              alt=""
            />
          </div>

          <div>
            <p className="member-tag">
              Members <span>{memberList.length}</span>
            </p>
          </div>
        </div>

        <div className="list-container">
          <form action="#">
            <img src={SearchIcon} alt="search icon" />
            <input
              type="text"
              placeholder="Find People"
              autoFocus
              onKeyDown={handleEscape}
              onChange={searchHandler}
              value={searchTerm}
            />
          </form>
        </div>
        <div className="member">
          {searchTerm === " "
            ? memberList.map((item, i) => (
                <MemberItem
                  key={i}
                  display_name={item.user_name}
                  status={true}
                  name=""
                  desc=""
                  avatar={item.avatar}
                  stack={item.stack}
                />
              ))
            : searchList.map((item, i) => (
                <MemberItem
                  key={i}
                  display_name={item.user_name}
                  status={true}
                  name=""
                  desc=""
                  avatar={item.avatar}
                  stack={item.stack}
                />
              ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  position: absolute;
  top: 1;
  box-sizing: border-box;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(64, 79, 74, 0.5);
  top: 0px;
  left: 0px;
  z-index: 100;
  h3 {
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 32px;
    color: #1d1c1d;
    margin-left: 8px;
  }
  .member-tag {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 21px;
    color: #000000;
    padding-bottom: 2px;
    /* border-bottom-radius: 3px; */
    border-bottom: 3px solid #00b87c;
    width: fit-content;
  }
  .member-tag span {
    color: #626062;
  }
  .container {
    box-shadow: 1px 1px 44px rgba(64, 64, 64, 0.5);
    border-radius: 4px;
    width: 100%;
    max-width: 464px;
    background-color: #fff;
    height: fit-content;
    max-height: 536px;
  }
  .header-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 24px 0 24px;
    border-bottom: 1px solid #f6f6f6;
  }
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .align-center {
    display: flex;
    align-items: center;
  }
  form {
    position: relative;
  }
  form > img {
    position: absolute;
    top: 12px;
    left: 16px;
    width: 16px;
  }
  form > input {
    border: 1px solid #00b87c;
    box-sizing: border-box;
    border-radius: 4px;
    height: 40px;
    font-size: 13px;
    line-height: 15px;
    width: -webkit-fill-available;
    color: #616061;
    padding-left: 40px;
  }
  form > input:focus {
    outline: none;
  }
  .list-container {
    padding: 19px 20px 0 20px;
  }
  .member {
    overflow: auto;
    padding: 24px;
    height: -webkit-fill-available;
    max-height: 371px;
  }
  .member::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  .member::-webkit-scrollbar-thumb {
    background-color: #00b87c;
    border-radius: 10px;
  }
  @media screen and (max-width: 480px) {
    padding: 0 24px;
    border-radius: 8px;
  }
`;

export default MemberList;
