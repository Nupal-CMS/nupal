// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'node:path';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isProduction = process.env.NODE_ENV == 'production';
const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve('public/build'),
    },
    devServer: {
        open: false,
        host: 'localhost',
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        new MiniCssExtractPlugin()
    ],
    module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader', // post process the compiled CSS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

export default () => {
    if (isProduction) {
        config.mode = 'production';
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
