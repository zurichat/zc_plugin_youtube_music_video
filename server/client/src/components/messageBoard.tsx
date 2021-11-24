import { MessageBoard } from "@zuri/zuri-ui";

function Message() {
	const chatSidebarConfig = {
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

	return <MessageBoard chatsConfig={chatSidebarConfig} />;
}

export default Message;
