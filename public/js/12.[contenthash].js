webpackJsonp([12],{

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(364)
  __webpack_require__(366)
}
var normalizeComponent = __webpack_require__(236)
/* script */
var __vue_script__ = __webpack_require__(368)
/* template */
var __vue_template__ = __webpack_require__(369)
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
Component.options.__file = "resources/js/Pages/Invoice/Driver/Edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49340a16", Component.options)
  } else {
    hotAPI.reload("data-v-49340a16", Component.options)
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

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(365);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(235)("73064468", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../css-loader/index.js!../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49340a16\",\"scoped\":false,\"hasInlineConfig\":true}!./vue-multiselect.min.css", function() {
     var newContent = require("!!../../css-loader/index.js!../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49340a16\",\"scoped\":false,\"hasInlineConfig\":true}!./vue-multiselect.min.css");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\nfieldset[disabled] .multiselect{pointer-events:none\n}\n.multiselect__spinner{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block\n}\n.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:\"\";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border:2px solid transparent;border-top-color:#41b883;-webkit-box-shadow:0 0 0 1px transparent;box-shadow:0 0 0 1px transparent\n}\n.multiselect__spinner:before{-webkit-animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite\n}\n.multiselect__spinner:after{-webkit-animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite\n}\n.multiselect__loading-enter-active,.multiselect__loading-leave-active{-webkit-transition:opacity .4s ease-in-out;transition:opacity .4s ease-in-out;opacity:1\n}\n.multiselect__loading-enter,.multiselect__loading-leave-active{opacity:0\n}\n.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:16px;-ms-touch-action:manipulation;touch-action:manipulation\n}\n.multiselect{-webkit-box-sizing:content-box;box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e\n}\n.multiselect *{-webkit-box-sizing:border-box;box-sizing:border-box\n}\n.multiselect:focus{outline:none\n}\n.multiselect--disabled{background:#ededed;pointer-events:none;opacity:.6\n}\n.multiselect--active{z-index:50\n}\n.multiselect--active:not(.multiselect--above) .multiselect__current,.multiselect--active:not(.multiselect--above) .multiselect__input,.multiselect--active:not(.multiselect--above) .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0\n}\n.multiselect--active .multiselect__select{-webkit-transform:rotate(180deg);transform:rotate(180deg)\n}\n.multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags{border-top-left-radius:0;border-top-right-radius:0\n}\n.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:0 0 0 5px;width:100%;-webkit-transition:border .1s ease;transition:border .1s ease;-webkit-box-sizing:border-box;box-sizing:border-box;margin-bottom:8px;vertical-align:top\n}\n.multiselect__input:-ms-input-placeholder{color:#35495e\n}\n.multiselect__input::-webkit-input-placeholder{color:#35495e\n}\n.multiselect__input::-moz-placeholder{color:#35495e\n}\n.multiselect__input::-ms-input-placeholder{color:#35495e\n}\n.multiselect__input::placeholder{color:#35495e\n}\n.multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single{width:auto\n}\n.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf\n}\n.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:none\n}\n.multiselect__single{padding-left:5px;margin-bottom:8px\n}\n.multiselect__tags-wrap{display:inline\n}\n.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff;font-size:14px\n}\n.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:5px;white-space:nowrap;overflow:hidden;max-width:100%;text-overflow:ellipsis\n}\n.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:normal;width:22px;text-align:center;line-height:22px;-webkit-transition:all .2s ease;transition:all .2s ease;border-radius:5px\n}\n.multiselect__tag-icon:after{content:\"\\D7\";color:#266d4d;font-size:14px\n}\n.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e\n}\n.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff\n}\n.multiselect__current{min-height:40px;overflow:hidden;padding:8px 30px 0 12px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8\n}\n.multiselect__current,.multiselect__select{line-height:16px;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer\n}\n.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;-webkit-transition:-webkit-transform .2s ease;transition:-webkit-transform .2s ease;transition:transform .2s ease;transition:transform .2s ease, -webkit-transform .2s ease\n}\n.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 0;content:\"\"\n}\n.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px\n}\n.multiselect--active .multiselect__placeholder{display:none\n}\n.multiselect__content-wrapper{position:absolute;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50;-webkit-overflow-scrolling:touch\n}\n.multiselect__content{list-style:none;display:inline-block;padding:0;margin:0;min-width:100%;vertical-align:top\n}\n.multiselect--above .multiselect__content-wrapper{bottom:100%;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:none;border-top:1px solid #e8e8e8\n}\n.multiselect__content::webkit-scrollbar{display:none\n}\n.multiselect__element{display:block\n}\n.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap\n}\n.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px;font-size:13px\n}\n.multiselect__option--highlight{background:#41b883;outline:none;color:#fff\n}\n.multiselect__option--highlight:after{content:attr(data-select);background:#41b883;color:#fff\n}\n.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700\n}\n.multiselect__option--selected:after{content:attr(data-selected);color:silver\n}\n.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff\n}\n.multiselect__option--selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff\n}\n.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select{background:#ededed;color:#a6a6a6\n}\n.multiselect__option--disabled{background:#ededed!important;color:#a6a6a6!important;cursor:text;pointer-events:none\n}\n.multiselect__option--group{background:#ededed;color:#35495e\n}\n.multiselect__option--group.multiselect__option--highlight{background:#35495e;color:#fff\n}\n.multiselect__option--group.multiselect__option--highlight:after{background:#35495e\n}\n.multiselect__option--disabled.multiselect__option--highlight{background:#dedede\n}\n.multiselect__option--group-selected.multiselect__option--highlight{background:#ff6a6a;color:#fff\n}\n.multiselect__option--group-selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff\n}\n.multiselect-enter-active,.multiselect-leave-active{-webkit-transition:all .15s ease;transition:all .15s ease\n}\n.multiselect-enter,.multiselect-leave-active{opacity:0\n}\n.multiselect__strong{margin-bottom:8px;line-height:20px;display:inline-block;vertical-align:top\n}\n[dir=rtl] .multiselect{text-align:right\n}\n[dir=rtl] .multiselect__select{right:auto;left:1px\n}\n[dir=rtl] .multiselect__tags{padding:8px 8px 0 40px\n}\n[dir=rtl] .multiselect__content{text-align:right\n}\n[dir=rtl] .multiselect__option:after{right:auto;left:0\n}\n[dir=rtl] .multiselect__clear{right:auto;left:12px\n}\n[dir=rtl] .multiselect__spinner{right:auto;left:1px\n}\n@-webkit-keyframes spinning{\n0%{-webkit-transform:rotate(0);transform:rotate(0)\n}\nto{-webkit-transform:rotate(2turn);transform:rotate(2turn)\n}\n}\n@keyframes spinning{\n0%{-webkit-transform:rotate(0);transform:rotate(0)\n}\nto{-webkit-transform:rotate(2turn);transform:rotate(2turn)\n}\n}", ""]);

// exports


/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(367);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(235)("16961b66", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49340a16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./Edit.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49340a16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./Edit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n.vs-checkbox-con .vs-checkbox {\n  width: 40px;\n  height: 40px;\n}\n", ""]);

// exports


/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shared_Layout__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shared_Layout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Shared_Layout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_Model__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_Model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Components_Model__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "DriverInvoiceCreate",
  components: {
    Model: __WEBPACK_IMPORTED_MODULE_2__Components_Model___default.a,
    Layout: __WEBPACK_IMPORTED_MODULE_1__Shared_Layout___default.a
  },
  props: {
    success: String,
    driver_invoice: Object,
    clients: Array,
    products: Array,
    load: Object,
    measurement_types: Array,
    errors: Object
  },
  data: function data() {
    return {};
  },
  methods: {
    showInfo: function showInfo(data) {
      this.driver_invoice.client_phone = data.phone;
      this.driver_invoice.client_address = data.address;
    },
    calculateTotal: function calculateTotal() {
      var track_rent = this.driver_invoice.track_rent === "" || this.driver_invoice.track_rent === null ? 0 : this.driver_invoice.track_rent;
      var quantity = this.driver_invoice.quantity === "" || this.driver_invoice.quantity === null ? 0 : this.driver_invoice.quantity;
      var others = this.driver_invoice.others === "" || this.driver_invoice.others === null ? 0 : this.driver_invoice.others;
      var borrow = this.driver_invoice.borrow === "" || this.driver_invoice.borrow === null ? 0 : this.driver_invoice.borrow;
      var total = track_rent * quantity;

      if (this.driver_invoice.has_commission) {
        total = (parseFloat(track_rent) + parseFloat(this.load.amount)) * parseFloat(quantity) + parseFloat(this.load.stock_rent) + parseFloat(others);
      }

      var _final = total - parseFloat(borrow);

      this.driver_invoice.total = parseFloat(total).toFixed(3);
      this.driver_invoice["final"] = parseFloat(_final).toFixed(3);
      this.calculateCommission();
    },
    calculateCommission: function calculateCommission() {
      if (this.driver_invoice.has_commission) {
        var quantity = this.driver_invoice.quantity === "" ? 0 : this.driver_invoice.quantity;
        var commission = parseFloat(this.load.stock_rent) + parseFloat(this.load.amount) * parseFloat(quantity);
        this.driver_invoice.commission = parseFloat(commission).toFixed(3);
        console.log(this.driver_invoice.commission);
      } else {
        this.driver_invoice.commission = "";
      }
    },
    calculateFinal: function calculateFinal() {
      var total = this.driver_invoice.total == "" || this.driver_invoice.total == null ? 0 : this.driver_invoice.total;
      var borrow = this.driver_invoice.borrow == "" || this.driver_invoice.borrow == null ? 0 : this.driver_invoice.borrow;

      var _final2 = parseFloat(total) - parseFloat(borrow);

      this.driver_invoice["final"] = parseFloat(_final2).toFixed(3);
    },
    update: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee() {
        var self, client_id, load_id, product_id, measurement_type_id;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                self = this;
                client_id = this.driver_invoice.client ? this.driver_invoice.client.id : "";
                load_id = this.load ? this.load.id : "";
                product_id = this.driver_invoice.product ? this.driver_invoice.product.id : "";
                measurement_type_id = this.driver_invoice.measurement_type ? this.driver_invoice.measurement_type.id : "";
                this.$inertia.put(this.route("drivers.invoices.update", this.driver_invoice.id), {
                  client_id: client_id,
                  client_address: this.driver_invoice.client_address,
                  client_phone: this.driver_invoice.client_phone,
                  load_id: load_id,
                  company_id: this.driver_invoice.company.id,
                  driver_name: this.driver_invoice.driver_name,
                  track_no: this.driver_invoice.track_no,
                  driver_phone: this.driver_invoice.driver_phone,
                  product_id: product_id,
                  measurement_type_id: measurement_type_id,
                  container_height: this.driver_invoice.container_height,
                  container_length: this.driver_invoice.container_length,
                  container_breadth: this.driver_invoice.container_breadth,
                  quantity: this.driver_invoice.quantity,
                  scale: this.driver_invoice.scale,
                  track_rent: this.driver_invoice.track_rent,
                  others: this.driver_invoice.others,
                  total: this.driver_invoice.total,
                  borrow: this.driver_invoice.borrow,
                  "final": this.driver_invoice["final"],
                  commission: this.driver_invoice.commission,
                  has_commission: this.driver_invoice.has_commission,
                  reference: this.driver_invoice.reference,
                  is_commission_added: this.driver_invoice.is_commission_added
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  },
  created: function created() {}
});

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("layout", { attrs: { name: "DriverInvoiceCreate" } }, [
    _c("section", { staticClass: "users-list-wrapper" }, [
      _c("div", { attrs: { id: "basic-examples" } }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-content" }, [
            _c("div", { staticClass: "card-body" }, [
              _vm.success
                ? _c("div", { staticClass: "alert alert-success" }, [
                    _vm._v(
                      "\n              " +
                        _vm._s(_vm.success) +
                        "\n            "
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      return _vm.update($event)
                    }
                  }
                },
                [
                  _c("div", { staticClass: "form-group row" }, [
                    _c(
                      "div",
                      { staticClass: "col-md-4 col-12" },
                      [
                        _c("label", [
                          _vm._v(_vm._s(_vm.__("Client"))),
                          _c("strong", { staticClass: "text-danger" }, [
                            _vm._v("*")
                          ])
                        ]),
                        _vm._v(" "),
                        _c("multi-select", {
                          class: [_vm.errors.client_id ? "in-invalid" : ""],
                          attrs: {
                            options: _vm.clients,
                            label: "name",
                            "track-by": "name",
                            placeholder: _vm.__("Select Client")
                          },
                          on: { select: _vm.showInfo },
                          model: {
                            value: _vm.driver_invoice.client,
                            callback: function($$v) {
                              _vm.$set(_vm.driver_invoice, "client", $$v)
                            },
                            expression: "driver_invoice.client"
                          }
                        }),
                        _vm._v(" "),
                        _vm.errors.client_id
                          ? _c(
                              "span",
                              {
                                staticClass: "invalid-feedback",
                                staticStyle: { display: "block" },
                                attrs: { role: "alert" }
                              },
                              [
                                _c("strong", [
                                  _vm._v(_vm._s(_vm.errors.client_id[0]))
                                ])
                              ]
                            )
                          : _vm._e()
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4 col-12" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.__("Client Contact No.")))
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.driver_invoice.client_phone,
                            expression: "driver_invoice.client_phone"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          placeholder: _vm.__("Client Contact No."),
                          minlength: "11",
                          maxlength: "11"
                        },
                        domProps: { value: _vm.driver_invoice.client_phone },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.driver_invoice,
                              "client_phone",
                              $event.target.value
                            )
                          }
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4 col-12" }, [
                      _c("label", [_vm._v(_vm._s(_vm.__("Client Address")))]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.driver_invoice.client_address,
                            expression: "driver_invoice.client_address"
                          }
                        ],
                        staticClass: "form-control text-uppercase",
                        attrs: {
                          type: "text",
                          placeholder: _vm.__("Client Address")
                        },
                        domProps: { value: _vm.driver_invoice.client_address },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.driver_invoice,
                              "client_address",
                              $event.target.value
                            )
                          }
                        }
                      })
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group row" }, [
                    _c("div", { staticClass: "col-md-3 col-12" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.__("Driver Name"))),
                        _c("strong", { staticClass: "text-danger" }, [
                          _vm._v("*")
                        ])
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.driver_invoice.driver_name,
                            expression: "driver_invoice.driver_name"
                          }
                        ],
                        staticClass: "form-control text-uppercase",
                        class: [_vm.errors.driver_name ? "in-invalid" : ""],
                        attrs: {
                          type: "text",
                          placeholder: _vm.__("Driver Name")
                        },
                        domProps: { value: _vm.driver_invoice.driver_name },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.driver_invoice,
                              "driver_name",
                              $event.target.value
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _vm.errors.driver_name
                        ? _c(
                            "span",
                            {
                              staticClass: "invalid-feedback",
                              staticStyle: { display: "block" },
                              attrs: { role: "alert" }
                            },
                            [
                              _c("strong", [
                                _vm._v(_vm._s(_vm.errors.driver_name[0]))
                              ])
                            ]
                          )
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-3 col-12" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.__("Track Number"))),
                        _c("strong", { staticClass: "text-danger" }, [
                          _vm._v("*")
                        ])
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.driver_invoice.track_no,
                            expression: "driver_invoice.track_no"
                          }
                        ],
                        staticClass: "form-control text-uppercase",
                        class: [_vm.errors.track_no ? "in-invalid" : ""],
                        attrs: {
                          type: "text",
                          placeholder: _vm.__("Track Number")
                        },
                        domProps: { value: _vm.driver_invoice.track_no },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.driver_invoice,
                              "track_no",
                              $event.target.value
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _vm.errors.track_no
                        ? _c(
                            "span",
                            {
                              staticClass: "invalid-feedback",
                              staticStyle: { display: "block" },
                              attrs: { role: "alert" }
                            },
                            [
                              _c("strong", [
                                _vm._v(_vm._s(_vm.errors.track_no[0]))
                              ])
                            ]
                          )
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-3 col-12" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.__("Driver Contact No."))),
                        _c("strong", { staticClass: "text-danger" }, [
                          _vm._v("*")
                        ])
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.driver_invoice.driver_phone,
                            expression: "driver_invoice.driver_phone"
                          }
                        ],
                        staticClass: "form-control",
                        class: [_vm.errors.driver_phone ? "in-invalid" : ""],
                        attrs: {
                          type: "text",
                          maxlength: "11",
                          placeholder: _vm.__("Driver Contact No.")
                        },
                        domProps: { value: _vm.driver_invoice.driver_phone },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.driver_invoice,
                              "driver_phone",
                              $event.target.value
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _vm.errors.driver_phone
                        ? _c(
                            "span",
                            {
                              staticClass: "invalid-feedback",
                              staticStyle: { display: "block" },
                              attrs: { role: "alert" }
                            },
                            [
                              _c("strong", [
                                _vm._v(_vm._s(_vm.errors.driver_phone[0]))
                              ])
                            ]
                          )
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-3 col-12" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.__("Reference"))),
                        _c("strong", { staticClass: "text-danger" }, [
                          _vm._v("*")
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "input-group" }, [
                        _c("div", { staticClass: "input-group-prepend" }, [
                          _c("fieldset", { staticClass: "checkbox" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "vs-checkbox-con vs-checkbox-primary"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.driver_invoice.has_commission,
                                      expression:
                                        "driver_invoice.has_commission"
                                    }
                                  ],
                                  attrs: { type: "checkbox" },
                                  domProps: {
                                    checked: Array.isArray(
                                      _vm.driver_invoice.has_commission
                                    )
                                      ? _vm._i(
                                          _vm.driver_invoice.has_commission,
                                          null
                                        ) > -1
                                      : _vm.driver_invoice.has_commission
                                  },
                                  on: {
                                    change: function($event) {
                                      var $$a =
                                          _vm.driver_invoice.has_commission,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            _vm.$set(
                                              _vm.driver_invoice,
                                              "has_commission",
                                              $$a.concat([$$v])
                                            )
                                        } else {
                                          $$i > -1 &&
                                            _vm.$set(
                                              _vm.driver_invoice,
                                              "has_commission",
                                              $$a
                                                .slice(0, $$i)
                                                .concat($$a.slice($$i + 1))
                                            )
                                        }
                                      } else {
                                        _vm.$set(
                                          _vm.driver_invoice,
                                          "has_commission",
                                          $$c
                                        )
                                      }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("span", { staticClass: "vs-checkbox" }, [
                                  _c(
                                    "span",
                                    { staticClass: "vs-checkbox--check" },
                                    [
                                      _c("i", {
                                        staticClass:
                                          "vs-icon feather icon-check",
                                        staticStyle: { "font-size": "30px" }
                                      })
                                    ]
                                  )
                                ])
                              ]
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.driver_invoice.reference,
                              expression: "driver_invoice.reference"
                            }
                          ],
                          staticClass: "form-control text-uppercase",
                          class: [_vm.errors.reference ? "in-invalid" : ""],
                          attrs: {
                            type: "text",
                            readonly: !_vm.driver_invoice.has_commission,
                            placeholder: _vm.__("Reference"),
                            maxlength: "20"
                          },
                          domProps: { value: _vm.driver_invoice.reference },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.driver_invoice,
                                "reference",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _vm.errors.reference
                        ? _c(
                            "span",
                            {
                              staticClass: "invalid-feedback",
                              staticStyle: { display: "block" },
                              attrs: { role: "alert" }
                            },
                            [
                              _c("strong", [
                                _vm._v(_vm._s(_vm.errors.reference[0]))
                              ])
                            ]
                          )
                        : _vm._e()
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c(
                      "table",
                      {
                        staticClass: "table table-bordered table-responsive-sm"
                      },
                      [
                        _c("tr", [
                          _c(
                            "th",
                            [
                              _c("multi-select", {
                                attrs: {
                                  options: _vm.products,
                                  label: "name",
                                  "track-by": "name",
                                  placeholder: _vm.__("Select Product")
                                },
                                model: {
                                  value: _vm.driver_invoice.product,
                                  callback: function($$v) {
                                    _vm.$set(_vm.driver_invoice, "product", $$v)
                                  },
                                  expression: "driver_invoice.product"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "th",
                            [
                              _c("multi-select", {
                                attrs: {
                                  options: _vm.measurement_types,
                                  label: "name",
                                  "track-by": "name",
                                  placeholder: _vm.__("Select Measurement Type")
                                },
                                model: {
                                  value: _vm.driver_invoice.measurement_type,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.driver_invoice,
                                      "measurement_type",
                                      $$v
                                    )
                                  },
                                  expression: "driver_invoice.measurement_type"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("th", { staticStyle: { width: "25%" } }, [
                            _vm.driver_invoice.measurement_type &&
                            _vm.driver_invoice.measurement_type.id === 1
                              ? _c("div", { staticClass: "row" }, [
                                  _c("div", { staticClass: "col-md-4 col-4" }, [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value:
                                            _vm.driver_invoice.container_length,
                                          expression:
                                            "driver_invoice.container_length"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        placeholder: _vm.__("Length")
                                      },
                                      domProps: {
                                        value:
                                          _vm.driver_invoice.container_length
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.driver_invoice,
                                            "container_length",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "col-md-4 col-4" }, [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value:
                                            _vm.driver_invoice
                                              .container_breadth,
                                          expression:
                                            "driver_invoice.container_breadth"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        placeholder: _vm.__("Breadth")
                                      },
                                      domProps: {
                                        value:
                                          _vm.driver_invoice.container_breadth
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.driver_invoice,
                                            "container_breadth",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "col-md-4 col-4" }, [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value:
                                            _vm.driver_invoice.container_height,
                                          expression:
                                            "driver_invoice.container_height"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        placeholder: _vm.__("Height")
                                      },
                                      domProps: {
                                        value:
                                          _vm.driver_invoice.container_height
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.driver_invoice,
                                            "container_height",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  ])
                                ])
                              : _vm._e()
                          ]),
                          _vm._v(" "),
                          _c("th", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.driver_invoice.quantity,
                                  expression: "driver_invoice.quantity"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                placeholder: _vm.__("Quantity")
                              },
                              domProps: { value: _vm.driver_invoice.quantity },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.driver_invoice,
                                    "quantity",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _vm.errors.quantity
                              ? _c(
                                  "span",
                                  {
                                    staticClass: "invalid-feedback",
                                    staticStyle: { display: "block" },
                                    attrs: { role: "alert" }
                                  },
                                  [
                                    _c("strong", [
                                      _vm._v(_vm._s(_vm.errors.quantity[0]))
                                    ])
                                  ]
                                )
                              : _vm._e()
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              attrs: { colspan: "3" }
                            },
                            [
                              _vm._v(
                                "\n                      " +
                                  _vm._s(_vm.__("Track Rent")) +
                                  "\n                    "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("th", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.driver_invoice.track_rent,
                                  expression: "driver_invoice.track_rent"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                placeholder: _vm.__("Track Rent")
                              },
                              domProps: {
                                value: _vm.driver_invoice.track_rent
                              },
                              on: {
                                keyup: _vm.calculateTotal,
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.driver_invoice,
                                    "track_rent",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _vm.errors.track_rent
                              ? _c(
                                  "span",
                                  {
                                    staticClass: "invalid-feedback",
                                    staticStyle: { display: "block" },
                                    attrs: { role: "alert" }
                                  },
                                  [
                                    _c("strong", [
                                      _vm._v(_vm._s(_vm.errors.track_rent[0]))
                                    ])
                                  ]
                                )
                              : _vm._e()
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              attrs: { colspan: "3" }
                            },
                            [_vm._v(_vm._s(_vm.__("Others")))]
                          ),
                          _vm._v(" "),
                          _c("th", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.driver_invoice.others,
                                  expression: "driver_invoice.others"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                placeholder: _vm.__("Others")
                              },
                              domProps: { value: _vm.driver_invoice.others },
                              on: {
                                keyup: _vm.calculateTotal,
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.driver_invoice,
                                    "others",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              attrs: { colspan: "3" }
                            },
                            [_vm._v(_vm._s(_vm.__("Total")))]
                          ),
                          _vm._v(" "),
                          _c("th", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.driver_invoice.total,
                                  expression: "driver_invoice.total"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                readonly: "",
                                placeholder: _vm.__("Total")
                              },
                              domProps: { value: _vm.driver_invoice.total },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.driver_invoice,
                                    "total",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              attrs: { colspan: "3" }
                            },
                            [
                              _vm._v(
                                "\n                      " +
                                  _vm._s(_vm.__("Commission")) +
                                  "\n                    "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("th", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.driver_invoice.commission,
                                  expression: "driver_invoice.commission"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                readonly: "",
                                placeholder: _vm.__("Commission")
                              },
                              domProps: {
                                value: _vm.driver_invoice.commission
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.driver_invoice,
                                    "commission",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              attrs: { colspan: "3" }
                            },
                            [_vm._v(_vm._s(_vm.__("Borrow")))]
                          ),
                          _vm._v(" "),
                          _c("th", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.driver_invoice.borrow,
                                  expression: "driver_invoice.borrow"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                placeholder: _vm.__("Borrow")
                              },
                              domProps: { value: _vm.driver_invoice.borrow },
                              on: {
                                keyup: _vm.calculateFinal,
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.driver_invoice,
                                    "borrow",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              attrs: { colspan: "3" }
                            },
                            [
                              _vm._v(
                                "\n                      " +
                                  _vm._s(_vm.__("Final Amount")) +
                                  "\n                    "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("th", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.driver_invoice.final,
                                  expression: "driver_invoice.final"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                readonly: "",
                                placeholder: _vm.__("Final Amount")
                              },
                              domProps: { value: _vm.driver_invoice.final },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.driver_invoice,
                                    "final",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ])
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              attrs: { colspan: "6" }
                            },
                            [
                              _c(
                                "inertia-link",
                                {
                                  staticClass: "btn btn-primary",
                                  attrs: {
                                    href: _vm.route(
                                      "drivers.invoices.show",
                                      _vm.driver_invoice.invoice
                                    )
                                  }
                                },
                                [
                                  _c("i", {
                                    staticClass: "feather icon-arrow-left"
                                  }),
                                  _vm._v(
                                    "\n                        " +
                                      _vm._s(_vm.__("Back")) +
                                      "\n                      "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-success",
                                  attrs: { type: "submit" }
                                },
                                [
                                  _c("i", {
                                    staticClass: "feather icon-printer"
                                  }),
                                  _vm._v(
                                    "\n                        " +
                                      _vm._s(_vm.__("Update")) +
                                      "\n                      "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ])
                      ]
                    )
                  ])
                ]
              )
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-49340a16", module.exports)
  }
}

/***/ })

});