import path from 'node:path'
import Dotenv from 'dotenv-webpack'
import osBrowserify from 'os-browserify'
import webpack from 'webpack'

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve('public/build'),
    },
    resolve: {
        fallback: {
            "os": 'os-browserify',
            "fs": false,
            "path": false
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
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
}

export default () => {
    return config
}
