import React from  'react'
import ReactDom from 'react-dom'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import  {Provider} from 'react-redux'
import routes from '../src/app'
import {getClientStore} from '../src/store/store'
import Header from '../src/component/Header'
const store =getClientStore()


//注水  客户端入口
const Page =( 
        <Provider store={store}>
            <BrowserRouter >
               <Header></Header>
               <Switch>
                {routes.map(route=>{
                    return <Route  key={route.key} {...route}></Route>
                })}
                </Switch>
            </BrowserRouter>
        </Provider>
)
/*
  解决
  react-dom.development.js:530 Warning: Expected server HTML to contain a matching <div> in <div>.
*/
if( window.__context){
     //服务端渲染
     //ssr
     ReactDom.hydrate(Page,document.getElementById('root'))
}else{
    ReactDom.render(Page,document.getElementById('root'))

}
//多页应用
//ReactDom.hydrate(Page,document.getElementById('root'))