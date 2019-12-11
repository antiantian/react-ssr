import axios from 'axios'
// import {dispatch} from 'redux'
//首页的逻辑
//indexReducer
//actionType
const GET_LIST = 'INDEX/GET_LIST'
//actionCreator
const changeList = list =>({
     type:GET_LIST,
     list
})

export const getIndexList = server =>{
    return (dispatch)=>{
        return axios.get('http://localhost:9090/api/course/list')
        .then(res=>{
             const {list} = res.data
             dispatch(changeList(list))
        })
    }
}
const defaultState ={
    list:[]
}
 
export default (state=defaultState,action)=>{
     switch(action.type){
         case  GET_LIST:
             const newState={
                  ...state,
                  list:action.list
             }
             return newState
        default:
            return state
     }
}