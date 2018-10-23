const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const templateConfig = require('./src/template/app-config.hbs');

const paths = {
    publicPath: path.resolve(__dirname, 'dist'),
    clean: ['dist/css', 'dist/js', 'dist/webfonts', 'dist/assets']
};

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve('./src/js/index.js'),
    },
    output: {
        filename: 'js/[name].js',
        path: paths.publicPath,
        publicPath: path.publicPath
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: paths.publicPath
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: { url: true }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            absolute: true,
                            root: paths.publicPath 
                        }
                    }, 
                    {
                        loader: 'sass-loader',
                        options: {
                          sourceMap: true,
                          sourceMapContents: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: true }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: paths.publicPath,
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: paths.publicPath,
                        }
                    }
                ]
            },
            { 
                test: /\.hbs$/,
                use: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(paths.clean, { verbose: false }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index-test.html',
            template: './src/index.hbs',
            templateParameters: templateConfig('buildings'),
            hash: true,
        }),
        new CopyWebpackPlugin([
            { 
                from: './node_modules/@fortawesome/fontawesome-free/webfonts',
                to: './assets',
            }
        ])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
};