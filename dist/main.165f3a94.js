parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"nGm1":[function(require,module,exports) {
!function(){window.$clamp=function(e,t){t=t||{};var n,i=window,l={clamp:t.clamp||2,useNativeClamp:void 0===t.useNativeClamp||t.useNativeClamp,splitOnChars:t.splitOnChars||[".","-","–","—"," "],animate:t.animate||!1,truncationChar:t.truncationChar||"…",truncationHTML:t.truncationHTML},a=e.style,r=e.innerHTML,o=void 0!==e.style.webkitLineClamp,u=l.clamp,c=u.indexOf&&(u.indexOf("px")>-1||u.indexOf("em")>-1);function s(e,t){return i.getComputedStyle||(i.getComputedStyle=function(e,t){return this.el=e,this.getPropertyValue=function(t){var n=/(\-([a-z]){1})/g;return"float"==t&&(t="styleFloat"),n.test(t)&&(t=t.replace(n,function(){return arguments[2].toUpperCase()})),e.currentStyle&&e.currentStyle[t]?e.currentStyle[t]:null},this}),i.getComputedStyle(e,null).getPropertyValue(t)}function h(t){var n=t||e.clientHeight,i=p(e);return Math.max(Math.floor(n/i),0)}function p(e){var t=s(e,"line-height");return"normal"==t&&(t=1.2*parseInt(s(e,"font-size"))),parseInt(t)}l.truncationHTML&&((n=document.createElement("span")).innerHTML=l.truncationHTML);var d,C,f,m,v=l.splitOnChars.slice(0),g=v[0];function y(t){return t.lastChild.children&&t.lastChild.children.length>0?y(Array.prototype.slice.call(t.children).pop()):t.lastChild&&t.lastChild.nodeValue&&""!=t.lastChild.nodeValue&&t.lastChild.nodeValue!=l.truncationChar?t.lastChild:(t.lastChild.parentNode.removeChild(t.lastChild),y(e))}function H(e,t){e.nodeValue=t+l.truncationChar}if("auto"==u?u=h():c&&(u=h(parseInt(u))),o&&l.useNativeClamp)a.overflow="hidden",a.textOverflow="ellipsis",a.webkitBoxOrient="vertical",a.display="-webkit-box",a.webkitLineClamp=u,c&&(a.height=l.clamp+"px");else{var L=(m=u,p(e)*m);L<=e.clientHeight&&(f=function t(i,a){if(a){var r=i.nodeValue.replace(l.truncationChar,"");if(d||(g=v.length>0?v.shift():"",d=r.split(g)),d.length>1?(C=d.pop(),H(i,d.join(g))):d=null,n&&(i.nodeValue=i.nodeValue.replace(l.truncationChar,""),e.innerHTML=i.nodeValue+" "+n.innerHTML+l.truncationChar),d){if(e.clientHeight<=a){if(!(v.length>=0&&""!=g))return e.innerHTML;H(i,d.join(g)+g+C),d=null}}else""==g&&(H(i,""),i=y(e),v=l.splitOnChars.slice(0),g=v[0],d=null,C=null);if(!l.animate)return t(i,a);setTimeout(function(){t(i,a)},!0===l.animate?10:l.animate)}}(y(e),L))}return{original:r,clamped:f}}}();
},{}],"u9EY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.variables=void 0;var t='<svg class="board__card-remove-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.298 414.299">\n  <defs/>\n  <path d="M3.663 410.637c2.441 2.44 5.64 3.661 8.839 3.661 3.199 0 6.398-1.221 8.839-3.661l185.809-185.81 185.81 185.811c2.44 2.44 5.641 3.661 8.84 3.661 3.198 0 6.397-1.221 8.839-3.661 4.881-4.881 4.881-12.796 0-17.679l-185.811-185.81 185.811-185.81c4.881-4.882 4.881-12.796 0-17.678-4.882-4.882-12.796-4.882-17.679 0l-185.81 185.81L21.34 3.663c-4.882-4.882-12.796-4.882-17.678 0-4.882 4.881-4.882 12.796 0 17.678l185.81 185.809L3.663 392.959c-4.882 4.882-4.882 12.797 0 17.678z"/>\n</svg>',o='<svg class="board__card-move-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.002 512.002">\n  <defs/>\n  <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061 3.883 3.89 8.97 5.835 14.057 5.835 5.074 0 10.141-1.932 14.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"/>\n</svg>',c='<svg class="board__card-move-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="-45 -17 533 533.3333">\n  <defs/>\n  <path d="M202.1875 22.5156c-42.1133 0-84.2031 11.8985-121.7266 34.414-20.5078 12.3516-39.2304 27.4532-55.6367 44.8946l1.8906-89.0625C26.8672 5.8633 21.3945.1445 14.4883 0h-.2735C7.418.004 1.8711 5.4375 1.7266 12.2344l-2.6094 122.621c-1.8203 4.629-.7227 9.8946 2.789 13.4141 3.5118 3.5157 8.7735 4.6211 13.4024 2.8047l122.6523-2.6094c6.9024-.0742 12.4414-5.7265 12.3672-12.6328-.0742-6.8984-5.7265-12.4414-12.6328-12.3672h-.2695l-100.4063 2.1329a236.1187 236.1187 0 0156.3008-47.2383c33.6367-20.1875 71.2852-30.8516 108.8672-30.8516 60.0977 0 115.5117 24.8008 156.039 69.8242 36.1329 40.1485 57.6993 93.9453 57.6993 143.914 0 49.9727-21.5664 103.7696-57.6992 143.918-40.5274 45.0313-95.9414 69.832-156.0391 69.832-35.2344.2423-69.9414-8.578-100.7812-25.625-28.3047-15.914-52.7188-37.9257-71.4727-64.4335-3.9453-5.664-11.7383-7.0586-17.4023-3.1133-5.6641 3.9453-7.0625 11.7383-3.1172 17.4024.0547.0703.1054.1406.1523.2148 20.9297 29.539 48.1563 54.0664 79.7227 71.789 34.543 19.1173 73.4218 29.0196 112.8984 28.7657 67.2813 0 129.2969-27.7344 174.621-78.1016 40.1524-44.6132 64.125-104.6601 64.125-160.6367 0-55.9805-23.9687-116.0312-64.125-160.6445-45.3241-50.3633-107.3397-78.0977-174.621-78.0977zm0 0"/>\n</svg>',d={editModal:document.body.querySelector("#edit-card-modal"),titleInputEM:document.body.querySelector("#edit-card-modal .modal__title--input"),descriptionInputEM:document.body.querySelector("#edit-card-modal .modal__description--input"),titleEM:document.body.querySelector("#title"),descriptionEM:document.body.querySelector("#description"),saveTitleBtn:document.body.querySelector(".modal__save-title-btn"),discardTitleBtn:document.body.querySelector(".modal__discard-title-btn"),saveDescriptionBtn:document.body.querySelector(".modal__description-save-btn"),discardDescriptionBtn:document.body.querySelector(".modal__description-discard-btn"),removeIcon:t,moveIcon:o,moveToFirstColumnIcon:c,getCard:function(t){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?'<div class="board__card" data-card="card" data-card_id='.concat(t.id,'>\n                    <h3 class="board__card-title">').concat(t.title,'</h3>\n                    <p class="board__card-copy">').concat(t.description,'</p>\n                    <div class="board__card-footer">\n                        <p class="board__card-date">').concat(t.date,'</p>\n                        <button class="board__card-move-btn">').concat(this.moveToFirstColumnIcon,'</button>\n                        <button class="board__card-remove-btn">').concat(this.removeIcon,"</button>\n                    </div>\n                </div>"):'<div class="board__card" data-card="card" data-card_id='.concat(t.id,'>\n                    <h3 class="board__card-title">').concat(t.title,'</h3>\n                    <p class="board__card-copy">').concat(t.description,'</p>\n                    <div class="board__card-footer">\n                        <p class="board__card-date">').concat(t.date,'</p>\n                        <button class="board__card-move-btn">').concat(this.moveIcon,'</button>\n                        <button class="board__card-remove-btn">').concat(this.removeIcon,"</button>\n                    </div>\n                </div>")}};exports.variables=d;
},{}],"eUAf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Methods=void 0;var e=require("./variables.js");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,r){return t&&a(e.prototype,t),r&&a(e,r),e}function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var o=function(){function a(){t(this,a),n(this,"getCards",function(e){return document.body.querySelector("div[data-column=".concat(e,"]")).querySelectorAll(".board__card")}),n(this,"generateID",function(){return"c_".concat(Date.now())}),n(this,"showErrorMessage",function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.forEach(function(e){var t=e.parentElement,a=e.dataset.input_type;t.querySelector('span[data-input_type="'.concat(a,'"]')).classList.add("active")})}),n(this,"hideErrorMessage",function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.forEach(function(e){var t=e.parentElement,a=e.dataset.input_type;t.querySelector('span[data-input_type="'.concat(a,'"]')).classList.remove("active")})})}return r(a,[{key:"toggle",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];t.forEach(function(e){e.classList.toggle("active")})}},{key:"countCards",value:function(){for(var e=document.body.querySelectorAll(".board__cards-container[data-column]"),t=0;t<e.length;t++){var a=void 0,r=this.getCards(e[t].dataset.column),n=document.body.querySelector('div[data-counter="'.concat(e[t].dataset.column,'"]'));a=r?r.length:0,n.innerHTML=a}}},{key:"deleteCard",value:function(e){var t=event.target.closest("div[data-column]").dataset.column;this.removeFromLocalStorage(t,e.dataset.card_id),e.remove(),this.countCards()}},{key:"deleteAllCards",value:function(e){for(var t=this.getCards(e),a=0;a<t.length;a++)this.removeFromLocalStorage(e,t[a].dataset.card_id);document.body.querySelector("div[data-column=".concat(e,"]")).innerHTML="",this.countCards()}},{key:"clampText",value:function(){for(var e=document.body.querySelectorAll(".board__card-copy"),t=0;t<e.length;t++)$clamp(e[t],{clamp:2})}},{key:"clearInput",value:function(e){e&&[e.querySelector('textarea[data-input_type="description"]'),e.querySelector('input[data-input_type="title"]')].forEach(function(e){return e.value=""})}},{key:"getDate",value:function(){return new Date(Date.now()).toLocaleDateString()}},{key:"putInLocalStorage",value:function(e,t){var a=JSON.parse(localStorage.getItem(t));a.push(e),localStorage.setItem(t,JSON.stringify(a))}},{key:"updateLocalStorage",value:function(e,t,a,r){var n=JSON.parse(localStorage.getItem(e)),o=n.find(function(e){return e.id===t});o["".concat(a)]=r,n.splice(n.indexOf(o),1,o),localStorage.setItem(e,JSON.stringify(n))}},{key:"removeFromLocalStorage",value:function(e,t){var a=JSON.parse(localStorage.getItem(e));a.forEach(function(e){e.id===t&&a.splice(a.indexOf(e),1)}),localStorage.setItem(e,JSON.stringify(a))}},{key:"getCardFromLocalStorage",value:function(e,t){return JSON.parse(localStorage.getItem(e)).find(function(e){return e.id===t})}},{key:"checkIfEmpty",value:function(){for(var e=this,t=!1,a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return r.forEach(function(a){if(!a.value)return e.showErrorMessage(a),t=!0}),t}},{key:"toggleEdit",value:function(){for(var t=this,a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];r.forEach(function(a){"title"===a?(t.toggle(e.variables.titleEM,e.variables.titleInputEM,e.variables.saveTitleBtn,e.variables.discardTitleBtn),e.variables.titleInputEM.focus()):"description"===a&&(t.toggle(e.variables.descriptionEM,e.variables.descriptionInputEM,e.variables.saveDescriptionBtn,e.variables.discardDescriptionBtn),e.variables.descriptionInputEM.focus())})}}]),a}();exports.Methods=o;
},{"./variables.js":"u9EY"}],"WgvH":[function(require,module,exports) {
"use strict";var e=require("./variables.js"),t=require("./methods.js"),a=document.body.querySelector('div[data-column="toDo"]'),r=document.body.querySelector("#add-card-modal"),d=r.querySelector(".modal__save-btn"),o=r.querySelector('#add-card-modal input[data-input_type="title"]'),c=r.querySelector('#add-card-modal textarea[data-input_type="description"]'),i=new t.Methods;d.addEventListener("click",function(t){if(!i.checkIfEmpty(o,c)){var d={id:i.generateID(),title:o.value,description:c.value,date:i.getDate()};i.putInLocalStorage(d,"toDo"),a.innerHTML+=e.variables.getCard(d),setTimeout(function(){return i.clearInput(r)},500),i.countCards(),i.clampText(),i.toggle(r)}});
},{"./variables.js":"u9EY","./methods.js":"eUAf"}],"rAhY":[function(require,module,exports) {
"use strict";var t,e,i=require("./methods.js"),a=require("./variables.js"),s=new i.Methods;a.variables.editModal.addEventListener("click",function(i){(i.target.classList.contains("modal__save-title-btn")||i.target.closest(".modal__save-title-btn"))&&(s.checkIfEmpty(a.variables.titleInputEM)||(a.variables.titleEM.innerHTML=a.variables.titleInputEM.value,s.updateLocalStorage(column,cardId,"title",a.variables.titleInputEM.value),cardTitleUI.innerHTML=a.variables.titleInputEM.value,s.toggleEdit("title"))),(i.target.classList.contains("modal__discard-title-btn")||i.target.closest(".modal__discard-title-btn"))&&(a.variables.titleEM.innerHTML=t,s.toggleEdit("title")),(i.target.classList.contains("modal__description-save-btn")||i.target.closest(".modal__description-save-btn"))&&(s.checkIfEmpty(a.variables.descriptionInputEM)||(a.variables.descriptionEM.innerHTML=a.variables.descriptionInputEM.value,s.updateLocalStorage(column,cardId,"description",a.variables.descriptionInputEM.value),cardDescriptionUI.innerHTML=a.variables.descriptionInputEM.value,s.toggleEdit("description"))),(i.target.classList.contains("modal__description-discard-btn")||i.target.closest(".modal__description-discard-btn"))&&(a.variables.descriptionEM.innerHTML=e,s.toggleEdit("description"))}),a.variables.editModal.addEventListener("dblclick",function(i){var l=a.variables.editModal.dataset.edit_card_id,n=document.body.querySelector('div[data-card_id="'.concat(l,'"]')).closest("div[data-column]").dataset.column,r=document.body.querySelector(".board");n!==r.children[r.children.length-1].dataset.column?i.target.classList.contains("modal__title--activate-input")&&!a.variables.descriptionInputEM.classList.contains("active")?(s.toggleEdit("title"),t=a.variables.titleEM.innerHTML,a.variables.titleInputEM.value=t):i.target.classList.contains("modal__description--activate-input")&&!a.variables.titleInputEM.classList.contains("active")&&(s.toggleEdit("description"),e=a.variables.descriptionEM.innerHTML,a.variables.descriptionInputEM.value=e):a.variables.titleEM.classList.remove(".modal__element-hover")});
},{"./methods.js":"eUAf","./variables.js":"u9EY"}],"oHxQ":[function(require,module,exports) {
"use strict";for(var e=require("./methods.js"),t=new e.Methods,r=document.body.querySelectorAll(".board__header-clear-btn svg"),a=document.body.querySelectorAll("div[data-column]"),d=0;d<r.length;d++)r[d].addEventListener("click",function(e){var r=e.target.closest("button[data-column]").dataset.column;t.deleteAllCards(r)});for(var o=0;o<a.length;o++)a[o].addEventListener("click",function(e){if(e.target.closest(".board__card-remove-btn")){var r=e.target.closest(".board__card");t.deleteCard(r)}});
},{"./methods.js":"eUAf"}],"EJlH":[function(require,module,exports) {
"use strict";var e=require("./variables.js"),t=require("./methods.js"),o=new t.Methods;window.addEventListener("load",function(){localStorage.getItem("toDo")?JSON.parse(localStorage.getItem("toDo")).forEach(function(t){document.querySelector('div[data-column="toDo"]').innerHTML+=e.variables.getCard(t)}):localStorage.setItem("toDo",JSON.stringify([]));localStorage.getItem("inProgress")?JSON.parse(localStorage.getItem("inProgress")).forEach(function(t){document.querySelector('div[data-column="inProgress"]').innerHTML+=e.variables.getCard(t)}):localStorage.setItem("inProgress",JSON.stringify([]));localStorage.getItem("done")?JSON.parse(localStorage.getItem("done")).forEach(function(t){document.querySelector('div[data-column="done"]').innerHTML+=e.variables.getCard(t,!0)}):localStorage.setItem("done",JSON.stringify([]));o.countCards(),o.clampText()});
},{"./variables.js":"u9EY","./methods.js":"eUAf"}],"ll53":[function(require,module,exports) {
"use strict";for(var t=require("./methods.js"),e=document.body.querySelectorAll(".modal"),s=new t.Methods,r=0;r<e.length;r++)e[r].addEventListener("keyup",function(t){(t.target.classList.contains("modal__title--input")||t.target.classList.contains("modal__description--input"))&&s.hideErrorMessage(t.target)});
},{"./methods.js":"eUAf"}],"g5UY":[function(require,module,exports) {
"use strict";var t=require("./variables.js"),e=require("./methods.js"),a=new e.Methods,r=document.body.querySelector("#edit-card-modal"),o=document.body.querySelector("#add-card-modal"),d=document.body.querySelectorAll(".modal"),c=document.body.querySelectorAll(".board__cards-container"),i=document.body.querySelector(".board__add-new-btn");i.addEventListener("click",function(){return a.toggle(o)});for(var n=0;n<c.length;n++)c[n].addEventListener("click",function(e){if(!(e.target.classList.contains("board__card-remove-btn")||e.target.closest(".board__card-remove-btn")||e.target.classList.contains("board__card-move-btn")||e.target.closest(".board__card-move-btn"))&&(e.target.classList.contains(".board__card")||e.target.closest(".board__card"))){var o=e.target.closest(".board__card"),d=o.dataset.card_id,c=e.target.closest("div[data-column]").dataset.column,i=a.getCardFromLocalStorage(c,d);t.variables.editModal.dataset.edit_card_id=o.dataset.card_id,t.variables.titleEM.innerHTML=i.title,t.variables.descriptionEM.innerHTML=i.description,a.toggle(r)}});for(var s=function(t){var e=d[t].querySelector('input[data-input_type="title"]'),r=d[t].querySelector('textarea[data-input_type="description"]');d[t].addEventListener("click",function(o){o.target.classList.contains("modal__close-btn")&&(a.toggle(d[t]),setTimeout(function(){"edit-card-modal"===d[t].id&&(d[t].querySelector(".modal__title--input").classList.contains("active")?a.toggleEdit("title"):d[t].querySelector(".modal__description--input").classList.contains("active")&&a.toggleEdit("description")),a.clearInput(d[t]),a.hideErrorMessage(e,r)},500))})},l=0;l<d.length;l++)s(l);
},{"./variables.js":"u9EY","./methods.js":"eUAf"}],"Ip8L":[function(require,module,exports) {
"use strict";var e=require("./variables.js"),a=require("./methods.js"),t=new a.Methods,r=document.body.querySelector(".board"),o=Array.from(document.body.querySelectorAll(".board__cards-container")),d=r.children[r.children.length-1];r.addEventListener("click",function(a){if(a.target.classList.contains(".board__card-move-btn")||a.target.closest(".board__card-move-btn")){for(var r,n=a.target.closest(".board__card"),c=n.dataset.card_id,l=n.parentElement.dataset.column,s=t.getCardFromLocalStorage(l,c),i=0;i<o.length;i++)l===o[i].dataset.column&&(r=o.indexOf(o[i])===o.length-1?o[0]:o[o.indexOf(o[i])+1]);r.dataset.column===d.dataset.column?r.innerHTML+=e.variables.getCard(s,!0):r.innerHTML+=e.variables.getCard(s),t.clampText(),n.remove(),t.putInLocalStorage(s,r.dataset.column),t.removeFromLocalStorage(l,c),t.countCards()}});
},{"./variables.js":"u9EY","./methods.js":"eUAf"}],"tVIU":[function(require,module,exports) {

},{}],"d6sW":[function(require,module,exports) {
"use strict";require("./clamp.js"),require("./addCard.js"),require("./editCard.js"),require("./deleteCards.js"),require("./pageLoad.js"),require("./keyUpHideError.js"),require("./modalDisplay.js"),require("./moveCard.js"),require("./slider.js");
},{"./clamp.js":"nGm1","./addCard.js":"WgvH","./editCard.js":"rAhY","./deleteCards.js":"oHxQ","./pageLoad.js":"EJlH","./keyUpHideError.js":"ll53","./modalDisplay.js":"g5UY","./moveCard.js":"Ip8L","./carousel.js":"tVIU"}]},{},["d6sW"], null)