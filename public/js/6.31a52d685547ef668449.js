(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Auth/PasswordReset.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Auth/PasswordReset.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Shared_AuthLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Shared/AuthLayout */ "./resources/js/Shared/AuthLayout.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "PasswordReset",
  components: {
    AuthLayout: _Shared_AuthLayout__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    token: String,
    email: String,
    errors: Object
  },
  data: function data() {
    return {
      form: {
        password: '',
        password_confirmation: ''
      }
    };
  },
  methods: {
    resetPassword: function resetPassword() {
      this.$inertia.post(this.route('password.update'), {
        email: this.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
        token: this.token
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Auth/PasswordReset.vue?vue&type=template&id=1e83a3d4&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Auth/PasswordReset.vue?vue&type=template&id=1e83a3d4& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  return _c("auth-layout", [
    _c("section", { staticClass: "row flexbox-container" }, [
      _c(
        "div",
        { staticClass: "col-xl-7 col-10 d-flex justify-content-center" },
        [
          _c(
            "div",
            { staticClass: "card bg-authentication rounded-0 mb-0 w-100" },
            [
              _c("div", { staticClass: "row m-0" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "col-lg-6 d-lg-block d-none text-center align-self-center p-0"
                  },
                  [
                    _c("img", {
                      attrs: {
                        src: "/images/pages/reset-password.png",
                        alt: "branding logo"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-6 col-12 p-0" }, [
                  _c("div", { staticClass: "card rounded-0 mb-0 px-2" }, [
                    _c("div", { staticClass: "card-header pb-1" }, [
                      _c("div", { staticClass: "card-title" }, [
                        _c("h4", { staticClass: "mb-0" }, [
                          _vm._v("Reset Password")
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "px-2" }, [
                      _vm._v("Please enter your new password.")
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-content" }, [
                      _c("div", { staticClass: "card-body pt-1" }, [
                        _c(
                          "form",
                          {
                            on: {
                              submit: function($event) {
                                $event.preventDefault()
                                return _vm.resetPassword($event)
                              }
                            }
                          },
                          [
                            _c(
                              "fieldset",
                              { staticClass: "form-label-group" },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.email,
                                      expression: "email"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    type: "email",
                                    placeholder: "Email",
                                    autocomplete: "email",
                                    autofocus: ""
                                  },
                                  domProps: { value: _vm.email },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.email = $event.target.value
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", [_vm._v("Email")])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "fieldset",
                              { staticClass: "form-label-group" },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.form.password,
                                      expression: "form.password"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  class: [
                                    _vm.errors.password ? "is-invalid" : ""
                                  ],
                                  attrs: {
                                    type: "password",
                                    placeholder: "Password",
                                    autocomplete: "new-password"
                                  },
                                  domProps: { value: _vm.form.password },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.form,
                                        "password",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", [_vm._v("Password")]),
                                _vm._v(" "),
                                _vm.errors.password
                                  ? _c(
                                      "span",
                                      {
                                        staticClass: "invalid-feedback",
                                        attrs: { role: "alert" }
                                      },
                                      [
                                        _c("strong", [
                                          _vm._v(_vm._s(_vm.errors.password))
                                        ])
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "fieldset",
                              { staticClass: "form-label-group" },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.form.password_confirmation,
                                      expression: "form.password_confirmation"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    type: "password",
                                    placeholder: "Confirm Password",
                                    autocomplete: "new-password"
                                  },
                                  domProps: {
                                    value: _vm.form.password_confirmation
                                  },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.form,
                                        "password_confirmation",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", [_vm._v("Confirm Password")])
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "row pt-2" }, [
                              _c(
                                "div",
                                { staticClass: "col-12 col-md-6 mb-1" },
                                [
                                  _c(
                                    "a",
                                    {
                                      staticClass:
                                        "btn btn-outline-primary btn-block px-0",
                                      attrs: { href: _vm.route("login") }
                                    },
                                    [_vm._v("Go Back to Login")]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "col-12 col-md-6 mb-1" },
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-primary btn-block px-0",
                                      attrs: { type: "submit" }
                                    },
                                    [_vm._v("Reset")]
                                  )
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
            ]
          )
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Pages/Auth/PasswordReset.vue":
/*!***************************************************!*\
  !*** ./resources/js/Pages/Auth/PasswordReset.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PasswordReset_vue_vue_type_template_id_1e83a3d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PasswordReset.vue?vue&type=template&id=1e83a3d4& */ "./resources/js/Pages/Auth/PasswordReset.vue?vue&type=template&id=1e83a3d4&");
/* harmony import */ var _PasswordReset_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PasswordReset.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Auth/PasswordReset.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PasswordReset_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PasswordReset_vue_vue_type_template_id_1e83a3d4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PasswordReset_vue_vue_type_template_id_1e83a3d4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Auth/PasswordReset.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Auth/PasswordReset.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/Pages/Auth/PasswordReset.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordReset_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PasswordReset.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Auth/PasswordReset.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordReset_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Auth/PasswordReset.vue?vue&type=template&id=1e83a3d4&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Pages/Auth/PasswordReset.vue?vue&type=template&id=1e83a3d4& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordReset_vue_vue_type_template_id_1e83a3d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PasswordReset.vue?vue&type=template&id=1e83a3d4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Auth/PasswordReset.vue?vue&type=template&id=1e83a3d4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordReset_vue_vue_type_template_id_1e83a3d4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PasswordReset_vue_vue_type_template_id_1e83a3d4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);