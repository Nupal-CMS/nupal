// Generated using webpack-cli https://github.com/webpack/webpack-cli
import path from 'node:path';

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve('public/build'),
    },
    resolve: {
        fallback: {
            "os": false,
            "fs": false,
            "path": false
        }
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                type: 'asset/resource',
                generator: {
                  filename: 'bundle.min.css'
                },
                use: [
                    'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
};

export default () => {
    return config;
};
