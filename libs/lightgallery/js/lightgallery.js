(function(e){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else if(typeof define==="function"&&define.amd){define([],e)}else{var t;if(typeof window!=="undefined"){t=window}else if(typeof global!=="undefined"){t=global}else if(typeof self!=="undefined"){t=self}else{t=this}t.Lightgallery=e()}})(function(){var r,e,t;return function r(o,a,d){function n(s,e){if(!a[s]){if(!o[s]){var t=typeof require=="function"&&require;if(!e&&t)return t(s,!0);if(u)return u(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var i=a[s]={exports:{}};o[s][0].call(i.exports,function(e){var t=o[s][1][e];return n(t?t:e)},i,i.exports,r,o,a,d)}return a[s].exports}var u=typeof require=="function"&&require;for(var e=0;e<d.length;e++)n(d[e]);return n}({1:[function(e,t,l){(function(e,t){if(typeof r==="function"&&r.amd){r(["exports"],t)}else if(typeof l!=="undefined"){t(l)}else{var s={exports:{}};t(s.exports);e.lgUtils=s.exports}})(this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:true});window.getAttribute=function(e){return window[e]};window.setAttribute=function(e,t){window[e]=t};document.getAttribute=function(e){return document[e]};document.setAttribute=function(e,t){document[e]=t};var a={wrap:function e(t,s){if(!t){return}var l=document.createElement("div");l.className=s;t.parentNode.insertBefore(l,t);t.parentNode.removeChild(t);l.appendChild(t)},addClass:function e(t,s){if(!t){return}if(t.classList){t.classList.add(s)}else{t.className+=" "+s}},removeClass:function e(t,s){if(!t){return}if(t.classList){t.classList.remove(s)}else{t.className=t.className.replace(new RegExp("(^|\\b)"+s.split(" ").join("|")+"(\\b|$)","gi")," ")}},hasClass:function e(t,s){if(t.classList){return t.classList.contains(s)}else{return new RegExp("(^| )"+s+"( |$)","gi").test(t.className)}return false},setVendor:function e(t,s,l){if(!t){return}t.style[s.charAt(0).toLowerCase()+s.slice(1)]=l;t.style["webkit"+s]=l;t.style["moz"+s]=l;t.style["ms"+s]=l;t.style["o"+s]=l},trigger:function e(t,s){var l=arguments.length<=2||arguments[2]===undefined?null:arguments[2];if(!t){return}var i=new CustomEvent(s,{detail:l});t.dispatchEvent(i)},Listener:{uid:0},on:function e(s,t,l){if(!s){return}t.split(" ").forEach(function(e){var t=s.getAttribute("lg-event-uid")||"";a.Listener.uid++;t+="&"+a.Listener.uid;s.setAttribute("lg-event-uid",t);a.Listener[e+a.Listener.uid]=l;s.addEventListener(e.split(".")[0],l,false)})},off:function e(t,s){if(!t){return}var l=t.getAttribute("lg-event-uid");if(l){l=l.split("&");for(var i=0;i<l.length;i++){if(l[i]){var r=s+l[i];if(r.substring(0,1)==="."){for(var o in a.Listener){if(a.Listener.hasOwnProperty(o)){if(o.split(".").indexOf(r.split(".")[1])>-1){t.removeEventListener(o.split(".")[0],a.Listener[o]);t.setAttribute("lg-event-uid",t.getAttribute("lg-event-uid").replace("&"+l[i],""));delete a.Listener[o]}}}}else{t.removeEventListener(r.split(".")[0],a.Listener[r]);t.setAttribute("lg-event-uid",t.getAttribute("lg-event-uid").replace("&"+l[i],""));delete a.Listener[r]}}}}},param:function e(t){return Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")}};e.default=a})},{}],2:[function(l,e,i){(function(e,t){if(typeof r==="function"&&r.amd){r(["./lg-utils"],t)}else if(typeof i!=="undefined"){t(l("./lg-utils"))}else{var s={exports:{}};t(e.lgUtils);e.lightgallery=s.exports}})(this,function(e){"use strict";var v=t(e);function t(e){return e&&e.__esModule?e:{default:e}}var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var l in s){if(Object.prototype.hasOwnProperty.call(s,l)){e[l]=s[l]}}}return e};(function(){if(typeof window.CustomEvent==="function"){return false}function e(e,t){t=t||{bubbles:false,cancelable:false,detail:undefined};var s=document.createEvent("CustomEvent");s.initCustomEvent(e,t.bubbles,t.cancelable,t.detail);return s}e.prototype=window.Event.prototype;window.CustomEvent=e})();window.utils=v.default;window.lgData={uid:0};window.lgModules={};var l={mode:"lg-slide",cssEasing:"ease",easing:"linear",speed:600,height:"100%",width:"100%",addClass:"",startClass:"lg-start-zoom",backdropDuration:150,hideBarsDelay:6e3,useLeft:false,closable:true,loop:true,escKey:true,keyPress:true,controls:true,slideEndAnimatoin:true,hideControlOnEnd:false,mousewheel:false,getCaptionFromTitleOrAlt:true,appendSubHtmlTo:".lg-sub-html",subHtmlSelectorRelative:false,preload:1,showAfterLoad:true,selector:"",selectWithin:"",nextHtml:"",prevHtml:"",index:false,iframeMaxWidth:"100%",download:true,counter:true,appendCounterTo:".lg-toolbar",swipeThreshold:50,enableSwipe:true,enableDrag:true,dynamic:false,dynamicEl:[],galleryId:1};function i(e,t){this.el=e;this.s=s({},l,t);if(this.s.dynamic&&this.s.dynamicEl!=="undefined"&&this.s.dynamicEl.constructor===Array&&!this.s.dynamicEl.length){throw"When using dynamic mode, you must also define dynamicEl as an Array."}this.modules={};this.lGalleryOn=false;this.lgBusy=false;this.hideBartimeout=false;this.isTouch="ontouchstart"in document.documentElement;if(this.s.slideEndAnimatoin){this.s.hideControlOnEnd=false}this.items=[];if(this.s.dynamic){this.items=this.s.dynamicEl}else{if(this.s.selector==="this"){this.items.push(this.el)}else if(this.s.selector!==""){if(this.s.selectWithin){this.items=document.querySelector(this.s.selectWithin).querySelectorAll(this.s.selector)}else{this.items=this.el.querySelectorAll(this.s.selector)}}else{this.items=this.el.children}}this.___slide="";this.outer="";this.init();return this}i.prototype.init=function(){var s=this;if(s.s.preload>s.items.length){s.s.preload=s.items.length}var e=window.location.hash;if(e.indexOf("lg="+this.s.galleryId)>0){s.index=parseInt(e.split("&slide=")[1],10);v.default.addClass(document.body,"lg-from-hash");if(!v.default.hasClass(document.body,"lg-on")){v.default.addClass(document.body,"lg-on");setTimeout(function(){s.build(s.index)})}}if(s.s.dynamic){v.default.trigger(this.el,"onBeforeOpen");s.index=s.s.index||0;if(!v.default.hasClass(document.body,"lg-on")){v.default.addClass(document.body,"lg-on");setTimeout(function(){s.build(s.index)})}}else{for(var t=0;t<s.items.length;t++){(function(t){v.default.on(s.items[t],"click.lgcustom",function(e){e.preventDefault();v.default.trigger(s.el,"onBeforeOpen");s.index=s.s.index||t;if(!v.default.hasClass(document.body,"lg-on")){s.build(s.index);v.default.addClass(document.body,"lg-on")}})})(t)}}};i.prototype.build=function(e){var t=this;t.structure();for(var s in window.lgModules){t.modules[s]=new window.lgModules[s](t.el)}t.slide(e,false,false);if(t.s.keyPress){t.keyPress()}if(t.items.length>1){t.arrow();setTimeout(function(){t.enableDrag();t.enableSwipe()},50);if(t.s.mousewheel){t.mousewheel()}}t.counter();t.closeGallery();v.default.trigger(t.el,"onAfterOpen");v.default.on(t.outer,"mousemove.lg click.lg touchstart.lg",function(){v.default.removeClass(t.outer,"lg-hide-items");clearTimeout(t.hideBartimeout);t.hideBartimeout=setTimeout(function(){v.default.addClass(t.outer,"lg-hide-items")},t.s.hideBarsDelay)})};i.prototype.structure=function(){var e="";var t="";var s=0;var l="";var i;var r=this;document.body.insertAdjacentHTML("beforeend",'<div class="lg-backdrop"></div>');v.default.setVendor(document.querySelector(".lg-backdrop"),"TransitionDuration",this.s.backdropDuration+"ms");for(s=0;s<this.items.length;s++){e+='<div class="lg-item"></div>'}if(this.s.controls&&this.items.length>1){t='<div class="lg-actions">'+'<div class="lg-prev lg-icon">'+this.s.prevHtml+"</div>"+'<div class="lg-next lg-icon">'+this.s.nextHtml+"</div>"+"</div>"}if(this.s.appendSubHtmlTo===".lg-sub-html"){l='<div class="lg-sub-html"></div>'}i='<div class="lg-outer '+this.s.addClass+" "+this.s.startClass+'">'+'<div class="lg" style="width:'+this.s.width+"; height:"+this.s.height+'">'+'<div class="lg-inner">'+e+"</div>"+'<div class="lg-toolbar group">'+'<span class="lg-close lg-icon"></span>'+"</div>"+t+l+"</div>"+"</div>";document.body.insertAdjacentHTML("beforeend",i);this.outer=document.querySelector(".lg-outer");this.___slide=this.outer.querySelectorAll(".lg-item");if(this.s.useLeft){v.default.addClass(this.outer,"lg-use-left");this.s.mode="lg-slide"}else{v.default.addClass(this.outer,"lg-use-css3")}r.setTop();v.default.on(window,"resize.lg orientationchange.lg",function(){setTimeout(function(){r.setTop()},100)});v.default.addClass(this.___slide[this.index],"lg-current");if(this.doCss()){v.default.addClass(this.outer,"lg-css3")}else{v.default.addClass(this.outer,"lg-css");this.s.speed=0}v.default.addClass(this.outer,this.s.mode);if(this.s.enableDrag&&this.items.length>1){v.default.addClass(this.outer,"lg-grab")}if(this.s.showAfterLoad){v.default.addClass(this.outer,"lg-show-after-load")}if(this.doCss()){var o=this.outer.querySelector(".lg-inner");v.default.setVendor(o,"TransitionTimingFunction",this.s.cssEasing);v.default.setVendor(o,"TransitionDuration",this.s.speed+"ms")}v.default.addClass(document.querySelector(".lg-backdrop"),"in");setTimeout(function(){v.default.addClass(r.outer,"lg-visible")},this.s.backdropDuration);if(this.s.download){this.outer.querySelector(".lg-toolbar").insertAdjacentHTML("beforeend",'<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>')}this.prevScrollTop=document.documentElement.scrollTop||document.body.scrollTop};i.prototype.setTop=function(){if(this.s.height!=="100%"){var e=window.innerHeight;var t=(e-parseInt(this.s.height,10))/2;var s=this.outer.querySelector(".lg");if(e>=parseInt(this.s.height,10)){s.style.top=t+"px"}else{s.style.top="0px"}}};i.prototype.doCss=function(){var e=function e(){var t=["transition","MozTransition","WebkitTransition","OTransition","msTransition","KhtmlTransition"];var s=document.documentElement;var l=0;for(l=0;l<t.length;l++){if(t[l]in s.style){return true}}};if(e()){return true}return false};i.prototype.isVideo=function(e,t){var s;if(this.s.dynamic){s=this.s.dynamicEl[t].html}else{s=this.items[t].getAttribute("data-html")}if(!e&&s){return{html5:true}}var l=e.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i);var i=e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);var r=e.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i);var o=e.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);if(l){return{youtube:l}}else if(i){return{vimeo:i}}else if(r){return{dailymotion:r}}else if(o){return{vk:o}}};i.prototype.counter=function(){if(this.s.counter){this.outer.querySelector(this.s.appendCounterTo).insertAdjacentHTML("beforeend",'<div id="lg-counter"><span id="lg-counter-current">'+(parseInt(this.index,10)+1)+'</span> / <span id="lg-counter-all">'+this.items.length+"</span></div>")}};i.prototype.addHtml=function(e){var t=null;var s;if(this.s.dynamic){t=this.s.dynamicEl[e].subHtml}else{s=this.items[e];t=s.getAttribute("data-sub-html");if(this.s.getCaptionFromTitleOrAlt&&!t){t=s.getAttribute("title");if(t&&s.querySelector("img")){t=s.querySelector("img").getAttribute("alt")}}}if(typeof t!=="undefined"&&t!==null){var l=t.substring(0,1);if(l==="."||l==="#"){if(this.s.subHtmlSelectorRelative&&!this.s.dynamic){t=s.querySelector(t).innerHTML}else{t=document.querySelector(t).innerHTML}}}else{t=""}if(this.s.appendSubHtmlTo===".lg-sub-html"){this.outer.querySelector(this.s.appendSubHtmlTo).innerHTML=t}else{this.___slide[e].insertAdjacentHTML("beforeend",t)}if(typeof t!=="undefined"&&t!==null){if(t===""){v.default.addClass(this.outer.querySelector(this.s.appendSubHtmlTo),"lg-empty-html")}else{v.default.removeClass(this.outer.querySelector(this.s.appendSubHtmlTo),"lg-empty-html")}}v.default.trigger(this.el,"onAfterAppendSubHtml",{index:e})};i.prototype.preload=function(e){var t=1;var s=1;for(t=1;t<=this.s.preload;t++){if(t>=this.items.length-e){break}this.loadContent(e+t,false,0)}for(s=1;s<=this.s.preload;s++){if(e-s<0){break}this.loadContent(e-s,false,0)}};i.prototype.loadContent=function(t,e,s){var l=this;var i=false;var r;var d;var o;var a;var n;var u;var f=function e(t){var s=[];var l=[];for(var i=0;i<t.length;i++){var r=t[i].split(" ");if(r[0]===""){r.splice(0,1)}l.push(r[0]);s.push(r[1])}var o=window.innerWidth;for(var a=0;a<s.length;a++){if(parseInt(s[a],10)>o){d=l[a];break}}};if(l.s.dynamic){if(l.s.dynamicEl[t].poster){i=true;o=l.s.dynamicEl[t].poster}u=l.s.dynamicEl[t].html;d=l.s.dynamicEl[t].src;if(l.s.dynamicEl[t].responsive){var c=l.s.dynamicEl[t].responsive.split(",");f(c)}a=l.s.dynamicEl[t].srcset;n=l.s.dynamicEl[t].sizes}else{if(l.items[t].getAttribute("data-poster")){i=true;o=l.items[t].getAttribute("data-poster")}u=l.items[t].getAttribute("data-html");d=l.items[t].getAttribute("href")||l.items[t].getAttribute("data-src");if(l.items[t].getAttribute("data-responsive")){var g=l.items[t].getAttribute("data-responsive").split(",");f(g)}a=l.items[t].getAttribute("data-srcset");n=l.items[t].getAttribute("data-sizes")}var h=false;if(l.s.dynamic){if(l.s.dynamicEl[t].iframe){h=true}}else{if(l.items[t].getAttribute("data-iframe")==="true"){h=true}}var m=l.isVideo(d,t);if(!v.default.hasClass(l.___slide[t],"lg-loaded")){if(h){l.___slide[t].insertAdjacentHTML("afterbegin",'<div class="lg-video-cont" style="max-width:'+l.s.iframeMaxWidth+'"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="'+d+'"  allowfullscreen="true"></iframe></div></div>')}else if(i){var p="";if(m&&m.youtube){p="lg-has-youtube"}else if(m&&m.vimeo){p="lg-has-vimeo"}else{p="lg-has-html5"}l.___slide[t].insertAdjacentHTML("beforeend",'<div class="lg-video-cont '+p+' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="'+o+'" /></div></div>')}else if(m){l.___slide[t].insertAdjacentHTML("beforeend",'<div class="lg-video-cont "><div class="lg-video"></div></div>');v.default.trigger(l.el,"hasVideo",{index:t,src:d,html:u})}else{l.___slide[t].insertAdjacentHTML("beforeend",'<div class="lg-img-wrap"><img class="lg-object lg-image" src="'+d+'" /></div>')}v.default.trigger(l.el,"onAferAppendSlide",{index:t});r=l.___slide[t].querySelector(".lg-object");if(n){r.setAttribute("sizes",n)}if(a){r.setAttribute("srcset",a);try{picturefill({elements:[r[0]]})}catch(e){console.error("Make sure you have included Picturefill version 2")}}if(this.s.appendSubHtmlTo!==".lg-sub-html"){l.addHtml(t)}v.default.addClass(l.___slide[t],"lg-loaded")}v.default.on(l.___slide[t].querySelector(".lg-object"),"load.lg error.lg",function(){var e=0;if(s&&!v.default.hasClass(document.body,"lg-from-hash")){e=s}setTimeout(function(){v.default.addClass(l.___slide[t],"lg-complete");v.default.trigger(l.el,"onSlideItemLoad",{index:t,delay:s||0})},e)});if(m&&m.html5&&!i){v.default.addClass(l.___slide[t],"lg-complete")}if(e===true){if(!v.default.hasClass(l.___slide[t],"lg-complete")){v.default.on(l.___slide[t].querySelector(".lg-object"),"load.lg error.lg",function(){l.preload(t)})}else{l.preload(t)}}};i.prototype.slide=function(e,t,s){var l=0;for(var i=0;i<this.___slide.length;i++){if(v.default.hasClass(this.___slide[i],"lg-current")){l=i;break}}var r=this;if(r.lGalleryOn&&l===e){return}var o=this.___slide.length;var a=r.lGalleryOn?this.s.speed:0;var d=false;var n=false;if(!r.lgBusy){if(this.s.download){var u;if(r.s.dynamic){u=r.s.dynamicEl[e].downloadUrl!==false&&(r.s.dynamicEl[e].downloadUrl||r.s.dynamicEl[e].src)}else{u=r.items[e].getAttribute("data-download-url")!=="false"&&(r.items[e].getAttribute("data-download-url")||r.items[e].getAttribute("href")||r.items[e].getAttribute("data-src"))}if(u){document.getElementById("lg-download").setAttribute("href",u);v.default.removeClass(r.outer,"lg-hide-download")}else{v.default.addClass(r.outer,"lg-hide-download")}}v.default.trigger(r.el,"onBeforeSlide",{prevIndex:l,index:e,fromTouch:t,fromThumb:s});r.lgBusy=true;clearTimeout(r.hideBartimeout);if(this.s.appendSubHtmlTo===".lg-sub-html"){setTimeout(function(){r.addHtml(e)},a)}this.arrowDisable(e);if(!t){v.default.addClass(r.outer,"lg-no-trans");for(var f=0;f<this.___slide.length;f++){v.default.removeClass(this.___slide[f],"lg-prev-slide");v.default.removeClass(this.___slide[f],"lg-next-slide")}if(e<l){n=true;if(e===0&&l===o-1&&!s){n=false;d=true}}else if(e>l){d=true;if(e===o-1&&l===0&&!s){n=true;d=false}}if(n){v.default.addClass(this.___slide[e],"lg-prev-slide");v.default.addClass(this.___slide[l],"lg-next-slide")}else if(d){v.default.addClass(this.___slide[e],"lg-next-slide");v.default.addClass(this.___slide[l],"lg-prev-slide")}setTimeout(function(){v.default.removeClass(r.outer.querySelector(".lg-current"),"lg-current");v.default.addClass(r.___slide[e],"lg-current");v.default.removeClass(r.outer,"lg-no-trans")},50)}else{var c=e-1;var g=e+1;if(e===0&&l===o-1){g=0;c=o-1}else if(e===o-1&&l===0){g=0;c=o-1}v.default.removeClass(r.outer.querySelector(".lg-prev-slide"),"lg-prev-slide");v.default.removeClass(r.outer.querySelector(".lg-current"),"lg-current");v.default.removeClass(r.outer.querySelector(".lg-next-slide"),"lg-next-slide");v.default.addClass(r.___slide[c],"lg-prev-slide");v.default.addClass(r.___slide[g],"lg-next-slide");v.default.addClass(r.___slide[e],"lg-current")}if(r.lGalleryOn){setTimeout(function(){r.loadContent(e,true,0)},this.s.speed+50);setTimeout(function(){r.lgBusy=false;v.default.trigger(r.el,"onAfterSlide",{prevIndex:l,index:e,fromTouch:t,fromThumb:s})},this.s.speed)}else{r.loadContent(e,true,r.s.backdropDuration);r.lgBusy=false;v.default.trigger(r.el,"onAfterSlide",{prevIndex:l,index:e,fromTouch:t,fromThumb:s})}r.lGalleryOn=true;if(this.s.counter){if(document.getElementById("lg-counter-current")){document.getElementById("lg-counter-current").innerHTML=e+1}}}};i.prototype.goToNextSlide=function(e){var t=this;if(!t.lgBusy){if(t.index+1<t.___slide.length){t.index++;v.default.trigger(t.el,"onBeforeNextSlide",{index:t.index});t.slide(t.index,e,false)}else{if(t.s.loop){t.index=0;v.default.trigger(t.el,"onBeforeNextSlide",{index:t.index});t.slide(t.index,e,false)}else if(t.s.slideEndAnimatoin){v.default.addClass(t.outer,"lg-right-end");setTimeout(function(){v.default.removeClass(t.outer,"lg-right-end")},400)}}}};i.prototype.goToPrevSlide=function(e){var t=this;if(!t.lgBusy){if(t.index>0){t.index--;v.default.trigger(t.el,"onBeforePrevSlide",{index:t.index,fromTouch:e});t.slide(t.index,e,false)}else{if(t.s.loop){t.index=t.items.length-1;v.default.trigger(t.el,"onBeforePrevSlide",{index:t.index,fromTouch:e});t.slide(t.index,e,false)}else if(t.s.slideEndAnimatoin){v.default.addClass(t.outer,"lg-left-end");setTimeout(function(){v.default.removeClass(t.outer,"lg-left-end")},400)}}}};i.prototype.keyPress=function(){var t=this;if(this.items.length>1){v.default.on(window,"keyup.lg",function(e){if(t.items.length>1){if(e.keyCode===37){e.preventDefault();t.goToPrevSlide()}if(e.keyCode===39){e.preventDefault();t.goToNextSlide()}}})}v.default.on(window,"keydown.lg",function(e){if(t.s.escKey===true&&e.keyCode===27){e.preventDefault();if(!v.default.hasClass(t.outer,"lg-thumb-open")){t.destroy()}else{v.default.removeClass(t.outer,"lg-thumb-open")}}})};i.prototype.arrow=function(){var e=this;v.default.on(this.outer.querySelector(".lg-prev"),"click.lg",function(){e.goToPrevSlide()});v.default.on(this.outer.querySelector(".lg-next"),"click.lg",function(){e.goToNextSlide()})};i.prototype.arrowDisable=function(e){if(!this.s.loop&&this.s.hideControlOnEnd){var t=this.outer.querySelector(".lg-next");var s=this.outer.querySelector(".lg-prev");if(e+1<this.___slide.length){t.removeAttribute("disabled");v.default.removeClass(t,"disabled")}else{t.setAttribute("disabled","disabled");v.default.addClass(t,"disabled")}if(e>0){s.removeAttribute("disabled");v.default.removeClass(s,"disabled")}else{t.setAttribute("disabled","disabled");v.default.addClass(t,"disabled")}}};i.prototype.setTranslate=function(e,t,s){if(this.s.useLeft){e.style.left=t}else{v.default.setVendor(e,"Transform","translate3d("+t+"px, "+s+"px, 0px)")}};i.prototype.touchMove=function(e,t){var s=t-e;if(Math.abs(s)>15){v.default.addClass(this.outer,"lg-dragging");this.setTranslate(this.___slide[this.index],s,0);this.setTranslate(document.querySelector(".lg-prev-slide"),-this.___slide[this.index].clientWidth+s,0);this.setTranslate(document.querySelector(".lg-next-slide"),this.___slide[this.index].clientWidth+s,0)}};i.prototype.touchEnd=function(t){var s=this;if(s.s.mode!=="lg-slide"){v.default.addClass(s.outer,"lg-slide")}for(var e=0;e<this.___slide.length;e++){if(!v.default.hasClass(this.___slide[e],"lg-current")&&!v.default.hasClass(this.___slide[e],"lg-prev-slide")&&!v.default.hasClass(this.___slide[e],"lg-next-slide")){this.___slide[e].style.opacity="0"}}setTimeout(function(){v.default.removeClass(s.outer,"lg-dragging");if(t<0&&Math.abs(t)>s.s.swipeThreshold){s.goToNextSlide(true)}else if(t>0&&Math.abs(t)>s.s.swipeThreshold){s.goToPrevSlide(true)}else if(Math.abs(t)<5){v.default.trigger(s.el,"onSlideClick")}for(var e=0;e<s.___slide.length;e++){s.___slide[e].removeAttribute("style")}});setTimeout(function(){if(!v.default.hasClass(s.outer,"lg-dragging")&&s.s.mode!=="lg-slide"){v.default.removeClass(s.outer,"lg-slide")}},s.s.speed+100)};i.prototype.enableSwipe=function(){var t=this;var s=0;var l=0;var i=false;if(t.s.enableSwipe&&t.isTouch&&t.doCss()){for(var e=0;e<t.___slide.length;e++){v.default.on(t.___slide[e],"touchstart.lg",function(e){if(!v.default.hasClass(t.outer,"lg-zoomed")&&!t.lgBusy){e.preventDefault();t.manageSwipeClass();s=e.targetTouches[0].pageX}})}for(var r=0;r<t.___slide.length;r++){v.default.on(t.___slide[r],"touchmove.lg",function(e){if(!v.default.hasClass(t.outer,"lg-zoomed")){e.preventDefault();l=e.targetTouches[0].pageX;t.touchMove(s,l);i=true}})}for(var o=0;o<t.___slide.length;o++){v.default.on(t.___slide[o],"touchend.lg",function(){if(!v.default.hasClass(t.outer,"lg-zoomed")){if(i){i=false;t.touchEnd(l-s)}else{v.default.trigger(t.el,"onSlideClick")}}})}}};i.prototype.enableDrag=function(){var t=this;var s=0;var l=0;var i=false;var r=false;if(t.s.enableDrag&&!t.isTouch&&t.doCss()){for(var e=0;e<t.___slide.length;e++){v.default.on(t.___slide[e],"mousedown.lg",function(e){if(!v.default.hasClass(t.outer,"lg-zoomed")){if(v.default.hasClass(e.target,"lg-object")||v.default.hasClass(e.target,"lg-video-play")){e.preventDefault();if(!t.lgBusy){t.manageSwipeClass();s=e.pageX;i=true;t.outer.scrollLeft+=1;t.outer.scrollLeft-=1;v.default.removeClass(t.outer,"lg-grab");v.default.addClass(t.outer,"lg-grabbing");v.default.trigger(t.el,"onDragstart")}}}})}v.default.on(window,"mousemove.lg",function(e){if(i){r=true;l=e.pageX;t.touchMove(s,l);v.default.trigger(t.el,"onDragmove")}});v.default.on(window,"mouseup.lg",function(e){if(r){r=false;t.touchEnd(l-s);v.default.trigger(t.el,"onDragend")}else if(v.default.hasClass(e.target,"lg-object")||v.default.hasClass(e.target,"lg-video-play")){v.default.trigger(t.el,"onSlideClick")}if(i){i=false;v.default.removeClass(t.outer,"lg-grabbing");v.default.addClass(t.outer,"lg-grab")}})}};i.prototype.manageSwipeClass=function(){var e=this.index+1;var t=this.index-1;var s=this.___slide.length;if(this.s.loop){if(this.index===0){t=s-1}else if(this.index===s-1){e=0}}for(var l=0;l<this.___slide.length;l++){v.default.removeClass(this.___slide[l],"lg-next-slide");v.default.removeClass(this.___slide[l],"lg-prev-slide")}if(t>-1){v.default.addClass(this.___slide[t],"lg-prev-slide")}v.default.addClass(this.___slide[e],"lg-next-slide")};i.prototype.mousewheel=function(){var t=this;v.default.on(t.outer,"mousewheel.lg",function(e){if(!e.deltaY){return}if(e.deltaY>0){t.goToPrevSlide()}else{t.goToNextSlide()}e.preventDefault()})};i.prototype.closeGallery=function(){var t=this;var s=false;v.default.on(this.outer.querySelector(".lg-close"),"click.lg",function(){t.destroy()});if(t.s.closable){v.default.on(t.outer,"mousedown.lg",function(e){if(v.default.hasClass(e.target,"lg-outer")||v.default.hasClass(e.target,"lg-item")||v.default.hasClass(e.target,"lg-img-wrap")){s=true}else{s=false}});v.default.on(t.outer,"mouseup.lg",function(e){if(v.default.hasClass(e.target,"lg-outer")||v.default.hasClass(e.target,"lg-item")||v.default.hasClass(e.target,"lg-img-wrap")&&s){if(!v.default.hasClass(t.outer,"lg-dragging")){t.destroy()}}})}};i.prototype.destroy=function(e){var t=this;if(!e){v.default.trigger(t.el,"onBeforeClose")}document.body.scrollTop=t.prevScrollTop;document.documentElement.scrollTop=t.prevScrollTop;if(e){if(!t.s.dynamic){for(var s=0;s<this.items.length;s++){v.default.off(this.items[s],".lg");v.default.off(this.items[s],".lgcustom")}}var l=t.el.getAttribute("lg-uid");delete window.lgData[l];t.el.removeAttribute("lg-uid")}v.default.off(this.el,".lgtm");for(var i in window.lgModules){if(t.modules[i]){t.modules[i].destroy()}}this.lGalleryOn=false;clearTimeout(t.hideBartimeout);this.hideBartimeout=false;v.default.off(window,".lg");v.default.removeClass(document.body,"lg-on");v.default.removeClass(document.body,"lg-from-hash");if(t.outer){v.default.removeClass(t.outer,"lg-visible")}v.default.removeClass(document.querySelector(".lg-backdrop"),"in");setTimeout(function(){try{if(t.outer){t.outer.parentNode.removeChild(t.outer)}if(document.querySelector(".lg-backdrop")){document.querySelector(".lg-backdrop").parentNode.removeChild(document.querySelector(".lg-backdrop"))}if(!e){v.default.trigger(t.el,"onCloseAfter")}}catch(e){}},t.s.backdropDuration+50)};window.lightGallery=function(e,t){if(!e){return}try{if(!e.getAttribute("lg-uid")){var s="lg"+window.lgData.uid++;window.lgData[s]=new i(e,t);e.setAttribute("lg-uid",s)}else{try{window.lgData[e.getAttribute("lg-uid")].init()}catch(e){console.error("lightGallery has not initiated properly")}}}catch(e){console.error("lightGallery has not initiated properly")}}})},{"./lg-utils":1}]},{},[2])(2)});