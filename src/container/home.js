import   React,{useState,useEffect} from 'react'
import  {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import store, {getUserInfo} from '../store/user'
function User(props){
 console.log(props)
 //登录 没登陆跳转
 return <Redirect to="/about"></Redirect>
 const userInfo= props.userinfo||{}
//  useEffect(()=>{
   
//      console.log(props.list)
//      if(!userInfo.name){
//         props.getUserInfo()
//      }
     
//  },[])
  return <div>
         <h1>你好,{userInfo.name}! 你们最棒的人是{userInfo.best}</h1>
         
  </div>
}
// 
User.loadData=(store)=>{
     return store.dispatch(getUserInfo( ))
}
export default connect(
    state=>({userinfo:state.user.userinfo}),
    {
        getUserInfo
    }
    )(User)