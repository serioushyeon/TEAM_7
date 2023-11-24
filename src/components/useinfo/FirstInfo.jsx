import React, { useState } from "react";
import { S } from "./Style";

export default function First() {
  return (
    <S.BookContainer>
      <S.CloudImage top="2.5rem" left="0.625rem">
        {/* {!userInfo?.recentBarcodeTitleList[0] ? (
          <></>
        ) : (
          <S.BarcordImage>
            <S.Images src={userInfo?.recentBarcodeTitleList[0]} />
          </S.BarcordImage>
        )} */}
      </S.CloudImage>
      <S.CloudImage top="7.68rem" left="8.125rem">
        {/* {!userInfo?.recentBarcodeTitleList[1] ? (
          <></>
        ) : (
          <S.BarcordImage>
            <S.Images src={userInfo?.recentBarcodeTitleList[1]} />
          </S.BarcordImage>
        )} */}
      </S.CloudImage>

      <S.CloudImage top="1rem" left="14.5rem">
        {/* {!userInfo?.recentBarcodeTitleList[2] ? (
          <></>
        ) : (
          <S.BarcordImage>
            <S.Images src={userInfo.recentBarcodeTitleList[2]} />
          </S.BarcordImage>
        )} */}
      </S.CloudImage>
    </S.BookContainer>
  );
}
