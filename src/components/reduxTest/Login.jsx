import React from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/user';

function Login() {
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => {
        dispatch(login({name: "mooco", age: 20, email: "mooco@goorm.com"}))
      }}>리덕스 값 보여줘</button>
      <button onClick={() => {
        dispatch(logout())
      }}>리덕스 값 없애줘</button>
    </div>
  );
}

export default Login