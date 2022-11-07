import { MessageBoard } from "@zuri/ui";
import { chatData } from "../utils/mockdata";

function Message() {
	const messageBoardConfig = {
		chatHeader: "Chats",
		showChatSideBar: true,

		sendChatMessageHandler: msg => {
			alert(`${msg} here`);
			console.log({ msg }, " here");
		},

		currentUserData: {
			username: "Aleey",
			imageUrl: ""
		},

		messages: []
	};

	return <MessageBoard chatsConfig={messageBoardConfig} />;
}

export default Message;
