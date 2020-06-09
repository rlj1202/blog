webpackHotUpdate("static/development/pages/blog/[...slug].js",{

/***/ "./pages/blog/[...slug].js":
/*!*********************************!*\
  !*** ./pages/blog/[...slug].js ***!
  \*********************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Post; });\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ \"./node_modules/styled-jsx/style.js\");\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-markdown */ \"./node_modules/react-markdown/lib/react-markdown.js\");\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-syntax-highlighter */ \"./node_modules/react-syntax-highlighter/dist/esm/index.js\");\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Layout */ \"./components/Layout.js\");\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;\n\n\n\n\n\nvar __N_SSG = true;\nfunction Post(_ref) {\n  var slug = _ref.slug,\n      frontmatter = _ref.frontmatter,\n      markdownbody = _ref.markdownbody;\n  // If we do not pass frontmatter as string rater than object itself,\n  // serialization error will occure. So to pass frontmatter object,\n  // We have to stringify the object then parse it on client side.\n  frontmatter = JSON.parse(frontmatter);\n\n  if (!Array.isArray(frontmatter.tags)) {\n    frontmatter.tags = [frontmatter.tags];\n  }\n\n  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx(\"title\", {\n    className: \"jsx-1591747512\"\n  }, frontmatter.title || 'untitled')), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"top\"\n  }, __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"header fixed-width\"\n  }, __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"navigator\"\n  }, __jsx(\"span\", {\n    className: \"jsx-1591747512\" + \" \" + \"navigator-link\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/\",\n    as: \"\".concat(\"\", \"/\")\n  }, __jsx(\"a\", {\n    className: \"jsx-1591747512\"\n  }, \"home\"))), \"\\xA0>\", __jsx(\"span\", {\n    className: \"jsx-1591747512\" + \" \" + \"navigator-link\"\n  }, \"blog\")), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"date\"\n  }, frontmatter.date || ''), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"title\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/blog/[...slug]\",\n    as: \"\".concat(\"\", \"/blog/\").concat(slug.join('/'))\n  }, __jsx(\"a\", {\n    className: \"jsx-1591747512\"\n  }, frontmatter.title || 'untitled'))), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"subtitle\"\n  }, frontmatter.subtitle || ''), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"tags\"\n  }, frontmatter.tags && frontmatter.tags.map(function (tag) {\n    return __jsx(\"span\", {\n      key: tag,\n      className: \"jsx-1591747512\" + \" \" + \"tag\"\n    }, \"#\", tag);\n  })))), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"content-wrapper\"\n  }, __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"content fixed-width\"\n  }, __jsx(react_markdown__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    source: markdownbody,\n    escapeHtml: false,\n    renderers: {\n      code: function code(_ref2) {\n        var language = _ref2.language,\n            value = _ref2.value;\n        return __jsx(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          language: language\n        }, value);\n      }\n    }\n  }), __jsx(\"hr\", {\n    className: \"jsx-1591747512\"\n  }), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"prev-post\"\n  }, __jsx(\"h2\", {\n    className: \"jsx-1591747512\" + \" \" + \"\"\n  }, \"\\uC774\\uC804\\uAE00\"), __jsx(\"span\", {\n    className: \"jsx-1591747512\" + \" \" + \"title\"\n  }, \"\\\"The test title\\\"\")), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"next-post\"\n  }, __jsx(\"h2\", {\n    className: \"jsx-1591747512\"\n  }, \"\\uB2E4\\uC74C\\uAE00\"), __jsx(\"span\", {\n    className: \"jsx-1591747512\" + \" \" + \"title\"\n  }, \"\\\"Another post title\\\"\")), __jsx(\"footer\", {\n    className: \"jsx-1591747512\" + \" \" + \"footer\"\n  }, \"Github.io - Copyright(c) 2020. Jisu Sim(RedLaboratory)\"))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"3463365336\"\n  }, [\".top.jsx-1591747512{margin:0;background-color:#ff6565;box-shadow:0 0 5pt black;color:white;}\", \".fixed-width.jsx-1591747512{max-width:600pt;min-width:0;padding:0 20pt;margin:0 auto;}\", \".header.jsx-1591747512{padding-top:20pt;padding-bottom:20pt;}\", \".header.jsx-1591747512 .navigator.jsx-1591747512{margin-bottom:20pt;}\", \".header.jsx-1591747512 .navigator-link.jsx-1591747512{font-size:8pt;color:black;background-color:white;border-radius:16pt;padding:2pt 6pt;}\", \".header.jsx-1591747512 .date.jsx-1591747512{margin:10pt 0;}\", \".header.jsx-1591747512 .title.jsx-1591747512{font-size:35pt;font-weight:bold;margin:10pt 0;}\", \".header.jsx-1591747512 .subtitle.jsx-1591747512{font-weight:bold;margin:10pt 0;}\", \".tags.jsx-1591747512{margin-top:10pt;}\", \".tag.jsx-1591747512{margin-right:4pt;padding:2pt 4pt;font-size:9pt;border-radius:3pt;background-color:#0000007a;display:inline-block;}\", \".content-wrapper.jsx-1591747512{margin:20pt 0;}\", \"hr.jsx-1591747512{border:0;height:1px;background-color:#00000014;margin:20pt 0;}\", \".prev-post.jsx-1591747512 .title.jsx-1591747512,.next-post.jsx-1591747512 .title.jsx-1591747512{font-style:italic;color:#7d7d7d;}\", \".next-post.jsx-1591747512{text-align:right;}\", \".footer.jsx-1591747512{text-align:center;font-size:9pt;margin:20pt 0;}\"]), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"1919476713\"\n  }, [\"code{background-color:#dddddd;font-size:inherit;padding:2pt 4pt;border-radius:2pt;}\", \".content img,.content iframe{max-width:100%;}\"]));\n}\n_c = Post;\n\nvar _c;\n\n$RefreshReg$(_c, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9ibG9nL1suLi5zbHVnXS5qcz80YzVhIl0sIm5hbWVzIjpbIlBvc3QiLCJzbHVnIiwiZnJvbnRtYXR0ZXIiLCJtYXJrZG93bmJvZHkiLCJKU09OIiwicGFyc2UiLCJBcnJheSIsImlzQXJyYXkiLCJ0YWdzIiwidGl0bGUiLCJwcm9jZXNzIiwiZGF0ZSIsImpvaW4iLCJzdWJ0aXRsZSIsIm1hcCIsInRhZyIsImNvZGUiLCJsYW5ndWFnZSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBOztBQUVlLFNBQVNBLElBQVQsT0FBbUQ7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFdBQTZCLFFBQTdCQSxXQUE2QjtBQUFBLE1BQWhCQyxZQUFnQixRQUFoQkEsWUFBZ0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0FELGFBQVcsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdILFdBQVgsQ0FBZDs7QUFFQSxNQUFJLENBQUNJLEtBQUssQ0FBQ0MsT0FBTixDQUFjTCxXQUFXLENBQUNNLElBQTFCLENBQUwsRUFBc0M7QUFDbENOLGVBQVcsQ0FBQ00sSUFBWixHQUFtQixDQUFDTixXQUFXLENBQUNNLElBQWIsQ0FBbkI7QUFDSDs7QUFFRCxTQUNJLE1BQUMsMERBQUQsUUFDSSxNQUFDLGdEQUFELFFBQ0k7QUFBQTtBQUFBLEtBQVFOLFdBQVcsQ0FBQ08sS0FBWixJQUFxQixVQUE3QixDQURKLENBREosRUFLSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFnQjtBQUFoQixLQUNJLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsR0FBWDtBQUFlLE1BQUUsWUFBS0MsRUFBTDtBQUFqQixLQUNJO0FBQUE7QUFBQSxZQURKLENBREosQ0FESixXQU9JO0FBQUEsd0NBQWdCO0FBQWhCLFlBUEosQ0FESixFQVlJO0FBQUEsd0NBQWU7QUFBZixLQUNLUixXQUFXLENBQUNTLElBQVosSUFBb0IsRUFEekIsQ0FaSixFQWVJO0FBQUEsd0NBQWU7QUFBZixLQUNJLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsaUJBQVg7QUFBNkIsTUFBRSxZQUFLRCxFQUFMLG1CQUFpQ1QsSUFBSSxDQUFDVyxJQUFMLENBQVUsR0FBVixDQUFqQztBQUEvQixLQUNJO0FBQUE7QUFBQSxLQUFJVixXQUFXLENBQUNPLEtBQVosSUFBcUIsVUFBekIsQ0FESixDQURKLENBZkosRUFvQkk7QUFBQSx3Q0FBZTtBQUFmLEtBQ0tQLFdBQVcsQ0FBQ1csUUFBWixJQUF3QixFQUQ3QixDQXBCSixFQXVCSTtBQUFBLHdDQUFlO0FBQWYsS0FDS1gsV0FBVyxDQUFDTSxJQUFaLElBQW9CTixXQUFXLENBQUNNLElBQVosQ0FBaUJNLEdBQWpCLENBQXFCLFVBQUFDLEdBQUcsRUFBSTtBQUM3QyxXQUNJO0FBQU0sU0FBRyxFQUFFQSxHQUFYO0FBQUEsMENBQTBCO0FBQTFCLFlBQ01BLEdBRE4sQ0FESjtBQUtILEdBTm9CLENBRHpCLENBdkJKLENBREosQ0FMSixFQXdDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSSxNQUFDLHFEQUFEO0FBQ0ksVUFBTSxFQUFFWixZQURaO0FBRUksY0FBVSxFQUFFLEtBRmhCO0FBR0ksYUFBUyxFQUFFO0FBQUVhLFVBQUksRUFBRSxxQkFBOEI7QUFBQSxZQUFuQkMsUUFBbUIsU0FBbkJBLFFBQW1CO0FBQUEsWUFBVEMsS0FBUyxTQUFUQSxLQUFTO0FBQzdDLGVBQ0csTUFBQyxnRUFBRDtBQUFtQixrQkFBUSxFQUFFRDtBQUE3QixXQUNLQyxLQURMLENBREg7QUFLSDtBQU5VO0FBSGYsSUFESixFQVlJO0FBQUE7QUFBQSxJQVpKLEVBY0k7QUFBQSx3Q0FBZTtBQUFmLEtBQ0k7QUFBQSx3Q0FBYztBQUFkLDBCQURKLEVBRUk7QUFBQSx3Q0FBZ0I7QUFBaEIsMEJBRkosQ0FkSixFQW1CSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBO0FBQUEsMEJBREosRUFFSTtBQUFBLHdDQUFnQjtBQUFoQiw4QkFGSixDQW5CSixFQXdCSTtBQUFBLHdDQUFrQjtBQUFsQiw4REF4QkosQ0FESixDQXhDSjtBQUFBO0FBQUE7QUFBQTtBQUFBLCtJQURKO0FBcUtIO0tBL0t1QmxCLEkiLCJmaWxlIjoiLi9wYWdlcy9ibG9nL1suLi5zbHVnXS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcblxuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcidcbmltcG9ydCBSZWFjdE1hcmtkb3duIGZyb20gJ3JlYWN0LW1hcmtkb3duJ1xuaW1wb3J0IFN5bnRheEhpZ2hsaWdodGVyIGZyb20gJ3JlYWN0LXN5bnRheC1oaWdobGlnaHRlcidcblxuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0xheW91dCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUG9zdCh7IHNsdWcsIGZyb250bWF0dGVyLCBtYXJrZG93bmJvZHkgfSkge1xuICAgIC8vIElmIHdlIGRvIG5vdCBwYXNzIGZyb250bWF0dGVyIGFzIHN0cmluZyByYXRlciB0aGFuIG9iamVjdCBpdHNlbGYsXG4gICAgLy8gc2VyaWFsaXphdGlvbiBlcnJvciB3aWxsIG9jY3VyZS4gU28gdG8gcGFzcyBmcm9udG1hdHRlciBvYmplY3QsXG4gICAgLy8gV2UgaGF2ZSB0byBzdHJpbmdpZnkgdGhlIG9iamVjdCB0aGVuIHBhcnNlIGl0IG9uIGNsaWVudCBzaWRlLlxuICAgIGZyb250bWF0dGVyID0gSlNPTi5wYXJzZShmcm9udG1hdHRlcilcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShmcm9udG1hdHRlci50YWdzKSkge1xuICAgICAgICBmcm9udG1hdHRlci50YWdzID0gW2Zyb250bWF0dGVyLnRhZ3NdXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dD5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDx0aXRsZT57ZnJvbnRtYXR0ZXIudGl0bGUgfHwgJ3VudGl0bGVkJ308L3RpdGxlPlxuICAgICAgICAgICAgPC9IZWFkPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyIGZpeGVkLXdpZHRoXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZpZ2F0b3ItbGlua1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCIgYXM9e2Ake3Byb2Nlc3MuZW52LmJhc2VVcmx9L2B9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YT5ob21lPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwOz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdmlnYXRvci1saW5rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvZ1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZnJvbnRtYXR0ZXIuZGF0ZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYmxvZy9bLi4uc2x1Z11cIiBhcz17YCR7cHJvY2Vzcy5lbnYuYmFzZVVybH0vYmxvZy8ke3NsdWcuam9pbignLycpfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhPntmcm9udG1hdHRlci50aXRsZSB8fCAndW50aXRsZWQnfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmcm9udG1hdHRlci5zdWJ0aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Zyb250bWF0dGVyLnRhZ3MgJiYgZnJvbnRtYXR0ZXIudGFncy5tYXAodGFnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e3RhZ30gY2xhc3NOYW1lPVwidGFnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAje3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQgZml4ZWQtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0TWFya2Rvd25cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZT17bWFya2Rvd25ib2R5fVxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlSHRtbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnM9e3sgY29kZTogZnVuY3Rpb24oeyBsYW5ndWFnZSwgdmFsdWUgfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN5bnRheEhpZ2hsaWdodGVyIGxhbmd1YWdlPXtsYW5ndWFnZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N5bnRheEhpZ2hsaWdodGVyPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH19Lz5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxoci8+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmV2LXBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJcIj7snbTsoITquIA8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGl0bGVcIj5cIlRoZSB0ZXN0IHRpdGxlXCI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV4dC1wb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+64uk7J2M6riAPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRpdGxlXCI+XCJBbm90aGVyIHBvc3QgdGl0bGVcIjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJmb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEdpdGh1Yi5pbyAtIENvcHlyaWdodChjKSAyMDIwLiBKaXN1IFNpbShSZWRMYWJvcmF0b3J5KVxuICAgICAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgICAudG9wIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjU2NTtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiAwIDAgNXB0IGJsYWNrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmZpeGVkLXdpZHRoIHtcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDYwMHB0O1xuICAgICAgICAgICAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwIDIwcHQ7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXRvcDogMjBwdDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMjBwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIgLm5hdmlnYXRvciB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIgLm5hdmlnYXRvci1saW5rIHtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDhwdDtcbiAgICAgICAgICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZwdDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAycHQgNnB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmhlYWRlciAuZGF0ZSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMHB0IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIC50aXRsZSB7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAzNXB0O1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMHB0IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIC5zdWJ0aXRsZSB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgICAgICAgICAgICAgICBtYXJnaW46IDEwcHQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC50YWdzIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnRhZyB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA0cHQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMnB0IDRwdDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDlwdDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHQ7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDdhO1xuXG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvbnRlbnQtd3JhcHBlciB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAyMHB0IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBociB7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMXB4O1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDAxNDtcblxuICAgICAgICAgICAgICAgIG1hcmdpbjogMjBwdCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnByZXYtcG9zdCAudGl0bGUsIC5uZXh0LXBvc3QgLnRpdGxlIHtcbiAgICAgICAgICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgICAgICAgICAgY29sb3I6ICM3ZDdkN2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubmV4dC1wb3N0IHtcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5mb290ZXIge1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDlwdDtcblxuICAgICAgICAgICAgICAgIG1hcmdpbjogMjBwdCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYH08L3N0eWxlPlxuXG4gICAgICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgICAgY29kZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZGRkZDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMnB0IDRwdDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAycHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5jb250ZW50IGltZywgLmNvbnRlbnQgaWZyYW1lIHtcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDwvTGF5b3V0PlxuICAgIClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKGNvbnRleHQpIHtcbiAgICBjb25zdCB7IHNsdWcgfSA9IGNvbnRleHQucGFyYW1zXG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgaW1wb3J0KGAuLi8uLi9wb3N0cy8ke3NsdWcuam9pbignLycpfS5tZGApXG4gICAgY29uc3QgZGF0YSA9IG1hdHRlcihjb250ZW50LmRlZmF1bHQsIHtcbiAgICAgICAgZXhjZXJwdF9zZXBhcmF0b3I6ICc8IS0tIG1vcmUgLS0+J1xuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2x1Zzogc2x1ZyB8fCBbXSxcbiAgICAgICAgICAgIGZyb250bWF0dGVyOiBKU09OLnN0cmluZ2lmeShkYXRhLmRhdGEpLFxuICAgICAgICAgICAgbWFya2Rvd25ib2R5OiBkYXRhLmNvbnRlbnRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBhbHNvIGNhbGxlZCBvbiBzZXJlci1zaWRlLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1BhdGhzKCkge1xuICAgIHZhciBnbG9iID0gcmVxdWlyZSgnZ2xvYicpXG4gICAgY29uc3QgcG9zdHMgPSBnbG9iLnN5bmMoJ3Bvc3RzLyoqLyoubWQnKSAvLyAnKionIGlzIGdsb2JzdGFyLlxuICAgIGNvbnN0IHBvc3RTbHVncyA9IHBvc3RzLm1hcChmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGVcbiAgICAgICAgICAgIC5yZXBsYWNlKC8gL2csICctJykgLy8gUmVwbGFjZSBhbGwgYmxhbmtzIGludG8gZGFzaC5cbiAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAuc2xpY2UoMSkgLy8gRHJvcCBmaXJzdCBkaXJlY3RvcnkgcGF0aCAncG9zdHMnLlxuICAgICAgICAgICAgLmpvaW4oJy8nKVxuICAgICAgICAgICAgLnNsaWNlKDAsIC0zKSAvLyBEcm9wIGxhc3QgdGhyZWUgbGV0dGVyLCAnLm1kJy5cbiAgICAgICAgICAgIC50cmltKClcbiAgICB9KVxuICAgIGNvbnN0IHBhdGhzID0gcG9zdFNsdWdzLm1hcChzbHVnID0+IGAvYmxvZy8ke3NsdWd9YClcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhdGhzLFxuICAgICAgICBmYWxsYmFjazogZmFsc2VcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/blog/[...slug].js\n");

/***/ })

})