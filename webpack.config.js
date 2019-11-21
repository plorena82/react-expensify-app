//node script, we will be using path from NodeJS to join the absolute path (__dirname) with the folder, to form the full path of the output folder
const path = require('path');

module.exports={
    entry : './src/app.js',
    output : {
        path : path.join(__dirname,'public'),
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
            use: [ 'style-loader','css-loader', 'sass-loader']
        }
        ]
    },
    devtool: 'cheap-module-source-map',
    devServer:{
        contentBase: path.join(__dirname,'public'),
        historyApiFallback: true
    } 
};