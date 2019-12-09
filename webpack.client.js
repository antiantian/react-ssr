const path = require('path');
 
//服务端的ewebpack
module.exports = {
    mode:'development',
    entry:"./client/index.js",
    output:{
         filename:'bundle.js',
         path:path.resolve(__dirname,'public')
    },
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
            }
        ]
    }
}