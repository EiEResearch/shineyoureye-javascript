(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/app/document/SingleEvent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/document/SingleEvent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_shared_factory_document_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/shared/factory/document.factory */ \"./src/app/shared/factory/document.factory.js\");\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'SingleEvent',\n  data: function data() {\n    return {\n      post: {}\n    };\n  },\n  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {\n    try {\n      this.$options.beforeRouteEnter(to, from, next);\n    } catch (error) {\n      next(function (Vue) {\n        var vm = Vue;\n        vm.$logger(error);\n      });\n    }\n  },\n  beforeRouteEnter: function () {\n    var _beforeRouteEnter = _asyncToGenerator(\n    /*#__PURE__*/\n    C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(to, from, next) {\n      var _ref, data;\n\n      return C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.prev = 0;\n              _context.next = 3;\n              return new _app_shared_factory_document_factory__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('events').find(to.params.slug).then(function (res) {\n                return res.data;\n              });\n\n            case 3:\n              _ref = _context.sent;\n              data = _ref.data;\n              next(function (vue) {\n                var vm = vue;\n\n                if (data.post) {\n                  vm.post = data.post;\n                }\n              });\n              _context.next = 11;\n              break;\n\n            case 8:\n              _context.prev = 8;\n              _context.t0 = _context[\"catch\"](0);\n              next({\n                name: 'error',\n                params: [to.path],\n                replace: true\n              });\n\n            case 11:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[0, 8]]);\n    }));\n\n    function beforeRouteEnter(_x, _x2, _x3) {\n      return _beforeRouteEnter.apply(this, arguments);\n    }\n\n    return beforeRouteEnter;\n  }(),\n  metaInfo: function metaInfo() {\n    return {\n      title: this.post.title,\n      meta: [{\n        name: 'description',\n        content: this.post.excerpt || ''\n      }]\n    };\n  },\n  method: {}\n});\n\n//# sourceURL=webpack:///./src/app/document/SingleEvent.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"64c93795-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/app/document/SingleEvent.vue?vue&type=template&id=0b51e825&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"64c93795-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/document/SingleEvent.vue?vue&type=template&id=0b51e825& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _c(\"div\", { attrs: { id: \"single-blog\" } }, [\n        _c(\"header\", { staticClass: \"masthead\" }, [\n          _c(\"div\", { staticClass: \"overlay\" }),\n          _c(\"div\", { staticClass: \"container\" }, [\n            _c(\"div\", { staticClass: \"row\" }, [\n              _c(\"div\", { staticClass: \"col-lg-8 col-md-10 mx-auto d-flex\" }, [\n                _c(\"div\", { staticClass: \"post-heading\" }, [\n                  _c(\"h1\", [_vm._v(_vm._s(_vm.post.title))]),\n                  _c(\"span\", { staticClass: \"meta\" }, [\n                    _vm._v(\n                      \"Date and Time: \" + _vm._s(_vm.post.event_date) + \" \"\n                    )\n                  ])\n                ])\n              ])\n            ])\n          ])\n        ]),\n        _c(\"article\", [\n          _c(\"div\", { staticClass: \"container\" }, [\n            _c(\"div\", { staticClass: \"row\" }, [\n              _c(\n                \"div\",\n                {\n                  staticClass:\n                    \"mx-auto d-flex article-post justify-content-center\",\n                  class:\n                    _vm.post.type !== \"image\"\n                      ? \"col-lg-8 col-md-10\"\n                      : \"col-lg-11 col-md-12 image-post\"\n                },\n                [_c(\"div\", { domProps: { innerHTML: _vm._s(_vm.post.body) } })]\n              )\n            ])\n          ])\n        ])\n      ]),\n      _c(\"page-sharing-component\")\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/app/document/SingleEvent.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2264c93795-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/app/document/SingleEvent.vue":
/*!******************************************!*\
  !*** ./src/app/document/SingleEvent.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SingleEvent_vue_vue_type_template_id_0b51e825___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SingleEvent.vue?vue&type=template&id=0b51e825& */ \"./src/app/document/SingleEvent.vue?vue&type=template&id=0b51e825&\");\n/* harmony import */ var _SingleEvent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingleEvent.vue?vue&type=script&lang=js& */ \"./src/app/document/SingleEvent.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _SingleEvent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _SingleEvent_vue_vue_type_template_id_0b51e825___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _SingleEvent_vue_vue_type_template_id_0b51e825___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/app/document/SingleEvent.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/app/document/SingleEvent.vue?");

/***/ }),

/***/ "./src/app/document/SingleEvent.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./src/app/document/SingleEvent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleEvent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SingleEvent.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/app/document/SingleEvent.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleEvent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/app/document/SingleEvent.vue?");

/***/ }),

/***/ "./src/app/document/SingleEvent.vue?vue&type=template&id=0b51e825&":
/*!*************************************************************************!*\
  !*** ./src/app/document/SingleEvent.vue?vue&type=template&id=0b51e825& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_64c93795_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleEvent_vue_vue_type_template_id_0b51e825___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"64c93795-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SingleEvent.vue?vue&type=template&id=0b51e825& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"64c93795-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/app/document/SingleEvent.vue?vue&type=template&id=0b51e825&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_64c93795_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleEvent_vue_vue_type_template_id_0b51e825___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_64c93795_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleEvent_vue_vue_type_template_id_0b51e825___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/app/document/SingleEvent.vue?");

/***/ })

}]);