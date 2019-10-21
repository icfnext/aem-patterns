const fs    = require('fs-extra');
const glob1 = require("glob-fs")({ gitignore: true });
const glob2 = require("glob-fs")({ gitignore: true });

const patternFiles = glob1.readdirSync("./src/patterns/**/*.scss", {});
const sassFiles    = glob2.readdirSync("./src/scss/**/*.scss", {});

let ignore = [
    'style-guide-theme-overrides.scss'
];

patternFiles.forEach(( filePath ) => {
    cpFiles({ folderName : 'patterns', filePath : filePath } );
});

sassFiles.forEach(( filePath ) => {
    cpFiles({ folderName : 'scss', filePath : filePath } );
});

function cpFiles( opts ) {

    let folderName     = opts.folderName;
    let filePath        = opts.filePath;
    process.platform.includes("win") ? filePath = filePath.replace(/\\/g,"/") : '';
    let pathArray      = filePath.split('/');
    let folderLocation = pathArray.indexOf(folderName);
    let ignoreFile     = false;
    let fileName;

    fileNameArray = pathArray.splice(folderLocation + 1);

    switch (fileNameArray[0]) {
        case '01-elements':
            fileNameArray[0] = 'elements';
            break;
        case '02-components': 
            fileNameArray[0] = 'components';
            break;
        case '03-pages':
            fileNameArray[0] = 'pages';
    }

    fileName = fileNameArray.join('/');

    ignore.forEach(toIgnore => {
        if (toIgnore == fileNameArray[fileNameArray.length - 1]) ignoreFile = true;
    });

    if (!ignoreFile) {
        fs.copySync(filePath, "dist/scss/" + fileName);
    }

}