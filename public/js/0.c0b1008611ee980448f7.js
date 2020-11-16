(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Dashboard.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Dashboard.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Shared_Layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Shared/Layout */ "./resources/js/Shared/Layout.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Dashboard",
  components: {
    Layout: _Shared_Layout__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: ['msg']
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/AppFooter.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/AppFooter.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
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
  name: "AppFooter"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Breadcrumb.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/Breadcrumb.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Breadcrumb",
  methods: {
    openModal: function openModal(modalSelector) {
      if ($(modalSelector)) {
        $(modalSelector).modal('show');
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Layout.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/Layout.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar */ "./resources/js/Shared/Sidebar.vue");
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar */ "./resources/js/Shared/Navbar.vue");
/* harmony import */ var _AppFooter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppFooter */ "./resources/js/Shared/AppFooter.vue");
/* harmony import */ var _Breadcrumb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Breadcrumb */ "./resources/js/Shared/Breadcrumb.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    Breadcrumb: _Breadcrumb__WEBPACK_IMPORTED_MODULE_3__["default"],
    AppFooter: _AppFooter__WEBPACK_IMPORTED_MODULE_2__["default"],
    Navbar: _Navbar__WEBPACK_IMPORTED_MODULE_1__["default"],
    Sidebar: _Sidebar__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Navbar.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/Navbar.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Navbar"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Sidebar.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/Sidebar.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Dashboard.vue?vue&type=template&id=097ba13b&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Dashboard.vue?vue&type=template&id=097ba13b& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("layout", { attrs: { name: "Dashboard" } }, [
    _c("div", { staticClass: "col-lg-6 col-md-12 col-sm-12" }, [
      _c("div", { staticClass: "card bg-analytics text-white" }, [
        _c("div", { staticClass: "card-content" }, [
          _c("div", { staticClass: "card-body text-center" }, [
            _c("img", {
              staticClass: "img-left",
              attrs: {
                src: "/images/elements/decore-left.png",
                alt: "card-img-left"
              }
            }),
            _vm._v(" "),
            _c("img", {
              staticClass: "img-right",
              attrs: {
                src: "/images/elements/decore-right.png",
                alt: "card-img-right"
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "avatar avatar-xl bg-primary shadow mt-0" },
              [
                _c("div", { staticClass: "avatar-content" }, [
                  _c("i", {
                    staticClass: "feather icon-award white font-large-1"
                  })
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "text-center" }, [
              _c("h1", { staticClass: "mb-2 text-white" }, [
                _vm._v("Congratulations John,")
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "m-auto w-75" }, [
                _vm._v("You have done "),
                _c("strong", [_vm._v("57.6%")]),
                _vm._v(
                  " more sales today. Check your new badge in your profile."
                )
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



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/AppFooter.vue?vue&type=template&id=47d87520&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/AppFooter.vue?vue&type=template&id=47d87520&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
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
          [_vm._m(0)]
        )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "clearfix blue-grey lighten-2 mb-0" }, [
      _c(
        "span",
        { staticClass: "float-md-left d-block d-md-inline-block mt-25" },
        [
          _vm._v("COPYRIGHT © 2019\n        "),
          _c(
            "a",
            {
              staticClass: "text-bold-800 grey darken-2",
              attrs: {
                href: "https://1.envato.market/pixinvent_portfolio",
                target: "_blank"
              }
            },
            [_vm._v("Pixinvent,")]
          ),
          _vm._v("\n        All rights Reserved\n      ")
        ]
      ),
      _vm._v(" "),
      _c("span", { staticClass: "float-md-right d-none d-md-block" }, [
        _vm._v("Hand-crafted & Made with"),
        _c("i", { staticClass: "feather icon-heart pink" })
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-primary btn-icon scroll-top",
          attrs: { type: "button" }
        },
        [_c("i", { staticClass: "feather icon-arrow-up" })]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Breadcrumb.vue?vue&type=template&id=6984c242&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/Breadcrumb.vue?vue&type=template&id=6984c242& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
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
                  _vm._l(_vm.$page.breadcrumbs, function(breadcrumb) {
                    return _c("li", { staticClass: "breadcrumb-item" }, [
                      breadcrumb.link
                        ? _c("a", { attrs: { href: breadcrumb.link } }, [
                            _vm._v(
                              "\n                " +
                                _vm._s(breadcrumb.name) +
                                "\n              "
                            )
                          ])
                        : _c("span", [_vm._v(_vm._s(breadcrumb.name))])
                    ])
                  }),
                  0
                )
              : _vm._e()
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass:
          "content-header-right text-md-right col-md-3 col-12 d-md-block d-none"
      },
      [
        _c("div", { staticClass: "form-group breadcrum-right" }, [
          _c("div", { staticClass: "dropdown" }, [
            _c(
              "button",
              {
                staticClass: "btn-icon btn btn-primary btn-round btn-sm",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.openModal(_vm.$page.modalSelector)
                  }
                }
              },
              [_c("i", { staticClass: "feather icon-plus-circle" })]
            )
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Layout.vue?vue&type=template&id=6bf30086&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/Layout.vue?vue&type=template&id=6bf30086& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
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



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Navbar.vue?vue&type=template&id=4af43e6c&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/Navbar.vue?vue&type=template&id=4af43e6c&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
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
          [_vm._m(1)]
        ),
    _vm._v(" "),
    _vm._m(2),
    _vm._v(" "),
    _vm._m(3)
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
    return _c("div", { staticClass: "navbar-wrapper" }, [
      _c("div", { staticClass: "navbar-container content" }, [
        _c(
          "div",
          { staticClass: "navbar-collapse", attrs: { id: "navbar-mobile" } },
          [
            _c(
              "div",
              {
                staticClass:
                  "mr-auto float-left bookmark-wrapper d-flex align-items-center"
              },
              [
                _c("ul", { staticClass: "nav navbar-nav" }, [
                  _c(
                    "li",
                    { staticClass: "nav-item mobile-menu d-xl-none mr-auto" },
                    [
                      _c(
                        "a",
                        {
                          staticClass:
                            "nav-link nav-menu-main menu-toggle hidden-xs",
                          attrs: { href: "#" }
                        },
                        [_c("i", { staticClass: "ficon feather icon-menu" })]
                      )
                    ]
                  )
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
                      _c("i", {
                        staticClass: "ficon feather icon-star warning"
                      })
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
                      _c("ul", {
                        staticClass: "search-list search-list-bookmark"
                      })
                    ])
                  ])
                ])
              ]
            ),
            _vm._v(" "),
            _c("ul", { staticClass: "nav navbar-nav float-right" }, [
              _c("li", { staticClass: "dropdown dropdown-language nav-item" }, [
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
                    _c("i", { staticClass: "flag-icon flag-icon-us" }),
                    _c("span", { staticClass: "selected-language" }, [
                      _vm._v("English")
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
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: "#", "data-language": "en" }
                      },
                      [
                        _c("i", { staticClass: "flag-icon flag-icon-us" }),
                        _vm._v(" English")
                      ]
                    ),
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: "#", "data-language": "fr" }
                      },
                      [
                        _c("i", { staticClass: "flag-icon flag-icon-fr" }),
                        _vm._v(" French")
                      ]
                    ),
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: "#", "data-language": "de" }
                      },
                      [
                        _c("i", { staticClass: "flag-icon flag-icon-de" }),
                        _vm._v(" German")
                      ]
                    ),
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: "#", "data-language": "pt" }
                      },
                      [
                        _c("i", { staticClass: "flag-icon flag-icon-pt" }),
                        _vm._v(" Portuguese")
                      ]
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("li", { staticClass: "nav-item d-none d-lg-block" }, [
                _c("a", { staticClass: "nav-link nav-link-expand" }, [
                  _c("i", { staticClass: "ficon feather icon-maximize" })
                ])
              ]),
              _vm._v(" "),
              _c("li", { staticClass: "nav-item nav-search" }, [
                _c("a", { staticClass: "nav-link nav-link-search" }, [
                  _c("i", { staticClass: "ficon feather icon-search" })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "search-input" }, [
                  _c("div", { staticClass: "search-input-icon" }, [
                    _c("i", { staticClass: "feather icon-search primary" })
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    staticClass: "input",
                    attrs: {
                      type: "text",
                      placeholder: "Explore Vuexy...",
                      tabindex: "-1",
                      "data-search": "starter-list"
                    }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "search-input-close" }, [
                    _c("i", { staticClass: "feather icon-x" })
                  ]),
                  _vm._v(" "),
                  _c("ul", { staticClass: "search-list search-list-main" })
                ])
              ]),
              _vm._v(" "),
              _c(
                "li",
                { staticClass: "dropdown dropdown-notification nav-item" },
                [
                  _c(
                    "a",
                    {
                      staticClass: "nav-link nav-link-label",
                      attrs: { href: "#", "data-toggle": "dropdown" }
                    },
                    [
                      _c("i", { staticClass: "ficon feather icon-bell" }),
                      _c(
                        "span",
                        {
                          staticClass: "badge badge-pill badge-primary badge-up"
                        },
                        [_vm._v("5")]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "ul",
                    {
                      staticClass:
                        "dropdown-menu dropdown-menu-media dropdown-menu-right"
                    },
                    [
                      _c("li", { staticClass: "dropdown-menu-header" }, [
                        _c("div", { staticClass: "dropdown-header m-0 p-2" }, [
                          _c("h3", { staticClass: "white" }, [_vm._v("5 New")]),
                          _c("span", { staticClass: "grey darken-2" }, [
                            _vm._v("App Notifications")
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "li",
                        { staticClass: "scrollable-container media-list" },
                        [
                          _c(
                            "a",
                            {
                              staticClass: "d-flex justify-content-between",
                              attrs: { href: "javascript:void(0)" }
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "media d-flex align-items-start"
                                },
                                [
                                  _c("div", { staticClass: "media-left" }, [
                                    _c("i", {
                                      staticClass:
                                        "feather icon-plus-square font-medium-5 primary"
                                    })
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "media-body" }, [
                                    _c(
                                      "h6",
                                      { staticClass: "primary media-heading" },
                                      [_vm._v("You have new order!")]
                                    ),
                                    _c(
                                      "small",
                                      { staticClass: "notification-text" },
                                      [
                                        _vm._v(
                                          " Are your going to meet me tonight?"
                                        )
                                      ]
                                    )
                                  ]),
                                  _c("small", [
                                    _c(
                                      "time",
                                      {
                                        staticClass: "media-meta",
                                        attrs: {
                                          datetime: "2015-06-11T18:29:20+08:00"
                                        }
                                      },
                                      [_vm._v("9 hours ago")]
                                    )
                                  ])
                                ]
                              )
                            ]
                          ),
                          _c(
                            "a",
                            {
                              staticClass: "d-flex justify-content-between",
                              attrs: { href: "javascript:void(0)" }
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "media d-flex align-items-start"
                                },
                                [
                                  _c("div", { staticClass: "media-left" }, [
                                    _c("i", {
                                      staticClass:
                                        "feather icon-download-cloud font-medium-5 success"
                                    })
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "media-body" }, [
                                    _c(
                                      "h6",
                                      {
                                        staticClass:
                                          "success media-heading red darken-1"
                                      },
                                      [_vm._v("99% Server load")]
                                    ),
                                    _c(
                                      "small",
                                      { staticClass: "notification-text" },
                                      [_vm._v("You got new order of goods.")]
                                    )
                                  ]),
                                  _c("small", [
                                    _c(
                                      "time",
                                      {
                                        staticClass: "media-meta",
                                        attrs: {
                                          datetime: "2015-06-11T18:29:20+08:00"
                                        }
                                      },
                                      [_vm._v("5 hour ago")]
                                    )
                                  ])
                                ]
                              )
                            ]
                          ),
                          _c(
                            "a",
                            {
                              staticClass: "d-flex justify-content-between",
                              attrs: { href: "javascript:void(0)" }
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "media d-flex align-items-start"
                                },
                                [
                                  _c("div", { staticClass: "media-left" }, [
                                    _c("i", {
                                      staticClass:
                                        "feather icon-alert-triangle font-medium-5 danger"
                                    })
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "media-body" }, [
                                    _c(
                                      "h6",
                                      {
                                        staticClass:
                                          "danger media-heading yellow darken-3"
                                      },
                                      [_vm._v("Warning notifixation")]
                                    ),
                                    _c(
                                      "small",
                                      { staticClass: "notification-text" },
                                      [_vm._v("Server have 99% CPU usage.")]
                                    )
                                  ]),
                                  _c("small", [
                                    _c(
                                      "time",
                                      {
                                        staticClass: "media-meta",
                                        attrs: {
                                          datetime: "2015-06-11T18:29:20+08:00"
                                        }
                                      },
                                      [_vm._v("Today")]
                                    )
                                  ])
                                ]
                              )
                            ]
                          ),
                          _c(
                            "a",
                            {
                              staticClass: "d-flex justify-content-between",
                              attrs: { href: "javascript:void(0)" }
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "media d-flex align-items-start"
                                },
                                [
                                  _c("div", { staticClass: "media-left" }, [
                                    _c("i", {
                                      staticClass:
                                        "feather icon-check-circle font-medium-5 info"
                                    })
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "media-body" }, [
                                    _c(
                                      "h6",
                                      { staticClass: "info media-heading" },
                                      [_vm._v("Complete the task")]
                                    ),
                                    _c(
                                      "small",
                                      { staticClass: "notification-text" },
                                      [_vm._v("Cake sesame snaps cupcake")]
                                    )
                                  ]),
                                  _c("small", [
                                    _c(
                                      "time",
                                      {
                                        staticClass: "media-meta",
                                        attrs: {
                                          datetime: "2015-06-11T18:29:20+08:00"
                                        }
                                      },
                                      [_vm._v("Last week")]
                                    )
                                  ])
                                ]
                              )
                            ]
                          ),
                          _c(
                            "a",
                            {
                              staticClass: "d-flex justify-content-between",
                              attrs: { href: "javascript:void(0)" }
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "media d-flex align-items-start"
                                },
                                [
                                  _c("div", { staticClass: "media-left" }, [
                                    _c("i", {
                                      staticClass:
                                        "feather icon-file font-medium-5 warning"
                                    })
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "media-body" }, [
                                    _c(
                                      "h6",
                                      { staticClass: "warning media-heading" },
                                      [_vm._v("Generate monthly report")]
                                    ),
                                    _c(
                                      "small",
                                      { staticClass: "notification-text" },
                                      [
                                        _vm._v(
                                          "Chocolate cake oat cake tiramisu marzipan"
                                        )
                                      ]
                                    )
                                  ]),
                                  _c("small", [
                                    _c(
                                      "time",
                                      {
                                        staticClass: "media-meta",
                                        attrs: {
                                          datetime: "2015-06-11T18:29:20+08:00"
                                        }
                                      },
                                      [_vm._v("Last month")]
                                    )
                                  ])
                                ]
                              )
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("li", { staticClass: "dropdown-menu-footer" }, [
                        _c(
                          "a",
                          {
                            staticClass: "dropdown-item p-1 text-center",
                            attrs: { href: "javascript:void(0)" }
                          },
                          [_vm._v("Read all notifications")]
                        )
                      ])
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c("li", { staticClass: "dropdown dropdown-user nav-item" }, [
                _c(
                  "a",
                  {
                    staticClass: "dropdown-toggle nav-link dropdown-user-link",
                    attrs: { href: "#", "data-toggle": "dropdown" }
                  },
                  [
                    _c("div", { staticClass: "user-nav d-sm-flex d-none" }, [
                      _c("span", { staticClass: "user-name text-bold-600" }, [
                        _vm._v("John Doe")
                      ]),
                      _c("span", { staticClass: "user-status" }, [
                        _vm._v("Available")
                      ])
                    ]),
                    _c("span", [
                      _c("img", {
                        staticClass: "round",
                        attrs: {
                          src: "/images/portrait/small/avatar-s-11.jpg",
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
                  { staticClass: "dropdown-menu dropdown-menu-right" },
                  [
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: "javascript:void(0)" }
                      },
                      [
                        _c("i", { staticClass: "feather icon-user" }),
                        _vm._v(" Edit Profile")
                      ]
                    ),
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: "javascript:void(0)" }
                      },
                      [
                        _c("i", { staticClass: "feather icon-mail" }),
                        _vm._v(" My Inbox")
                      ]
                    ),
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: "javascript:void(0)" }
                      },
                      [
                        _c("i", { staticClass: "feather icon-check-square" }),
                        _vm._v(" Task")
                      ]
                    ),
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: "javascript:void(0)" }
                      },
                      [
                        _c("i", { staticClass: "feather icon-message-square" }),
                        _vm._v(" Chats")
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "dropdown-divider" }),
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        attrs: { href: "javascript:void(0)" }
                      },
                      [
                        _c("i", { staticClass: "feather icon-power" }),
                        _vm._v(" Logout")
                      ]
                    )
                  ]
                )
              ])
            ])
          ]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "main-search-list-defaultlist d-none" }, [
      _c("li", { staticClass: "d-flex align-items-center" }, [
        _c("a", { staticClass: "pb-25", attrs: { href: "#" } }, [
          _c("h6", { staticClass: "text-primary mb-0" }, [_vm._v("Files")])
        ])
      ]),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass:
            "auto-suggestion d-flex align-items-center cursor-pointer"
        },
        [
          _c(
            "a",
            {
              staticClass:
                "d-flex align-items-center justify-content-between w-100",
              attrs: { href: "#" }
            },
            [
              _c("div", { staticClass: "d-flex" }, [
                _c("div", { staticClass: "ml-0 mr-50" }, [
                  _c("img", {
                    attrs: {
                      src: "/images/icons/xls.png",
                      alt: "png",
                      height: "32"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "search-data" }, [
                  _c("p", { staticClass: "search-data-title mb-0" }, [
                    _vm._v("Two new item submitted")
                  ]),
                  _c("small", { staticClass: "text-muted" }, [
                    _vm._v("Marketing Manager")
                  ])
                ])
              ]),
              _c(
                "small",
                { staticClass: "search-data-size mr-50 text-muted" },
                [_vm._v("'17kb")]
              )
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass:
            "auto-suggestion d-flex align-items-center cursor-pointer"
        },
        [
          _c(
            "a",
            {
              staticClass:
                "d-flex align-items-center justify-content-between w-100",
              attrs: { href: "#" }
            },
            [
              _c("div", { staticClass: "d-flex" }, [
                _c("div", { staticClass: "ml-0 mr-50" }, [
                  _c("img", {
                    attrs: {
                      src: "/images/icons/jpg.png",
                      alt: "png",
                      height: "32"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "search-data" }, [
                  _c("p", { staticClass: "search-data-title mb-0" }, [
                    _vm._v("52 JPG file Generated")
                  ]),
                  _c("small", { staticClass: "text-muted" }, [
                    _vm._v("FontEnd Developer")
                  ])
                ])
              ]),
              _c(
                "small",
                { staticClass: "search-data-size mr-50 text-muted" },
                [_vm._v("'11kb")]
              )
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass:
            "auto-suggestion d-flex align-items-center cursor-pointer"
        },
        [
          _c(
            "a",
            {
              staticClass:
                "d-flex align-items-center justify-content-between w-100",
              attrs: { href: "#" }
            },
            [
              _c("div", { staticClass: "d-flex" }, [
                _c("div", { staticClass: "ml-0 mr-50" }, [
                  _c("img", {
                    attrs: {
                      src: "/images/icons/pdf.png",
                      alt: "png",
                      height: "32"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "search-data" }, [
                  _c("p", { staticClass: "search-data-title mb-0" }, [
                    _vm._v("25 PDF File Uploaded")
                  ]),
                  _c("small", { staticClass: "text-muted" }, [
                    _vm._v("Digital Marketing Manager")
                  ])
                ])
              ]),
              _c(
                "small",
                { staticClass: "search-data-size mr-50 text-muted" },
                [_vm._v("'150kb")]
              )
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass:
            "auto-suggestion d-flex align-items-center cursor-pointer"
        },
        [
          _c(
            "a",
            {
              staticClass:
                "d-flex align-items-center justify-content-between w-100",
              attrs: { href: "#" }
            },
            [
              _c("div", { staticClass: "d-flex" }, [
                _c("div", { staticClass: "ml-0 mr-50" }, [
                  _c("img", {
                    attrs: {
                      src: "/images/icons/doc.png",
                      alt: "png",
                      height: "32"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "search-data" }, [
                  _c("p", { staticClass: "search-data-title mb-0" }, [
                    _vm._v("Anna_Strong.doc")
                  ]),
                  _c("small", { staticClass: "text-muted" }, [
                    _vm._v("Web Designer")
                  ])
                ])
              ]),
              _c(
                "small",
                { staticClass: "search-data-size mr-50 text-muted" },
                [_vm._v("'256kb")]
              )
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c("li", { staticClass: "d-flex align-items-center" }, [
        _c("a", { staticClass: "pb-25", attrs: { href: "#" } }, [
          _c("h6", { staticClass: "text-primary mb-0" }, [_vm._v("Members")])
        ])
      ]),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass:
            "auto-suggestion d-flex align-items-center cursor-pointer"
        },
        [
          _c(
            "a",
            {
              staticClass:
                "d-flex align-items-center justify-content-between py-50 w-100",
              attrs: { href: "#" }
            },
            [
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("div", { staticClass: "avatar mr-50" }, [
                  _c("img", {
                    attrs: {
                      src: "/images/portrait/small/avatar-s-8.jpg",
                      alt: "png",
                      height: "32"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "search-data" }, [
                  _c("p", { staticClass: "search-data-title mb-0" }, [
                    _vm._v("John Doe")
                  ]),
                  _c("small", { staticClass: "text-muted" }, [
                    _vm._v("UI designer")
                  ])
                ])
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass:
            "auto-suggestion d-flex align-items-center cursor-pointer"
        },
        [
          _c(
            "a",
            {
              staticClass:
                "d-flex align-items-center justify-content-between py-50 w-100",
              attrs: { href: "#" }
            },
            [
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("div", { staticClass: "avatar mr-50" }, [
                  _c("img", {
                    attrs: {
                      src: "/images/portrait/small/avatar-s-1.jpg",
                      alt: "png",
                      height: "32"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "search-data" }, [
                  _c("p", { staticClass: "search-data-title mb-0" }, [
                    _vm._v("Michal Clark")
                  ]),
                  _c("small", { staticClass: "text-muted" }, [
                    _vm._v("FontEnd Developer")
                  ])
                ])
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass:
            "auto-suggestion d-flex align-items-center cursor-pointer"
        },
        [
          _c(
            "a",
            {
              staticClass:
                "d-flex align-items-center justify-content-between py-50 w-100",
              attrs: { href: "#" }
            },
            [
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("div", { staticClass: "avatar mr-50" }, [
                  _c("img", {
                    attrs: {
                      src: "/images/portrait/small/avatar-s-14.jpg",
                      alt: "png",
                      height: "32"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "search-data" }, [
                  _c("p", { staticClass: "search-data-title mb-0" }, [
                    _vm._v("Milena Gibson")
                  ]),
                  _c("small", { staticClass: "text-muted" }, [
                    _vm._v("Digital Marketing Manager")
                  ])
                ])
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "li",
        {
          staticClass:
            "auto-suggestion d-flex align-items-center cursor-pointer"
        },
        [
          _c(
            "a",
            {
              staticClass:
                "d-flex align-items-center justify-content-between py-50 w-100",
              attrs: { href: "#" }
            },
            [
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("div", { staticClass: "avatar mr-50" }, [
                  _c("img", {
                    attrs: {
                      src: "/images/portrait/small/avatar-s-6.jpg",
                      alt: "png",
                      height: "32"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "search-data" }, [
                  _c("p", { staticClass: "search-data-title mb-0" }, [
                    _vm._v("Anna Strong")
                  ]),
                  _c("small", { staticClass: "text-muted" }, [
                    _vm._v("Web Designer")
                  ])
                ])
              ])
            ]
          )
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "ul",
      { staticClass: "main-search-list-defaultlist-other-list d-none" },
      [
        _c(
          "li",
          {
            staticClass:
              "auto-suggestion d-flex align-items-center justify-content-between cursor-pointer"
          },
          [
            _c(
              "a",
              {
                staticClass:
                  "d-flex align-items-center justify-content-between w-100 py-50"
              },
              [
                _c("div", { staticClass: "d-flex justify-content-start" }, [
                  _c("span", {
                    staticClass: "mr-75 feather icon-alert-circle"
                  }),
                  _c("span", [_vm._v("No results found.")])
                ])
              ]
            )
          ]
        )
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Sidebar.vue?vue&type=template&id=f6a89ea0&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Shared/Sidebar.vue?vue&type=template&id=f6a89ea0& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
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
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "shadow-bottom" }),
      _vm._v(" "),
      _vm._m(1)
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "navbar-header" }, [
      _c("ul", { staticClass: "nav navbar-nav flex-row" }, [
        _c("li", { staticClass: "nav-item mr-auto" }, [
          _c(
            "a",
            {
              staticClass: "navbar-brand",
              attrs: { href: "dashboard-analytics" }
            },
            [
              _c("div", { staticClass: "brand-logo" }),
              _vm._v(" "),
              _c("h2", { staticClass: "brand-text mb-0" }, [_vm._v("Vuexy")])
            ]
          )
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "nav-item nav-toggle" }, [
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
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "main-menu-content" }, [
      _c(
        "ul",
        {
          staticClass: "navigation navigation-main",
          attrs: { id: "main-menu-navigation", "data-menu": "menu-navigation" }
        },
        [
          _c("li", { staticClass: "nav-item" }, [
            _c("a", { attrs: { href: "/" } }, [
              _c("i", { staticClass: "feather icon-home" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("ড্যাশবোর্ড")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-users" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("ব্যবহারকারী")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/users/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/users" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "navigation-header" }, [
            _c("span", [_vm._v("Settings")])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-unlock" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("নিয়ম")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/roles/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/roles" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-unlock" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("হিসাবের ধরন")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/account-types/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/account-types" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-unlock" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("লেনদেনের ধরণ")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c(
                  "a",
                  { attrs: { href: "/settings/transaction-types/create" } },
                  [
                    _c("i", { staticClass: "feather icon-plus" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                      [_vm._v("নতুন")]
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/transaction-types" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-unlock" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("অর্থের ধরণ")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/money-formats/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/money-formats" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-book" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("ধর্ম")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/religions/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/religions" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-book" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("রক্তের গ্রুপ")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/blood_groups/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/blood_groups" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-book" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("লিঙ্গ")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/genders/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/genders" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-book" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("বিভাগ")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/divisions/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/divisions" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-book" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("জেলা")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/districts/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/districts" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "nav-item has-sub" }, [
            _c("a", { attrs: { href: "" } }, [
              _c("i", { staticClass: "feather icon-book" }),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                [_vm._v("উপজেলা")]
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "menu-content" }, [
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/upazillas/create" } }, [
                  _c("i", { staticClass: "feather icon-plus" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("নতুন")]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("li", {}, [
                _c("a", { attrs: { href: "/settings/upazillas" } }, [
                  _c("i", { staticClass: "feather icon-circle" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v("তালিকা")]
                  )
                ])
              ])
            ])
          ])
        ]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/Pages/Dashboard.vue":
/*!******************************************!*\
  !*** ./resources/js/Pages/Dashboard.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_097ba13b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=097ba13b& */ "./resources/js/Pages/Dashboard.vue?vue&type=template&id=097ba13b&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_097ba13b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_097ba13b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Dashboard.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/Pages/Dashboard.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Dashboard.vue?vue&type=template&id=097ba13b&":
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/Dashboard.vue?vue&type=template&id=097ba13b& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_097ba13b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=097ba13b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Dashboard.vue?vue&type=template&id=097ba13b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_097ba13b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_097ba13b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Shared/AppFooter.vue":
/*!*******************************************!*\
  !*** ./resources/js/Shared/AppFooter.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppFooter_vue_vue_type_template_id_47d87520_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppFooter.vue?vue&type=template&id=47d87520&scoped=true& */ "./resources/js/Shared/AppFooter.vue?vue&type=template&id=47d87520&scoped=true&");
/* harmony import */ var _AppFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppFooter.vue?vue&type=script&lang=js& */ "./resources/js/Shared/AppFooter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AppFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppFooter_vue_vue_type_template_id_47d87520_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AppFooter_vue_vue_type_template_id_47d87520_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "47d87520",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Shared/AppFooter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Shared/AppFooter.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/Shared/AppFooter.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AppFooter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/AppFooter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Shared/AppFooter.vue?vue&type=template&id=47d87520&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Shared/AppFooter.vue?vue&type=template&id=47d87520&scoped=true& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_template_id_47d87520_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AppFooter.vue?vue&type=template&id=47d87520&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/AppFooter.vue?vue&type=template&id=47d87520&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_template_id_47d87520_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppFooter_vue_vue_type_template_id_47d87520_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Shared/Breadcrumb.vue":
/*!********************************************!*\
  !*** ./resources/js/Shared/Breadcrumb.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Breadcrumb_vue_vue_type_template_id_6984c242___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Breadcrumb.vue?vue&type=template&id=6984c242& */ "./resources/js/Shared/Breadcrumb.vue?vue&type=template&id=6984c242&");
/* harmony import */ var _Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Breadcrumb.vue?vue&type=script&lang=js& */ "./resources/js/Shared/Breadcrumb.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Breadcrumb_vue_vue_type_template_id_6984c242___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Breadcrumb_vue_vue_type_template_id_6984c242___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Shared/Breadcrumb.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Shared/Breadcrumb.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/Shared/Breadcrumb.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Breadcrumb.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Breadcrumb.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Shared/Breadcrumb.vue?vue&type=template&id=6984c242&":
/*!***************************************************************************!*\
  !*** ./resources/js/Shared/Breadcrumb.vue?vue&type=template&id=6984c242& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_template_id_6984c242___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Breadcrumb.vue?vue&type=template&id=6984c242& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Breadcrumb.vue?vue&type=template&id=6984c242&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_template_id_6984c242___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Breadcrumb_vue_vue_type_template_id_6984c242___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Shared/Layout.vue":
/*!****************************************!*\
  !*** ./resources/js/Shared/Layout.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Layout_vue_vue_type_template_id_6bf30086___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layout.vue?vue&type=template&id=6bf30086& */ "./resources/js/Shared/Layout.vue?vue&type=template&id=6bf30086&");
/* harmony import */ var _Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layout.vue?vue&type=script&lang=js& */ "./resources/js/Shared/Layout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Layout_vue_vue_type_template_id_6bf30086___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Layout_vue_vue_type_template_id_6bf30086___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Shared/Layout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Shared/Layout.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./resources/js/Shared/Layout.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Layout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Layout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Shared/Layout.vue?vue&type=template&id=6bf30086&":
/*!***********************************************************************!*\
  !*** ./resources/js/Shared/Layout.vue?vue&type=template&id=6bf30086& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_6bf30086___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Layout.vue?vue&type=template&id=6bf30086& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Layout.vue?vue&type=template&id=6bf30086&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_6bf30086___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_6bf30086___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Shared/Navbar.vue":
/*!****************************************!*\
  !*** ./resources/js/Shared/Navbar.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Navbar_vue_vue_type_template_id_4af43e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navbar.vue?vue&type=template&id=4af43e6c&scoped=true& */ "./resources/js/Shared/Navbar.vue?vue&type=template&id=4af43e6c&scoped=true&");
/* harmony import */ var _Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar.vue?vue&type=script&lang=js& */ "./resources/js/Shared/Navbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Navbar_vue_vue_type_template_id_4af43e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Navbar_vue_vue_type_template_id_4af43e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4af43e6c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Shared/Navbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Shared/Navbar.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./resources/js/Shared/Navbar.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Navbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Navbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Shared/Navbar.vue?vue&type=template&id=4af43e6c&scoped=true&":
/*!***********************************************************************************!*\
  !*** ./resources/js/Shared/Navbar.vue?vue&type=template&id=4af43e6c&scoped=true& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_4af43e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Navbar.vue?vue&type=template&id=4af43e6c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Navbar.vue?vue&type=template&id=4af43e6c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_4af43e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_4af43e6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Shared/Sidebar.vue":
/*!*****************************************!*\
  !*** ./resources/js/Shared/Sidebar.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sidebar_vue_vue_type_template_id_f6a89ea0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=template&id=f6a89ea0& */ "./resources/js/Shared/Sidebar.vue?vue&type=template&id=f6a89ea0&");
/* harmony import */ var _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar.vue?vue&type=script&lang=js& */ "./resources/js/Shared/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sidebar_vue_vue_type_template_id_f6a89ea0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sidebar_vue_vue_type_template_id_f6a89ea0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Shared/Sidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Shared/Sidebar.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/Shared/Sidebar.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Sidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Shared/Sidebar.vue?vue&type=template&id=f6a89ea0&":
/*!************************************************************************!*\
  !*** ./resources/js/Shared/Sidebar.vue?vue&type=template&id=f6a89ea0& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_f6a89ea0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Sidebar.vue?vue&type=template&id=f6a89ea0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Shared/Sidebar.vue?vue&type=template&id=f6a89ea0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_f6a89ea0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_template_id_f6a89ea0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);