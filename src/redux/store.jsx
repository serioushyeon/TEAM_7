import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import themeReducer from './theme'

// 여기서 데이터 관리해주세요.
export default configureStore({
    reducer:{
        user: userReducer,
        theme: themeReducer
    }
})