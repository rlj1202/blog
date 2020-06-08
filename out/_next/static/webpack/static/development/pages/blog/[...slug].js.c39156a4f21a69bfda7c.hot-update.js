webpackHotUpdate("static/development/pages/blog/[...slug].js",{

/***/ "./pages/blog/[...slug].js":
/*!*********************************!*\
  !*** ./pages/blog/[...slug].js ***!
  \*********************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Post; });\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ \"./node_modules/styled-jsx/style.js\");\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-markdown */ \"./node_modules/react-markdown/lib/react-markdown.js\");\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-syntax-highlighter */ \"./node_modules/react-syntax-highlighter/dist/esm/index.js\");\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Layout */ \"./components/Layout.js\");\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;\n\n\n\n\n\nvar __N_SSG = true;\nfunction Post(_ref) {\n  var slug = _ref.slug,\n      frontmatter = _ref.frontmatter,\n      markdownbody = _ref.markdownbody;\n  // If we do not pass frontmatter as string rater than object itself,\n  // serialization error will occure. So to pass frontmatter object,\n  // We have to stringify the object then parse it on client side.\n  frontmatter = JSON.parse(frontmatter);\n  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx(\"title\", {\n    className: \"jsx-2077565637\"\n  }, frontmatter.title || 'untitled')), __jsx(\"div\", {\n    className: \"jsx-2077565637\" + \" \" + \"top\"\n  }, __jsx(\"div\", {\n    className: \"jsx-2077565637\" + \" \" + \"header fixed-width\"\n  }, __jsx(\"div\", {\n    className: \"jsx-2077565637\" + \" \" + \"date\"\n  }, frontmatter.date || ''), __jsx(\"div\", {\n    className: \"jsx-2077565637\" + \" \" + \"title\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/blog/[...slug]\",\n    as: \"\".concat(\"\", \"/blog/\").concat(slug.join('/'))\n  }, __jsx(\"a\", {\n    className: \"jsx-2077565637\"\n  }, frontmatter.title || 'untitled'))), __jsx(\"div\", {\n    className: \"jsx-2077565637\" + \" \" + \"subtitle\"\n  }, frontmatter.subtitle || ''), __jsx(\"div\", {\n    className: \"jsx-2077565637\" + \" \" + \"tags\"\n  }, frontmatter.tags && frontmatter.tags.map(function (tag) {\n    return __jsx(\"span\", {\n      key: tag,\n      className: \"jsx-2077565637\" + \" \" + \"tag\"\n    }, \"#\", tag);\n  })))), __jsx(\"div\", {\n    className: \"jsx-2077565637\" + \" \" + \"content-wrapper\"\n  }, __jsx(\"div\", {\n    className: \"jsx-2077565637\" + \" \" + \"content fixed-width\"\n  }, __jsx(react_markdown__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    source: markdownbody,\n    renderers: {\n      code: function code(_ref2) {\n        var language = _ref2.language,\n            value = _ref2.value;\n        return __jsx(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          language: language\n        }, value);\n      }\n    }\n  }))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"4247048719\"\n  }, [\".top.jsx-2077565637{margin:0;background-color:#ff6565;box-shadow:0 0 5pt black;color:white;}\", \".fixed-width.jsx-2077565637{max-width:600pt;padding:0 20pt;margin:0 auto;}\", \".header.jsx-2077565637{padding-top:20pt;padding-bottom:20pt;}\", \".header.jsx-2077565637 .title.jsx-2077565637{font-size:48pt;font-weight:bold;}\", \".header.jsx-2077565637 .subtitle.jsx-2077565637{font-weight:bold;}\", \".tag.jsx-2077565637{margin-right:4pt;padding:2pt 4pt;font-size:9pt;border-radius:3pt;background-color:#0000007a;}\", \".content-wrapper.jsx-2077565637{margin:20pt 0;}\"]), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"1256294275\"\n  }, [\"code{background-color:#dddddd;font-size:inherit;padding:2pt 4pt;border;}\"]));\n}\n_c = Post;\n\nvar _c;\n\n$RefreshReg$(_c, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9ibG9nL1suLi5zbHVnXS5qcz80YzVhIl0sIm5hbWVzIjpbIlBvc3QiLCJzbHVnIiwiZnJvbnRtYXR0ZXIiLCJtYXJrZG93bmJvZHkiLCJKU09OIiwicGFyc2UiLCJ0aXRsZSIsImRhdGUiLCJwcm9jZXNzIiwiam9pbiIsInN1YnRpdGxlIiwidGFncyIsIm1hcCIsInRhZyIsImNvZGUiLCJsYW5ndWFnZSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBOztBQUVlLFNBQVNBLElBQVQsT0FBbUQ7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFdBQTZCLFFBQTdCQSxXQUE2QjtBQUFBLE1BQWhCQyxZQUFnQixRQUFoQkEsWUFBZ0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0FELGFBQVcsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdILFdBQVgsQ0FBZDtBQUVBLFNBQ0ksTUFBQywwREFBRCxRQUNJLE1BQUMsZ0RBQUQsUUFDSTtBQUFBO0FBQUEsS0FBUUEsV0FBVyxDQUFDSSxLQUFaLElBQXFCLFVBQTdCLENBREosQ0FESixFQUtJO0FBQUEsd0NBQWU7QUFBZixLQUNJO0FBQUEsd0NBQWU7QUFBZixLQUNJO0FBQUEsd0NBQWU7QUFBZixLQUNLSixXQUFXLENBQUNLLElBQVosSUFBb0IsRUFEekIsQ0FESixFQUlJO0FBQUEsd0NBQWU7QUFBZixLQUNJLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsaUJBQVg7QUFBNkIsTUFBRSxZQUFLQyxFQUFMLG1CQUFpQ1AsSUFBSSxDQUFDUSxJQUFMLENBQVUsR0FBVixDQUFqQztBQUEvQixLQUNJO0FBQUE7QUFBQSxLQUFJUCxXQUFXLENBQUNJLEtBQVosSUFBcUIsVUFBekIsQ0FESixDQURKLENBSkosRUFTSTtBQUFBLHdDQUFlO0FBQWYsS0FDS0osV0FBVyxDQUFDUSxRQUFaLElBQXdCLEVBRDdCLENBVEosRUFZSTtBQUFBLHdDQUFlO0FBQWYsS0FDS1IsV0FBVyxDQUFDUyxJQUFaLElBQW9CVCxXQUFXLENBQUNTLElBQVosQ0FBaUJDLEdBQWpCLENBQXFCLFVBQUFDLEdBQUcsRUFBSTtBQUM3QyxXQUNJO0FBQU0sU0FBRyxFQUFFQSxHQUFYO0FBQUEsMENBQTBCO0FBQTFCLFlBQ01BLEdBRE4sQ0FESjtBQUtILEdBTm9CLENBRHpCLENBWkosQ0FESixDQUxKLEVBNkJJO0FBQUEsd0NBQWU7QUFBZixLQUNJO0FBQUEsd0NBQWU7QUFBZixLQUNJLE1BQUMscURBQUQ7QUFDSSxVQUFNLEVBQUVWLFlBRFo7QUFFSSxhQUFTLEVBQUU7QUFBRVcsVUFBSSxFQUFFLHFCQUE4QjtBQUFBLFlBQW5CQyxRQUFtQixTQUFuQkEsUUFBbUI7QUFBQSxZQUFUQyxLQUFTLFNBQVRBLEtBQVM7QUFDN0MsZUFDRyxNQUFDLGdFQUFEO0FBQW1CLGtCQUFRLEVBQUVEO0FBQTdCLFdBQ0tDLEtBREwsQ0FESDtBQUtIO0FBTlU7QUFGZixJQURKLENBREosQ0E3Qko7QUFBQTtBQUFBO0FBQUE7QUFBQSxtRkFESjtBQTRGSDtLQWxHdUJoQixJIiwiZmlsZSI6Ii4vcGFnZXMvYmxvZy9bLi4uc2x1Z10uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5cbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInXG5pbXBvcnQgUmVhY3RNYXJrZG93biBmcm9tICdyZWFjdC1tYXJrZG93bidcbmltcG9ydCBTeW50YXhIaWdobGlnaHRlciBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInXG5cbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9MYXlvdXQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBvc3QoeyBzbHVnLCBmcm9udG1hdHRlciwgbWFya2Rvd25ib2R5IH0pIHtcbiAgICAvLyBJZiB3ZSBkbyBub3QgcGFzcyBmcm9udG1hdHRlciBhcyBzdHJpbmcgcmF0ZXIgdGhhbiBvYmplY3QgaXRzZWxmLFxuICAgIC8vIHNlcmlhbGl6YXRpb24gZXJyb3Igd2lsbCBvY2N1cmUuIFNvIHRvIHBhc3MgZnJvbnRtYXR0ZXIgb2JqZWN0LFxuICAgIC8vIFdlIGhhdmUgdG8gc3RyaW5naWZ5IHRoZSBvYmplY3QgdGhlbiBwYXJzZSBpdCBvbiBjbGllbnQgc2lkZS5cbiAgICBmcm9udG1hdHRlciA9IEpTT04ucGFyc2UoZnJvbnRtYXR0ZXIpXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8TGF5b3V0PlxuICAgICAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICAgICAgPHRpdGxlPntmcm9udG1hdHRlci50aXRsZSB8fCAndW50aXRsZWQnfTwvdGl0bGU+XG4gICAgICAgICAgICA8L0hlYWQ+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXIgZml4ZWQtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZnJvbnRtYXR0ZXIuZGF0ZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYmxvZy9bLi4uc2x1Z11cIiBhcz17YCR7cHJvY2Vzcy5lbnYuYmFzZVVybH0vYmxvZy8ke3NsdWcuam9pbignLycpfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhPntmcm9udG1hdHRlci50aXRsZSB8fCAndW50aXRsZWQnfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmcm9udG1hdHRlci5zdWJ0aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Zyb250bWF0dGVyLnRhZ3MgJiYgZnJvbnRtYXR0ZXIudGFncy5tYXAodGFnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e3RhZ30gY2xhc3NOYW1lPVwidGFnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAje3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQgZml4ZWQtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0TWFya2Rvd25cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZT17bWFya2Rvd25ib2R5fVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXJzPXt7IGNvZGU6IGZ1bmN0aW9uKHsgbGFuZ3VhZ2UsIHZhbHVlIH0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTeW50YXhIaWdobGlnaHRlciBsYW5ndWFnZT17bGFuZ3VhZ2V9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9TeW50YXhIaWdobGlnaHRlcj4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9fS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgICAgLnRvcCB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjY1NjU7XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogMCAwIDVwdCBibGFjaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5maXhlZC13aWR0aCB7XG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOiA2MDBwdDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwIDIwcHQ7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXRvcDogMjBwdDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMjBwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIgLnRpdGxlIHtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDQ4cHQ7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIC5zdWJ0aXRsZSB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAudGFnIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDRwdDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAycHQgNHB0O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogOXB0O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNwdDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwN2E7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY29udGVudC13cmFwcGVyIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDIwcHQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jb250ZW50IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgICAgIGNvZGUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGRkZGQ7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiBpbmhlcml0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDJwdCA0cHQ7XG4gICAgICAgICAgICAgICAgYm9yZGVyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDwvTGF5b3V0PlxuICAgIClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKGNvbnRleHQpIHtcbiAgICBjb25zdCB7IHNsdWcgfSA9IGNvbnRleHQucGFyYW1zXG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgaW1wb3J0KGAuLi8uLi9wb3N0cy8ke3NsdWcuam9pbignLycpfS5tZGApXG4gICAgY29uc3QgZGF0YSA9IG1hdHRlcihjb250ZW50LmRlZmF1bHQpXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2x1Zzogc2x1ZyB8fCBbXSxcbiAgICAgICAgICAgIGZyb250bWF0dGVyOiBKU09OLnN0cmluZ2lmeShkYXRhLmRhdGEpLFxuICAgICAgICAgICAgbWFya2Rvd25ib2R5OiBkYXRhLmNvbnRlbnRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBhbHNvIGNhbGxlZCBvbiBzZXJlci1zaWRlLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1BhdGhzKCkge1xuICAgIHZhciBnbG9iID0gcmVxdWlyZSgnZ2xvYicpXG4gICAgY29uc3QgcG9zdHMgPSBnbG9iLnN5bmMoJ3Bvc3RzLyoqLyoubWQnKSAvLyAnKionIGlzIGdsb2JzdGFyLlxuICAgIGNvbnN0IHBvc3RTbHVncyA9IHBvc3RzLm1hcChmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGVcbiAgICAgICAgICAgIC5yZXBsYWNlKC8gL2csICctJykgLy8gUmVwbGFjZSBhbGwgYmxhbmtzIGludG8gZGFzaC5cbiAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAuc2xpY2UoMSkgLy8gRHJvcCBmaXJzdCBkaXJlY3RvcnkgcGF0aCAncG9zdHMnLlxuICAgICAgICAgICAgLmpvaW4oJy8nKVxuICAgICAgICAgICAgLnNsaWNlKDAsIC0zKSAvLyBEcm9wIGxhc3QgdGhyZWUgbGV0dGVyLCAnLm1kJy5cbiAgICAgICAgICAgIC50cmltKClcbiAgICB9KVxuICAgIGNvbnN0IHBhdGhzID0gcG9zdFNsdWdzLm1hcChzbHVnID0+IGAvYmxvZy8ke3NsdWd9YClcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhzLFxuICAgICAgICBmYWxsYmFjazogZmFsc2VcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/blog/[...slug].js\n");

/***/ })

})