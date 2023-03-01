(function(t){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=t()}else if(typeof define==="function"&&define.amd){define([],t)}else{var e;if(typeof window!=="undefined"){e=window}else if(typeof global!=="undefined"){e=global}else if(typeof self!=="undefined"){e=self}else{e=this}e.LgThumbnail=t()}})(function(){var o,t,e;return function u(s,l,h){function a(i,t){if(!l[i]){if(!s[i]){var e=typeof require=="function"&&require;if(!t&&e)return e(i,!0);if(n)return n(i,!0);var r=new Error("Cannot find module '"+i+"'");throw r.code="MODULE_NOT_FOUND",r}var o=l[i]={exports:{}};s[i][0].call(o.exports,function(t){var e=s[i][1][t];return a(e?e:t)},o,o.exports,u,s,l,h)}return l[i].exports}var n=typeof require=="function"&&require;for(var t=0;t<h.length;t++)a(h[t]);return a}({1:[function(t,e,r){(function(t,e){if(typeof o==="function"&&o.amd){o([],e)}else if(typeof r!=="undefined"){e()}else{var i={exports:{}};e();t.lgThumbnail=i.exports}})(this,function(){"use strict";var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var r in i){if(Object.prototype.hasOwnProperty.call(i,r)){t[r]=i[r]}}}return t};var r={thumbnail:true,animateThumb:true,currentPagerPosition:"middle",thumbWidth:100,thumbContHeight:100,thumbMargin:5,exThumbImage:false,showThumbByDefault:true,toggleThumb:true,pullCaptionUp:true,enableThumbDrag:true,enableThumbSwipe:true,swipeThreshold:50,loadYoutubeThumbnail:true,youtubeThumbSize:1,loadVimeoThumbnail:true,vimeoThumbSize:"thumbnail_small",loadDailymotionThumbnail:true};var t=function t(e){this.el=e;this.core=window.lgData[this.el.getAttribute("lg-uid")];this.core.s=i({},r,this.core.s);this.thumbOuter=null;this.thumbOuterWidth=0;this.thumbTotalWidth=this.core.items.length*(this.core.s.thumbWidth+this.core.s.thumbMargin);this.thumbIndex=this.core.index;this.left=0;this.init();return this};t.prototype.init=function(){var t=this;if(this.core.s.thumbnail&&this.core.items.length>1){if(this.core.s.showThumbByDefault){setTimeout(function(){utils.addClass(t.core.outer,"lg-thumb-open")},700)}if(this.core.s.pullCaptionUp){utils.addClass(this.core.outer,"lg-pull-caption-up")}this.build();if(this.core.s.animateThumb){if(this.core.s.enableThumbDrag&&!this.core.isTouch&&this.core.doCss()){this.enableThumbDrag()}if(this.core.s.enableThumbSwipe&&this.core.isTouch&&this.core.doCss()){this.enableThumbSwipe()}this.thumbClickable=false}else{this.thumbClickable=true}this.toggle();this.thumbkeyPress()}};t.prototype.build=function(){var s=this;var l="";var h="";var o;var t='<div class="lg-thumb-outer">'+'<div class="lg-thumb group">'+"</div>"+"</div>";switch(this.core.s.vimeoThumbSize){case"thumbnail_large":h="640";break;case"thumbnail_medium":h="200x150";break;case"thumbnail_small":h="100x75"}utils.addClass(s.core.outer,"lg-has-thumb");s.core.outer.querySelector(".lg").insertAdjacentHTML("beforeend",t);s.thumbOuter=s.core.outer.querySelector(".lg-thumb-outer");s.thumbOuterWidth=s.thumbOuter.offsetWidth;if(s.core.s.animateThumb){s.core.outer.querySelector(".lg-thumb").style.width=s.thumbTotalWidth+"px";s.core.outer.querySelector(".lg-thumb").style.position="relative"}if(this.core.s.animateThumb){s.thumbOuter.style.height=s.core.s.thumbContHeight+"px"}function e(t,e,i){var r=s.core.isVideo(t,i)||{};var o;var u="";if(r.youtube||r.vimeo||r.dailymotion){if(r.youtube){if(s.core.s.loadYoutubeThumbnail){o="//img.youtube.com/vi/"+r.youtube[1]+"/"+s.core.s.youtubeThumbSize+".jpg"}else{o=e}}else if(r.vimeo){if(s.core.s.loadVimeoThumbnail){o="//i.vimeocdn.com/video/error_"+h+".jpg";u=r.vimeo[1]}else{o=e}}else if(r.dailymotion){if(s.core.s.loadDailymotionThumbnail){o="//www.dailymotion.com/thumbnail/video/"+r.dailymotion[1]}else{o=e}}}else{o=e}l+='<div data-vimeo-id="'+u+'" class="lg-thumb-item" style="width:'+s.core.s.thumbWidth+"px; margin-right: "+s.core.s.thumbMargin+'px"><img src="'+o+'" /></div>';u=""}if(s.core.s.dynamic){for(var i=0;i<s.core.s.dynamicEl.length;i++){e(s.core.s.dynamicEl[i].src,s.core.s.dynamicEl[i].thumb,i)}}else{for(var r=0;r<s.core.items.length;r++){if(!s.core.s.exThumbImage){e(s.core.items[r].getAttribute("href")||s.core.items[r].getAttribute("data-src"),s.core.items[r].querySelector("img").getAttribute("src"),r)}else{e(s.core.items[r].getAttribute("href")||s.core.items[r].getAttribute("data-src"),s.core.items[r].getAttribute(s.core.s.exThumbImage),r)}}}s.core.outer.querySelector(".lg-thumb").innerHTML=l;o=s.core.outer.querySelectorAll(".lg-thumb-item");for(var u=0;u<o.length;u++){(function(t){var e=o[t];var i=e.getAttribute("data-vimeo-id");if(i){window["lgJsonP"+s.el.getAttribute("lg-uid")+""+u]=function(t){e.querySelector("img").setAttribute("src",t[0][s.core.s.vimeoThumbSize])};var r=document.createElement("script");r.className="lg-script";r.src="//www.vimeo.com/api/v2/video/"+i+".json?callback=lgJsonP"+s.el.getAttribute("lg-uid")+""+u;document.body.appendChild(r)}})(u)}utils.addClass(o[s.core.index],"active");utils.on(s.core.el,"onBeforeSlide.lgtm",function(){for(var t=0;t<o.length;t++){utils.removeClass(o[t],"active")}utils.addClass(o[s.core.index],"active")});for(var a=0;a<o.length;a++){(function(t){utils.on(o[t],"click.lg touchend.lg",function(){setTimeout(function(){if(s.thumbClickable&&!s.core.lgBusy||!s.core.doCss()){s.core.index=t;s.core.slide(s.core.index,false,true)}},50)})})(a)}utils.on(s.core.el,"onBeforeSlide.lgtm",function(){s.animateThumb(s.core.index)});utils.on(window,"resize.lgthumb orientationchange.lgthumb",function(){setTimeout(function(){s.animateThumb(s.core.index);s.thumbOuterWidth=s.thumbOuter.offsetWidth},200)})};t.prototype.setTranslate=function(t){utils.setVendor(this.core.outer.querySelector(".lg-thumb"),"Transform","translate3d(-"+t+"px, 0px, 0px)")};t.prototype.animateThumb=function(t){var e=this.core.outer.querySelector(".lg-thumb");if(this.core.s.animateThumb){var i;switch(this.core.s.currentPagerPosition){case"left":i=0;break;case"middle":i=this.thumbOuterWidth/2-this.core.s.thumbWidth/2;break;case"right":i=this.thumbOuterWidth-this.core.s.thumbWidth}this.left=(this.core.s.thumbWidth+this.core.s.thumbMargin)*t-1-i;if(this.left>this.thumbTotalWidth-this.thumbOuterWidth){this.left=this.thumbTotalWidth-this.thumbOuterWidth}if(this.left<0){this.left=0}if(this.core.lGalleryOn){if(!utils.hasClass(e,"on")){utils.setVendor(this.core.outer.querySelector(".lg-thumb"),"TransitionDuration",this.core.s.speed+"ms")}if(!this.core.doCss()){e.style.left=-this.left+"px"}}else{if(!this.core.doCss()){e.style.left=-this.left+"px"}}this.setTranslate(this.left)}};t.prototype.enableThumbDrag=function(){var e=this;var i=0;var r=0;var o=false;var u=false;var s=0;utils.addClass(e.thumbOuter,"lg-grab");utils.on(e.core.outer.querySelector(".lg-thumb"),"mousedown.lgthumb",function(t){if(e.thumbTotalWidth>e.thumbOuterWidth){t.preventDefault();i=t.pageX;o=true;e.core.outer.scrollLeft+=1;e.core.outer.scrollLeft-=1;e.thumbClickable=false;utils.removeClass(e.thumbOuter,"lg-grab");utils.addClass(e.thumbOuter,"lg-grabbing")}});utils.on(window,"mousemove.lgthumb",function(t){if(o){s=e.left;u=true;r=t.pageX;utils.addClass(e.thumbOuter,"lg-dragging");s=s-(r-i);if(s>e.thumbTotalWidth-e.thumbOuterWidth){s=e.thumbTotalWidth-e.thumbOuterWidth}if(s<0){s=0}e.setTranslate(s)}});utils.on(window,"mouseup.lgthumb",function(){if(u){u=false;utils.removeClass(e.thumbOuter,"lg-dragging");e.left=s;if(Math.abs(r-i)<e.core.s.swipeThreshold){e.thumbClickable=true}}else{e.thumbClickable=true}if(o){o=false;utils.removeClass(e.thumbOuter,"lg-grabbing");utils.addClass(e.thumbOuter,"lg-grab")}})};t.prototype.enableThumbSwipe=function(){var e=this;var i=0;var r=0;var o=false;var u=0;utils.on(e.core.outer.querySelector(".lg-thumb"),"touchstart.lg",function(t){if(e.thumbTotalWidth>e.thumbOuterWidth){t.preventDefault();i=t.targetTouches[0].pageX;e.thumbClickable=false}});utils.on(e.core.outer.querySelector(".lg-thumb"),"touchmove.lg",function(t){if(e.thumbTotalWidth>e.thumbOuterWidth){t.preventDefault();r=t.targetTouches[0].pageX;o=true;utils.addClass(e.thumbOuter,"lg-dragging");u=e.left;u=u-(r-i);if(u>e.thumbTotalWidth-e.thumbOuterWidth){u=e.thumbTotalWidth-e.thumbOuterWidth}if(u<0){u=0}e.setTranslate(u)}});utils.on(e.core.outer.querySelector(".lg-thumb"),"touchend.lg",function(){if(e.thumbTotalWidth>e.thumbOuterWidth){if(o){o=false;utils.removeClass(e.thumbOuter,"lg-dragging");if(Math.abs(r-i)<e.core.s.swipeThreshold){e.thumbClickable=true}e.left=u}else{e.thumbClickable=true}}else{e.thumbClickable=true}})};t.prototype.toggle=function(){var t=this;if(t.core.s.toggleThumb){utils.addClass(t.core.outer,"lg-can-toggle");t.thumbOuter.insertAdjacentHTML("beforeend",'<span class="lg-toggle-thumb lg-icon"></span>');utils.on(t.core.outer.querySelector(".lg-toggle-thumb"),"click.lg",function(){if(utils.hasClass(t.core.outer,"lg-thumb-open")){utils.removeClass(t.core.outer,"lg-thumb-open")}else{utils.addClass(t.core.outer,"lg-thumb-open")}})}};t.prototype.thumbkeyPress=function(){var e=this;utils.on(window,"keydown.lgthumb",function(t){if(t.keyCode===38){t.preventDefault();utils.addClass(e.core.outer,"lg-thumb-open")}else if(t.keyCode===40){t.preventDefault();utils.removeClass(e.core.outer,"lg-thumb-open")}})};t.prototype.destroy=function(){if(this.core.s.thumbnail&&this.core.items.length>1){utils.off(window,".lgthumb");this.thumbOuter.parentNode.removeChild(this.thumbOuter);utils.removeClass(this.core.outer,"lg-has-thumb");var t=document.getElementsByClassName("lg-script");while(t[0]){t[0].parentNode.removeChild(t[0])}}};window.lgModules.thumbnail=t})},{}]},{},[1])(1)});