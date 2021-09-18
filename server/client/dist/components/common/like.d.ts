/// <reference types="react" />
interface Props {
    liked: boolean;
    onLike: () => void;
}
declare function Like({ liked, onLike }: Props): JSX.Element;
export default Like;
