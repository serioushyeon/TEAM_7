import React, { useState } from 'react'
import { S } from './Style';
import { useSelector } from 'react-redux';
import { userData } from '../../redux/userInfoSlice';

export default function FirstInfo() {
  const userInfo = useSelector((state) => state.userdata); 
  console.log('firstpage userdata: ', userInfo);

  return (
    <S.BookContainer>
            <S.FirstCloud>
            <S.CloudImage>
              <S.BarcordImage url={userInfo.recentBarcodeTitleList[1]}/>
            </S.CloudImage>
            </S.FirstCloud>
            <S.SecondCloud>
            <S.CloudImage>
              <S.BarcordImage url={userInfo.recentBarcodeTitleList[1]}/>
            </S.CloudImage>
            </S.SecondCloud>
            <S.ThirdCloud>
            <S.CloudImage>
              <S.BarcordImage url={userInfo.recentBarcodeTitleList[2]}/>
            </S.CloudImage>
            </S.ThirdCloud>
          </S.BookContainer>
  )
}
