/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({
    
        './src/index.js' : 
        ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            
__webpack_require__.r(__webpack_exports__);
 var __helloWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/helloWorld.js");

const helloStr = __helloWorld__WEBPACK_IMPORTED_MODULE_0__.default();

function component() {
  const ele = document.createElement('div');
  ele.innerHTML = helloStr;
  return ele;
}

document.body.appendChild(component());
        }),
    
        './src/helloWorld.js' : 
        ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            
__webpack_require__.r(__webpack_exports__);
 
        __webpack_require__.d(__webpack_exports__, {'default': () => (__WEBPACK_DEFAULT_EXPORT__)});

     var __hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/hello.js");

const world = 'world';

const sayHi = () => `${__hello__WEBPACK_IMPORTED_MODULE_0__.default} ${world} ${__hello__WEBPACK_IMPORTED_MODULE_0__.abc}`;

const __WEBPACK_DEFAULT_EXPORT__ = sayHi;
        }),
    
        './src/hello.js' : 
        ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            
__webpack_require__.r(__webpack_exports__);
 
        __webpack_require__.d(__webpack_exports__, {'abc': () => (abc),'edf': () => (edf),'default': () => (__WEBPACK_DEFAULT_EXPORT__)});

     const hi = "123";
const abc = "456";
const edf = "789";
const __WEBPACK_DEFAULT_EXPORT__ = hi;
        }),
    
});

          
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		if(__webpack_module_cache__[moduleId]) {
    /******/ 			return __webpack_module_cache__[moduleId].exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			// no module.id needed
    /******/ 			// no module.loaded needed
    /******/ 			exports: {}
    /******/ 		};
    /******/ 	
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/ 	
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = (exports, definition) => {
    /******/ 			for(var key in definition) {
    /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    /******/ 				}
    /******/ 			}
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	(() => {
    /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
    /******/ 		// define __esModule on exports
    /******/ 		__webpack_require__.r = (exports) => {
    /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 			}
    /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /************************************************************************/
    /******/ 	// startup
    /******/ 	// Load entry module
    /******/ 	__webpack_require__('./src/index.js');
    /******/ 	// This entry module used 'exports' so it can't be inlined
    /******/ })()
    ;
    //# sourceMappingURL=main.js.map