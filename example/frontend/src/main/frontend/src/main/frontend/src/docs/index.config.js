module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/docs/index.config.babel.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/docs/index.config.babel.js":
/*!****************************************!*\
  !*** ./src/docs/index.config.babel.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.context = undefined;\n\nvar _statuses = __webpack_require__(/*! ./statuses.json */ \"./src/docs/statuses.json\");\n\nvar _statuses2 = _interopRequireDefault(_statuses);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar context = {\n\tstatuses: _statuses2.default\n};\n\nexports.context = context;\n\n//# sourceURL=webpack:///./src/docs/index.config.babel.js?");

/***/ }),

/***/ "./src/docs/statuses.json":
/*!********************************!*\
  !*** ./src/docs/statuses.json ***!
  \********************************/
/*! exports provided: ns, wip, qa, done, default */
/***/ (function(module) {

eval("module.exports = {\"ns\":{\"label\":\"Not Started\",\"description\":\"Basic markup has been created but nothing else\",\"color\":\"#70798C\"},\"wip\":{\"label\":\"Work In Progress\",\"description\":\"This component is being worked on\",\"color\":\"#FFBF46\"},\"qa\":{\"label\":\"Ready for QA\",\"description\":\"This component is ready to be QA'd\",\"color\":\"#3FA7D6\"},\"done\":{\"label\":\"Ready for Handoff\",\"description\":\"This component is ready to handed off\",\"color\":\"#5BBA6F\"}};\n\n//# sourceURL=webpack:///./src/docs/statuses.json?");

/***/ })

/******/ });