import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import Parcel from 'single-spa-react/parcel';

import { MessageBoard } from '@zuri/zuri-ui';
import { useEffect, useMemo, useState } from 'react';
import { pluginHeader, headerConfig } from '../utils/config';

// @ts-ignore

// import RoomHeader from "./roomHeader";
import Playlist from './playlist';
import Chat from './chat';
import PasteUrl from './common/pasteUrl';
import EnterRoomModal from './modals/enterRoom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectShowPasteUrl } from '../app/uiSlice';
import userService from '../services/userService';
import { chatData } from '../utils/mockdata';
import { selectIsMember, setMembership } from '../app/usersSlice';

function MusicRoom() {
  const [members, setMembers] = useState([] as User[]);
  const [reload, setReload] = useState(false);

  const showPasteUrl = useAppSelector(selectShowPasteUrl);
  const isMember = useAppSelector(selectIsMember);

  const dispatch = useAppDispatch();

  useEffect(() => {
    userService.getMembers().then(setMembers).catch(console.log);
    userService
      .isMember()
      .then((value) => dispatch(setMembership(value)))
      .catch(console.log);
  }, [reload, isMember]);

  const handleCreateRoomMessages = (message) => {
    console.log('creating a message', message);
  };

  const chatSidebarConfig = useMemo(
    () => ({
      sendChatMessageHandler: (msg) => {
        // dispatch();
      },
      currentUserData: {
        username: 'Aleey',
        imageUrl: '',
      },
      messages: chatData(),

      showChatSideBar: true,
      chatHeader: 'Chats',
    }),
    [],
  );

  return (
    <Wrapper overflowMain={showPasteUrl}>
      <div className="room-main">
        {/* Modals */}
        <PasteUrl />
        <EnterRoomModal isMember={isMember} />

        <div className="toast-holder">
          <ToastContainer
            position="top-center"
            theme="colored"
            autoClose={3000}
            hideProgressBar
            toastClassName="toast-wrapper"
            bodyClassName="toast-body"
          />
        </div>

        <div className="plugin-header">
          <Parcel
            config={pluginHeader}
            wrapWith="div"
            wrapStyle={{ width: '100%' }}
            headerConfig={headerConfig(members, () => setReload(!reload))}
          />
        </div>

        {/* <RoomHeader /> */}

        <Playlist />
      </div>

      <div className="room-chat-container">
        <Chat />
        {/* <MessageBoard chatsConfig={chatSidebarConfig} /> */}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ overflowMain: boolean }>`
	position: relative;
	box-sizing: border-box;
	display: flex;
	margin: 0;
	background-color: rgb(240, 240, 240);
	min-height: 94vh;
	max-height: 94vh;

	.plugin-header {
		position: sticky;
		top: 0px;
		z-index: 100;
	}

	.room-main {
		flex-grow: 1;
		overflow-y: ${(props) => (props.overflowMain ? 'hidden' : 'scroll')};
		position: relative;
		margin-right: 10px;
		background-color: white;
	}

	.room-chat-container {
		margin-top: 5px;
	}

	.room-main::-webkit-scrollbar,
	.room-chat-container::-webkit-scrollbar {
		width: 5px;
	}

	.room-main::-webkit-scrollbar-thumb,
	.room-chat-container::-webkit-scrollbar-thumb {
		width: 6px;
		background-color: #00b87c;
	}

	.toast-holder {
		position: relative;
		display: flex;
		justify-content: center;
		flex-grow: 1;
	}

	.Toastify__toast-container {
		position: absolute;
		top: 1px;
		width: 100%;
		right: 1px;

		.Toastify__toast--success {
			background-color: #cbffee;
			color: black;
			display: flex;
			justify-content: center;
		}

		.Toastify__toast--error {
			background: #fff1f3;
			color: red;
			display: flex;
			justify-content: center;
		}

		.toast-body {
			display: flex;
			justify-content: center;
		}
	}

	@media screen and (max-width: 1120px) {
		justify-content: center;

		.room-main {
			margin: 0;
		}

		.room-chat-container {
			position: fixed;
			top: 40px;
			// background: rgb(240, 240, 240);
			background: none;
			flex-basis: 40%;
			display: flex;
			justify-content: center;
			z-index: 111;
			max-height: 400px;
		}
	}
`;

export default MusicRoom;
