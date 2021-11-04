import styled from "styled-components";

interface Props {
  status: boolean;
  name: string;
  desc: string;
  avatar: string;
}
const MemberItem = ({ name, status, desc, avatar }: Props) => {
  return (
    <Wrapper>
      <img src={avatar} alt="" />
      <div className="profile-container">
        <div className="profile">
          <p className="display-name">{name}</p>
          <div
            style={{
              borderColor: `${status ? "#0DBE3F" : "#616061"}`,
              backgroundColor: `${status ? "#0DBE3F" : "#ffffff"}`,
            }}
            className="status none"
          ></div>
          <p className="name none"></p>
        </div>
        <p className="desc">{desc || "Product designer"}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 48px;
  display: flex;
  margin-bottom: 8px;
  padding: 4px 0;
  img {
    width: 40px;
    height: auto;
    object-fit: contain;
    margin-right: 16px;
    border-radius: 4px;
  }

  .status {
    width: 8px;
    height: 8px;
    background: #ffffff;
    border-radius: 50%;
    border: 1.3px solid #616061;
    box-sizing: border-box;
    margin: 0 8px;
  }

  .profile-container {
    display: flex;
    flex-direction: column;
    padding: 4px 0 4px;
  }

  .profile {
    display: flex;
    align-items: center;
  }

  .profile p {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 21px;
    color: #000000;
  }

  .desc {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    margin-top: 3px;
    color: #000000;
  }

  @media screen and (max-width: 480px) {
    .none {
      display: none;
    }
  }
`;
export default MemberItem;
