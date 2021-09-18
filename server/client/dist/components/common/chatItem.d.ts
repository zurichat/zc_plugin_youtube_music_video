/// <reference types="react" />
interface Props {
    name: string;
    avatar: string;
    time: number;
    message: string;
}
declare function ChatItem({ name, avatar, time, message }: Props): JSX.Element;
export default ChatItem;
