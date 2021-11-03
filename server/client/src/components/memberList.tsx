import { useState } from 'react';
import styled from 'styled-components';

import MemberItem from './common/memberItem';
import { selectShowMemberList, showedMemberList } from '../app/uiSlice';

import HeaderIcon from '../media/member-list-icon.svg';
import CloseIcon from '../media/close-black.svg';
import SearchIcon from '../media/search.svg';
import { useAppDispatch, useAppSelector } from '../app/hooks';

interface Props {
	members: User[];
}

const MemberList = ({ members }: Props) => {
  const dispatch = useAppDispatch();

  const showMemberList = useAppSelector(selectShowMemberList);

  const [query, setQuery] = useState('');

  if (!showMemberList) return null;

  const handleEscape = (e) => {
    const { target, code, key } = e;

    const ckey = code || key;
    if (ckey === 'Escape' || target.dataset.close === 'close') {
      dispatch(showedMemberList(false));
    }
  };

  const filtered = query
    ? members.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
    : members;

  return (
    <Wrapper onClick={handleEscape} data-close="close">
      <div className="container">
        <div className="header-container">
          <div className="title-container">
            <div className="align-center">
              <img src={HeaderIcon} alt=" Header icon" />
              {' '}
              <h3>Music room</h3>
            </div>
            <img
              style={{ cursor: 'pointer' }}
              onClick={() => {
							  dispatch(showedMemberList(false));
              }}
              src={CloseIcon}
              alt="Close Icon"
            />
          </div>

          <div>
            <p className="member-tag">
              Members
              {' '}
              <span>{filtered.length}</span>
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
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>
        </div>
        <div className="member">
          {filtered.map((item, i) => (
            <MemberItem
              key={i}
              status
              name={item.name}
              desc=""
              avatar={item.avatar}
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
	z-index: 111;
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
