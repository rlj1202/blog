webpackHotUpdate("static/development/pages/blog/[...slug].js",{

/***/ "./pages/blog/[...slug].js":
/*!*********************************!*\
  !*** ./pages/blog/[...slug].js ***!
  \*********************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Post; });\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ \"./node_modules/styled-jsx/style.js\");\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-markdown */ \"./node_modules/react-markdown/lib/react-markdown.js\");\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-syntax-highlighter */ \"./node_modules/react-syntax-highlighter/dist/esm/index.js\");\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Layout */ \"./components/Layout.js\");\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;\n\n\n\n\n\nvar __N_SSG = true;\nfunction Post(_ref) {\n  var slug = _ref.slug,\n      frontmatter = _ref.frontmatter,\n      markdownbody = _ref.markdownbody;\n  // If we do not pass frontmatter as string rater than object itself,\n  // serialization error will occure. So to pass frontmatter object,\n  // We have to stringify the object then parse it on client side.\n  frontmatter = JSON.parse(frontmatter);\n\n  if (!Array.isArray(frontmatter.tags)) {\n    frontmatter.tags = [frontmatter.tags];\n  }\n\n  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx(\"title\", {\n    className: \"jsx-1487089097\"\n  }, frontmatter.title || 'untitled')), __jsx(\"div\", {\n    className: \"jsx-1487089097\" + \" \" + \"top\"\n  }, __jsx(\"div\", {\n    className: \"jsx-1487089097\" + \" \" + \"header fixed-width\"\n  }, __jsx(\"div\", {\n    className: \"jsx-1487089097\" + \" \" + \"navigator\"\n  }, __jsx(\"span\", {\n    className: \"jsx-1487089097\" + \" \" + \"navigator-link\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/\",\n    as: \"\".concat(\"\", \"/\")\n  }, \"home\")), \"\\xA0>\", __jsx(\"span\", {\n    className: \"jsx-1487089097\" + \" \" + \"navigator-link\"\n  }, \"blog\")), __jsx(\"div\", {\n    className: \"jsx-1487089097\" + \" \" + \"date\"\n  }, frontmatter.date || ''), __jsx(\"div\", {\n    className: \"jsx-1487089097\" + \" \" + \"title\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/blog/[...slug]\",\n    as: \"\".concat(\"\", \"/blog/\").concat(slug.join('/'))\n  }, __jsx(\"a\", {\n    className: \"jsx-1487089097\"\n  }, frontmatter.title || 'untitled'))), __jsx(\"div\", {\n    className: \"jsx-1487089097\" + \" \" + \"subtitle\"\n  }, frontmatter.subtitle || ''), __jsx(\"div\", {\n    className: \"jsx-1487089097\" + \" \" + \"tags\"\n  }, frontmatter.tags && frontmatter.tags.map(function (tag) {\n    return __jsx(\"span\", {\n      key: tag,\n      className: \"jsx-1487089097\" + \" \" + \"tag\"\n    }, \"#\", tag);\n  })))), __jsx(\"div\", {\n    className: \"jsx-1487089097\" + \" \" + \"content-wrapper\"\n  }, __jsx(\"div\", {\n    className: \"jsx-1487089097\" + \" \" + \"content fixed-width\"\n  }, __jsx(react_markdown__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    source: markdownbody,\n    escapeHtml: false,\n    renderers: {\n      code: function code(_ref2) {\n        var language = _ref2.language,\n            value = _ref2.value;\n        return __jsx(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          language: language\n        }, value);\n      }\n    }\n  }), __jsx(\"hr\", {\n    className: \"jsx-1487089097\"\n  }), __jsx(\"footer\", {\n    className: \"jsx-1487089097\" + \" \" + \"footer\"\n  }, \"Github.io - Copyright(c) 2020. Jisu Sim(RedLaboratory)\"))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"996024873\"\n  }, [\".top.jsx-1487089097{margin:0;background-color:#ff6565;box-shadow:0 0 5pt black;color:white;}\", \".fixed-width.jsx-1487089097{max-width:600pt;min-width:0;padding:0 20pt;margin:0 auto;}\", \".header.jsx-1487089097{padding-top:20pt;padding-bottom:20pt;}\", \".header.jsx-1487089097 .navigator.jsx-1487089097{margin-bottom:20pt;}\", \".header.jsx-1487089097 .navigator-link.jsx-1487089097{font-size:8pt;color:black;background-color:white;border-radius:16pt;padding:2pt 6pt;}\", \".header.jsx-1487089097 .date.jsx-1487089097{margin:10pt 0;}\", \".header.jsx-1487089097 .title.jsx-1487089097{font-size:35pt;font-weight:bold;margin:10pt 0;}\", \".header.jsx-1487089097 .subtitle.jsx-1487089097{font-weight:bold;margin:10pt 0;}\", \".tags.jsx-1487089097{margin-top:10pt;}\", \".tag.jsx-1487089097{margin-right:4pt;padding:2pt 4pt;font-size:9pt;border-radius:3pt;background-color:#0000007a;display:inline-block;}\", \".content-wrapper.jsx-1487089097{margin:20pt 0;}\", \"hr.jsx-1487089097{border:1px solid gray;}\", \".footer.jsx-1487089097{text-align:center;margin:20pt 0;}\"]), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"1919476713\"\n  }, [\"code{background-color:#dddddd;font-size:inherit;padding:2pt 4pt;border-radius:2pt;}\", \".content img,.content iframe{max-width:100%;}\"]));\n}\n_c = Post;\n\nvar _c;\n\n$RefreshReg$(_c, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9ibG9nL1suLi5zbHVnXS5qcz80YzVhIl0sIm5hbWVzIjpbIlBvc3QiLCJzbHVnIiwiZnJvbnRtYXR0ZXIiLCJtYXJrZG93bmJvZHkiLCJKU09OIiwicGFyc2UiLCJBcnJheSIsImlzQXJyYXkiLCJ0YWdzIiwidGl0bGUiLCJwcm9jZXNzIiwiZGF0ZSIsImpvaW4iLCJzdWJ0aXRsZSIsIm1hcCIsInRhZyIsImNvZGUiLCJsYW5ndWFnZSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBOztBQUVlLFNBQVNBLElBQVQsT0FBbUQ7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFdBQTZCLFFBQTdCQSxXQUE2QjtBQUFBLE1BQWhCQyxZQUFnQixRQUFoQkEsWUFBZ0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0FELGFBQVcsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdILFdBQVgsQ0FBZDs7QUFFQSxNQUFJLENBQUNJLEtBQUssQ0FBQ0MsT0FBTixDQUFjTCxXQUFXLENBQUNNLElBQTFCLENBQUwsRUFBc0M7QUFDbENOLGVBQVcsQ0FBQ00sSUFBWixHQUFtQixDQUFDTixXQUFXLENBQUNNLElBQWIsQ0FBbkI7QUFDSDs7QUFFRCxTQUNJLE1BQUMsMERBQUQsUUFDSSxNQUFDLGdEQUFELFFBQ0k7QUFBQTtBQUFBLEtBQVFOLFdBQVcsQ0FBQ08sS0FBWixJQUFxQixVQUE3QixDQURKLENBREosRUFLSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFnQjtBQUFoQixLQUNJLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsR0FBWDtBQUFlLE1BQUUsWUFBS0MsRUFBTDtBQUFqQixZQURKLENBREosV0FLSTtBQUFBLHdDQUFnQjtBQUFoQixZQUxKLENBREosRUFVSTtBQUFBLHdDQUFlO0FBQWYsS0FDS1IsV0FBVyxDQUFDUyxJQUFaLElBQW9CLEVBRHpCLENBVkosRUFhSTtBQUFBLHdDQUFlO0FBQWYsS0FDSSxNQUFDLGdEQUFEO0FBQU0sUUFBSSxFQUFDLGlCQUFYO0FBQTZCLE1BQUUsWUFBS0QsRUFBTCxtQkFBaUNULElBQUksQ0FBQ1csSUFBTCxDQUFVLEdBQVYsQ0FBakM7QUFBL0IsS0FDSTtBQUFBO0FBQUEsS0FBSVYsV0FBVyxDQUFDTyxLQUFaLElBQXFCLFVBQXpCLENBREosQ0FESixDQWJKLEVBa0JJO0FBQUEsd0NBQWU7QUFBZixLQUNLUCxXQUFXLENBQUNXLFFBQVosSUFBd0IsRUFEN0IsQ0FsQkosRUFxQkk7QUFBQSx3Q0FBZTtBQUFmLEtBQ0tYLFdBQVcsQ0FBQ00sSUFBWixJQUFvQk4sV0FBVyxDQUFDTSxJQUFaLENBQWlCTSxHQUFqQixDQUFxQixVQUFBQyxHQUFHLEVBQUk7QUFDN0MsV0FDSTtBQUFNLFNBQUcsRUFBRUEsR0FBWDtBQUFBLDBDQUEwQjtBQUExQixZQUNNQSxHQUROLENBREo7QUFLSCxHQU5vQixDQUR6QixDQXJCSixDQURKLENBTEosRUFzQ0k7QUFBQSx3Q0FBZTtBQUFmLEtBQ0k7QUFBQSx3Q0FBZTtBQUFmLEtBQ0ksTUFBQyxxREFBRDtBQUNJLFVBQU0sRUFBRVosWUFEWjtBQUVJLGNBQVUsRUFBRSxLQUZoQjtBQUdJLGFBQVMsRUFBRTtBQUFFYSxVQUFJLEVBQUUscUJBQThCO0FBQUEsWUFBbkJDLFFBQW1CLFNBQW5CQSxRQUFtQjtBQUFBLFlBQVRDLEtBQVMsU0FBVEEsS0FBUztBQUM3QyxlQUNHLE1BQUMsZ0VBQUQ7QUFBbUIsa0JBQVEsRUFBRUQ7QUFBN0IsV0FDS0MsS0FETCxDQURIO0FBS0g7QUFOVTtBQUhmLElBREosRUFZSTtBQUFBO0FBQUEsSUFaSixFQWNJO0FBQUEsd0NBQWtCO0FBQWxCLDhEQWRKLENBREosQ0F0Q0o7QUFBQTtBQUFBO0FBQUE7QUFBQSwrSUFESjtBQTRJSDtLQXRKdUJsQixJIiwiZmlsZSI6Ii4vcGFnZXMvYmxvZy9bLi4uc2x1Z10uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5cbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInXG5pbXBvcnQgUmVhY3RNYXJrZG93biBmcm9tICdyZWFjdC1tYXJrZG93bidcbmltcG9ydCBTeW50YXhIaWdobGlnaHRlciBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInXG5cbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9MYXlvdXQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBvc3QoeyBzbHVnLCBmcm9udG1hdHRlciwgbWFya2Rvd25ib2R5IH0pIHtcbiAgICAvLyBJZiB3ZSBkbyBub3QgcGFzcyBmcm9udG1hdHRlciBhcyBzdHJpbmcgcmF0ZXIgdGhhbiBvYmplY3QgaXRzZWxmLFxuICAgIC8vIHNlcmlhbGl6YXRpb24gZXJyb3Igd2lsbCBvY2N1cmUuIFNvIHRvIHBhc3MgZnJvbnRtYXR0ZXIgb2JqZWN0LFxuICAgIC8vIFdlIGhhdmUgdG8gc3RyaW5naWZ5IHRoZSBvYmplY3QgdGhlbiBwYXJzZSBpdCBvbiBjbGllbnQgc2lkZS5cbiAgICBmcm9udG1hdHRlciA9IEpTT04ucGFyc2UoZnJvbnRtYXR0ZXIpXG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZnJvbnRtYXR0ZXIudGFncykpIHtcbiAgICAgICAgZnJvbnRtYXR0ZXIudGFncyA9IFtmcm9udG1hdHRlci50YWdzXVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxMYXlvdXQ+XG4gICAgICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgICAgICA8dGl0bGU+e2Zyb250bWF0dGVyLnRpdGxlIHx8ICd1bnRpdGxlZCd9PC90aXRsZT5cbiAgICAgICAgICAgIDwvSGVhZD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlciBmaXhlZC13aWR0aFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmlnYXRvclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2aWdhdG9yLWxpbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL1wiIGFzPXtgJHtwcm9jZXNzLmVudi5iYXNlVXJsfS9gfT5ob21lPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2aWdhdG9yLWxpbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9nXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmcm9udG1hdHRlci5kYXRlIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9ibG9nL1suLi5zbHVnXVwiIGFzPXtgJHtwcm9jZXNzLmVudi5iYXNlVXJsfS9ibG9nLyR7c2x1Zy5qb2luKCcvJyl9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGE+e2Zyb250bWF0dGVyLnRpdGxlIHx8ICd1bnRpdGxlZCd9PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Zyb250bWF0dGVyLnN1YnRpdGxlIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWdzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZnJvbnRtYXR0ZXIudGFncyAmJiBmcm9udG1hdHRlci50YWdzLm1hcCh0YWcgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17dGFnfSBjbGFzc05hbWU9XCJ0YWdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICN7dGFnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudCBmaXhlZC13aWR0aFwiPlxuICAgICAgICAgICAgICAgICAgICA8UmVhY3RNYXJrZG93blxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlPXttYXJrZG93bmJvZHl9XG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVIdG1sPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcmVycz17eyBjb2RlOiBmdW5jdGlvbih7IGxhbmd1YWdlLCB2YWx1ZSB9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3ludGF4SGlnaGxpZ2h0ZXIgbGFuZ3VhZ2U9e2xhbmd1YWdlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU3ludGF4SGlnaGxpZ2h0ZXI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfX0vPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPGhyLz5cblxuICAgICAgICAgICAgICAgICAgICA8Zm9vdGVyIGNsYXNzTmFtZT1cImZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgR2l0aHViLmlvIC0gQ29weXJpZ2h0KGMpIDIwMjAuIEppc3UgU2ltKFJlZExhYm9yYXRvcnkpXG4gICAgICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICAgIC50b3Age1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY2NTY1O1xuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHQgYmxhY2s7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuZml4ZWQtd2lkdGgge1xuICAgICAgICAgICAgICAgIG1heC13aWR0aDogNjAwcHQ7XG4gICAgICAgICAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgMjBwdDtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIge1xuICAgICAgICAgICAgICAgIHBhZGRpbmctdG9wOiAyMHB0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmhlYWRlciAubmF2aWdhdG9yIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmhlYWRlciAubmF2aWdhdG9yLWxpbmsge1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogOHB0O1xuICAgICAgICAgICAgICAgIGNvbG9yOiBibGFjaztcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDJwdCA2cHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIC5kYXRlIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDEwcHQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIgLnRpdGxlIHtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDM1cHQ7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgICAgICAgICAgICAgICBtYXJnaW46IDEwcHQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIgLnN1YnRpdGxlIHtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcblxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTBwdCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnRhZ3Mge1xuICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAudGFnIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDRwdDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAycHQgNHB0O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogOXB0O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNwdDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwN2E7XG5cbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY29udGVudC13cmFwcGVyIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDIwcHQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhyIHtcbiAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmZvb3RlciB7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMjBwdCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYH08L3N0eWxlPlxuXG4gICAgICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgICAgY29kZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZGRkZDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMnB0IDRwdDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAycHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5jb250ZW50IGltZywgLmNvbnRlbnQgaWZyYW1lIHtcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDwvTGF5b3V0PlxuICAgIClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKGNvbnRleHQpIHtcbiAgICBjb25zdCB7IHNsdWcgfSA9IGNvbnRleHQucGFyYW1zXG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgaW1wb3J0KGAuLi8uLi9wb3N0cy8ke3NsdWcuam9pbignLycpfS5tZGApXG4gICAgY29uc3QgZGF0YSA9IG1hdHRlcihjb250ZW50LmRlZmF1bHQsIHtcbiAgICAgICAgZXhjZXJwdF9zZXBhcmF0b3I6ICc8IS0tIG1vcmUgLS0+J1xuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2x1Zzogc2x1ZyB8fCBbXSxcbiAgICAgICAgICAgIGZyb250bWF0dGVyOiBKU09OLnN0cmluZ2lmeShkYXRhLmRhdGEpLFxuICAgICAgICAgICAgbWFya2Rvd25ib2R5OiBkYXRhLmNvbnRlbnRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBhbHNvIGNhbGxlZCBvbiBzZXJlci1zaWRlLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1BhdGhzKCkge1xuICAgIHZhciBnbG9iID0gcmVxdWlyZSgnZ2xvYicpXG4gICAgY29uc3QgcG9zdHMgPSBnbG9iLnN5bmMoJ3Bvc3RzLyoqLyoubWQnKSAvLyAnKionIGlzIGdsb2JzdGFyLlxuICAgIGNvbnN0IHBvc3RTbHVncyA9IHBvc3RzLm1hcChmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGVcbiAgICAgICAgICAgIC5yZXBsYWNlKC8gL2csICctJykgLy8gUmVwbGFjZSBhbGwgYmxhbmtzIGludG8gZGFzaC5cbiAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAuc2xpY2UoMSkgLy8gRHJvcCBmaXJzdCBkaXJlY3RvcnkgcGF0aCAncG9zdHMnLlxuICAgICAgICAgICAgLmpvaW4oJy8nKVxuICAgICAgICAgICAgLnNsaWNlKDAsIC0zKSAvLyBEcm9wIGxhc3QgdGhyZWUgbGV0dGVyLCAnLm1kJy5cbiAgICAgICAgICAgIC50cmltKClcbiAgICB9KVxuICAgIGNvbnN0IHBhdGhzID0gcG9zdFNsdWdzLm1hcChzbHVnID0+IGAvYmxvZy8ke3NsdWd9YClcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhzLFxuICAgICAgICBmYWxsYmFjazogZmFsc2VcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/blog/[...slug].js\n");

/***/ })

})