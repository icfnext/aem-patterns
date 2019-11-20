"use strict";

const mandelbrot        = require('@frctl/mandelbrot');   // require the Mandelbrot theme module
const handlebarsHelpers = require('handlebars-helpers');
const handlebarsLayouts = require('handlebars-layouts');
const pkg               = require('./package.json');
const semver            = require('semver');
let   path              = require("path");

const statuses = require('./src/docs/statuses.json');

// Determine if we are build the style guide for prod or dev
const isStyleguideBuild = process.env.NODE_ENV === 'production';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = (module.exports = require("@frctl/fractal").create());

// Determine if this is a pre-release
let isPreRelease = semver.prerelease(pkg.version);

/* Set the title of the project */
fractal.set("project.title", process.env.npm_package_config_projectTitle);
fractal.set("project.version", pkg.version);
fractal.set("project.releaseType", isPreRelease ? 'Pre-release' : 'Release');

/* Tell Fractal where the components will live */
fractal.components.set("path", __dirname + "/src/patterns");

fractal.components.set('label', 'Patterns');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set("path", __dirname + "/src/docs");

fractal.components.set("default.status", "ns");

fractal.components.set("default.context", {
    imgRootPath: isStyleguideBuild ? process.env.npm_package_config_styleguideRootPath : "/",
    cssRootPath: isStyleguideBuild ? process.env.npm_package_config_styleguideRootPath : "/",
    styleguideCenterComponent: true
});

fractal.docs.set("default.context", {
    imgRootPath: isStyleguideBuild ? process.env.npm_package_config_styleguideRootPath : ""
});

fractal.components.set("statuses", statuses);

fractal.web.set("static.path", __dirname + "/public");

fractal.web.set("builder.dest", __dirname + "/docs");

// create a new instance with custom config options
const theme = mandelbrot({
    "favicon": "/images/favicon.ico",
    "nav": ["docs", "components"],
    "panels": ["notes", "html", "view", "context", "resources", "info"],
    "styles": [
        "default",
        (isStyleguideBuild ? "" : "/") + "css/styleguide-overrides.css"
    ]
});

fractal.web.theme(theme); // tell Fractal to use the configured theme by default

// Add handlebars-helpers to the Handlebars Docs Engine
const instanceDocs = fractal.docs.engine();
handlebarsHelpers({
    handlebars: instanceDocs.handlebars
});

// Add handlebars-helpers to the Handlebars Components Engine
const instanceComponents = fractal.components.engine();
handlebarsHelpers({
    handlebars: instanceComponents.handlebars
});
handlebarsLayouts.register(instanceComponents.handlebars);

// 'let' helper allows local storage of a variable
instanceDocs.handlebars.registerHelper('let',function(name, value, context){
    this[name] = value;
});

// 'stringBuilder' concats and maintains a string locally
const stringBuilder = function(name, value, context){
    if(this[name]){
        this[name] += value;
    }else{
        this[name] = value;
    }
};
instanceComponents.handlebars.registerHelper('stringBuilder', stringBuilder);

// 'pathBuilder' generates a link path to jump from one Fractal page to another, conditionally based on environment
// Example: <a href="{{pathBuilder "components/preview/sample-page"}}">
const pathBuilder = function (path, context) {
    if( isStyleguideBuild && path !== '#' ){
        return process.env.npm_package_config_styleguideRootPath + path + ".html";
    } else if (path !== '#') {
        return "/" + path;
    } else {
        return path;
    }
};
instanceComponents.handlebars.registerHelper("pathBuilder", pathBuilder);
