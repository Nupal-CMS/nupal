// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'node:path';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'sass-loader';



const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve('public/build'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/', '/modules/', '/lib/', '/sites/', '/index.js', '/public/'],
            },
            {
                test: /\.s[ac]ss$/g,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
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
