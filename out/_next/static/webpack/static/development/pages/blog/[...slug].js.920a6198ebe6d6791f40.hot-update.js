webpackHotUpdate("static/development/pages/blog/[...slug].js",{

/***/ "./pages/blog/[...slug].js":
/*!*********************************!*\
  !*** ./pages/blog/[...slug].js ***!
  \*********************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Post; });\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ \"./node_modules/styled-jsx/style.js\");\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-markdown */ \"./node_modules/react-markdown/lib/react-markdown.js\");\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-syntax-highlighter */ \"./node_modules/react-syntax-highlighter/dist/esm/index.js\");\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Layout */ \"./components/Layout.js\");\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;\n\n\n\n\n\nvar __N_SSG = true;\nfunction Post(_ref) {\n  var slug = _ref.slug,\n      frontmatter = _ref.frontmatter,\n      markdownbody = _ref.markdownbody;\n  // If we do not pass frontmatter as string rater than object itself,\n  // serialization error will occure. So to pass frontmatter object,\n  // We have to stringify the object then parse it on client side.\n  frontmatter = JSON.parse(frontmatter);\n\n  if (!Array.isArray(frontmatter.tags)) {\n    frontmatter.tags = [frontmatter.tags];\n  }\n\n  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx(\"title\", {\n    className: \"jsx-161832751\"\n  }, frontmatter.title || 'untitled')), __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"top\"\n  }, __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"header fixed-width\"\n  }, __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"navigator\"\n  }, __jsx(\"span\", {\n    className: \"jsx-161832751\" + \" \" + \"navigator-link\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/\",\n    as: \"\".concat(\"\", \"/\")\n  }, \"home\")), \"\\xA0>\", __jsx(\"span\", {\n    className: \"jsx-161832751\" + \" \" + \"navigator-link\"\n  }, \"blog\")), __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"date\"\n  }, frontmatter.date || ''), __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"title\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/blog/[...slug]\",\n    as: \"\".concat(\"\", \"/blog/\").concat(slug.join('/'))\n  }, __jsx(\"a\", {\n    className: \"jsx-161832751\"\n  }, frontmatter.title || 'untitled'))), __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"subtitle\"\n  }, frontmatter.subtitle || ''), __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"tags\"\n  }, frontmatter.tags && frontmatter.tags.map(function (tag) {\n    return __jsx(\"span\", {\n      key: tag,\n      className: \"jsx-161832751\" + \" \" + \"tag\"\n    }, \"#\", tag);\n  })))), __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"content-wrapper\"\n  }, __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"content fixed-width\"\n  }, __jsx(react_markdown__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    source: markdownbody,\n    escapeHtml: false,\n    renderers: {\n      code: function code(_ref2) {\n        var language = _ref2.language,\n            value = _ref2.value;\n        return __jsx(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          language: language\n        }, value);\n      }\n    }\n  }), __jsx(\"hr\", {\n    className: \"jsx-161832751\"\n  }), __jsx(\"div\", {\n    className: \"jsx-161832751\" + \" \" + \"\"\n  }, \"Github.io - Copyright(c) 2020. Jisu Sim(RedLaboratory)\"))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"3066876815\"\n  }, [\".top.jsx-161832751{margin:0;background-color:#ff6565;box-shadow:0 0 5pt black;color:white;}\", \".fixed-width.jsx-161832751{max-width:600pt;min-width:0;padding:0 20pt;margin:0 auto;}\", \".header.jsx-161832751{padding-top:20pt;padding-bottom:20pt;}\", \".header.jsx-161832751 .navigator.jsx-161832751{margin-bottom:20pt;}\", \".header.jsx-161832751 .navigator-link.jsx-161832751{font-size:8pt;color:black;background-color:white;border-radius:16pt;padding:2pt 6pt;}\", \".header.jsx-161832751 .date.jsx-161832751{margin:10pt 0;}\", \".header.jsx-161832751 .title.jsx-161832751{font-size:35pt;font-weight:bold;margin:10pt 0;}\", \".header.jsx-161832751 .subtitle.jsx-161832751{font-weight:bold;margin:10pt 0;}\", \".tags.jsx-161832751{margin-top:10pt;}\", \".tag.jsx-161832751{margin-right:4pt;padding:2pt 4pt;font-size:9pt;border-radius:3pt;background-color:#0000007a;display:inline-block;}\", \".content-wrapper.jsx-161832751{margin:20pt 0;}\"]), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"1919476713\"\n  }, [\"code{background-color:#dddddd;font-size:inherit;padding:2pt 4pt;border-radius:2pt;}\", \".content img,.content iframe{max-width:100%;}\"]));\n}\n_c = Post;\n\nvar _c;\n\n$RefreshReg$(_c, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9ibG9nL1suLi5zbHVnXS5qcz80YzVhIl0sIm5hbWVzIjpbIlBvc3QiLCJzbHVnIiwiZnJvbnRtYXR0ZXIiLCJtYXJrZG93bmJvZHkiLCJKU09OIiwicGFyc2UiLCJBcnJheSIsImlzQXJyYXkiLCJ0YWdzIiwidGl0bGUiLCJwcm9jZXNzIiwiZGF0ZSIsImpvaW4iLCJzdWJ0aXRsZSIsIm1hcCIsInRhZyIsImNvZGUiLCJsYW5ndWFnZSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBOztBQUVlLFNBQVNBLElBQVQsT0FBbUQ7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFdBQTZCLFFBQTdCQSxXQUE2QjtBQUFBLE1BQWhCQyxZQUFnQixRQUFoQkEsWUFBZ0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0FELGFBQVcsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdILFdBQVgsQ0FBZDs7QUFFQSxNQUFJLENBQUNJLEtBQUssQ0FBQ0MsT0FBTixDQUFjTCxXQUFXLENBQUNNLElBQTFCLENBQUwsRUFBc0M7QUFDbENOLGVBQVcsQ0FBQ00sSUFBWixHQUFtQixDQUFDTixXQUFXLENBQUNNLElBQWIsQ0FBbkI7QUFDSDs7QUFFRCxTQUNJLE1BQUMsMERBQUQsUUFDSSxNQUFDLGdEQUFELFFBQ0k7QUFBQTtBQUFBLEtBQVFOLFdBQVcsQ0FBQ08sS0FBWixJQUFxQixVQUE3QixDQURKLENBREosRUFLSTtBQUFBLHVDQUFlO0FBQWYsS0FDSTtBQUFBLHVDQUFlO0FBQWYsS0FDSTtBQUFBLHVDQUFlO0FBQWYsS0FDSTtBQUFBLHVDQUFnQjtBQUFoQixLQUNJLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsR0FBWDtBQUFlLE1BQUUsWUFBS0MsRUFBTDtBQUFqQixZQURKLENBREosV0FLSTtBQUFBLHVDQUFnQjtBQUFoQixZQUxKLENBREosRUFVSTtBQUFBLHVDQUFlO0FBQWYsS0FDS1IsV0FBVyxDQUFDUyxJQUFaLElBQW9CLEVBRHpCLENBVkosRUFhSTtBQUFBLHVDQUFlO0FBQWYsS0FDSSxNQUFDLGdEQUFEO0FBQU0sUUFBSSxFQUFDLGlCQUFYO0FBQTZCLE1BQUUsWUFBS0QsRUFBTCxtQkFBaUNULElBQUksQ0FBQ1csSUFBTCxDQUFVLEdBQVYsQ0FBakM7QUFBL0IsS0FDSTtBQUFBO0FBQUEsS0FBSVYsV0FBVyxDQUFDTyxLQUFaLElBQXFCLFVBQXpCLENBREosQ0FESixDQWJKLEVBa0JJO0FBQUEsdUNBQWU7QUFBZixLQUNLUCxXQUFXLENBQUNXLFFBQVosSUFBd0IsRUFEN0IsQ0FsQkosRUFxQkk7QUFBQSx1Q0FBZTtBQUFmLEtBQ0tYLFdBQVcsQ0FBQ00sSUFBWixJQUFvQk4sV0FBVyxDQUFDTSxJQUFaLENBQWlCTSxHQUFqQixDQUFxQixVQUFBQyxHQUFHLEVBQUk7QUFDN0MsV0FDSTtBQUFNLFNBQUcsRUFBRUEsR0FBWDtBQUFBLHlDQUEwQjtBQUExQixZQUNNQSxHQUROLENBREo7QUFLSCxHQU5vQixDQUR6QixDQXJCSixDQURKLENBTEosRUFzQ0k7QUFBQSx1Q0FBZTtBQUFmLEtBQ0k7QUFBQSx1Q0FBZTtBQUFmLEtBQ0ksTUFBQyxxREFBRDtBQUNJLFVBQU0sRUFBRVosWUFEWjtBQUVJLGNBQVUsRUFBRSxLQUZoQjtBQUdJLGFBQVMsRUFBRTtBQUFFYSxVQUFJLEVBQUUscUJBQThCO0FBQUEsWUFBbkJDLFFBQW1CLFNBQW5CQSxRQUFtQjtBQUFBLFlBQVRDLEtBQVMsU0FBVEEsS0FBUztBQUM3QyxlQUNHLE1BQUMsZ0VBQUQ7QUFBbUIsa0JBQVEsRUFBRUQ7QUFBN0IsV0FDS0MsS0FETCxDQURIO0FBS0g7QUFOVTtBQUhmLElBREosRUFZSTtBQUFBO0FBQUEsSUFaSixFQWNJO0FBQUEsdUNBQWU7QUFBZiw4REFkSixDQURKLENBdENKO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0lBREo7QUFxSUg7S0EvSXVCbEIsSSIsImZpbGUiOiIuL3BhZ2VzL2Jsb2cvWy4uLnNsdWddLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuXG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJ1xuaW1wb3J0IFJlYWN0TWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nXG5pbXBvcnQgU3ludGF4SGlnaGxpZ2h0ZXIgZnJvbSAncmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyJ1xuXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvTGF5b3V0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQb3N0KHsgc2x1ZywgZnJvbnRtYXR0ZXIsIG1hcmtkb3duYm9keSB9KSB7XG4gICAgLy8gSWYgd2UgZG8gbm90IHBhc3MgZnJvbnRtYXR0ZXIgYXMgc3RyaW5nIHJhdGVyIHRoYW4gb2JqZWN0IGl0c2VsZixcbiAgICAvLyBzZXJpYWxpemF0aW9uIGVycm9yIHdpbGwgb2NjdXJlLiBTbyB0byBwYXNzIGZyb250bWF0dGVyIG9iamVjdCxcbiAgICAvLyBXZSBoYXZlIHRvIHN0cmluZ2lmeSB0aGUgb2JqZWN0IHRoZW4gcGFyc2UgaXQgb24gY2xpZW50IHNpZGUuXG4gICAgZnJvbnRtYXR0ZXIgPSBKU09OLnBhcnNlKGZyb250bWF0dGVyKVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGZyb250bWF0dGVyLnRhZ3MpKSB7XG4gICAgICAgIGZyb250bWF0dGVyLnRhZ3MgPSBbZnJvbnRtYXR0ZXIudGFnc11cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8TGF5b3V0PlxuICAgICAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICAgICAgPHRpdGxlPntmcm9udG1hdHRlci50aXRsZSB8fCAndW50aXRsZWQnfTwvdGl0bGU+XG4gICAgICAgICAgICA8L0hlYWQ+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXIgZml4ZWQtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZpZ2F0b3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdmlnYXRvci1saW5rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIiBhcz17YCR7cHJvY2Vzcy5lbnYuYmFzZVVybH0vYH0+aG9tZTwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwOz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdmlnYXRvci1saW5rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvZ1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZnJvbnRtYXR0ZXIuZGF0ZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYmxvZy9bLi4uc2x1Z11cIiBhcz17YCR7cHJvY2Vzcy5lbnYuYmFzZVVybH0vYmxvZy8ke3NsdWcuam9pbignLycpfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhPntmcm9udG1hdHRlci50aXRsZSB8fCAndW50aXRsZWQnfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmcm9udG1hdHRlci5zdWJ0aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Zyb250bWF0dGVyLnRhZ3MgJiYgZnJvbnRtYXR0ZXIudGFncy5tYXAodGFnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e3RhZ30gY2xhc3NOYW1lPVwidGFnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAje3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQgZml4ZWQtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0TWFya2Rvd25cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZT17bWFya2Rvd25ib2R5fVxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlSHRtbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnM9e3sgY29kZTogZnVuY3Rpb24oeyBsYW5ndWFnZSwgdmFsdWUgfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN5bnRheEhpZ2hsaWdodGVyIGxhbmd1YWdlPXtsYW5ndWFnZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N5bnRheEhpZ2hsaWdodGVyPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH19Lz5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxoci8+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEdpdGh1Yi5pbyAtIENvcHlyaWdodChjKSAyMDIwLiBKaXN1IFNpbShSZWRMYWJvcmF0b3J5KVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgICAudG9wIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjU2NTtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB0IGJsYWNrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmZpeGVkLXdpZHRoIHtcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDYwMHB0O1xuICAgICAgICAgICAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwIDIwcHQ7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXRvcDogMjBwdDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMjBwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIgLm5hdmlnYXRvciB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIgLm5hdmlnYXRvci1saW5rIHtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDhwdDtcbiAgICAgICAgICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZwdDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAycHQgNnB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmhlYWRlciAuZGF0ZSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMHB0IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIC50aXRsZSB7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAzNXB0O1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMHB0IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIC5zdWJ0aXRsZSB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgICAgICAgICAgICAgICBtYXJnaW46IDEwcHQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC50YWdzIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnRhZyB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA0cHQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMnB0IDRwdDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDlwdDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHQ7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDdhO1xuXG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvbnRlbnQtd3JhcHBlciB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAyMHB0IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBgfTwvc3R5bGU+XG5cbiAgICAgICAgICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICAgICAgICBjb2RlIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkZGRkO1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAycHQgNHB0O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJwdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmNvbnRlbnQgaW1nLCAuY29udGVudCBpZnJhbWUge1xuICAgICAgICAgICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGB9PC9zdHlsZT5cbiAgICAgICAgPC9MYXlvdXQ+XG4gICAgKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoY29udGV4dCkge1xuICAgIGNvbnN0IHsgc2x1ZyB9ID0gY29udGV4dC5wYXJhbXNcblxuICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBpbXBvcnQoYC4uLy4uL3Bvc3RzLyR7c2x1Zy5qb2luKCcvJyl9Lm1kYClcbiAgICBjb25zdCBkYXRhID0gbWF0dGVyKGNvbnRlbnQuZGVmYXVsdCwge1xuICAgICAgICBleGNlcnB0X3NlcGFyYXRvcjogJzwhLS0gbW9yZSAtLT4nXG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBzbHVnOiBzbHVnIHx8IFtdLFxuICAgICAgICAgICAgZnJvbnRtYXR0ZXI6IEpTT04uc3RyaW5naWZ5KGRhdGEuZGF0YSksXG4gICAgICAgICAgICBtYXJrZG93bmJvZHk6IGRhdGEuY29udGVudFxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIGFsc28gY2FsbGVkIG9uIHNlcmVyLXNpZGUuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUGF0aHMoKSB7XG4gICAgdmFyIGdsb2IgPSByZXF1aXJlKCdnbG9iJylcbiAgICBjb25zdCBwb3N0cyA9IGdsb2Iuc3luYygncG9zdHMvKiovKi5tZCcpIC8vICcqKicgaXMgZ2xvYnN0YXIuXG4gICAgY29uc3QgcG9zdFNsdWdzID0gcG9zdHMubWFwKGZpbGUgPT4ge1xuICAgICAgICByZXR1cm4gZmlsZVxuICAgICAgICAgICAgLnJlcGxhY2UoLyAvZywgJy0nKSAvLyBSZXBsYWNlIGFsbCBibGFua3MgaW50byBkYXNoLlxuICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgIC5zbGljZSgxKSAvLyBEcm9wIGZpcnN0IGRpcmVjdG9yeSBwYXRoICdwb3N0cycuXG4gICAgICAgICAgICAuam9pbignLycpXG4gICAgICAgICAgICAuc2xpY2UoMCwgLTMpIC8vIERyb3AgbGFzdCB0aHJlZSBsZXR0ZXIsICcubWQnLlxuICAgICAgICAgICAgLnRyaW0oKVxuICAgIH0pXG4gICAgY29uc3QgcGF0aHMgPSBwb3N0U2x1Z3MubWFwKHNsdWcgPT4gYC9ibG9nLyR7c2x1Z31gKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aHMsXG4gICAgICAgIGZhbGxiYWNrOiBmYWxzZVxuICAgIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/blog/[...slug].js\n");

/***/ })

})