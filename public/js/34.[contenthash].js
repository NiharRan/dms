webpackJsonp([34],{

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(423)
}
var normalizeComponent = __webpack_require__(230)
/* script */
var __vue_script__ = __webpack_require__(425)
/* template */
var __vue_template__ = __webpack_require__(426)
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
Component.options.__file = "resources/js/Pages/Sale/Print.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25ae5aa4", Component.options)
  } else {
    hotAPI.reload("data-v-25ae5aa4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 229:
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

var listToStyles = __webpack_require__(231)

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

/***/ 230:
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

/***/ 231:
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

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(424);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(229)("69e3e152", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-25ae5aa4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Print.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-25ae5aa4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Print.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n.mt-200 {\n  margin-top: 200px;\n}\n.mb-200 {\n  margin-top: 200px;\n}\n.controller {\n  right: 10px;\n  top: 10px;\n  border: 1px solid #d0d0d0;\n  border-radius: 4px;\n  padding: 10px;\n  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);\n          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);\n}\nbody {\n  -webkit-print-color-adjust: exact !important;\n}\n* {\n  font-family: \"SolaimanLipi\", sans-serif;\n  font-size: 20px !important;\n}\n.owner {\n  background-color: #000;\n  color: #fff;\n  font-weight: bold;\n  padding: 5px 10px;\n  border-radius: 16px;\n  font-size: 18px;\n}\n.signature {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n}\n@media print {\n.table {\n    border-bottom: 1px solid #0b0b0b !important;\n}\n.controller {\n    display: none;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 425:
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Print",
  props: {
    sale: Object
  },
  data: function data() {
    return {
      hasHeader: false
    };
  },
  methods: {
    printPage: function printPage() {
      window.print();
    }
  },
  created: function created() {}
});

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "invoice-card card" }, [
    _c("div", { staticClass: "card-content" }, [
      _c("div", { staticClass: "card-body" }, [
        _c("div", { staticClass: "invoice" }, [
          _vm.hasHeader
            ? _c(
                "div",
                {
                  staticClass:
                    "invoice-header text-center mb-2 position-relative"
                },
                [
                  _c(
                    "div",
                    { staticClass: "logo position-absolute width-200" },
                    [
                      _c("img", {
                        staticClass: "width-95-per",
                        attrs: {
                          src: _vm.sale.company.current_logo,
                          alt: _vm.sale.company.name
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "h1",
                    {
                      staticClass: "mb-0",
                      staticStyle: { "font-weight": "bolder" }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.sale.company.name) +
                          "\n          "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("h5", [_vm._v(_vm._s(_vm.sale.company.description))]),
                  _vm._v(" "),
                  _c("p", { staticClass: "my-1" }, [
                    _c("span", { staticClass: "owner" }, [
                      _vm._v(
                        _vm._s(_vm.__("Pro:-")) +
                          " " +
                          _vm._s(_vm.sale.company.owner)
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "mb-0" }, [
                    _c("span", { staticClass: "text-bold-700" }, [
                      _vm._v(_vm._s(_vm.__("Head Office")) + ": ")
                    ]),
                    _vm._v(
                      _vm._s(_vm.sale.company.head_office) + "\n          "
                    )
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "mb-0" }, [
                    _c("span", { staticClass: "text-bold-700" }, [
                      _vm._v(_vm._s(_vm.__("Dipu Office")) + ": ")
                    ]),
                    _vm._v(
                      _vm._s(_vm.sale.company.dipu_office) + "\n          "
                    )
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "mb-0" }, [
                    _c("span", { staticClass: "text-bold-700" }, [
                      _vm._v(_vm._s(_vm.__("Address")) + ": ")
                    ]),
                    _vm._v(_vm._s(_vm.sale.company.address) + "\n          ")
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "mb-0" }, [
                    _c("span", { staticClass: "text-bold-700" }, [
                      _vm._v(_vm._s(_vm.__("Sales Center")) + ": ")
                    ]),
                    _vm._v(
                      _vm._s(_vm.sale.company.sales_center) + "\n          "
                    )
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "mb-0" }, [
                    _c("span", { staticClass: "text-left" }, [
                      _c("span", { staticClass: "text-bold-700" }, [
                        _vm._v(" " + _vm._s(_vm.__("Phone:")))
                      ]),
                      _vm._v(
                        "\n              " +
                          _vm._s(
                            _vm.translate(
                              _vm.sale.company.active_phones.toString()
                            )
                          ) +
                          "\n            "
                      )
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "text-right" }, [
                      _c("span", { staticClass: "text-bold-700" }, [
                        _vm._v(" " + _vm._s(_vm.__("Email:")))
                      ]),
                      _vm._v(
                        "\n              " +
                          _vm._s(_vm.sale.company.email) +
                          "\n            "
                      )
                    ])
                  ])
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "controller position-absolute width-300" }, [
            _c("label", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.hasHeader,
                    expression: "hasHeader"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.hasHeader)
                    ? _vm._i(_vm.hasHeader, null) > -1
                    : _vm.hasHeader
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.hasHeader,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.hasHeader = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.hasHeader = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.hasHeader = $$c
                    }
                  }
                }
              }),
              _vm._v(
                "\n            " + _vm._s(_vm.__("Attach company information"))
              )
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary btn-sm float-right",
                attrs: { type: "button" },
                on: { click: _vm.printPage }
              },
              [
                _vm._v(
                  "\n            " + _vm._s(_vm.__("Print")) + "\n          "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "invoice-body",
              class: [_vm.hasHeader ? "mt-0" : "mt-200"]
            },
            [
              _c("p", { staticClass: "clearfix" }, [
                _c("span", { staticClass: "float-left" }, [
                  _vm._v(
                    _vm._s(_vm.__("Serial No.")) +
                      "-" +
                      _vm._s(_vm.sale.invoice)
                  )
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "float-right" }, [
                  _vm._v(
                    _vm._s(_vm.__("Date")) +
                      _vm._s(_vm.__(":")) +
                      "\n              " +
                      _vm._s(
                        _vm._f("moment")(_vm.sale.created_at, "DD/MM/YYYY")
                      )
                  )
                ])
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "clearfix" }, [
                _c("span", { staticClass: "float-left" }, [
                  _vm._v(
                    _vm._s(_vm.__("Client Name")) +
                      _vm._s(_vm.__(":")) +
                      "\n              " +
                      _vm._s(_vm.sale.client.name)
                  )
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "float-right" }, [
                  _vm._v(
                    _vm._s(_vm.__("Address")) +
                      _vm._s(_vm.__(":")) +
                      "\n              " +
                      _vm._s(_vm.sale.client.address)
                  )
                ])
              ]),
              _vm._v(" "),
              _c("table", { staticClass: "table font-medium-3" }, [
                _c("thead", [
                  _c("tr", [
                    _c("th", [_vm._v(_vm._s(_vm.__("Track No.")))]),
                    _vm._v(" "),
                    _c("th", [_vm._v(_vm._s(_vm.__("Stock")))]),
                    _vm._v(" "),
                    _c("th", [_vm._v(_vm._s(_vm.__("Product Product")))]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-center" }, [
                      _vm._v(_vm._s(_vm.__("Product Quantity")))
                    ]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-right" }, [
                      _vm._v(_vm._s(_vm.__("Price")))
                    ]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-right" }, [
                      _vm._v(_vm._s(_vm.__("Amount")))
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "tbody",
                  [
                    _vm._l(_vm.sale.sale_details, function(row) {
                      return _c("tr", { key: row.id }, [
                        _c("th", [_vm._v(_vm._s(row.track_no))]),
                        _vm._v(" "),
                        _c("th", [_vm._v(_vm._s(row.stock.name))]),
                        _vm._v(" "),
                        _c("th", [_vm._v(_vm._s(row.product.name))]),
                        _vm._v(" "),
                        _c("th", { staticClass: "text-center" }, [
                          _vm._v(
                            _vm._s(row.quantity) + " " + _vm._s(_vm.__("Mg"))
                          )
                        ]),
                        _vm._v(" "),
                        _c("th", { staticClass: "text-right" }, [
                          _vm._v(_vm._s(row.price))
                        ]),
                        _vm._v(" "),
                        _c("th", { staticClass: "text-right" }, [
                          _vm._v(_vm._s(row.amount))
                        ])
                      ])
                    }),
                    _vm._v(" "),
                    _c("tr", [
                      _c(
                        "th",
                        { staticClass: "text-right", attrs: { colspan: "5" } },
                        [
                          _vm._v(
                            "\n                  " +
                              _vm._s(_vm.__("Total Amount")) +
                              "\n                "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("th", { staticClass: "text-right" }, [
                        _vm._v(_vm._s(_vm.sale.total_price))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c(
                        "th",
                        { staticClass: "text-right", attrs: { colspan: "5" } },
                        [_vm._v(_vm._s(_vm.__("Paid")))]
                      ),
                      _vm._v(" "),
                      _c("th", { staticClass: "text-right" }, [
                        _vm._v(_vm._s(_vm.sale.total_paid))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c(
                        "th",
                        { staticClass: "text-right", attrs: { colspan: "5" } },
                        [_vm._v(_vm._s(_vm.__("Due")))]
                      ),
                      _vm._v(" "),
                      _c("th", { staticClass: "text-right" }, [
                        _vm._v(_vm._s(_vm.sale.total_due))
                      ])
                    ])
                  ],
                  2
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "invoice-footer" }, [
            _c("p", [
              _c("span", [
                _vm._v(_vm._s(_vm.__("In Words")) + _vm._s(_vm.__(":")))
              ]),
              _vm._v(" " + _vm._s(_vm.sale.word) + "\n          ")
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "mb-0 signature" }, [
              _c("span", { staticClass: "float-left" }, [
                _c("span", { staticClass: "text-bold-700" }, [
                  _vm._v(
                    "\n               " +
                      _vm._s(_vm.__("Signature of Client")) +
                      _vm._s(_vm.__(":"))
                  )
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "underlined" }, [
                  _vm._v(_vm._s(_vm.sale.client.name))
                ])
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "float-right" }, [
                _c("span", { staticClass: "text-bold-700" }, [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.__("In Favor of")) +
                      _vm._s(_vm.__(":"))
                  )
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "underlined" }, [
                  _vm._v(_vm._s(_vm.sale.company.name))
                ])
              ])
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
    require("vue-hot-reload-api")      .rerender("data-v-25ae5aa4", module.exports)
  }
}

/***/ })

});