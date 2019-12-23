import   React from 'react'
import {Route} from 'react-router-dom'
 function Status({code,children}){
      return <Route render={({staticContext})=>{
        console.log(111111)
            console.log(staticContext)
           if(staticContext){
            staticContext.statuscode=code //404
           }
           return children 
      }}></Route>
 }
function NotFound(props){
 console.log('nptfound',props)
 //渲染了这个组件 给staticContext 赋值   statuscode=404
  return <Status code={404}>
      <div>
         <h1>错误  ；《 了呀</h1>
      </div>
  </Status>
}
export default NotFound