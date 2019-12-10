//node script, we will be using path from NodeJS to join the absolute path (__dirname) with the folder, to form the full path of the output folder
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV == 'test'){
    require('dotenv').config({path:'.env.test'});
}else if (process.env.NODE_ENV == 'development'){
    require('dotenv').config({path:'.env.development'});
}

module.exports= (env) => {
    const isProduction = env== 'production';
    //with the CSS extract we are removing the styles from the bundle.js file
    const CSSExtract = new ExtractTextPlugin('styles.css');
    console.log(isProduction +'  '+ env);
    return {
        entry : ['babel-polyfill','./src/app.js'],
        output : {
            path : path.join(__dirname,'public','dist'),
            filename : 'bundle.js'
        },
        module:{
            rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
            }, // use: allows us to use an array of loaders
            {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [ 
                         {loader:'css-loader',
                         options: {sourceMap:true}
                        },
                        { loader:'sass-loader',
                            options: {sourceMap:true}
                        }  
                    ] //removed 'style-loader as it handles in line styles
                })
            }
            ]
        },
        plugins:[
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction? 'source-map':'inline-source-map', //for dev we were using cheap-module-source-map source mao, but when in dev in the inspect of the browser if you step in one css then the source shown was styles.css, but for dev purposes is better to show the css file source. that s why we are using now the inline  source map 
        devServer:{
            contentBase: path.join(__dirname,'public'),
            historyApiFallback: true,
            publicPath: '/dist/' //determine where the bundle files are bundle.js, style.css
        } 
    };
}