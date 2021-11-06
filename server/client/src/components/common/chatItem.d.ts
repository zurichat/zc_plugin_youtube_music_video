/// <reference types="react" />
declare function ChatItem({ onCancel, onResend, id, name, avatar, time, message, userId, notSent, failed, users }: {
    onCancel: any;
    onResend: any;
    id: any;
    name: any;
    avatar: any;
    time: any;
    message: any;
    userId: any;
    notSent?: boolean;
    failed?: boolean;
    users: any;
}): JSX.Element;
export default ChatItem;
