const HtmlWebPackPlugin = require("html-webpack-plugin");
// var ExtractTextPlugin = require ('extract-text-webpack-plugin');
const path = require('path');
module.exports = {
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        include: path.resolve(__dirname, 'src/sass'),
        exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
					}
				]
			}
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};