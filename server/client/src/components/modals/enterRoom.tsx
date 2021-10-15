import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import userService from "../../services/userService";
import { uiDispatch, uiSelect } from "../../store/uiSlice";
import { userDispatch, userSelect } from "../../store/usersSlice";
import Button from "../common/button";

interface Props {}

function EnterRoom(props: Props) {
	const isMember = useSelector(userSelect.isMember);
	// const show = useSelector(uiSelect.enterModal);

	// if (!show) return null;

	console.log({ isMember });

	if (isMember) return null;

	useEffect(() => {
		userService
			.isMember()
			.then(value => userDispatch.setMembership(value))
			.catch(console.log);
	}, []);

	const handleJoin = () => {
		userService
			.addMember()
			.then(() => userDispatch.setMembership(true))
			.catch(error => {
				toast.error("An error occured. Please try again later.");
				console.error(error.message);
			});
	};

	const handleDetails = () => {};

	return (
		<Wrapper>
			<div>You are viewing Music Plugin</div>

			<div className="enter-btns">
				<Button
					color="secondary"
					className="enter-join-btn"
					onClick={handleJoin}
				>
					Join Plugin
				</Button>

				<Button color="primary" onClick={handleDetails}>
					See More Details
				</Button>
			</div>

			<div>
				Back to <a href="#">Plugin Browser</a>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: absolute;
	bottom: 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 120px;
	width: 100%;
	padding: 50px;
	background: #ececec;
	z-index: 10;

	.enter-btns {
		display: flex;
		justify-content: center;
		margin: 10px 0;
	}

	.enter-join-btn {
		margin-right: 10px !important;
	}
`;

export default EnterRoom;
