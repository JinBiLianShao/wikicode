(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){e(require("jquery"))}else{e(jQuery)}})(function(p){var n=/\+/g;function m(e){return k.raw?e:encodeURIComponent(e)}function l(e){return k.raw?e:decodeURIComponent(e)}function v(e){return m(k.json?JSON.stringify(e):String(e))}function r(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{e=decodeURIComponent(e.replace(n," "));return k.json?JSON.parse(e):e}catch(e){}}function x(e,n){var i=k.raw?e:r(e);return p.isFunction(n)?n(i):i}var k=p.cookie=function(e,n,i){if(n!==undefined&&!p.isFunction(n)){i=p.extend({},k.defaults,i);if(typeof i.expires==="number"){var r=i.expires,o=i.expires=new Date;o.setTime(+o+r*864e5)}return document.cookie=[m(e),"=",v(n),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}var t=e?undefined:{};var u=document.cookie?document.cookie.split("; "):[];for(var f=0,c=u.length;f<c;f++){var a=u[f].split("=");var d=l(a.shift());var s=a.join("=");if(e&&e===d){t=x(s,n);break}if(!e&&(s=x(s))!==undefined){t[d]=s}}return t};k.defaults={};p.removeCookie=function(e,n){if(p.cookie(e)===undefined){return false}p.cookie(e,"",p.extend({},n,{expires:-1}));return!p.cookie(e)}});