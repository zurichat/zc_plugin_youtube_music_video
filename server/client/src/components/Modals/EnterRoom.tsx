import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import authService from "../../services/authService";
import log from "../../services/logService";
import { uiDispatch, uiSelect } from "../../store/uiSlice";
import Button from "../common/button";

function EnterRoom({ setUserCount }) {
  const isLoading = useSelector(uiSelect.isLoading);

  const handleClick = async () => {
    uiDispatch.loading(true);

    try {
      await authService.addToRoom();

      toast.dismiss();

      uiDispatch.showModal(false);
      setUserCount((prev) => 1);

      log.success("Welcome!");
    } catch (e) {
      console.log(e);
    }

    uiDispatch.loading(false);
  };

  return (
    <div className="overlay">
      <Overlay>
        <Container>
          <h2>Join music room</h2>

          <p className="pragraph">
            Join room to gain access to the music playlist added by your
            colleagues and also share your music links with others. Chat and
            music bants.
          </p>

          <Button
            color={isLoading ? "disabled" : "secondary"}
            className="btn"
            onClick={handleClick}
          >
            Join room
          </Button>
        </Container>
      </Overlay>
    </div>
  );
}

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  flex-basis: min(80%, 600px);

  background: #ffffff;
  box-shadow: 1px 1px 44px rgba(64, 64, 64, 0.5);
  border-radius: 4px;
  z-index: 3;
  min-height: 207px;

  display: flex;
  flex-direction: column;
  padding: 15px;

  h2 {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 32px;
    /* identical to box height, or 114% */

    color: #1d1c1d;
  }
  .pragraph {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 24px;
    /* or 185% */

    color: #616061;
  }
  .btn {
    align-self: center;
    padding: 10px 20px !important;
    font-size: 17px !important;
  }
`;

export default EnterRoom;
