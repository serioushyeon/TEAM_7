import React, { useEffect } from 'react'
import { S } from './PassportStyle';
import First from '../../components/useinfo/FirstInfo';
import Second from '../../components/useinfo/SecondInfo'
import { useNavigate, useLocation, Outlet } from "react-router-dom";


export default function Passport() {
  const navigate = useNavigate();
  const {state} = useLocation();

  useEffect(() => {
    if(state) {
      navigate(state);
    }
  })
  return (
    <>
        <S.Bg>
        <S.TitleGoorm />
        <S.Title>MOOCO</S.Title>
        <S.Titletext>마이페이지</S.Titletext>
          <S.BookBg>
        <First />
        <Second />
          </S.BookBg>
        </S.Bg>
    </>
  )
}