import   React,{useState,useEffect} from 'react'
import  {connect} from 'react-redux'
import store, {getIndexList} from '../store/index'
import Styles from './index.css'
import withStyle from '../withStyle'
console.log(Styles._getCss())
function Index(props){
    // if(props.staticContext){
    //     props.staticContext.css.push(Styles._getCss())
    // }
 const [count,setCount] = useState(1)
 useEffect(()=>{
   
     console.log(props.list)
     if(!props.list.length){
        props.getIndexList()
     }
     
 },[])
  return <div className={Styles.container}>
          <h1 className={Styles.title}>Hello,{props.title}! {count}</h1>
         <button type="button" onClick={()=>setCount(count+1)}>累加</button>
         <br/>
         <ul>
             {
                 props.list.map((item)=>{
                 return <li key={item.id}>{item.name}</li>
                 })
             }
         </ul>
  </div>
}
// 首页list闪现的原因   没有在服务端请求  loadData失效 因为返回的组件是经过connect withStyle 包装后的新组件
/**/

Index.loadData = (store) => {
    return store.dispatch(getIndexList())
  }
  
  Index = connect(
    state => ({ list: state.index.list }),
    { getIndexList }
  )(withStyle(Index, Styles))
  
  
  export default Index
/*
 const NewIndex =  connect(
    state=>({list:state.index.list||[]}),
    {
        getIndexList
    }
    )(withStyle(Index,Styles))

  NewIndex.loadData=(store)=>{
        return store.dispatch(getIndexList( ))
 }

   export default NewIndex
*/