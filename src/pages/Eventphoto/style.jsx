import { styled } from "styled-components";

export const EventPhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #faf6f4;
  height: 100%;
`;

export const EventName = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export const ImageUploadContainer = styled.div`
  display: grid;
  grid-template-columns: 80px 80px auto 1fr;
  justify-content: center;
  margin-top: 50px;
  margin-left: 30px;
  align-items: center;
  margin-bottom: 100px;
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
`;
