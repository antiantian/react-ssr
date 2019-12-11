import   React,{useState} from 'react';
import {Route} from 'react-router-dom';
import Index from './container/index'
import About from './container/about'

function App(props){
 const [count,setCount] = useState(1)
  return <div>
         <Route path="/" exact component={Index}></Route>
         <Route path="/about" exact component={About}></Route>
  </div>
}
import { format } from 'path'
export default (
  <div >
  <Route path="/" exact component={Index}></Route>
  <Route path="/about" exact component={About}></Route>
</div>
);