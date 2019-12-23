// import axios from 'axios'
import    {Axios,serverAxios} from '../request'
// import {dispatch} from 'redux'
//首页的逻辑
//indexReducer
//actionType
const GET_LIST = 'INDEX/USER_INFO'
//actionCreator
const changeList = data =>({
     type:GET_LIST,
     data
})

export const getUserInfo= server =>{
    const  HttpGet = server?serverAxios:Axios;
    return (dispatch)=>{
        return HttpGet.get('/api/user/info')
        .then(res=>{
             const {data} = res.data
           
             dispatch(changeList(data))
        })
    }
}
const defaultState ={
    userinfo:{}
}
 
export default (state=defaultState,action)=>{
     switch(action.type){
         case  GET_LIST:
             const newState={
                  ...state,
                  userinfo:action.data
             }
             return newState
        default:
            return state
     }
}