(()=>{const x=function(e){return new Promise(t=>{var o=document.createElement("script");o.src=e,o.onload=()=>{t()},document.head.appendChild(o)})},P=function(e){return new Promise(t=>{var o=document.createElement("link");o.href=e,o.type="text/css",o.rel="stylesheet",o.onload=()=>{t()},document.head.appendChild(o)})};var N=function(e){for(var t=function(l){for(var n=l.childNodes,r=n.length,u=[],s,g,d,c,m=0;m<r;m++){if(s=n[m],s.nodeType!==1)continue;g=s.children[0],d=g.getAttribute("data-size").split("x"),c={src:g.getAttribute("href"),w:parseInt(d[0],10),h:parseInt(d[1],10)},s.children.length>1&&(c.title=s.children[1].innerHTML),g.children.length>0&&(c.msrc=g.children[0].getAttribute("src")),c.el=s,u.push(c)}return u},o=function l(n,r){return n&&(r(n)?n:l(n.parentNode,r))},i=function(l){l=l||window.event,l.preventDefault?l.preventDefault():l.returnValue=!1;var n=l.target||l.srcElement,r=o(n,function(v){return v.tagName&&v.tagName.toUpperCase()==="FIGURE"});if(!r)return;for(var u=r.parentNode,s=r.parentNode.childNodes,g=s.length,d=0,c,m=0;m<g;m++){if(s[m].nodeType!==1)continue;if(s[m]===r){c=d;break}d++}return c>=0&&p(c,u),!1},a=function(){var l=window.location.hash.substring(1),n={};if(l.length<5)return n;for(var r=l.split("&"),u=0;u<r.length;u++){if(!r[u])continue;var s=r[u].split("=");if(s.length<2)continue;n[s[0]]=s[1]}return n.gid&&(n.gid=parseInt(n.gid,10)),n},p=function(l,n,r,u){var s=document.querySelectorAll(".pswp")[0],g,d,c;if(c=t(n),d={galleryUID:n.getAttribute("data-pswp-uid"),getThumbBoundsFn:function(v){var D=c[v].el.getElementsByTagName("img")[0],I=window.pageYOffset||document.documentElement.scrollTop,S=D.getBoundingClientRect();return{x:S.left,y:S.top+I,w:S.width}}},u)if(d.galleryPIDs){for(var m=0;m<c.length;m++)if(c[m].pid==l){d.index=m;break}}else d.index=parseInt(l,10)-1;else d.index=parseInt(l,10);if(isNaN(d.index))return;r&&(d.showAnimationDuration=0),g=new PhotoSwipe(s,PhotoSwipeUI_Default,c,d),g.init()},h=document.querySelectorAll(e),y=0,w=h.length;y<w;y++)h[y].setAttribute("data-pswp-uid",y+1),h[y].onclick=i;var b=a();b.pid&&b.gid&&p(b.pid,h[b.gid-1],!0,!0)};function T(e){let t=document.createElement("div");t.className="gallery";let o=e[0].parentNode,i=e[0];o.insertBefore(t,i);for(let a=0;a<e.length;++a){const p=e[a].querySelector("img").width,h=e[a].querySelector("img").height;e[a].style.flexGrow=`${p*100/h}`,e[a].style.flexBasis=`${p*240/h}px`,t.appendChild(e[a])}}function A(){const e=[x("https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/photoswipe.min.js"),x("https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/photoswipe-ui-default.min.js"),P("https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/photoswipe.min.css"),P("https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/default-skin/default-skin.min.css")];return Promise.all(e)}function L(e){const t=document.querySelector(e).querySelectorAll("figure");if(t.length){let o=[t[0]];for(let i=1;i<t.length;++i)t[i].previousElementSibling===o[o.length-1]?o.push(t[i]):(T(o),o=[t[i]]);o.length>0&&T(o),A().then(()=>{const i=document.querySelector(".pswp");i.style.removeProperty("display"),N(`${e} .gallery`)})}}let f={};if(localStorage.hasOwnProperty("StackColorsCache"))try{f=JSON.parse(localStorage.getItem("StackColorsCache"))}catch(e){f={}}async function k(e,t,o){if(!e)return await Vibrant.from(o).getPalette();if(!f.hasOwnProperty(e)||f[e].hash!==t){const i=await Vibrant.from(o).getPalette();f[e]={hash:t,Vibrant:{hex:i.Vibrant.hex,rgb:i.Vibrant.rgb,bodyTextColor:i.Vibrant.bodyTextColor},DarkMuted:{hex:i.DarkMuted.hex,rgb:i.DarkMuted.rgb,bodyTextColor:i.DarkMuted.bodyTextColor}},localStorage.setItem("StackColorsCache",JSON.stringify(f))}return f[e]}let M=(e,t=500)=>{e.classList.add("transiting"),e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=e.offsetHeight+"px",e.offsetHeight,e.style.overflow="hidden",e.style.height="0",e.style.paddingTop="0",e.style.paddingBottom="0",e.style.marginTop="0",e.style.marginBottom="0",window.setTimeout(()=>{e.classList.remove("show"),e.style.removeProperty("height"),e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("transiting")},t)},B=(e,t=500)=>{e.classList.add("transiting"),e.style.removeProperty("display"),e.classList.add("show");let o=e.offsetHeight;e.style.overflow="hidden",e.style.height="0",e.style.paddingTop="0",e.style.paddingBottom="0",e.style.marginTop="0",e.style.marginBottom="0",e.offsetHeight,e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=o+"px",e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),window.setTimeout(()=>{e.style.removeProperty("height"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property"),e.classList.remove("transiting")},t)},q=(e,t=500)=>window.getComputedStyle(e).display==="none"?B(e,t):M(e,t);function C(){const e=document.getElementById("toggle-menu");e&&e.addEventListener("click",()=>{if(document.getElementById("main-menu").classList.contains("transiting"))return;document.body.classList.toggle("show-menu"),q(document.getElementById("main-menu"),300),e.classList.toggle("is-active")})}let E={init:()=>{C(),document.querySelector(".article-content")&&L(".article-content"),document.querySelectorAll(".color-tag").forEach(async t=>{const o=t.getAttribute("data-image"),i=t.getAttribute("data-key"),a=t.getAttribute("data-hash"),p=await k(i,a,o);t.style.color=p.Vibrant.bodyTextColor,t.style.background=p.Vibrant.hex});const e=document.querySelector(".article-list--tile");if(e){let t=new IntersectionObserver(async(o,i)=>{o.forEach(a=>{if(!a.isIntersecting)return;i.unobserve(a.target);const p=a.target.querySelectorAll("article.has-image");p.forEach(async h=>{const y=h.querySelector("img"),w=y.src,b=y.getAttribute("data-key"),l=y.getAttribute("data-hash"),n=h.querySelector(".article-details"),r=await k(b,l,w);n.style.background=`
                        linear-gradient(0deg, 
                            rgba(${r.DarkMuted.rgb[0]}, ${r.DarkMuted.rgb[1]}, ${r.DarkMuted.rgb[2]}, 0.5) 0%, 
                            rgba(${r.Vibrant.rgb[0]}, ${r.Vibrant.rgb[1]}, ${r.Vibrant.rgb[2]}, 0.75) 100%)`})})});t.observe(e)}}};window.addEventListener("load",()=>{setTimeout(function(){E.init()},0)});window.Stack=E;})();
/*!
*   Hugo Theme Stack
*
*   @author: Jimmy Cai
*   @website: https://jimmycai.com
*   @link: https://github.com/CaiJimmy/hugo-theme-stack
*/