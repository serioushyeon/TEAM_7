import styled from "styled-components";
import Goorm from "../../assets/images/Login/TitleGoorm.svg";

const Container = styled.div``;

const Bg = styled.div`
  display: flex;
  width: 390px;
  height: 1080px;
  background: linear-gradient(180deg, #fdfcfb 0%, rgba(226, 209, 195, 0) 100%);
`;

const BookBg = styled.div`
  display: flex;
  margin-top: 5.3rem;
  width: 100%;
  height: 42.5rem;
  border-radius: 4px;
  border: 1px solid var(--gray-scale-gray-200-dividers, #ddd);
`;
// background-color: #FDFCFB 0;
const Title = styled.div`
  display: flex;
  position: absolute;
  top: 0.625rem;
  right: 1rem;
  color: #191919;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Titletext = styled.div`
  display: block;
  position: absolute;
  top: 2.875rem;
  right: 1rem;
  color: #001c30;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TitleGoorm = styled.div`
  position: absolute;
  top: 0.625rem;
  right: 8rem;
  width: 40px;
  height: 32.239px;
  background-image: url(${Goorm});
`;

export const S = {
  Container,
  Bg,
  BookBg,
  Title,
  Titletext,
  TitleGoorm,
};
