const path=require('path')
module.exports={
    mode:'development',
    devtool:'cheap-module-source-map',
    entry:'./src/test.js',
    output:{
        filename:'pro-test.js'
    },
    devServer:{
        compress:true,
        port:7000,
        open:'test.html',
        static:{
            directory:path.resolve(__dirname,'src')
        }
    }
}