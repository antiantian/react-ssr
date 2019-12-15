//模拟接口

let express = require('express')
const app =express()

app.get('/api/course/list2',(req,res)=>{
   //  res.header('Access-Control-Allow-Origin','*')
     // res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
     // res.header('Content-Type','application/json;charset=utf-8')
     res.json({
          code:0,
          list:[
              {name:'web全栈',id:1},
              {name:'js高级',id:2},
              {name:'web小白',id:3},
              {name:'java架构师',id:4}
          ]
     })
})
 
app.get('/api/user/info3',(req,res)=>{
  //   res.header('Access-Control-Allow-Origin','*')
     // res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
     // res.header('Content-Type','application/json;charset=utf-8')
     res.json({
          code:0,
          data: {name:'开课吧',best:'大圣'},
           
     })
})


app.listen(9090,()=>{
     console.log(9090+'mock启动完毕！')
})