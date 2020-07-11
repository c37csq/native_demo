var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: {
    index: './src/js/demo.js',
    index2: './src/js/demo2.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/out',
    publicPath: './out' //一般写服务器地址
  },
  module: {
    rules: [{
        test: /.js$/,
        use: ['babel-loader']
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.jpg|png|gif|svg/,
        use: ['url-loader?limit=8192&name=/[name].[ext]']
      }
    ]
  },
  plugins: [new UglifyJSPlugin()]
}