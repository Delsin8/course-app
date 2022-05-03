const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //     test: /\.png|svg|jpg|gif$/,
      //     use: ['file-loader']
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
