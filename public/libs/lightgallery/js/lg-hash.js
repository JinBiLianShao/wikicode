(function(e){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else if(typeof define==="function"&&define.amd){define([],e)}else{var t;if(typeof window!=="undefined"){t=window}else if(typeof global!=="undefined"){t=global}else if(typeof self!=="undefined"){t=self}else{t=this}t.LgHash=e()}})(function(){var n,e,t;return function r(s,l,a){function f(i,e){if(!l[i]){if(!s[i]){var t=typeof require=="function"&&require;if(!e&&t)return t(i,!0);if(h)return h(i,!0);var o=new Error("Cannot find module '"+i+"'");throw o.code="MODULE_NOT_FOUND",o}var n=l[i]={exports:{}};s[i][0].call(n.exports,function(e){var t=s[i][1][e];return f(t?t:e)},n,n.exports,r,s,l,a)}return l[i].exports}var h=typeof require=="function"&&require;for(var e=0;e<a.length;e++)f(a[e]);return f}({1:[function(e,t,o){(function(e,t){if(typeof n==="function"&&n.amd){n([],t)}else if(typeof o!=="undefined"){t()}else{var i={exports:{}};t();e.lgHash=i.exports}})(this,function(){"use strict";var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i){if(Object.prototype.hasOwnProperty.call(i,o)){e[o]=i[o]}}}return e};var o={hash:true};var e=function e(t){this.el=t;this.core=window.lgData[this.el.getAttribute("lg-uid")];this.core.s=i({},o,this.core.s);if(this.core.s.hash){this.oldHash=window.location.hash;this.init()}return this};e.prototype.init=function(){var t=this;var i;utils.on(t.core.el,"onAfterSlide.lgtm",function(e){window.location.hash="lg="+t.core.s.galleryId+"&slide="+e.detail.index});utils.on(window,"hashchange.lghash",function(){i=window.location.hash;var e=parseInt(i.split("&slide=")[1],10);if(i.indexOf("lg="+t.core.s.galleryId)>-1){t.core.slide(e,false,false)}else if(t.core.lGalleryOn){t.core.destroy()}})};e.prototype.destroy=function(){if(!this.core.s.hash){return}if(this.oldHash&&this.oldHash.indexOf("lg="+this.core.s.galleryId)<0){window.location.hash=this.oldHash}else{if(history.pushState){history.pushState("",document.title,window.location.pathname+window.location.search)}else{window.location.hash=""}}utils.off(this.core.el,".lghash")};window.lgModules.hash=e})},{}]},{},[1])(1)});