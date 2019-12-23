const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
//服务端的ewebpack
module.exports = {
    mode:'development',
    entry:"./client/index.js",
    output:{
         filename:'bundle.js',
         path:path.resolve(__dirname,'public')
    },
    plugin:[
      new HtmlWebpackPlugin({
           filename:'index.csr.html',
           template:'src/index.csr.html',
           inject:true
      })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                //才能支持import 支持jsx
                loader:"babel-loader",
                exclude:/node_modules/,
                options:{ //babel配置 编译级别   jsx   支持最新的es写法牛皮
                   presets:['@babel/preset-react',['@babel/preset-env']]  
                }
            },
             {
                test: /\.css$/,
                 use:['style-loader',{
                     loader:'css-loader',
                     options:{
                         modules:true
                     }
                 }]
             }
        ]
    }
}
//'css-loader' 额外配置