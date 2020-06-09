webpackHotUpdate("static/development/pages/blog/[...slug].js",{

/***/ "./pages/blog/[...slug].js":
/*!*********************************!*\
  !*** ./pages/blog/[...slug].js ***!
  \*********************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Post; });\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ \"./node_modules/styled-jsx/style.js\");\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-markdown */ \"./node_modules/react-markdown/lib/react-markdown.js\");\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-syntax-highlighter */ \"./node_modules/react-syntax-highlighter/dist/esm/index.js\");\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Layout */ \"./components/Layout.js\");\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;\n\n\n\n\n\nvar __N_SSG = true;\nfunction Post(_ref) {\n  var slug = _ref.slug,\n      frontmatter = _ref.frontmatter,\n      markdownbody = _ref.markdownbody;\n  // If we do not pass frontmatter as string rater than object itself,\n  // serialization error will occure. So to pass frontmatter object,\n  // We have to stringify the object then parse it on client side.\n  frontmatter = JSON.parse(frontmatter);\n\n  if (!Array.isArray(frontmatter.tags)) {\n    frontmatter.tags = [frontmatter.tags];\n  }\n\n  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx(\"title\", {\n    className: \"jsx-1591747512\"\n  }, frontmatter.title || 'untitled')), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"top\"\n  }, __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"header fixed-width\"\n  }, __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"navigator\"\n  }, __jsx(\"span\", {\n    className: \"jsx-1591747512\" + \" \" + \"navigator-link\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/\",\n    as: \"\".concat(\"\", \"/\")\n  }, __jsx(\"a\", {\n    className: \"jsx-1591747512\"\n  }, \"home\"))), \"\\xA0>\", __jsx(\"span\", {\n    className: \"jsx-1591747512\" + \" \" + \"navigator-link\"\n  }, \"blog\")), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"date\"\n  }, frontmatter.date || ''), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"title\"\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    href: \"/blog/[...slug]\",\n    as: \"\".concat(\"\", \"/blog/\").concat(slug.join('/'))\n  }, __jsx(\"a\", {\n    className: \"jsx-1591747512\"\n  }, frontmatter.title || 'untitled'))), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"subtitle\"\n  }, frontmatter.subtitle || ''), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"tags\"\n  }, frontmatter.tags && frontmatter.tags.map(function (tag) {\n    return __jsx(\"span\", {\n      key: tag,\n      className: \"jsx-1591747512\" + \" \" + \"tag\"\n    }, \"#\", tag);\n  })))), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"content-wrapper\"\n  }, __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"content fixed-width\"\n  }, __jsx(react_markdown__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    source: markdownbody,\n    escapeHtml: false,\n    renderers: {\n      code: function code(_ref2) {\n        var language = _ref2.language,\n            value = _ref2.value;\n        return __jsx(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          language: language\n        }, value);\n      }\n    }\n  }), __jsx(\"hr\", {\n    className: \"jsx-1591747512\"\n  }), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"prev-post\"\n  }, __jsx(\"h2\", {\n    className: \"jsx-1591747512\"\n  }, \"\\uC774\\uC804\\uAE00\"), __jsx(\"span\", {\n    className: \"jsx-1591747512\" + \" \" + \"title\"\n  }, \"\\\"The test title\\\"\")), __jsx(\"div\", {\n    className: \"jsx-1591747512\" + \" \" + \"next-post\"\n  }, __jsx(\"h2\", {\n    className: \"jsx-1591747512\"\n  }, \"\\uB2E4\\uC74C\\uAE00\"), __jsx(\"span\", {\n    className: \"jsx-1591747512\"\n  })), __jsx(\"footer\", {\n    className: \"jsx-1591747512\" + \" \" + \"footer\"\n  }, \"Github.io - Copyright(c) 2020. Jisu Sim(RedLaboratory)\"))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"3463365336\"\n  }, [\".top.jsx-1591747512{margin:0;background-color:#ff6565;box-shadow:0 0 5pt black;color:white;}\", \".fixed-width.jsx-1591747512{max-width:600pt;min-width:0;padding:0 20pt;margin:0 auto;}\", \".header.jsx-1591747512{padding-top:20pt;padding-bottom:20pt;}\", \".header.jsx-1591747512 .navigator.jsx-1591747512{margin-bottom:20pt;}\", \".header.jsx-1591747512 .navigator-link.jsx-1591747512{font-size:8pt;color:black;background-color:white;border-radius:16pt;padding:2pt 6pt;}\", \".header.jsx-1591747512 .date.jsx-1591747512{margin:10pt 0;}\", \".header.jsx-1591747512 .title.jsx-1591747512{font-size:35pt;font-weight:bold;margin:10pt 0;}\", \".header.jsx-1591747512 .subtitle.jsx-1591747512{font-weight:bold;margin:10pt 0;}\", \".tags.jsx-1591747512{margin-top:10pt;}\", \".tag.jsx-1591747512{margin-right:4pt;padding:2pt 4pt;font-size:9pt;border-radius:3pt;background-color:#0000007a;display:inline-block;}\", \".content-wrapper.jsx-1591747512{margin:20pt 0;}\", \"hr.jsx-1591747512{border:0;height:1px;background-color:#00000014;margin:20pt 0;}\", \".prev-post.jsx-1591747512 .title.jsx-1591747512,.next-post.jsx-1591747512 .title.jsx-1591747512{font-style:italic;color:#7d7d7d;}\", \".next-post.jsx-1591747512{text-align:right;}\", \".footer.jsx-1591747512{text-align:center;font-size:9pt;margin:20pt 0;}\"]), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {\n    id: \"1919476713\"\n  }, [\"code{background-color:#dddddd;font-size:inherit;padding:2pt 4pt;border-radius:2pt;}\", \".content img,.content iframe{max-width:100%;}\"]));\n}\n_c = Post;\n\nvar _c;\n\n$RefreshReg$(_c, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9ibG9nL1suLi5zbHVnXS5qcz80YzVhIl0sIm5hbWVzIjpbIlBvc3QiLCJzbHVnIiwiZnJvbnRtYXR0ZXIiLCJtYXJrZG93bmJvZHkiLCJKU09OIiwicGFyc2UiLCJBcnJheSIsImlzQXJyYXkiLCJ0YWdzIiwidGl0bGUiLCJwcm9jZXNzIiwiZGF0ZSIsImpvaW4iLCJzdWJ0aXRsZSIsIm1hcCIsInRhZyIsImNvZGUiLCJsYW5ndWFnZSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBOztBQUVlLFNBQVNBLElBQVQsT0FBbUQ7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFdBQTZCLFFBQTdCQSxXQUE2QjtBQUFBLE1BQWhCQyxZQUFnQixRQUFoQkEsWUFBZ0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0FELGFBQVcsR0FBR0UsSUFBSSxDQUFDQyxLQUFMLENBQVdILFdBQVgsQ0FBZDs7QUFFQSxNQUFJLENBQUNJLEtBQUssQ0FBQ0MsT0FBTixDQUFjTCxXQUFXLENBQUNNLElBQTFCLENBQUwsRUFBc0M7QUFDbENOLGVBQVcsQ0FBQ00sSUFBWixHQUFtQixDQUFDTixXQUFXLENBQUNNLElBQWIsQ0FBbkI7QUFDSDs7QUFFRCxTQUNJLE1BQUMsMERBQUQsUUFDSSxNQUFDLGdEQUFELFFBQ0k7QUFBQTtBQUFBLEtBQVFOLFdBQVcsQ0FBQ08sS0FBWixJQUFxQixVQUE3QixDQURKLENBREosRUFLSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFnQjtBQUFoQixLQUNJLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsR0FBWDtBQUFlLE1BQUUsWUFBS0MsRUFBTDtBQUFqQixLQUNJO0FBQUE7QUFBQSxZQURKLENBREosQ0FESixXQU9JO0FBQUEsd0NBQWdCO0FBQWhCLFlBUEosQ0FESixFQVlJO0FBQUEsd0NBQWU7QUFBZixLQUNLUixXQUFXLENBQUNTLElBQVosSUFBb0IsRUFEekIsQ0FaSixFQWVJO0FBQUEsd0NBQWU7QUFBZixLQUNJLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsaUJBQVg7QUFBNkIsTUFBRSxZQUFLRCxFQUFMLG1CQUFpQ1QsSUFBSSxDQUFDVyxJQUFMLENBQVUsR0FBVixDQUFqQztBQUEvQixLQUNJO0FBQUE7QUFBQSxLQUFJVixXQUFXLENBQUNPLEtBQVosSUFBcUIsVUFBekIsQ0FESixDQURKLENBZkosRUFvQkk7QUFBQSx3Q0FBZTtBQUFmLEtBQ0tQLFdBQVcsQ0FBQ1csUUFBWixJQUF3QixFQUQ3QixDQXBCSixFQXVCSTtBQUFBLHdDQUFlO0FBQWYsS0FDS1gsV0FBVyxDQUFDTSxJQUFaLElBQW9CTixXQUFXLENBQUNNLElBQVosQ0FBaUJNLEdBQWpCLENBQXFCLFVBQUFDLEdBQUcsRUFBSTtBQUM3QyxXQUNJO0FBQU0sU0FBRyxFQUFFQSxHQUFYO0FBQUEsMENBQTBCO0FBQTFCLFlBQ01BLEdBRE4sQ0FESjtBQUtILEdBTm9CLENBRHpCLENBdkJKLENBREosQ0FMSixFQXdDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBLHdDQUFlO0FBQWYsS0FDSSxNQUFDLHFEQUFEO0FBQ0ksVUFBTSxFQUFFWixZQURaO0FBRUksY0FBVSxFQUFFLEtBRmhCO0FBR0ksYUFBUyxFQUFFO0FBQUVhLFVBQUksRUFBRSxxQkFBOEI7QUFBQSxZQUFuQkMsUUFBbUIsU0FBbkJBLFFBQW1CO0FBQUEsWUFBVEMsS0FBUyxTQUFUQSxLQUFTO0FBQzdDLGVBQ0csTUFBQyxnRUFBRDtBQUFtQixrQkFBUSxFQUFFRDtBQUE3QixXQUNLQyxLQURMLENBREg7QUFLSDtBQU5VO0FBSGYsSUFESixFQVlJO0FBQUE7QUFBQSxJQVpKLEVBY0k7QUFBQSx3Q0FBZTtBQUFmLEtBQ0k7QUFBQTtBQUFBLDBCQURKLEVBRUk7QUFBQSx3Q0FBZ0I7QUFBaEIsMEJBRkosQ0FkSixFQW1CSTtBQUFBLHdDQUFlO0FBQWYsS0FDSTtBQUFBO0FBQUEsMEJBREosRUFFSTtBQUFBO0FBQUEsSUFGSixDQW5CSixFQXdCSTtBQUFBLHdDQUFrQjtBQUFsQiw4REF4QkosQ0FESixDQXhDSjtBQUFBO0FBQUE7QUFBQTtBQUFBLCtJQURKO0FBcUtIO0tBL0t1QmxCLEkiLCJmaWxlIjoiLi9wYWdlcy9ibG9nL1suLi5zbHVnXS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcblxuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcidcbmltcG9ydCBSZWFjdE1hcmtkb3duIGZyb20gJ3JlYWN0LW1hcmtkb3duJ1xuaW1wb3J0IFN5bnRheEhpZ2hsaWdodGVyIGZyb20gJ3JlYWN0LXN5bnRheC1oaWdobGlnaHRlcidcblxuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0xheW91dCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUG9zdCh7IHNsdWcsIGZyb250bWF0dGVyLCBtYXJrZG93bmJvZHkgfSkge1xuICAgIC8vIElmIHdlIGRvIG5vdCBwYXNzIGZyb250bWF0dGVyIGFzIHN0cmluZyByYXRlciB0aGFuIG9iamVjdCBpdHNlbGYsXG4gICAgLy8gc2VyaWFsaXphdGlvbiBlcnJvciB3aWxsIG9jY3VyZS4gU28gdG8gcGFzcyBmcm9udG1hdHRlciBvYmplY3QsXG4gICAgLy8gV2UgaGF2ZSB0byBzdHJpbmdpZnkgdGhlIG9iamVjdCB0aGVuIHBhcnNlIGl0IG9uIGNsaWVudCBzaWRlLlxuICAgIGZyb250bWF0dGVyID0gSlNPTi5wYXJzZShmcm9udG1hdHRlcilcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShmcm9udG1hdHRlci50YWdzKSkge1xuICAgICAgICBmcm9udG1hdHRlci50YWdzID0gW2Zyb250bWF0dGVyLnRhZ3NdXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dD5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDx0aXRsZT57ZnJvbnRtYXR0ZXIudGl0bGUgfHwgJ3VudGl0bGVkJ308L3RpdGxlPlxuICAgICAgICAgICAgPC9IZWFkPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyIGZpeGVkLXdpZHRoXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZpZ2F0b3ItbGlua1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCIgYXM9e2Ake3Byb2Nlc3MuZW52LmJhc2VVcmx9L2B9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YT5ob21lPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwOz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdmlnYXRvci1saW5rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvZ1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZnJvbnRtYXR0ZXIuZGF0ZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYmxvZy9bLi4uc2x1Z11cIiBhcz17YCR7cHJvY2Vzcy5lbnYuYmFzZVVybH0vYmxvZy8ke3NsdWcuam9pbignLycpfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhPntmcm9udG1hdHRlci50aXRsZSB8fCAndW50aXRsZWQnfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmcm9udG1hdHRlci5zdWJ0aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFnc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Zyb250bWF0dGVyLnRhZ3MgJiYgZnJvbnRtYXR0ZXIudGFncy5tYXAodGFnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e3RhZ30gY2xhc3NOYW1lPVwidGFnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAje3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQgZml4ZWQtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0TWFya2Rvd25cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZT17bWFya2Rvd25ib2R5fVxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlSHRtbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnM9e3sgY29kZTogZnVuY3Rpb24oeyBsYW5ndWFnZSwgdmFsdWUgfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN5bnRheEhpZ2hsaWdodGVyIGxhbmd1YWdlPXtsYW5ndWFnZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1N5bnRheEhpZ2hsaWdodGVyPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH19Lz5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxoci8+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmV2LXBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj7snbTsoITquIA8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGl0bGVcIj5cIlRoZSB0ZXN0IHRpdGxlXCI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV4dC1wb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+64uk7J2M6riAPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuID48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBHaXRodWIuaW8gLSBDb3B5cmlnaHQoYykgMjAyMC4gSmlzdSBTaW0oUmVkTGFib3JhdG9yeSlcbiAgICAgICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgICAgLnRvcCB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjY1NjU7XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogMCAwIDVwdCBibGFjaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5maXhlZC13aWR0aCB7XG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOiA2MDBwdDtcbiAgICAgICAgICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMCAyMHB0O1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmhlYWRlciB7XG4gICAgICAgICAgICAgICAgcGFkZGluZy10b3A6IDIwcHQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIC5uYXZpZ2F0b3Ige1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuaGVhZGVyIC5uYXZpZ2F0b3ItbGluayB7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA4cHQ7XG4gICAgICAgICAgICAgICAgY29sb3I6IGJsYWNrO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMnB0IDZwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5oZWFkZXIgLmRhdGUge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMTBwdCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmhlYWRlciAudGl0bGUge1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzVwdDtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcblxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTBwdCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmhlYWRlciAuc3VidGl0bGUge1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMHB0IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAudGFncyB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC50YWcge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogNHB0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDJwdCA0cHQ7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA5cHQ7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B0O1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA3YTtcblxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jb250ZW50LXdyYXBwZXIge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMjBwdCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHIge1xuICAgICAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwMTQ7XG5cbiAgICAgICAgICAgICAgICBtYXJnaW46IDIwcHQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5wcmV2LXBvc3QgLnRpdGxlLCAubmV4dC1wb3N0IC50aXRsZSB7XG4gICAgICAgICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjN2Q3ZDdkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm5leHQtcG9zdCB7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuZm9vdGVyIHtcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA5cHQ7XG5cbiAgICAgICAgICAgICAgICBtYXJnaW46IDIwcHQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgICAgIGNvZGUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGRkZGQ7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiBpbmhlcml0O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDJwdCA0cHQ7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuY29udGVudCBpbWcsIC5jb250ZW50IGlmcmFtZSB7XG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICA8L0xheW91dD5cbiAgICApXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyhjb250ZXh0KSB7XG4gICAgY29uc3QgeyBzbHVnIH0gPSBjb250ZXh0LnBhcmFtc1xuXG4gICAgY29uc3QgY29udGVudCA9IGF3YWl0IGltcG9ydChgLi4vLi4vcG9zdHMvJHtzbHVnLmpvaW4oJy8nKX0ubWRgKVxuICAgIGNvbnN0IGRhdGEgPSBtYXR0ZXIoY29udGVudC5kZWZhdWx0LCB7XG4gICAgICAgIGV4Y2VycHRfc2VwYXJhdG9yOiAnPCEtLSBtb3JlIC0tPidcbiAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHNsdWc6IHNsdWcgfHwgW10sXG4gICAgICAgICAgICBmcm9udG1hdHRlcjogSlNPTi5zdHJpbmdpZnkoZGF0YS5kYXRhKSxcbiAgICAgICAgICAgIG1hcmtkb3duYm9keTogZGF0YS5jb250ZW50XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgYWxzbyBjYWxsZWQgb24gc2VyZXItc2lkZS5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQYXRocygpIHtcbiAgICB2YXIgZ2xvYiA9IHJlcXVpcmUoJ2dsb2InKVxuICAgIGNvbnN0IHBvc3RzID0gZ2xvYi5zeW5jKCdwb3N0cy8qKi8qLm1kJykgLy8gJyoqJyBpcyBnbG9ic3Rhci5cbiAgICBjb25zdCBwb3N0U2x1Z3MgPSBwb3N0cy5tYXAoZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlXG4gICAgICAgICAgICAucmVwbGFjZSgvIC9nLCAnLScpIC8vIFJlcGxhY2UgYWxsIGJsYW5rcyBpbnRvIGRhc2guXG4gICAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgLnNsaWNlKDEpIC8vIERyb3AgZmlyc3QgZGlyZWN0b3J5IHBhdGggJ3Bvc3RzJy5cbiAgICAgICAgICAgIC5qb2luKCcvJylcbiAgICAgICAgICAgIC5zbGljZSgwLCAtMykgLy8gRHJvcCBsYXN0IHRocmVlIGxldHRlciwgJy5tZCcuXG4gICAgICAgICAgICAudHJpbSgpXG4gICAgfSlcbiAgICBjb25zdCBwYXRocyA9IHBvc3RTbHVncy5tYXAoc2x1ZyA9PiBgL2Jsb2cvJHtzbHVnfWApXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwYXRocyxcbiAgICAgICAgZmFsbGJhY2s6IGZhbHNlXG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/blog/[...slug].js\n");

/***/ })

})