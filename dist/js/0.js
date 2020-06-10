(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/app/places/Places.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/places/Places.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_shared_services_people_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/shared/services/people.service */ \"./src/app/shared/services/people.service.js\");\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Places',\n  data: function data() {\n    return {\n      pathMeta: '',\n      areaType: '',\n      title: 'Places',\n      people: [],\n      mainProps: {\n        blank: true,\n        width: 70,\n        height: 70,\n        blankColor: '#bbb',\n        class: 'm1'\n      }\n    };\n  },\n  metaInfo: function metaInfo() {\n    return {\n      title: this.areaType || this.title\n    };\n  },\n  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {\n    try {\n      this.$options.beforeRouteEnter(to, from, next);\n    } catch (error) {\n      next(function (Vue) {\n        var vm = Vue;\n        vm.$logger(error);\n      });\n    }\n  },\n  beforeRouteEnter: function () {\n    var _beforeRouteEnter = _asyncToGenerator(\n    /*#__PURE__*/\n    C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(to, from, next) {\n      var _ref, data;\n\n      return C_Users_Solomon_Omokehinde_Documents_shineyoureye_javascript_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.prev = 0;\n              _context.next = 3;\n              return new _app_shared_services_people_service__WEBPACK_IMPORTED_MODULE_1__[\"default\"](to.meta.position).findAll().then(function (res) {\n                return res.data;\n              });\n\n            case 3:\n              _ref = _context.sent;\n              data = _ref.data;\n              next(function (vue) {\n                var vm = vue;\n                vm.pathMeta = (to.name || '').toLowerCase();\n                vm.areaType = to.meta.type || '';\n                vm.people = Object.freeze(data.people);\n                next();\n              });\n              _context.next = 11;\n              break;\n\n            case 8:\n              _context.prev = 8;\n              _context.t0 = _context[\"catch\"](0);\n              next({\n                name: 'error',\n                params: [to.path],\n                replace: true\n              });\n\n            case 11:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[0, 8]]);\n    }));\n\n    function beforeRouteEnter(_x, _x2, _x3) {\n      return _beforeRouteEnter.apply(this, arguments);\n    }\n\n    return beforeRouteEnter;\n  }(),\n  computed: {\n    groupByState: function groupByState() {\n      return this.groupBy(this.people, 'state');\n    }\n  },\n  methods: {\n    addActiveClass: function addActiveClass(path) {\n      return String(path || '').toLowerCase() === String(this.pathMeta || '').toLowerCase();\n    },\n    groupBy: function groupBy(arr, key) {\n      var res = [];\n      arr.map(function (val) {\n        var result = {};\n        result.organization = val.organization;\n        result.legislative_period = val.legislative_period;\n        result.start_date = val.start_date;\n        result.end_date = val.end_date;\n        result.places = new Map();\n        var unorderedPersons = {};\n        val.persons.forEach(function (item) {\n          if (!unorderedPersons[item[key]]) {\n            unorderedPersons[item[key]] = [];\n          }\n\n          unorderedPersons[item[key]].push({\n            address: item.address,\n            area: item.area\n          });\n        });\n        Object.keys(unorderedPersons).sort().forEach(function (k) {\n          unorderedPersons[k] = Object.values(unorderedPersons[k]).sort(function (a, b) {\n            var x = a.address.district.value.toLowerCase() || a.area.place.name.toLowerCase();\n            var y = b.address.district.value.toLowerCase() || b.area.place.name.toLowerCase();\n            /* eslint-disable no-nested-ternary */\n\n            return x < y ? -1 : x > y ? 1 : 0;\n          });\n\n          if (!result.places.has(k)) {\n            result.places.set(k, unorderedPersons[k]);\n          } else {\n            result.places.get(k).push(unorderedPersons[k]);\n          }\n        });\n        unorderedPersons = null;\n        res.push(Object.freeze(result));\n        return res;\n      });\n      return res;\n    }\n  },\n  mounted: function mounted() {\n    this.$nextTick().then(function () {\n      // eslint-disable-next-line no-new\n      new GianniAccordion({\n        elements: '.expandableItem',\n        openAtLandingIndex: 0\n      });\n    });\n  }\n});\n\n//# sourceURL=webpack:///./src/app/places/Places.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"64c93795-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/app/places/Places.vue?vue&type=template&id=b91005d0&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"64c93795-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/app/places/Places.vue?vue&type=template&id=b91005d0& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _c(\"header\", { staticClass: \"masthead\" }, [\n        _c(\"div\", { staticClass: \"overlay\" }),\n        _c(\"div\", { staticClass: \"container\" }, [\n          _c(\"div\", { staticClass: \"row\" }, [\n            _c(\"div\", { staticClass: \"col-lg-8 col-md-10 mx-auto d-flex\" }, [\n              _c(\"div\", { staticClass: \"post-heading\" }, [\n                _c(\"h1\", [_vm._v(_vm._s(_vm.title))])\n              ])\n            ])\n          ])\n        ])\n      ]),\n      _c(\"div\", { staticClass: \"container\" }, [\n        _c(\"div\", { staticClass: \"row\" }, [\n          _c(\"div\", { staticClass: \"col-lg-8 col-md-10 mx-auto\" }, [\n            _c(\n              \"div\",\n              { staticClass: \"content\" },\n              [\n                _c(\n                  \"b-nav\",\n                  { attrs: { pills: \"\" } },\n                  [\n                    _c(\n                      \"b-nav-item\",\n                      {\n                        attrs: {\n                          active: _vm.addActiveClass(\"states\"),\n                          href: \"/places/state\"\n                        }\n                      },\n                      [_vm._v(\"States\")]\n                    ),\n                    _c(\n                      \"b-nav-item\",\n                      {\n                        attrs: {\n                          active: _vm.addActiveClass(\"senatorial-district\"),\n                          href: \"/places/senatorial-district\"\n                        }\n                      },\n                      [_vm._v(\"Senatorial District\")]\n                    ),\n                    _c(\n                      \"b-nav-item\",\n                      {\n                        attrs: {\n                          active: _vm.addActiveClass(\"federal-constituency\"),\n                          href: \"/places/federal-constituency\"\n                        }\n                      },\n                      [_vm._v(\"Federal Constituencies\")]\n                    ),\n                    _c(\n                      \"b-nav-item\",\n                      {\n                        attrs: {\n                          active: _vm.addActiveClass(\"state-constituency\"),\n                          href: \"/places/state-constituency\"\n                        }\n                      },\n                      [_vm._v(\"State Constituencies\")]\n                    )\n                  ],\n                  1\n                ),\n                _c(\"hr\")\n              ],\n              1\n            ),\n            _c(\n              \"div\",\n              { staticClass: \"col-md-12\" },\n              _vm._l(_vm.groupByState, function(item) {\n                return _c(\n                  \"div\",\n                  { key: item.organization + \"_peopleByState\" },\n                  [\n                    _c(\n                      \"div\",\n                      { staticClass: \"no-border shadow-sm rounded\" },\n                      _vm._l(item.places, function(state, index) {\n                        return _c(\n                          \"div\",\n                          {\n                            key: index,\n                            staticClass: \"row no-gutters expandableItem\"\n                          },\n                          [\n                            _c(\"div\", { staticClass: \"col-md-3\" }, [\n                              _c(\n                                \"h3\",\n                                {\n                                  staticClass: \"p-3 mb-3\",\n                                  attrs: {\n                                    \"data-accordion-element-trigger\": \"\"\n                                  }\n                                },\n                                [_vm._v(_vm._s(state[0]))]\n                              )\n                            ]),\n                            _c(\n                              \"div\",\n                              {\n                                staticClass: \"col-md-9\",\n                                attrs: { \"data-accordion-element-content\": \"\" }\n                              },\n                              [\n                                _c(\n                                  \"div\",\n                                  { staticClass: \"card-body no-border\" },\n                                  _vm._l(state[1], function(place) {\n                                    return _c(\n                                      \"div\",\n                                      {\n                                        key: place.id,\n                                        staticClass:\n                                          \"shadow-sm p-2 mb-2 bg-white rounded\"\n                                      },\n                                      [\n                                        _c(\n                                          \"div\",\n                                          { staticClass: \"media\" },\n                                          [\n                                            _c(\n                                              \"b-img-lazy\",\n                                              _vm._b(\n                                                {\n                                                  staticClass:\n                                                    \"align-self-start mr-3\",\n                                                  attrs: {\n                                                    src: place.area.image.url,\n                                                    thumbnail: \"\",\n                                                    fluid: \"\"\n                                                  }\n                                                },\n                                                \"b-img-lazy\",\n                                                _vm.mainProps,\n                                                false\n                                              )\n                                            ),\n                                            _c(\n                                              \"div\",\n                                              {\n                                                staticClass:\n                                                  \"media-body text-wrap\"\n                                              },\n                                              [\n                                                _c(\n                                                  \"h5\",\n                                                  { staticClass: \"d-block\" },\n                                                  [\n                                                    _c(\n                                                      \"a\",\n                                                      {\n                                                        attrs: {\n                                                          href: place.area.url\n                                                        }\n                                                      },\n                                                      [\n                                                        _vm._v(\n                                                          _vm._s(\n                                                            place.address\n                                                              .district.value\n                                                              ? \"\" +\n                                                                  place.address\n                                                                    .district\n                                                                    .value\n                                                              : place.area.place\n                                                                  .name\n                                                          )\n                                                        )\n                                                      ]\n                                                    )\n                                                  ]\n                                                ),\n                                                place.area.place.type_name.toLowerCase() !==\n                                                place.area.state_place.type_name.toLowerCase()\n                                                  ? _c(\n                                                      \"span\",\n                                                      {\n                                                        staticClass: \"d-block\"\n                                                      },\n                                                      [\n                                                        _vm._v(\n                                                          \" Parent place: \" +\n                                                            _vm._s(\n                                                              place.address\n                                                                .district.value\n                                                                ? place.area\n                                                                    .parent_place\n                                                                    .name\n                                                                : place.area\n                                                                    .state_place\n                                                                    .name\n                                                            ) +\n                                                            \" \"\n                                                        )\n                                                      ]\n                                                    )\n                                                  : _vm._e(),\n                                                _c(\n                                                  \"span\",\n                                                  { staticClass: \"d-block\" },\n                                                  [_vm._v(_vm._s(_vm.areaType))]\n                                                ),\n                                                place.area.place.type_name.toLowerCase() !==\n                                                place.area.state_place.type_name.toLowerCase()\n                                                  ? _c(\n                                                      \"span\",\n                                                      {\n                                                        staticClass: \"d-block\"\n                                                      },\n                                                      [\n                                                        _vm._v(\n                                                          \" \" +\n                                                            _vm._s(\n                                                              item.organization\n                                                            ) +\n                                                            \" \" +\n                                                            _vm._s(\n                                                              new Date(\n                                                                item.start_date\n                                                              ).getFullYear()\n                                                            ) +\n                                                            \"-\" +\n                                                            _vm._s(\n                                                              new Date(\n                                                                item.end_date\n                                                              ).getFullYear()\n                                                            ) +\n                                                            \" \"\n                                                        )\n                                                      ]\n                                                    )\n                                                  : _vm._e()\n                                              ]\n                                            )\n                                          ],\n                                          1\n                                        )\n                                      ]\n                                    )\n                                  }),\n                                  0\n                                )\n                              ]\n                            )\n                          ]\n                        )\n                      }),\n                      0\n                    )\n                  ]\n                )\n              }),\n              0\n            )\n          ])\n        ])\n      ]),\n      _c(\"page-feedback-component\"),\n      _c(\"page-sharing-component\")\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/app/places/Places.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2264c93795-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/app/places/Places.vue":
/*!***********************************!*\
  !*** ./src/app/places/Places.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Places_vue_vue_type_template_id_b91005d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Places.vue?vue&type=template&id=b91005d0& */ \"./src/app/places/Places.vue?vue&type=template&id=b91005d0&\");\n/* harmony import */ var _Places_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Places.vue?vue&type=script&lang=js& */ \"./src/app/places/Places.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Places_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Places_vue_vue_type_template_id_b91005d0___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Places_vue_vue_type_template_id_b91005d0___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/app/places/Places.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/app/places/Places.vue?");

/***/ }),

/***/ "./src/app/places/Places.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./src/app/places/Places.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Places_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Places.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/app/places/Places.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Places_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/app/places/Places.vue?");

/***/ }),

/***/ "./src/app/places/Places.vue?vue&type=template&id=b91005d0&":
/*!******************************************************************!*\
  !*** ./src/app/places/Places.vue?vue&type=template&id=b91005d0& ***!
  \******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_64c93795_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Places_vue_vue_type_template_id_b91005d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"64c93795-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Places.vue?vue&type=template&id=b91005d0& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"64c93795-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/app/places/Places.vue?vue&type=template&id=b91005d0&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_64c93795_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Places_vue_vue_type_template_id_b91005d0___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_64c93795_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Places_vue_vue_type_template_id_b91005d0___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/app/places/Places.vue?");

/***/ })

}]);