!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["style/player-on-top"]=t():n["style/player-on-top"]=t()}(self,(function(){return function(){var n,t,o={881:function(n,t,o){var e=o(645)((function(n){return n[1]}));e.push([n.id,".v-wrap .l-con,\n.v-wrap .r-con {\n  display: flex;\n  flex-direction: column;\n  margin-top: 24px;\n}\n.v-wrap .l-con .player-wrap {\n  order: -1;\n}\n.v-wrap .l-con .video-info {\n  margin: 20px 0 0 0 !important;\n  padding: 0 !important;\n  height: auto !important;\n}\n.v-wrap .l-con .video-info .video-data .argue,\n.v-wrap .l-con .video-info .video-data .copyright {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.v-wrap .r-con .danmaku-box {\n  order: -1;\n}\n.v-wrap .r-con .up-info {\n  padding-top: 0 !important;\n}",""]),n.exports=e},645:function(n){"use strict";
// eslint-disable-next-line func-names
n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var o=n(t);return t[2]?"@media ".concat(t[2]," {").concat(o,"}"):o})).join("")},
// eslint-disable-next-line func-names
t.i=function(n,o,e){"string"==typeof n&&(
// eslint-disable-next-line no-param-reassign
n=[[null,n,""]]);var r={};if(e)for(var i=0;i<this.length;i++){
// eslint-disable-next-line prefer-destructuring
var a=this[i][0];null!=a&&(r[a]=!0)}for(var p=0;p<n.length;p++){var c=[].concat(n[p]);e&&r[c[0]]||(o&&(c[2]?c[2]="".concat(o," and ").concat(c[2]):c[2]=o),t.push(c))}},t}},653:function(n,t,o){var e=o(881);n.exports="string"==typeof e?e:e.toString()}},e={};function r(n){var t=e[n];if(void 0!==t)return t.exports;var i=e[n]={id:n,exports:{}};return o[n](i,i.exports,r),i.exports}t=Object.getPrototypeOf?function(n){return Object.getPrototypeOf(n)}:function(n){return n.__proto__},r.t=function(o,e){if(1&e&&(o=this(o)),8&e)return o;if("object"==typeof o&&o){if(4&e&&o.__esModule)return o;if(16&e&&"function"==typeof o.then)return o}var i=Object.create(null);r.r(i);var a={};n=n||[null,t({}),t([]),t(t)];for(var p=2&e&&o;"object"==typeof p&&!~n.indexOf(p);p=t(p))Object.getOwnPropertyNames(p).forEach((function(n){a[n]=function(){return o[n]}}));return a.default=function(){return o},r.d(i,a),i},r.d=function(n,t){for(var o in t)r.o(t,o)&&!r.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:t[o]})},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})};var i={};return function(){"use strict";r.d(i,{component:function(){return n}});const n={name:"playerOnTop",displayName:"播放器置顶",description:{"zh-CN":"在视频页面中将播放器放在页面最上方."},instantStyles:[{name:"playerOnTop",style:()=>Promise.resolve().then(r.t.bind(r,653,23))}],tags:[componentsTags.style,componentsTags.video],entry:none}}(),i=i.component}()}));