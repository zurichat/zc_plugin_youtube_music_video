/// <reference types="react" />
import Song from "../../types/song";
interface Props {
    getSongById: (id: string) => Song;
}
declare const _default: import("react-redux").ConnectedComponent<(props: Props) => JSX.Element, import("react-redux").Omit<Props, "getSongById">>;
export default _default;
