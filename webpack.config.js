const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // babelrc: true,
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/transform-runtime'],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 3000,
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
    devtool: 'source-map',
};
