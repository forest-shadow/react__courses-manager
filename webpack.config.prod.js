import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
}

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: path.resolve(__dirname, 'src/index'),
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(), // optimize order of bundled files for optimal minification
    new webpack.DefinePlugin(GLOBALS), // let us define vars that are then available to the libs that webpack is bundling
    new ExtractTextPlugin('styles.css'), // allow us to extract css to separate file
    new webpack.optimize.DedupePlugin(), // eliminate duplicate packages in final bundle
    new webpack.optimize.UglifyJsPlugin(), // minifies js
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loader: ExtractTextPlugin.extract('css?sourceMap')}, // create separate css file with source map
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  watch: true
};
