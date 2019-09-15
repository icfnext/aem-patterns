import { resolve } from "path";
import globby from "globby";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const devMode = process.env.NODE_ENV !== "production";

let mode = "=============== IS " + (devMode ? 'DEV MODE' : 'PROD MODE') + " ===============" 
console.log(mode);

const extractSass = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: "../public/css/example-index.css",
  chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
});

export default {
  mode: "development",
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      components: resolve(__dirname, "../../src/patterns")
    }
  },
  entry: {
    "js/main.bundled": ["babel-polyfill", "./src/js/main.js"]
  },
  output: {
    path: resolve(__dirname, "../../public"),
    filename: "[name].js"
  },
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
                loader: 'css-loader'
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
      // fonts included in the scss get moved to the public/fonts folder
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
              publicPath: devMode ? "/" : "./"
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
              publicPath: devMode ? "/" : "./"
            }
          }
        ]
      }
    ]
  }
};