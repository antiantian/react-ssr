//存储的入口

import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'
import userReducer from './user'
import    {Axios,serverAxios} from '../request'
const reducer = combineReducers({
     index:indexReducer,
     user:userReducer
})
 
//创建store

const store = createStore(reducer,applyMiddleware(thunk))

//export default store


export const getServerStore = ()=>{
     //服务端
     //通过server的dispatch 获取实现
    //  return createStore(reducer,applyMiddleware(thunk))
    return createStore(reducer,applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = ()=>{
     //客户端
      //通过window.__context 来获取数据
     const  defaultState = window.__context?window.__context:{}
     return createStore(reducer,defaultState,applyMiddleware(thunk.withExtraArgument(Axios)))
}