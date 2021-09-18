/// <reference types="react" />
import Song from "../../types/song";
interface Props {
    songs: Song[];
}
declare function PlaylistItems({ songs }: Props): JSX.Element;
export default PlaylistItems;
