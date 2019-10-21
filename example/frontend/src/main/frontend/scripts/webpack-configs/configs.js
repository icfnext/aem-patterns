import { resolve } from "path";
import globby from "globby";

const pattern = resolve(__dirname, "../../src") + "/**/*babel.js";
const entries = globby.sync( pattern );

let entriesObj = {};

entries.forEach( ( entryPath ) => {
    let pathArray = entryPath.split('/');
    let srcPosition = pathArray.lastIndexOf(process.env.npm_package_config_rootFolderName);
    let relPath = pathArray.splice( srcPosition + 2 ).join('/');
    let babelPos = relPath.indexOf('.babel');
    relPath = relPath.substr(0, babelPos);
    entriesObj[ relPath ] = entryPath;
} );

// this gets exported so we can check to see if we have any entries 
// if there are no entries entries will have a length of 0 giving us 
// a hook to exclude the webpack config 
export { entries }

export default {
  mode: "development",
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      components: resolve(__dirname, "../../src/patterns")
    }
  },
  entry: entriesObj,
  output: {
    libraryTarget: "commonjs2",
    path: resolve(__dirname, "../../src/"),
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
      }
    ]
  }
};