import React from 'react'
import Profile from '../components/reduxTest/Profile'
import Login from '../components/reduxTest/Login';
import ChangeColor from '../components/reduxTest/ChangeColor';


export default function TestPage() {
  return (
    <div>
    폰트는 기본 Noto Sans 입니다. <br />
    패키지 : router, redux, redux toolkit, calendar, styled-component, flip-book
    <Profile />
    <Login />
    <ChangeColor />
    </div>
  )
}
