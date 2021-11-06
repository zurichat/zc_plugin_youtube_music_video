/// <reference types="react" />
interface Props {
    getSongByUrl: (url: string) => Song;
}
declare const _default: import("react-redux").ConnectedComponent<(props: Props) => JSX.Element, import("react-redux").Omit<Props, "getSongByUrl">>;
export default _default;
