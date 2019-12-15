import   React,{useState,useEffect} from 'react'
import  {connect} from 'react-redux'
import store, {getIndexList} from '../store/index'
function Index(props){
 const [count,setCount] = useState(1)
 useEffect(()=>{
   
     console.log(props.list)
     if(!props.list.length){
        props.getIndexList()
     }
     
 },[])
  return <div>
          <h1>Hello,{props.title}! {count}</h1>
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
// 
Index.loadData=(store)=>{
     return store.dispatch(getIndexList('server'))
}
export default connect(
    state=>({list:state.index.list||[]}),
    {
        getIndexList
    }
    )(Index)