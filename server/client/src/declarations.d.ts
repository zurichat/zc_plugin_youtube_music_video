declare module "*.html" {
	const rawHtmlFile: string;
	export = rawHtmlFile;
}

declare module "*.bmp" {
	const src: string;
	export default src;
}

declare module "*.gif" {
	const src: string;
	export default src;
}

declare module "*.jpg" {
	const src: string;
	export default src;
}

declare module "*.jpeg" {
	const src: string;
	export default src;
}

declare module "*.png" {
	const src: string;
	export default src;
}

declare module "*.webp" {
	const src: string;
	export default src;
}

declare module "*.svg" {
	const src: string;
	export default src;
}

declare module "@zuri/utilities" {
	export const GetUserInfo, GetWorkspaceUser, SubscribeToChannel;
}

declare module "@zuri/zuri-ui" {
	export const MessageBoard;
}
