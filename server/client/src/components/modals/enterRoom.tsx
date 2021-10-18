import { toast } from "react-toastify";
import styled from "styled-components";
import userService from "../../services/userService";
import { userDispatch } from "../../store/usersSlice";
import Button from "../common/button";

interface Props {
	isMember: boolean;
}

function EnterRoom(props: Props) {
	if (props.isMember) return null;

	const handleJoin = () => {
		userService
			.addMember()
			.then(() => {
				userDispatch.setMembership(true);
				toast.success("Successfully joined plugin");
			})
			.catch(error => {
				toast.error("An error occured. Please try again later.");
				console.log(error);
			});
	};

	const handleDetails = () => {};

	return (
		<Wrapper>
			<div className="enter-text">You are viewing Music Plugin</div>

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
	height: 100px;
	width: 100%;
	padding: 50px;
	background: #ececec;

	.enter-text {
		font-size: 15px;
		font-weight: 500;
	}

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
