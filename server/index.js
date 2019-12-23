// 这里的node代码 会用babel处理
import path from 'path'
import fs from  'fs'
import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter,matchPath,Route,Switch} from 'react-router-dom';
import  {Provider} from 'react-redux'
import routes from '../src/app'
import {getServerStore} from '../src/store/store'
import Header from '../src/component/Header'
var proxy = require('http-proxy-middleware');
 //express-proxy-middleware
const app = express();
const store =getServerStore()
app.use(express.static('public'))
app.use(
  '/api',
   proxy({
      target: 'http://localhost:9090', 
      changeOrigin: true 
    })
);
function csrRender(res){
  //读取csr文件  返回
  const filename = path.resolve(process.cwd(),'public/index.csr.html')
  const html = fs.readFileSync(filename,'utf-8')
  return res.send(html)
}
//设置静态资源目录
app.get('*',(req,res)=>{
   if(req.query._mode=='csr'){
     console.log('open ---- 降级')
     return  csrRender(res)
   }
   //配置开关 csr
   //服务器负载过高 开启
    //获取根据路由渲染的组件 并拿到loadData方法 获取数据
          // if(req.url.startsWith('/api/')){
          //     //不渲染页面 使用axios转发 axios.get 
          // }
      const  getApi=(loadData)=>{
          return new Promise((res,rej)=>{
                 var data = loadData(store);
                 //接口成功或者异常都resolve
                 data.then(res=>{
                   res('success')
                 }).catch(()=>{
                   res('error')
                 });
          })
     }
      
      //存储网络请求
      let promises = [];
      // use `some` to imitate `<Switch>` behavior of selecting only
      // the first to match
      routes.some(route=>{
        //路由匹配
         const match = matchPath(req.path,route)
         if(match){
           const  {loadData}= route.component;
           console.log(loadData)
           if(loadData){ 
             //包装后  
             //规避错误 可以考虑加日志
             const promise =new Promise((resolve,reject)=>{
                loadData(store).then(resolve).catch(resolve
                  )
             })
             //getApi(loadData)
               promises.push(promise)
            // promises.push(loadData(store))
           }
         }
      })
    //等待所有网络请求结束在渲染
  
      const  renders= ()=>{
        const context = {
          css:[]
        };
        const content = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <Header></Header>
                <Switch>
                {routes.map(route=>{
                  return <Route key={route.key} {...route}></Route>
                })}
                </Switch>
            </StaticRouter>
          </Provider>
        );
        console.log('context22',context)
        if(context.statuscode){
            //状态的切换和页面跳转
            res.status(context.statuscode)
        }
        if(context.action=='REPLACE'){
          console.log(context)
          res.redirect(301,context.url)
        }
        const css = context.css.join('\n')
        console.log('store.getState()-------------')
        console.log(store.getState())
         return (
              //把react组件 解析成html
           
              //字符串模板
              res.send(`
                <html>
                <head>
                  <meta charset="utf-8"/>
                  <title>react ssr</title>
                  <style>${css}</style>
                </head>
                <body>
                  <div id="root">${content}</div>
                  <script>
                       window.__context=${JSON.stringify(store.getState())}
                  </script>
                  <script src="/bundle.js"></script>
                </body>
                </html>
              `) 
         )
      }
      // promises = promises.map(item=>getApi(item))
      // Promise.all
      //Promise.allSettled
      Promise.all(promises).then(data => {
        //  渲染 页面
        renders()
      }).catch((error)=>{
        res.send('错误页面');
     }) 
})

app.listen(9093,()=>{
     console.log('监听完毕9093')
})