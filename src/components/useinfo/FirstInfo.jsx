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
              <S.BarcordImage>
              {!userInfo.recentBarcodeTitleList[0] ? (
                <>
                </>
              ) :
              (
                <S.Images src = {userInfo.recentBarcodeTitleList[0]} />
              )}
              </S.BarcordImage>
              
            </S.CloudImage>
            </S.FirstCloud>
            <S.SecondCloud>
            <S.CloudImage>
              <S.BarcordImage>
              {!userInfo.recentBarcodeTitleList[1] ? (
                <>
                </>
              ) :
              (
                <S.Images src = {userInfo.recentBarcodeTitleList[1]} />
              )}
              </S.BarcordImage>
            </S.CloudImage>
            </S.SecondCloud>
            <S.ThirdCloud>
            <S.CloudImage>
              <S.BarcordImage>
              {!userInfo.recentBarcodeTitleList[2] ? (
                <>
                </>
              ) :
              (
                <S.Images src = {userInfo.recentBarcodeTitleList[2]} />
              )}
              </S.BarcordImage>
            </S.CloudImage>
            </S.ThirdCloud>
          </S.BookContainer>
  )
}
