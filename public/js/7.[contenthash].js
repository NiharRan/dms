webpackJsonp([7],{

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(324)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(326)
/* template */
var __vue_template__ = __webpack_require__(327)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Pages/Client/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5efac6d2", Component.options)
  } else {
    hotAPI.reload("data-v-5efac6d2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(237)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 236:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 237:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(239)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(241)
/* template */
var __vue_template__ = __webpack_require__(242)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/AppFooter.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47d87520", Component.options)
  } else {
    hotAPI.reload("data-v-47d87520", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(240);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(235)("03a0949b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-47d87520\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AppFooter.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-47d87520\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AppFooter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "AppFooter",
  data: function data() {
    return {
      current_year: ''
    };
  },
  created: function created() {
    var today = new Date();
    this.current_year = today.getFullYear();
  }
});

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.$page.configData.mainLayoutType == "horizontal"
      ? _c("footer", {
          staticClass: "footer footer-light navbar-shadow",
          class: _vm.$page.configData.footerType
        })
      : _c(
          "footer",
          {
            staticClass: "footer footer-light",
            class: _vm.$page.configData.footerType
          },
          [
            _c("p", { staticClass: "clearfix blue-grey lighten-2 mb-0" }, [
              _c(
                "span",
                {
                  staticClass: "float-md-left d-block d-md-inline-block mt-25"
                },
                [
                  _vm._v(
                    "COPYRIGHT © " + _vm._s(_vm.current_year) + "\n        "
                  ),
                  _c("a", {
                    staticClass: "text-bold-800 grey darken-2",
                    attrs: { href: "#" }
                  }),
                  _vm._v("\n        All rights Reserved\n      ")
                ]
              ),
              _vm._v(" "),
              _vm._m(0),
              _vm._v(" "),
              _vm._m(1)
            ])
          ]
        )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "float-md-right d-none d-md-block" }, [
      _vm._v("Hand-crafted & Made with"),
      _c("i", { staticClass: "feather icon-heart pink" }),
      _vm._v(" Nihar Ranjan Das")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-primary btn-icon scroll-top",
        attrs: { type: "button" }
      },
      [_c("i", { staticClass: "feather icon-arrow-up" })]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-47d87520", module.exports)
  }
}

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(244)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(246)
/* template */
var __vue_template__ = __webpack_require__(262)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/Layout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6bf30086", Component.options)
  } else {
    hotAPI.reload("data-v-6bf30086", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(245);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(235)("24565851", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6bf30086\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Layout.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6bf30086\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Layout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sidebar__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sidebar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Sidebar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Navbar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Navbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Navbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppFooter__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppFooter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__AppFooter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Breadcrumb__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Breadcrumb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Breadcrumb__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Layout",
  components: {
    Breadcrumb: __WEBPACK_IMPORTED_MODULE_3__Breadcrumb___default.a,
    AppFooter: __WEBPACK_IMPORTED_MODULE_2__AppFooter___default.a,
    Navbar: __WEBPACK_IMPORTED_MODULE_1__Navbar___default.a,
    Sidebar: __WEBPACK_IMPORTED_MODULE_0__Sidebar___default.a
  },
  created: function created() {}
});

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(248)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(250)
/* template */
var __vue_template__ = __webpack_require__(251)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/Sidebar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f6a89ea0", Component.options)
  } else {
    hotAPI.reload("data-v-f6a89ea0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(249);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(235)("880366ac", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f6a89ea0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Sidebar.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f6a89ea0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Sidebar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Sidebar"
});

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "main-menu menu-accordion menu-shadow",
      class:
        _vm.$page.configData.menuType +
        " " +
        [_vm.$page.configData.theme === "light" ? "menu-light" : "menu-dark"],
      attrs: { "data-scroll-to-active": "true" }
    },
    [
      _c("div", { staticClass: "navbar-header" }, [
        _c("ul", { staticClass: "nav navbar-nav flex-row" }, [
          _c(
            "li",
            { staticClass: "nav-item mr-auto" },
            [
              _c(
                "inertia-link",
                { staticClass: "navbar-brand", attrs: { href: "/" } },
                [
                  _c("div", { staticClass: "brand-logo" }),
                  _vm._v(" "),
                  _c("h2", { staticClass: "brand-text mb-0" }, [
                    _vm._v("Vuexy")
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm._m(0)
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "shadow-bottom" }),
      _vm._v(" "),
      _c("div", { staticClass: "main-menu-content" }, [
        _vm.$page.auth.is_admin
          ? _c(
              "ul",
              {
                staticClass: "navigation navigation-main",
                attrs: {
                  id: "main-menu-navigation",
                  "data-menu": "menu-navigation"
                }
              },
              [
                _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c("inertia-link", { attrs: { href: "/" } }, [
                      _c("i", { staticClass: "feather icon-home" }),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          staticClass: "menu-title",
                          attrs: { "data-i18n": "" }
                        },
                        [_vm._v(_vm._s(_vm.__("Dashboard")))]
                      )
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("users.index") } },
                      [
                        _c("i", { staticClass: "feather icon-users" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Users")))]
                        )
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("companies.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Company")))]
                        )
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("stock-details.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Purchase Product")))]
                        )
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("li", { staticClass: "nav-item has-sub" }, [
                  _c("a", { attrs: { href: "" } }, [
                    _c("i", { staticClass: "fa fa-money" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                      [_vm._v(_vm._s(_vm.__("Invoice")))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("ul", [
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("sales.create") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Sale")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          {
                            attrs: {
                              href: _vm.route("drivers.invoices.create")
                            }
                          },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Driver")))]
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "nav-item has-sub" }, [
                  _c("a", { attrs: { href: "" } }, [
                    _c("i", { staticClass: "fa fa-money" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                      [_vm._v(_vm._s(_vm.__("Report")))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("ul", [
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          {
                            attrs: { href: _vm.route("drivers.invoices.index") }
                          },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Driver Invoice Report")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("sales.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Sale Report")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("accounts.statements") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Account Statement")))]
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "nav-item has-sub" }, [
                  _c("a", { attrs: { href: "" } }, [
                    _c("i", { staticClass: "fa fa-money" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                      [_vm._v(_vm._s(_vm.__("Depu Setup")))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("ul", [
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("stocks.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Stock")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("clients.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Client")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          {
                            attrs: {
                              href: _vm.route("measurement-types.index")
                            }
                          },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Measurement Type")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("loads.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Load")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("product-types.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Product Type")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("products.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Product")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          {
                            attrs: {
                              href: _vm.route("transaction-types.index")
                            }
                          },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Transaction Type")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          {
                            attrs: {
                              href: _vm.route("transaction-media.index")
                            }
                          },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Transaction Media")))]
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "nav-item has-sub" }, [
                  _c("a", { attrs: { href: "#" } }, [
                    _c("i", { staticClass: "fa fa-money" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                      [_vm._v(_vm._s(_vm.__("Settings")))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("ul", [
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("roles.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Role")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("genders.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Gender")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("religions.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Religion")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("blood-groups.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Blood Group")))]
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ])
                ])
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.$page.auth.is_operator
          ? _c(
              "ul",
              {
                staticClass: "navigation navigation-main",
                attrs: {
                  id: "main-menu-navigation",
                  "data-menu": "menu-navigation"
                }
              },
              [
                _c("li", { staticClass: "nav-item has-sub" }, [
                  _c("a", { attrs: { href: "" } }, [
                    _c("i", { staticClass: "fa fa-money" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                      [_vm._v(_vm._s(_vm.__("Invoice")))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("ul", [
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("sales.create") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Sale")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          {
                            attrs: {
                              href: _vm.route("drivers.invoices.create")
                            }
                          },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Driver")))]
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "nav-item has-sub" }, [
                  _c("a", { attrs: { href: "" } }, [
                    _c("i", { staticClass: "fa fa-money" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                      [_vm._v(_vm._s(_vm.__("Report")))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("ul", [
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          {
                            attrs: { href: _vm.route("drivers.invoices.index") }
                          },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Driver Invoice Report")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("sales.index") } },
                          [
                            _c("i", { staticClass: "feather icon-unlock" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Sale Report")))]
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("clients.index") } },
                      [
                        _c("i", { staticClass: "feather icon-plus" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Clients")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              ]
            )
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item nav-toggle" }, [
      _c(
        "a",
        {
          staticClass: "nav-link modern-nav-toggle pr-0",
          attrs: { "data-toggle": "collapse" }
        },
        [
          _c("i", {
            staticClass:
              "feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"
          }),
          _c("i", {
            staticClass:
              "toggle-icon feather icon-disc font-medium-4 d-none d-xl-block primary collapse-toggle-icon",
            attrs: { "data-ticon": "icon-disc" }
          })
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f6a89ea0", module.exports)
  }
}

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(253)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(255)
/* template */
var __vue_template__ = __webpack_require__(256)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/Navbar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4af43e6c", Component.options)
  } else {
    hotAPI.reload("data-v-4af43e6c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(254);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(235)("629be114", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4af43e6c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Navbar.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4af43e6c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Navbar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Navbar",
  methods: {
    logout: function logout() {
      this.$inertia.post(this.route('logout'));
    }
  }
});

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.$page.configData.mainLayoutType == "horizontal"
      ? _c(
          "nav",
          {
            staticClass:
              "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-fixed",
            class: _vm.$page.configData.navbarColor
          },
          [_vm._m(0)]
        )
      : _c(
          "nav",
          {
            staticClass:
              "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-light navbar-shadow",
            class:
              _vm.$page.configData.navbarClass +
              " " +
              _vm.$page.configData.navbarColor
          },
          [
            _c("div", { staticClass: "navbar-wrapper" }, [
              _c("div", { staticClass: "navbar-container content" }, [
                _c(
                  "div",
                  {
                    staticClass: "navbar-collapse",
                    attrs: { id: "navbar-mobile" }
                  },
                  [
                    _vm._m(1),
                    _vm._v(" "),
                    _c("ul", { staticClass: "nav navbar-nav float-right" }, [
                      _c(
                        "li",
                        { staticClass: "dropdown dropdown-language nav-item" },
                        [
                          _c(
                            "a",
                            {
                              staticClass: "dropdown-toggle nav-link",
                              attrs: {
                                id: "dropdown-flag",
                                href: "#",
                                "data-toggle": "dropdown",
                                "aria-haspopup": "true",
                                "aria-expanded": "false"
                              }
                            },
                            [
                              _c("span", { staticClass: "selected-language" }, [
                                _vm._v(_vm._s(_vm.currentLanguage()))
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "dropdown-menu",
                              attrs: { "aria-labelledby": "dropdown-flag" }
                            },
                            [
                              _c(
                                "inertia-link",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: {
                                    href: _vm.current() + "?lang=en",
                                    "data-language": "en"
                                  }
                                },
                                [_vm._v(" English")]
                              ),
                              _vm._v(" "),
                              _c(
                                "inertia-link",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: {
                                    href: _vm.current() + "?lang=bn",
                                    "data-language": "bn"
                                  }
                                },
                                [_vm._v(" বাংলা")]
                              )
                            ],
                            1
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _vm._m(2),
                      _vm._v(" "),
                      _c(
                        "li",
                        { staticClass: "dropdown dropdown-user nav-item" },
                        [
                          _c(
                            "a",
                            {
                              staticClass:
                                "dropdown-toggle nav-link dropdown-user-link",
                              attrs: { href: "#", "data-toggle": "dropdown" }
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "user-nav d-sm-flex d-none" },
                                [
                                  _c(
                                    "span",
                                    { staticClass: "user-name text-bold-600" },
                                    [_vm._v(_vm._s(_vm.$page.auth.name))]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("span", [
                                _c("img", {
                                  staticClass: "round",
                                  attrs: {
                                    src: _vm.$page.auth.avatar_small,
                                    alt: "avatar",
                                    height: "40",
                                    width: "40"
                                  }
                                })
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "dropdown-menu dropdown-menu-right"
                            },
                            [
                              _c(
                                "a",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: {
                                    href: _vm.route(
                                      "users.show",
                                      _vm.$page.auth.slug
                                    )
                                  }
                                },
                                [
                                  _c("i", { staticClass: "feather icon-user" }),
                                  _vm._v(" Profile\n                ")
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "dropdown-divider" }),
                              _vm._v(" "),
                              _c(
                                "a",
                                {
                                  staticClass: "dropdown-item",
                                  on: { click: _vm.logout }
                                },
                                [
                                  _c("i", {
                                    staticClass: "feather icon-power"
                                  }),
                                  _vm._v(" Logout")
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  ]
                )
              ])
            ])
          ]
        )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "navbar-header d-xl-block d-none" }, [
      _c("ul", { staticClass: "nav navbar-nav flex-row" }, [
        _c("li", { staticClass: "nav-item" }, [
          _c(
            "a",
            {
              staticClass: "navbar-brand",
              attrs: { href: "dashboard-analytics" }
            },
            [_c("div", { staticClass: "brand-logo" })]
          )
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass:
          "mr-auto float-left bookmark-wrapper d-flex align-items-center"
      },
      [
        _c("ul", { staticClass: "nav navbar-nav" }, [
          _c("li", { staticClass: "nav-item mobile-menu d-xl-none mr-auto" }, [
            _c(
              "a",
              {
                staticClass: "nav-link nav-menu-main menu-toggle hidden-xs",
                attrs: { href: "#" }
              },
              [_c("i", { staticClass: "ficon feather icon-menu" })]
            )
          ])
        ]),
        _vm._v(" "),
        _c("ul", { staticClass: "nav navbar-nav bookmark-icons" }, [
          _c("li", { staticClass: "nav-item d-none d-lg-block" }, [
            _c(
              "a",
              {
                staticClass: "nav-link",
                attrs: {
                  href: "sk-layout-2-columns",
                  "data-toggle": "tooltip",
                  "data-placement": "top",
                  title: "2-Columns"
                }
              },
              [_c("i", { staticClass: "ficon feather icon-sidebar" })]
            )
          ])
        ]),
        _vm._v(" "),
        _c("ul", { staticClass: "nav navbar-nav" }, [
          _c("li", { staticClass: "nav-item d-none d-lg-block" }, [
            _c("a", { staticClass: "nav-link bookmark-star" }, [
              _c("i", { staticClass: "ficon feather icon-star warning" })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "bookmark-input search-input" }, [
              _c("div", { staticClass: "bookmark-input-icon" }, [
                _c("i", { staticClass: "feather icon-search primary" })
              ]),
              _vm._v(" "),
              _c("input", {
                staticClass: "form-control input",
                attrs: {
                  type: "text",
                  placeholder: "Explore Vuexy...",
                  tabindex: "0",
                  "data-search": "laravel-starter-list"
                }
              }),
              _vm._v(" "),
              _c("ul", { staticClass: "search-list search-list-bookmark" })
            ])
          ])
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item d-none d-lg-block" }, [
      _c("a", { staticClass: "nav-link nav-link-expand" }, [
        _c("i", { staticClass: "ficon feather icon-maximize" })
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4af43e6c", module.exports)
  }
}

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(258)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(260)
/* template */
var __vue_template__ = __webpack_require__(261)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/Breadcrumb.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6984c242", Component.options)
  } else {
    hotAPI.reload("data-v-6984c242", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(259);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(235)("c3dd8234", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6984c242\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Breadcrumb.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6984c242\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Breadcrumb.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Breadcrumb"
});

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content-header row" }, [
    _c("div", { staticClass: "content-header-left col-md-9 col-12 mb-2" }, [
      _c("div", { staticClass: "row breadcrumbs-top" }, [
        _c("div", { staticClass: "col-12" }, [
          _c("h2", { staticClass: "content-header-title float-left mb-0" }),
          _vm._v(" "),
          _c("div", { staticClass: "breadcrumb-wrapper col-12" }, [
            _vm.$page.breadcrumbs
              ? _c(
                  "ol",
                  { staticClass: "breadcrumb" },
                  _vm._l(_vm.$page.breadcrumbs, function(breadcrumb, index) {
                    return _c(
                      "li",
                      { key: index, staticClass: "breadcrumb-item" },
                      [
                        breadcrumb.link
                          ? _c(
                              "inertia-link",
                              { attrs: { href: breadcrumb.link } },
                              [
                                _vm._v(
                                  "\n                " +
                                    _vm._s(breadcrumb.name) +
                                    "\n              "
                                )
                              ]
                            )
                          : _c("span", [_vm._v(_vm._s(breadcrumb.name))])
                      ],
                      1
                    )
                  }),
                  0
                )
              : _vm._e()
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _vm.$page.has_modal
      ? _c(
          "div",
          {
            staticClass:
              "content-header-right text-md-right col-md-3 col-12 d-md-block d-none"
          },
          [
            _c(
              "button",
              {
                staticClass:
                  "btn-icon waves-effect waves-light btn btn-primary btn-sm",
                attrs: {
                  "data-toggle": "modal",
                  "data-target": "#default",
                  type: "button"
                }
              },
              [
                _c("i", { staticClass: "feather icon-plus-circle" }),
                _vm._v(" " + _vm._s(_vm.__("New")) + "\n    ")
              ]
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.$page.link
      ? _c(
          "div",
          {
            staticClass:
              "content-header-right text-md-right col-md-3 col-12 d-md-block d-none"
          },
          [
            _c(
              "inertia-link",
              {
                staticClass:
                  "btn-icon waves-effect waves-light btn btn-primary btn-sm",
                attrs: { href: _vm.$page.link }
              },
              [
                _c("i", { staticClass: "feather icon-plus-circle" }),
                _vm._v(" " + _vm._s(_vm.__("New")) + "\n    ")
              ]
            )
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6984c242", module.exports)
  }
}

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c("sidebar"),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "app-content content" },
        [
          _c("div", { staticClass: "content-overlay" }),
          _vm._v(" "),
          _c("div", { staticClass: "header-navbar-shadow" }),
          _vm._v(" "),
          _c("navbar"),
          _vm._v(" "),
          _vm.$page.configData.contentLayout
            ? _c("div", { staticClass: "content-area-wrapper" }, [
                _c(
                  "div",
                  { class: _vm.$page.configData.sidebarPositionClass },
                  [
                    _c(
                      "div",
                      { staticClass: "sidebar" },
                      [_vm._t("default")],
                      2
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { class: _vm.$page.configData.contentsidebarClass }, [
                  _c("div", { staticClass: "content-wrapper" }, [
                    _c(
                      "div",
                      { staticClass: "content-body" },
                      [_vm._t("default")],
                      2
                    )
                  ])
                ])
              ])
            : _c("div", { staticClass: "content-wrapper" }, [
                _vm.$page.configData.pageHeader == true
                  ? _c("div", [_c("breadcrumb")], 1)
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "content-body" },
                  [_vm._t("default")],
                  2
                )
              ])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "sidenav-overlay" }),
      _vm._v(" "),
      _c("div", { staticClass: "drag-target" }),
      _vm._v(" "),
      _c("app-footer")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6bf30086", module.exports)
  }
}

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(264)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(266)
/* template */
var __vue_template__ = __webpack_require__(267)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Components/Model.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6643eb6e", Component.options)
  } else {
    hotAPI.reload("data-v-6643eb6e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(265);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(235)("71b6ec7e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6643eb6e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Model.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6643eb6e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Model.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Model",
  props: {
    size: {
      type: String,
      "default": ''
    },
    modelId: {
      type: String,
      "default": 'default'
    }
  }
});

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "modal fade text-left",
      staticStyle: { display: "none" },
      attrs: {
        id: _vm.modelId,
        tabindex: "-1",
        role: "dialog",
        "aria-labelledby": "myModalLabel1",
        "aria-hidden": "true"
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "modal-dialog",
          class: _vm.size,
          attrs: { role: "document" }
        },
        [
          _c(
            "div",
            { staticClass: "modal-content" },
            [
              _c("div", { staticClass: "modal-header" }, [_vm._t("header")], 2),
              _vm._v(" "),
              _vm._t("default")
            ],
            2
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6643eb6e", module.exports)
  }
}

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(269)
/* template */
var __vue_template__ = __webpack_require__(270)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/Pagination.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7ed7fa14", Component.options)
  } else {
    hotAPI.reload("data-v-7ed7fa14", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    links: Array
  },
  computed: {
    showPagination: function showPagination() {
      return 1;
    }
  },
  methods: {
    isActive: function isActive(link) {
      return link.active === true ? 'active' : 'normal';
    },
    handleNoLink: function handleNoLink() {
      return false;
    }
  }
});

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.showPagination
    ? _c("nav", { attrs: { "aria-label": "Page navigation example" } }, [
        _c(
          "ul",
          { staticClass: "pagination" },
          _vm._l(_vm.links, function(link, key) {
            return _c(
              "li",
              { key: key, staticClass: "page-item", class: _vm.isActive(link) },
              [
                link.url
                  ? _c(
                      "inertia-link",
                      { staticClass: "page-link", attrs: { href: link.url } },
                      [_vm._v(_vm._s(link.label))]
                    )
                  : _c(
                      "inertia-link",
                      {
                        staticClass: "page-link",
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.handleNoLink($event)
                          }
                        }
                      },
                      [_vm._v(_vm._s(link.label))]
                    )
              ],
              1
            )
          }),
          0
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7ed7fa14", module.exports)
  }
}

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(325);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(235)("93c6f502", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5efac6d2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5efac6d2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shared_Layout__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shared_Layout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Shared_Layout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_Model__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_Model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Components_Model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Shared_Pagination__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Shared_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Shared_Pagination__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Client",
  components: {
    Model: __WEBPACK_IMPORTED_MODULE_1__Components_Model___default.a,
    Layout: __WEBPACK_IMPORTED_MODULE_0__Shared_Layout___default.a,
    Pagination: __WEBPACK_IMPORTED_MODULE_2__Shared_Pagination___default.a
  },
  props: {
    success: String,
    clients: Object,
    errors: Object,
    error: String
  },
  data: function data() {
    return {
      editMode: false,
      modelTitle: this.__("Create New Client"),
      form: {
        id: "",
        name: "",
        phone: "",
        address: "",
        status: ""
      },
      balance: {
        id: "",
        description: "",
        amount: "",
        created_at: new Date()
      },
      sale: {
        total_price: "",
        total_paid: "",
        total_due: "",
        invoice: "",
        payment_from_balance: false,
        client_id: 0
      },
      options: {
        format: "DD-MM-YYYY h:mm A",
        useCurrent: false
      }
    };
  },
  methods: {
    totalDue: function totalDue(data) {
      var duePrice = data.reduce(function (due, sale) {
        var p = sale.total_due == "" ? 0 : sale.total_due;
        return due + parseFloat(p);
      }, 0);
      return parseFloat(duePrice).toFixed(3);
    },
    setData: function setData(data) {
      this.modelTitle = "Edit ".concat(data.name, "'s Information");
      this.editMode = true;
      this.form.name = data.name;
      this.form.phone = data.phone;
      this.form.address = data.address;
      this.form.balance = data.balance;
      this.form.status = data.status;
      this.form.id = data.id;
      $("#default").modal("show");
    },
    openBalanceModal: function openBalanceModal(data) {
      this.balance.client_id = data.id;
      $("#balance").modal("show");
    },
    closeModel: function closeModel() {
      $("#default").modal("hide");
      $("#balance").modal("hide");
      $("#payment").modal("hide");
    },
    cleanForm: function cleanForm() {
      this.modelTitle = this.__("Create New Client");
      this.editMode = false;
      this.form.name = "";
      this.form.phone = "";
      this.form.address = "";
      this.form.balance = "";
      this.form.id = "";
      this.form.status = "";
      this.balance.client_id = "";
      this.balance.amount = "";
      this.balance.description = "";
      this.balance.description = "";
      this.balance.created_at = new Date();
    },
    storeOrUpdate: function storeOrUpdate() {
      if (this.editMode) {
        this.update();
      } else {
        this.store();
      }
    },
    store: function store() {
      var self = this;
      this.$inertia.post(this.route("clients.store"), {
        name: this.form.name,
        phone: this.form.phone,
        address: this.form.address,
        balance: this.form.balance
      }).then(function () {
        if (Object.keys(self.errors).length === 0) {
          self.closeModel();
          self.cleanForm();
          self.$toast("Client Created Successfully");
        }
      });
    },
    update: function update() {
      var self = this;
      this.$inertia.post(this.route("clients.update", this.form.id), {
        name: this.form.name,
        phone: this.form.phone,
        address: this.form.address,
        status: this.form.status,
        _method: "put"
      }).then(function () {
        if (Object.keys(self.errors).length === 0) {
          self.closeModel();
          self.cleanForm();
          self.$toast("Client Info Updated Successfully");
        }
      });
    },
    storeBalanceInfo: function storeBalanceInfo() {
      var self = this;
      this.$inertia.post(this.route("client-balances.history.store"), {
        client_id: this.balance.client_id,
        amount: this.balance.amount,
        description: this.balance.description,
        created_at: this.balance.created_at
      }).then(function () {
        if (Object.keys(self.errors).length === 0) {
          self.closeModel();
          self.cleanForm();
          self.$toast("Client Balance Updated Successfully");
        }
      });
    },
    cleanPaymentForm: function cleanPaymentForm() {
      $("#payment").modal("hide");
      this.sale.total_price = "";
      this.sale.total_paid = "";
      this.sale.total_due = "";
      this.sale.amount = "";
      this.sale.invoice = "";
      this.sale.payment_from_balance = false;
      this.sale.client_id = 0;
    },
    payment: function payment() {
      var self = this;
      this.$inertia.post(this.route("sales.invoices.pay", this.sale.invoice), {
        amount: this.sale.amount,
        payment_from_balance: this.sale.payment_from_balance,
        client_id: this.sale.client_id
      }).then(function (response) {
        if (Object.keys(self.errors).length === 0 && !this.error) {
          self.cleanPaymentForm();
        }
      });
    },
    setPaymentData: function setPaymentData(data) {
      this.modelTitle = this.__("Update Due Amount");
      $("#payment").modal("show");
      this.sale.total_price = data.total_price;
      this.sale.total_paid = data.total_paid;
      this.sale.total_due = data.total_due;
      this.sale.invoice = data.invoice;
      this.sale.client_id = data.client_id;
    }
  }
});

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("layout", { attrs: { name: "Client" } }, [
    _c(
      "section",
      { staticClass: "users-list-wrapper" },
      [
        _vm.clients.data.length > 0
          ? _c(
              "section",
              {
                staticClass: "grid-view wishlist-items",
                attrs: { id: "wishlist" }
              },
              _vm._l(_vm.clients.data, function(client, key) {
                return _c(
                  "div",
                  { key: key, staticClass: "card ecommerce-card" },
                  [
                    _c("div", { staticClass: "card-content" }, [
                      _c("div", { staticClass: "card-header" }, [
                        _c("div", {}, [
                          _c("p", { staticClass: "card-title" }, [
                            _vm._v(_vm._s(client.name))
                          ]),
                          _vm._v(" "),
                          _c("p", [
                            client.address
                              ? _c("i", {
                                  staticClass:
                                    "h6 feather icon-file-text font-weight-bold"
                                })
                              : _vm._e(),
                            _c("span", { staticClass: "h6" }, [
                              _vm._v(_vm._s(client.address))
                            ]),
                            _vm._v(" "),
                            client.phone
                              ? _c("i", {
                                  staticClass:
                                    "h6 feather icon-phone font-weight-bold"
                                })
                              : _vm._e(),
                            _c("span", { staticClass: "h6" }, [
                              _vm._v(_vm._s(client.phone))
                            ])
                          ])
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          [
                            _c(
                              "a",
                              {
                                staticClass: "btn btn-info",
                                attrs: { href: "", role: "button" },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    return _vm.setData(client)
                                  }
                                }
                              },
                              [
                                _c("i", { staticClass: "feather icon-edit" }),
                                _vm._v(
                                  "\n                " +
                                    _vm._s(_vm.__("Edit")) +
                                    "\n              "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "inertia-link",
                              {
                                staticClass: "btn btn-primary",
                                attrs: {
                                  title: _vm.__("History"),
                                  href: _vm.route(
                                    "client-balances.history.show",
                                    client.id
                                  ),
                                  role: "button"
                                }
                              },
                              [
                                _c("i", { staticClass: "feather icon-eye" }),
                                _vm._v(
                                  "\n                " +
                                    _vm._s(_vm.__("History")) +
                                    "\n              "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                staticClass: "btn btn-success",
                                attrs: { href: "", role: "button" },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    return _vm.openBalanceModal(client)
                                  }
                                }
                              },
                              [
                                _c("i", {
                                  staticClass: "feather icon-plus-circle"
                                }),
                                _vm._v(
                                  "\n                " +
                                    _vm._s(_vm.__("Add Balance")) +
                                    "\n              "
                                )
                              ]
                            )
                          ],
                          1
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "table-responsive" }, [
                          _c("table", { staticClass: "table table-bordered" }, [
                            _c("thead", [
                              _c("tr", [
                                _c("th", { staticClass: "text-center" }, [
                                  _vm._v(_vm._s(_vm.__("S.N.")))
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-center" }, [
                                  _vm._v(_vm._s(_vm.__("Invoice")))
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-center" }, [
                                  _vm._v(_vm._s(_vm.__("Date")))
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-right" }, [
                                  _vm._v(_vm._s(_vm.__("Commission")))
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-right" }, [
                                  _vm._v(_vm._s(_vm.__("Total Amount")))
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-right" }, [
                                  _vm._v(_vm._s(_vm.__("Paid")))
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-right" }, [
                                  _vm._v(_vm._s(_vm.__("Due")))
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-center" }, [
                                  _vm._v(_vm._s(_vm.__("Action")))
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            client.sales && client.sales.length > 0
                              ? _c(
                                  "tbody",
                                  [
                                    _c("tr", [
                                      _c(
                                        "th",
                                        {
                                          staticClass: "text-right",
                                          attrs: { colspan: "6" }
                                        },
                                        [_vm._v(_vm._s(_vm.__("Total")))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "th",
                                        {
                                          staticClass:
                                            "bg-warning text-right text-white"
                                        },
                                        [
                                          _vm._v(
                                            "\n                      " +
                                              _vm._s(
                                                _vm.totalDue(client.sales)
                                              ) +
                                              "\n                    "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("td")
                                    ]),
                                    _vm._v(" "),
                                    _vm._l(client.sales, function(sale, k) {
                                      return _c("tr", { key: k }, [
                                        _c("th", [_vm._v(_vm._s(k + 1))]),
                                        _vm._v(" "),
                                        _c("th", [
                                          _vm._v(_vm._s(sale.invoice))
                                        ]),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            "\n                      " +
                                              _vm._s(
                                                _vm._f("moment")(
                                                  sale.sale_date,
                                                  "DD-MM-YYYY hh:mm A"
                                                )
                                              ) +
                                              "\n                    "
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-right" },
                                          [
                                            _vm._v(
                                              "\n                      " +
                                                _vm._s(
                                                  parseFloat(
                                                    sale.commission
                                                  ).toFixed(3)
                                                ) +
                                                "\n                    "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-right" },
                                          [
                                            _vm._v(
                                              "\n                      " +
                                                _vm._s(
                                                  parseFloat(
                                                    sale.total_price
                                                  ).toFixed(3)
                                                ) +
                                                "\n                    "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-right" },
                                          [
                                            _vm._v(
                                              "\n                      " +
                                                _vm._s(
                                                  parseFloat(
                                                    sale.total_paid
                                                  ).toFixed(3)
                                                ) +
                                                "\n                    "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-right" },
                                          [
                                            _vm._v(
                                              "\n                      " +
                                                _vm._s(
                                                  parseFloat(
                                                    sale.total_due
                                                  ).toFixed(3)
                                                ) +
                                                "\n                    "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c("td", [
                                          sale.status === 0
                                            ? _c(
                                                "a",
                                                {
                                                  staticClass:
                                                    "btn btn-success text-white",
                                                  attrs: { role: "button" },
                                                  on: {
                                                    click: function($event) {
                                                      $event.preventDefault()
                                                      return _vm.setPaymentData(
                                                        sale
                                                      )
                                                    }
                                                  }
                                                },
                                                [
                                                  _c("i", {
                                                    staticClass:
                                                      "feather icon-file"
                                                  }),
                                                  _vm._v(
                                                    "\n                        " +
                                                      _vm._s(
                                                        _vm.__("Due Payment")
                                                      ) +
                                                      "\n                      "
                                                  )
                                                ]
                                              )
                                            : _vm._e()
                                        ])
                                      ])
                                    })
                                  ],
                                  2
                                )
                              : _vm._e()
                          ])
                        ])
                      ])
                    ])
                  ]
                )
              }),
              0
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "model",
          {
            scopedSlots: _vm._u([
              {
                key: "header",
                fn: function() {
                  return [
                    _c(
                      "h4",
                      {
                        staticClass: "modal-title",
                        attrs: { id: "myModalLabel1" }
                      },
                      [_vm._v(_vm._s(_vm.modelTitle))]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "close",
                        attrs: {
                          type: "button",
                          "data-dismiss": "modal",
                          "aria-label": "Close"
                        },
                        on: { click: _vm.cleanForm }
                      },
                      [
                        _c("span", { attrs: { "aria-hidden": "true" } }, [
                          _vm._v("×")
                        ])
                      ]
                    )
                  ]
                },
                proxy: true
              }
            ])
          },
          [
            _vm._v(" "),
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.storeOrUpdate($event)
                  }
                }
              },
              [
                _c("div", { staticClass: "modal-body" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.name,
                          expression: "form.name"
                        }
                      ],
                      staticClass: "form-control text-uppercase",
                      class: [_vm.errors.name ? "is-invalid" : ""],
                      attrs: {
                        type: "text",
                        placeholder: _vm.__("Client Name")
                      },
                      domProps: { value: _vm.form.name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "name", $event.target.value)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm.errors.name
                      ? _c(
                          "span",
                          {
                            staticClass: "invalid-feedback",
                            staticStyle: { display: "block" },
                            attrs: { role: "alert" }
                          },
                          [_c("strong", [_vm._v(_vm._s(_vm.errors.name[0]))])]
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "row form-group" }, [
                    _c(
                      "div",
                      {
                        staticClass: "col-sm-12",
                        class: [_vm.editMode ? "col-md-12" : "col-md-6"]
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.form.phone,
                              expression: "form.phone"
                            }
                          ],
                          staticClass: "form-control",
                          class: [_vm.errors.phone ? "is-invalid" : ""],
                          attrs: {
                            type: "text",
                            placeholder: _vm.__("Contact No."),
                            minlength: "11",
                            maxlength: "11"
                          },
                          domProps: { value: _vm.form.phone },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(_vm.form, "phone", $event.target.value)
                            }
                          }
                        }),
                        _vm._v(" "),
                        _vm.errors.phone
                          ? _c(
                              "span",
                              {
                                staticClass: "invalid-feedback",
                                staticStyle: { display: "block" },
                                attrs: { role: "alert" }
                              },
                              [
                                _c("strong", [
                                  _vm._v(_vm._s(_vm.errors.phone[0]))
                                ])
                              ]
                            )
                          : _vm._e()
                      ]
                    ),
                    _vm._v(" "),
                    !_vm.editMode
                      ? _c("div", { staticClass: "col-md-6 col-sm-12" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.form.balance,
                                expression: "form.balance"
                              }
                            ],
                            staticClass: "form-control",
                            class: [_vm.errors.balance ? "is-invalid" : ""],
                            attrs: {
                              type: "number",
                              step: "2",
                              placeholder: _vm.__("Opening Balance"),
                              readonly: _vm.$page.auth.is_operator
                                ? true
                                : false
                            },
                            domProps: { value: _vm.form.balance },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.form,
                                  "balance",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _vm.errors.balance
                            ? _c(
                                "span",
                                {
                                  staticClass: "invalid-feedback",
                                  staticStyle: { display: "block" },
                                  attrs: { role: "alert" }
                                },
                                [
                                  _c("strong", [
                                    _vm._v(_vm._s(_vm.errors.balance[0]))
                                  ])
                                ]
                              )
                            : _vm._e()
                        ])
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-0" }, [
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.address,
                          expression: "form.address"
                        }
                      ],
                      staticClass: "form-control text-uppercase",
                      class: [_vm.errors.address ? "is-invalid" : ""],
                      attrs: { rows: "3" },
                      domProps: { value: _vm.form.address },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "address", $event.target.value)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm.errors.address
                      ? _c(
                          "span",
                          {
                            staticClass: "invalid-feedback",
                            staticStyle: { display: "block" },
                            attrs: { role: "alert" }
                          },
                          [
                            _c("strong", [
                              _vm._v(_vm._s(_vm.errors.address[0]))
                            ])
                          ]
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _vm.editMode
                    ? _c("label", { staticClass: "float-left mt-2" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.form.status,
                              expression: "form.status"
                            }
                          ],
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked: [_vm.form.status ? true : false],
                            checked: Array.isArray(_vm.form.status)
                              ? _vm._i(_vm.form.status, null) > -1
                              : _vm.form.status
                          },
                          on: {
                            change: function($event) {
                              var $$a = _vm.form.status,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.form,
                                      "status",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.form,
                                      "status",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(_vm.form, "status", $$c)
                              }
                            }
                          }
                        }),
                        _vm._v(
                          "\n            " +
                            _vm._s(
                              _vm.form.status
                                ? _vm.__("Active")
                                : _vm.__("Inactive")
                            ) +
                            "\n          "
                        )
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-footer" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-success waves-effect waves-light",
                      attrs: { type: "submit" }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(
                            _vm.editMode ? _vm.__("Update") : _vm.__("Create")
                          ) +
                          "\n          "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn",
                      attrs: { type: "button", "data-dismiss": "modal" },
                      on: { click: _vm.cleanForm }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.__("Cancel")) +
                          "\n          "
                      )
                    ]
                  )
                ])
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "model",
          {
            attrs: { modelId: "balance" },
            scopedSlots: _vm._u([
              {
                key: "header",
                fn: function() {
                  return [
                    _c(
                      "h4",
                      {
                        staticClass: "modal-title",
                        attrs: { id: "myModalLabel1" }
                      },
                      [_vm._v("Store Balance Info")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "close",
                        attrs: {
                          type: "button",
                          "data-dismiss": "modal",
                          "aria-label": "Close"
                        },
                        on: { click: _vm.cleanForm }
                      },
                      [
                        _c("span", { attrs: { "aria-hidden": "true" } }, [
                          _vm._v("×")
                        ])
                      ]
                    )
                  ]
                },
                proxy: true
              }
            ])
          },
          [
            _vm._v(" "),
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.storeBalanceInfo($event)
                  }
                }
              },
              [
                _c("div", { staticClass: "modal-body" }, [
                  _c("div", { staticClass: "form-group row" }, [
                    _c("div", { staticClass: "col-md-6 col-sm-12" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.balance.amount,
                            expression: "balance.amount"
                          }
                        ],
                        staticClass: "form-control",
                        class: [_vm.errors.amount ? "is-invalid" : ""],
                        attrs: {
                          type: "number",
                          step: "2",
                          placeholder: _vm.__("Balance")
                        },
                        domProps: { value: _vm.balance.amount },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.balance, "amount", $event.target.value)
                          }
                        }
                      }),
                      _vm._v(" "),
                      _vm.errors.amount
                        ? _c(
                            "span",
                            {
                              staticClass: "invalid-feedback",
                              staticStyle: { display: "block" },
                              attrs: { role: "alert" }
                            },
                            [
                              _c("strong", [
                                _vm._v(_vm._s(_vm.errors.amount[0]))
                              ])
                            ]
                          )
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-6 col-sm-12" },
                      [
                        _c("date-picker", {
                          staticClass: "form-control",
                          attrs: {
                            placeholder: _vm.__("Date"),
                            config: _vm.options
                          },
                          model: {
                            value: _vm.balance.created_at,
                            callback: function($$v) {
                              _vm.$set(_vm.balance, "created_at", $$v)
                            },
                            expression: "balance.created_at"
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-0" }, [
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.balance.description,
                          expression: "balance.description"
                        }
                      ],
                      staticClass: "form-control text-uppercase",
                      class: [_vm.errors.description ? "is-invalid" : ""],
                      attrs: { rows: "3" },
                      domProps: { value: _vm.balance.description },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.balance,
                            "description",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm.errors.description
                      ? _c(
                          "span",
                          {
                            staticClass: "invalid-feedback",
                            staticStyle: { display: "block" },
                            attrs: { role: "alert" }
                          },
                          [
                            _c("strong", [
                              _vm._v(_vm._s(_vm.errors.description[0]))
                            ])
                          ]
                        )
                      : _vm._e()
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-footer" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-success waves-effect waves-light",
                      attrs: { type: "submit" }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.__("Store")) +
                          "\n          "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn",
                      attrs: { type: "button", "data-dismiss": "modal" },
                      on: { click: _vm.cleanForm }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.__("Cancel")) +
                          "\n          "
                      )
                    ]
                  )
                ])
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "model",
          {
            attrs: { modelId: "payment" },
            scopedSlots: _vm._u([
              {
                key: "header",
                fn: function() {
                  return [
                    _c(
                      "h4",
                      {
                        staticClass: "modal-title",
                        attrs: { id: "myModalLabel1" }
                      },
                      [_vm._v(_vm._s(_vm.modelTitle))]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "close",
                        attrs: {
                          type: "button",
                          "data-dismiss": "modal",
                          "aria-label": "Close"
                        },
                        on: { click: _vm.cleanPaymentForm }
                      },
                      [
                        _c("span", { attrs: { "aria-hidden": "true" } }, [
                          _vm._v("×")
                        ])
                      ]
                    )
                  ]
                },
                proxy: true
              }
            ])
          },
          [
            _vm._v(" "),
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.payment($event)
                  }
                }
              },
              [
                _c("div", { staticClass: "modal-body" }, [
                  _vm.error && _vm.error.length > 0
                    ? _c("div", { staticClass: "alert alert-danger" }, [
                        _vm._v(
                          "\n            " + _vm._s(_vm.error) + "\n          "
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", [_vm._v(_vm._s(_vm.__("Total Amount")))]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.sale.total_price,
                          expression: "sale.total_price"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        placeholder: _vm.__("Total Amount"),
                        readonly: ""
                      },
                      domProps: { value: _vm.sale.total_price },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.sale, "total_price", $event.target.value)
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", [_vm._v(_vm._s(_vm.__("Paid")))]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.sale.total_paid,
                          expression: "sale.total_paid"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        placeholder: _vm.__("Paid"),
                        readonly: ""
                      },
                      domProps: { value: _vm.sale.total_paid },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.sale, "total_paid", $event.target.value)
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", [_vm._v(_vm._s(_vm.__("Due")))]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.sale.total_due,
                          expression: "sale.total_due"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        placeholder: _vm.__("Due"),
                        readonly: ""
                      },
                      domProps: { value: _vm.sale.total_due },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.sale, "total_due", $event.target.value)
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-0" }, [
                    _c("label", [_vm._v(_vm._s(_vm.__("Amount")))]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.sale.amount,
                          expression: "sale.amount"
                        }
                      ],
                      staticClass: "form-control",
                      class: [_vm.errors.amount ? "is-invalid" : ""],
                      attrs: { type: "text", placeholder: _vm.__("Amount") },
                      domProps: { value: _vm.sale.amount },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.sale, "amount", $event.target.value)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm.errors.amount
                      ? _c(
                          "span",
                          {
                            staticClass: "invalid-feedback",
                            staticStyle: { display: "block" },
                            attrs: { role: "alert" }
                          },
                          [_c("strong", [_vm._v(_vm._s(_vm.errors.amount[0]))])]
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("label", { staticClass: "float-left mt-2" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.sale.payment_from_balance,
                          expression: "sale.payment_from_balance"
                        }
                      ],
                      attrs: { type: "checkbox" },
                      domProps: {
                        checked: Array.isArray(_vm.sale.payment_from_balance)
                          ? _vm._i(_vm.sale.payment_from_balance, null) > -1
                          : _vm.sale.payment_from_balance
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.sale.payment_from_balance,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = null,
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 &&
                                _vm.$set(
                                  _vm.sale,
                                  "payment_from_balance",
                                  $$a.concat([$$v])
                                )
                            } else {
                              $$i > -1 &&
                                _vm.$set(
                                  _vm.sale,
                                  "payment_from_balance",
                                  $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                )
                            }
                          } else {
                            _vm.$set(_vm.sale, "payment_from_balance", $$c)
                          }
                        }
                      }
                    }),
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.__("Payment From Balance")) +
                        "\n          "
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-footer" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-success waves-effect waves-light",
                      attrs: { type: "submit" }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.__("Update")) +
                          "\n          "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn",
                      attrs: { type: "button", "data-dismiss": "modal" },
                      on: { click: _vm.cleanPaymentForm }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.__("Cancel")) +
                          "\n          "
                      )
                    ]
                  )
                ])
              ]
            )
          ]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5efac6d2", module.exports)
  }
}

/***/ })

});