!function(e){if('object'==typeof exports&&'undefined'!=typeof module)module.exports=e();else if('function'==typeof define&&define.amd)define([],e);else{('undefined'!=typeof window?window:'undefined'!=typeof global?global:'undefined'!=typeof self?self:this).basicLightbox=e()}}(function(){return function i(f,a,c){function l(t,e){if(!a[t]){if(!f[t]){var o='function'==typeof require&&require;if(!e&&o)return o(t,!0);if(s)return s(t,!0);var n=new Error('Cannot find module \''+t+'\'');throw n.code='MODULE_NOT_FOUND',n}var r=a[t]={exports:{}};f[t][0].call(r.exports,function(e){return l(f[t][1][e]||e)},r,r.exports,i,f,a,c)}return a[t].exports}for(var s='function'==typeof require&&require,e=0;e<c.length;e++)l(c[e]);return l}({1:[function(e,t,o){'use strict';Object.defineProperty(o,'__esModule',{value:!0});var a=function(e,t){var o=e.children;return 1===o.length&&o[0].tagName===t},f=o.visible=function(e){return null!=(e=e||document.querySelector('.basicLightbox'))&&!0===e.ownerDocument.body.contains(e)};o.create=function(e,n){var r=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:'',t=arguments[1],o=document.createElement('div');o.classList.add('basicLightbox'),null!=t.className&&o.classList.add(t.className),o.innerHTML='\n\t\t'+t.beforePlaceholder+'\n\t\t<div class="basicLightbox__placeholder" role="dialog">\n\t\t\t'+e+'\n\t\t</div>\n\t\t'+t.afterPlaceholder+'\n\t';var n=o.querySelector('.basicLightbox__placeholder'),r=a(n,'IMG'),i=a(n,'VIDEO'),f=a(n,'IFRAME');return!0===r&&o.classList.add('basicLightbox--img'),!0===i&&o.classList.add('basicLightbox--video'),!0===f&&o.classList.add('basicLightbox--iframe'),o}(e,n=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return!1!==(e=Object.assign({},e)).closable&&(e.closable=!0),'function'==typeof e.className&&(e.className=e.className()),'string'!=typeof e.className&&(e.className=null),'function'!=typeof e.beforeShow&&(e.beforeShow=function(){}),'function'!=typeof e.afterShow&&(e.afterShow=function(){}),'function'!=typeof e.beforeClose&&(e.beforeClose=function(){}),'function'!=typeof e.afterClose&&(e.afterClose=function(){}),'function'==typeof e.beforePlaceholder&&(e.beforePlaceholder=e.beforePlaceholder()),'string'!=typeof e.beforePlaceholder&&(e.beforePlaceholder=''),'function'==typeof e.afterPlaceholder&&(e.afterPlaceholder=e.afterPlaceholder()),'string'!=typeof e.afterPlaceholder&&(e.afterPlaceholder=''),e}(n)),o=function(e){return!1!==n.beforeClose(i)&&(o=function(){if(n.afterClose(i),'function'==typeof e)return e(i)},(t=r).classList.remove('basicLightbox--visible'),setTimeout(function(){return!1===f(t)||t.parentElement.removeChild(t),o()},410),!0);var t,o};!0===n.closable&&(r.onclick=function(e){var t;e.target===this&&(o(),'function'==typeof(t=e).stopPropagation&&t.stopPropagation(),'function'==typeof t.preventDefault&&t.preventDefault())});var i={element:function(){return r},visible:function(){return f(r)},show:function(e){return!1!==n.beforeShow(i)&&(t=r,o=function(){if(n.afterShow(i),'function'==typeof e)return e(i)},document.body.appendChild(t),setTimeout(function(){requestAnimationFrame(function(){return t.classList.add('basicLightbox--visible'),o()})},10),!0);var t,o},close:o};return i}},{}]},{},[1])(1)});