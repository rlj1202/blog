webpackHotUpdate("static/development/pages/blog/[...slug].js",{

/***/ "./pages/blog/[...slug].js":
/*!*********************************!*\
  !*** ./pages/blog/[...slug].js ***!
  \*********************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Post; });\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ \"./node_modules/styled-jsx/style.js\");\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-markdown */ \"./node_modules/react-markdown/lib/react-markdown.js\");\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-syntax-highlighter */ \"./node_modules/react-syntax-highlighter/dist/esm/index.js\");\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Layout */ \"./components/Layout.js\");\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;\n\n\n\n\n\nvar __N_SSG = true;\nfunction Post(_ref) {\n  var slug = _ref.slug,\n      frontmatter = _ref.frontmatter,\n      markdownbody = _ref.markdownbody;\n  // If we do not pass frontmatter as string rater than object itself,\n  // serialization error will occure. So to pass frontmatter object,\n  // We have to stringify the object then parse it on client side.\n  frontmatter = JSON.parse(frontmatter);\n\n  if (!Array.isArray(frontmatter.tags)) {\n    frontmatter.tags = [frontmatter.tags];\n  }\n\n  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx(\"title\", {\n    className: \"jsx-2914478443\"\n  }, frontmatter.title || 'untitled')), __jsx(\"div\", {\n    className: \"jsx-2914478443\" + \" \" + \"top\"\n  }, __jsx(\"div\", {\n    className: \"jsx-2914478443\" + \" \" + \"header fixed-width\"\n  }, __jsx(\"div\", {\n    className: \"jsx-2914478443\" + \" \" + \"date\"\n  }, frontmatter.date || ''), __jsx(\"div\", {\n    className: \"jsx-2914478443\" + \" \" + \"title\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/blog/[...slug]\",\n    as: \"\".concat(\"\", \"/blog/\").concat(slug.join('/'))\n  }, __jsx(\"a\", {\n    className: \"jsx-2914478443\"\n  }, frontmatter.title || 'untitled'))), __jsx(\"div\", {\n    className: \"jsx-2914478443\" + \" \" + \"subtitle\"\n  }, frontmatter.subtitle || ''), __jsx(\"div\", {\n    className: \"jsx-2914478443\" + \" \" + \"tags\"\n  }, frontmatter.tags && frontmatter.tags.map(function (tag) {\n    return __jsx(\"span\", {\n      key: tag,\n      className: \"jsx-2914478443\" + \" \" + \"tag\"\n    }, \"#\", tag);\n  })))), __jsx(\"div\", {\n    className: \"jsx-2914478443\" + \" \" + \"content-wrapper\"\n  }, __jsx(\"div\", {\n    className: \"jsx-2914478443\" + \" \" + \"content fixed-width\"\n  }, __jsx(react_markdown__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    source: markdownbody,\n    escapeHtml: false,\n    renderers: {\n      code: function code(_ref2) {\n        var language = _ref2.language,\n            value = _ref2.value;\n        return __jsx(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          language: language\n        }, value);\n      }\n    }\n  }))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"4014837183\"\n  }, [\".top.jsx-2914478443{margin:0;background-color:#ff6565;box-shadow:0 0 5pt black;color:white;}\", \".fixed-width.jsx-2914478443{max-width:600pt;padding:0 20pt;margin:0 auto;overflow-x:hidden;}\", \".header.jsx-2914478443{padding-top:20pt;padding-bottom:20pt;}\", \".header.jsx-2914478443 .title.jsx-2914478443{font-size:40pt;font-weight:bold;}\", \".header.jsx-2914478443 .subtitle.jsx-2914478443{font-weight:bold;}\", \".tag.jsx-2914478443{margin-right:4pt;padding:2pt 4pt;font-size:9pt;border-radius:3pt;background-color:#0000007a;}\", \".content-wrapper.jsx-2914478443{margin:20pt 0;}\"]), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"2187340765\"\n  }, [\"code{background-color:#dddddd;font-size:inherit;padding:2pt 4pt;border-radius:2pt;}\"]));\n}\n_c = Post;\n\nvar _c;\n\n$RefreshReg$(_c, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9ibG9nL1suLi5zbHVnXS5qcz80YzVhIl0sIm5hbWVzIjpbIlBvc3QiLCJzbHVnIiwiZnJvbnRtYXR0ZXIiLCJtYXJrZG93bmJvZHkiLCJKU09OIiwicGFyc2UiLCJBcnJheSIsImlzQXJyYXkiLCJ0YWdzIiwidGl0bGUiLCJkYXRlIiwicHJvY2VzcyIsImpvaW4iLCJzdWJ0aXRsZSIsIm1hcCIsInRhZyIsImNvZGUiLCJsYW5ndWFnZSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBOztBQUVlLFNBQVNBLElBQVQsT0FBbUQ7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFdBQTZCLFFBQTdCQSxXQUE2QjtBQUFBLE1BQWhCQyxZQUFnQixRQUFoQkEsWUFBZ0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0FELGFBQVcsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdILFdBQVgsQ0FBZDs7QUFFQSxNQUFJLENBQUNJLEtBQUssQ0FBQ0MsT0FBTixDQUFjTCxXQUFXLENBQUNNLElBQTFCLENBQUwsRUFBc0M7QUFDbENOLGVBQVcsQ0FBQ00sSUFBWixHQUFtQixDQUFDTixXQUFXLENBQUNNLElBQWIsQ0FBbkI7QUFDSDs7QUFFRCxTQUNJLE1BQUMsMERBQUQsUUFDSSxNQUFDLGdEQUFELFFBQ0k7QUFBQTtBQUFBLEtBQVFOLFdBQVcsQ0FBQ08sS0FBWixJQUFxQixVQUE3QixDQURKLENBREosRUFLSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDS1AsV0FBVyxDQUFDUSxJQUFaLElBQW9CLEVBRHpCLENBREosRUFJSTtBQUFBLHdDQUFlO0FBQWYsS0FDSSxNQUFDLGdEQUFEO0FBQU0sUUFBSSxFQUFDLGlCQUFYO0FBQTZCLE1BQUUsWUFBS0MsRUFBTCxtQkFBaUNWLElBQUksQ0FBQ1csSUFBTCxDQUFVLEdBQVYsQ0FBakM7QUFBL0IsS0FDSTtBQUFBO0FBQUEsS0FBSVYsV0FBVyxDQUFDTyxLQUFaLElBQXFCLFVBQXpCLENBREosQ0FESixDQUpKLEVBU0k7QUFBQSx3Q0FBZTtBQUFmLEtBQ0tQLFdBQVcsQ0FBQ1csUUFBWixJQUF3QixFQUQ3QixDQVRKLEVBWUk7QUFBQSx3Q0FBZTtBQUFmLEtBQ0tYLFdBQVcsQ0FBQ00sSUFBWixJQUFvQk4sV0FBVyxDQUFDTSxJQUFaLENBQWlCTSxHQUFqQixDQUFxQixVQUFBQyxHQUFHLEVBQUk7QUFDN0MsV0FDSTtBQUFNLFNBQUcsRUFBRUEsR0FBWDtBQUFBLDBDQUEwQjtBQUExQixZQUNNQSxHQUROLENBREo7QUFLSCxHQU5vQixDQUR6QixDQVpKLENBREosQ0FMSixFQTZCSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSSxNQUFDLHFEQUFEO0FBQ0ksVUFBTSxFQUFFWixZQURaO0FBRUksY0FBVSxFQUFFLEtBRmhCO0FBR0ksYUFBUyxFQUFFO0FBQUVhLFVBQUksRUFBRSxxQkFBOEI7QUFBQSxZQUFuQkMsUUFBbUIsU0FBbkJBLFFBQW1CO0FBQUEsWUFBVEMsS0FBUyxTQUFUQSxLQUFTO0FBQzdDLGVBQ0csTUFBQyxnRUFBRDtBQUFtQixrQkFBUSxFQUFFRDtBQUE3QixXQUNLQyxLQURMLENBREg7QUFLSDtBQU5VO0FBSGYsSUFESixDQURKLENBN0JKO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEZBREo7QUErRkg7S0F6R3VCbEIsSSIsImZpbGUiOiIuL3BhZ2VzL2Jsb2cvWy4uLnNsdWddLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuXG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJ1xuaW1wb3J0IFJlYWN0TWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nXG5pbXBvcnQgU3ludGF4SGlnaGxpZ2h0ZXIgZnJvbSAncmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyJ1xuXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvTGF5b3V0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQb3N0KHsgc2x1ZywgZnJvbnRtYXR0ZXIsIG1hcmtkb3duYm9keSB9KSB7XG4gICAgLy8gSWYgd2UgZG8gbm90IHBhc3MgZnJvbnRtYXR0ZXIgYXMgc3RyaW5nIHJhdGVyIHRoYW4gb2JqZWN0IGl0c2VsZixcbiAgICAvLyBzZXJpYWxpemF0aW9uIGVycm9yIHdpbGwgb2NjdXJlLiBTbyB0byBwYXNzIGZyb250bWF0dGVyIG9iamVjdCxcbiAgICAvLyBXZSBoYXZlIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0IHRoZW4gcGFyc2UgaXQgb24gY2xpZW50IHNpZGUuXG4gICAgZnJvbnRtYXR0ZXIgPSBKU09OLnBhcnNlKGZyb250bWF0dGVyKVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGZyb250bWF0dGVyLnRhZ3MpKSB7XG4gICAgICAgIGZyb250bWF0dGVyLnRhZ3MgPSBbZnJvbnRtYXR0ZXIudGFnc11cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8TGF5b3V0PlxuICAgICAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICAgICAgPHRpdGxlPntmcm9udG1hdHRlci50aXRsZSB8fCAndW50aXRsZWQnfTwvdGl0bGU+XG4gICAgICAgICAgICA8L0hlYWQ+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXIgZml4ZWQtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZnJvbnRtYXR0ZXIuZGF0ZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYmxvZy9bLi4uc2x1Z11cIiBhcz17YCR7cHJvY2Vzcy5lbnYuYmFzZVVybH0vYmxvZy8ke3NsdWcuam9pbignLycpfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhPntmcm9udG1hdHRlci50aXRsZSB8fCAndW50aXRsZWQnfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmcm9udG1hdHRlci5zdWJ0aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Zyb250bWF0dGVyLnRhZ3MgJiYgZnJvbnRtYXR0ZXIudGFncy5tYXAodGFnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e3RhZ30gY2xhc3NOYW1lPVwidGFnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAje3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQgZml4ZWQtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0TWFya2Rvd25cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZT17bWFya2Rvd25ib2R5fVxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlSHRtbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnM9e3sgY29kZTogZnVuY3Rpb24oeyBsYW5ndWFnZSwgdmFsdWUgfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN5bnRheEhpZ2hsaWdodGVyIGxhbmd1YWdlPXtsYW5ndWFnZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N5bnRheEhpZ2hsaWdodGVyPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH19Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgICAudG9wIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjU2NTtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB0IGJsYWNrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmZpeGVkLXdpZHRoIHtcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDYwMHB0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgMjBwdDtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcblxuICAgICAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIge1xuICAgICAgICAgICAgICAgIHBhZGRpbmctdG9wOiAyMHB0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmhlYWRlciAudGl0bGUge1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogNDBwdDtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIgLnN1YnRpdGxlIHtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC50YWcge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogNHB0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDJwdCA0cHQ7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA5cHQ7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B0O1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA3YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jb250ZW50LXdyYXBwZXIge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMjBwdCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvbnRlbnQge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYH08L3N0eWxlPlxuXG4gICAgICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgICAgY29kZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZGRkZDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMnB0IDRwdDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAycHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDwvTGF5b3V0PlxuICAgIClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKGNvbnRleHQpIHtcbiAgICBjb25zdCB7IHNsdWcgfSA9IGNvbnRleHQucGFyYW1zXG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgaW1wb3J0KGAuLi8uLi9wb3N0cy8ke3NsdWcuam9pbignLycpfS5tZGApXG4gICAgY29uc3QgZGF0YSA9IG1hdHRlcihjb250ZW50LmRlZmF1bHQpXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2x1Zzogc2x1ZyB8fCBbXSxcbiAgICAgICAgICAgIGZyb250bWF0dGVyOiBKU09OLnN0cmluZ2lmeShkYXRhLmRhdGEpLFxuICAgICAgICAgICAgbWFya2Rvd25ib2R5OiBkYXRhLmNvbnRlbnRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBhbHNvIGNhbGxlZCBvbiBzZXJlci1zaWRlLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1BhdGhzKCkge1xuICAgIHZhciBnbG9iID0gcmVxdWlyZSgnZ2xvYicpXG4gICAgY29uc3QgcG9zdHMgPSBnbG9iLnN5bmMoJ3Bvc3RzLyoqLyoubWQnKSAvLyAnKionIGlzIGdsb2JzdGFyLlxuICAgIGNvbnN0IHBvc3RTbHVncyA9IHBvc3RzLm1hcChmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGVcbiAgICAgICAgICAgIC5yZXBsYWNlKC8gL2csICctJykgLy8gUmVwbGFjZSBhbGwgYmxhbmtzIGludG8gZGFzaC5cbiAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAuc2xpY2UoMSkgLy8gRHJvcCBmaXJzdCBkaXJlY3RvcnkgcGF0aCAncG9zdHMnLlxuICAgICAgICAgICAgLmpvaW4oJy8nKVxuICAgICAgICAgICAgLnNsaWNlKDAsIC0zKSAvLyBEcm9wIGxhc3QgdGhyZWUgbGV0dGVyLCAnLm1kJy5cbiAgICAgICAgICAgIC50cmltKClcbiAgICB9KVxuICAgIGNvbnN0IHBhdGhzID0gcG9zdFNsdWdzLm1hcChzbHVnID0+IGAvYmxvZy8ke3NsdWd9YClcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhzLFxuICAgICAgICBmYWxsYmFjazogZmFsc2VcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/blog/[...slug].js\n");

/***/ })

})