const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/root-config.js',
    output: {
      filename: 'root-config.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        type: 'system',
      },
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/styles.css', to: 'styles.css' },
        ],
      }),
    ],
    devServer: {
      port: 9000,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    },
    externals: ['single-spa'],
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};
