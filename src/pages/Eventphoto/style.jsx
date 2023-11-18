import { styled } from "styled-components";

export const EventPhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #faf6f4;
  height: 100%;
  justify-content: center;
`;
export const EventName = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;
export const Notice = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  color: gray;
  font-size: 0.825rem;
`;

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 90%;
  color: "#F28B50";
`;

export const ImageUploadContainer = styled.div`
  display: grid;
  grid-gap: 0;
  grid-template-columns: 80px 80px auto 1fr;
  justify-content: center;
  margin-top: 50px;
  margin-left: 30px;
  max-height: calc(100vh - 100px - 120px - 140px);
  overflow-y: scroll;
  width: 85%;
`;

export const UploadButton = styled.label`
  width: 76px;
  height: 76px;
  border: 1px solid ${(props) => (props.hasImages ? "black" : "#cbcbcb")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  border-radius: 4px 0 0 0;
  flex-direction: column;
`;

export const UploadIcon = styled.img`
  width: 50%;
`;

export const UploadCount = styled.div`
  font-size: 12px;
  margin-top: 10px;
  color: ${(props) => (props.hasImages ? "black" : "#cbcbcb")};
`;
export const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  margin: 0;
  border: ${(props) => (props.isSelected ? "1px solid #F28B50" : "none")};
`;

export const UploadChange = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
`;

export const UploadChangeItem = styled.div`
  width: 100px;
  height: 40px;
  border: 1px solid ${(props) => (props.isSelected ? "#F28B50" : "#cbcbcb")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  color: ${(props) => (props.isSelected ? "#F28B50" : "black")};
`;
export const makeBarcode = styled.div`
  width: 100px;
  height: 40px;
  border: 1px solid ${(props) => (props.isSelected ? "#F28B50" : "#cbcbcb")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  color: ${(props) => (props.isSelected ? "#F28B50" : "black")};
`;