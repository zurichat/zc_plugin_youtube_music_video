import { useEffect, useState } from "react";
import PlaylistItem from "./playlistItem";
import userService from "../../services/userService";

interface Props {
	songs: Song[];
}

function PlaylistItems({ songs }: Props) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		userService.getWorkspaceUsers().then(setUsers).catch(console.log);
	}, []);

	return (
		<div className="playlist-item-group" style={{ paddingBottom: "10px" }}>
			{songs.map((song, index) => (
				<PlaylistItem key={index} song={song} users={users} />
			))}
		</div>
	);
}

export default PlaylistItems;
