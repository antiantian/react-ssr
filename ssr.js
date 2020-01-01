 
const  express =require('express') ;
const axios = require('axios')
const app = express();
const puppeteer = require('puppeteer');

async  function test(url){
    console.log('print screenshot-------!')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: 'kaikeba.png'});
    await browser.close();
}
//test()  https://learn.kaikeba.com
// / api开头的 
const urlCache={}
app.get('*',async function(req,res){
     console.log(req.url)
     let req_url =req.url
     //加缓存
     //缓存算法
     if(urlCache[req_url]){
         return  res.send(urlCache[req_url])
     }
     if(req_url=='/favicon.ico'){
         // seo不影响
         return  res.send({code:0})
     }
     const url ='http://localhost:9093'+req_url;
     const browser = await puppeteer.launch();
     const page = await browser.newPage();
     await page.goto(url, {
        waitUntil: ['networkidle0']
    })
 
     const html= await page.content();
     urlCache[req_url]=html
     console.log(html)
     res.send(html)
})
app.listen(8081,()=>{
     console.log('ssr server start')
})