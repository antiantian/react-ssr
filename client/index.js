import React from  'react'
import ReactDom from 'react-dom'
import {BrowserRouter,Route} from 'react-router-dom';
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
                {routes.map(route=>{
                    return <Route {...route}></Route>
                })}
            </BrowserRouter>
        </Provider>
)
//多页应用
ReactDom.hydrate(Page,document.getElementById('root'))