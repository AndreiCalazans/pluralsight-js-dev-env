import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPluging from 'html-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/index'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    // // use commonschinkPlugin to create a separate bundle
    // of vendor libraries so that they are cached separetely
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // create html file that includes reference to bundled JS.
    new HtmlWebpackPluging({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes:true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    //Minify Js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /npde_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
