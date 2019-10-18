const fs = require("fs");
const glob = require("glob-fs")({ gitignore: true });
const files = glob.readdirSync("./src/patterns/**/*.scss", {});
const chalk = require('chalk');

let file = `// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
@import "globals";\n\n`;

files.forEach(filePath => {
  // Remove any scss files that may be imported manually 
  if (filePath.indexOf('--') == -1 ) {
    file += '@import "' + filePath + '";\n';
  }else {
    console.warn(chalk.yellow(`[ SCSS Build ] Excluding file ${chalk.bold.green(" " + filePath
              .split("/")
              .pop() + " ")} because it looks to be manually included`));
  }
});

fs.writeFileSync("src/scss/example-index.scss", file);