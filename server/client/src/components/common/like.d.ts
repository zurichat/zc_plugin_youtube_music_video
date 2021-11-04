/// <reference types="react" />
interface Props {
    liked: boolean;
    onLike: () => void;
    className?: string;
}
declare function Like({ liked, onLike, className }: Props): JSX.Element;
export default Like;
