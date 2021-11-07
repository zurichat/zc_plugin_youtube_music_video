/// <reference types="react" />
interface Props {
    status: boolean;
    name: string;
    desc: string;
    avatar: string;
}
declare const MemberItem: ({ name, status, desc, avatar }: Props) => JSX.Element;
export default MemberItem;
