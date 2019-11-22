import { resolve } from "path";
const devMode = process.env.NODE_ENV !== "production";

export default {
    mode: "development",
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            components: resolve(__dirname, "../../src/patterns")
        }
    },
    entry: {
        "js/patterns.bundled": ["babel-polyfill", "./src/scss/example-index.scss","./src/js/patterns.js"]
    },
    output: {
        libraryTarget: "commonjs2",
        path: resolve(__dirname, "../../dist"),
        filename: "patterns.js"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/, //Check for all js files
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.scss|\.css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: 'css/'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: !devMode,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: "@epegzz/sass-vars-loader",
                        options: {
                            syntax: "scss",
                            vars: {
                                imagePath: devMode ? "'/'" : "'./'"
                            },
                            files: [
                                // Option 3) Load vars from JavaScript file
                                resolve(__dirname, "../../src/vars/index.js")
                            ]
                        }
                    }
                ]
            },
            // fonts included in the scss get moved to the public/fonts folderx`
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                            publicPath: "../"
                        }
                    }
                ]
            },
            // Images included in the js or scss will get moved to the public/images folder
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]",
                            publicPath: "../"
                        }
                    }
                ]
            }
        ]
    }
};