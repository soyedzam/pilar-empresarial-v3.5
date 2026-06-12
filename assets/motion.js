/* ===== PILAR MOTION SYSTEM v1 (DEC-075) =====
   Capa de mejora progresiva: sin JS la página es 100% legible y funcional.
   Gate de capacidades: reduced-motion, ahorro de datos y gama baja => modo lite. */
(function(){
  "use strict";
  var d=document, h=d.documentElement, W=window;
  var reduced = W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lowEnd = (navigator.deviceMemory && navigator.deviceMemory<=2) ||
               (navigator.hardwareConcurrency && navigator.hardwareConcurrency<=2) ||
               (navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType||"")));
  var fine = W.matchMedia && W.matchMedia("(pointer:fine)").matches;
  var qs = (location.search||"");
  if(/motion=full/.test(qs)){ lowEnd=false; }
  if(/motion=lite/.test(qs)){ lowEnd=true; }
  if(lowEnd && !reduced){ h.classList.add("lite"); }
  h.classList.add("motion");

  /* ---- 1) Scroll reveals escalonados (solo bajo el fold: cero flash, cero CLS) ---- */
  if(!reduced && "IntersectionObserver" in W){
    var fold = W.innerHeight;
    var targets = d.querySelectorAll(".sec .card, .sec .grid > div, .sec h2, .sec .eyebrow, .trust-item, .faq-item");
    var idx = 0;
    targets.forEach(function(el){
      var r = el.getBoundingClientRect();
      if(r.top > fold * 0.92){ el.setAttribute("data-mrv",""); }
    });
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          var el=e.target, sibs=el.parentElement?el.parentElement.querySelectorAll("[data-mrv]"):[el];
          var i=Array.prototype.indexOf.call(sibs, el);
          el.style.transitionDelay = Math.min(i>0?i*70:0, 280)+"ms";
          el.classList.add("mrv-in");
          io.unobserve(el);
          setTimeout(function(){ el.removeAttribute("data-mrv"); el.classList.remove("mrv-in"); el.style.transitionDelay=""; }, 950);
        }
      });
    },{threshold:0, rootMargin:"0px 0px -4% 0px"});
    d.querySelectorAll("[data-mrv]").forEach(function(el){ io.observe(el); });
    var rescue = setInterval(function(){
      var left = d.querySelectorAll("[data-mrv]:not(.mrv-in)");
      if(!left.length){ clearInterval(rescue); return; }
      left.forEach(function(el){
        var r = el.getBoundingClientRect();
        if(r.top < W.innerHeight*1.05){ el.classList.add("mrv-in"); io.unobserve(el); setTimeout(function(){ el.removeAttribute("data-mrv"); el.classList.remove("mrv-in"); }, 950); }
      });
    }, 700);
    W.addEventListener("beforeprint", function(){ d.querySelectorAll("[data-mrv]").forEach(function(el){ el.classList.add("mrv-in"); }); });
  }

  /* ---- 2) Momento héroe: tipografía cinética + demo reel (1 vez por sesión) ---- */
  var hero = d.querySelector(".hero");
  if(hero && !reduced && !h.classList.contains("lite")){
    var h1 = hero.querySelector("h1");
    if(h1 && !h1.querySelector(".kw")){
      var full = h1.textContent;
      h1.setAttribute("aria-label", full.trim());
      h1.innerHTML = full.split(/(\s+)/).map(function(t){
        return /\S/.test(t) ? '<span class="kw" aria-hidden="true">'+t.replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})+'</span>' : t;
      }).join("");
      var kws = h1.querySelectorAll(".kw");
      var first = !sessionStorage.getItem("pilarReel");
      kws.forEach(function(w,i){ w.style.transitionDelay = (first ? 120+i*90 : i*45)+"ms"; });
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ hero.classList.add("kin-go"); }); });
      if(first){ try{ sessionStorage.setItem("pilarReel","1"); }catch(e){} }
    }
    /* Spotlight reactivo al cursor (radial CSS, sin WebGL: presupuesto INP) */
    if(fine){
      var spot = d.createElement("div"); spot.className="spot"; hero.prepend(spot);
      var sx=70, sy=30, tx=70, ty=30, raf=null;
      function tick(){ sx+=(tx-sx)*.12; sy+=(ty-sy)*.12;
        spot.style.setProperty("--sx", sx+"%"); spot.style.setProperty("--sy", sy+"%");
        if(Math.abs(tx-sx)>.2||Math.abs(ty-sy)>.2){ raf=requestAnimationFrame(tick); } else { raf=null; } }
      hero.addEventListener("pointermove", function(e){
        var r=hero.getBoundingClientRect();
        tx=((e.clientX-r.left)/r.width)*100; ty=((e.clientY-r.top)/r.height)*100;
        if(!raf) raf=requestAnimationFrame(tick);
      }, {passive:true});
    }
  }

  /* ---- 3) Botones magnéticos (CTAs lima, solo pointer fino) ---- */
  if(fine && !reduced && !h.classList.contains("lite")){
    d.querySelectorAll(".btn-lima").forEach(function(b){
      b.addEventListener("pointermove", function(e){
        var r=b.getBoundingClientRect();
        var x=(e.clientX-r.left-r.width/2)*.18, y=(e.clientY-r.top-r.height/2)*.3;
        b.style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px)";
      }, {passive:true});
      b.addEventListener("pointerleave", function(){ b.style.transform=""; });
    });

  /* ---- 4) Tilt sutil en cards — delegado: sobrevive re-renders de app.js ---- */
    d.addEventListener("pointermove", function(e){
      var c = e.target && e.target.closest ? e.target.closest(".card") : null;
      if(!c || c.hasAttribute("data-mrv")) return;
      var r=c.getBoundingClientRect();
      var rx=((e.clientY-r.top)/r.height-.5)*-4, ry=((e.clientX-r.left)/r.width-.5)*5;
      c.classList.add("tilting");
      c.style.transform="perspective(900px) rotateX("+rx.toFixed(2)+"deg) rotateY("+ry.toFixed(2)+"deg) translateY(-3px)";
    }, {passive:true});
    d.addEventListener("pointerout", function(e){
      var c = e.target && e.target.closest ? e.target.closest(".card") : null;
      if(c && (!e.relatedTarget || !c.contains(e.relatedTarget))){ c.classList.remove("tilting"); c.style.transform=""; }
    }, {passive:true});
  }

  /* ---- 5) Easter egg de marca: clic 4 veces el ISO => onda de barras ---- */
  var iso = d.querySelector(".site-head svg"); var clicks=0, t0=0;
  if(iso){ iso.parentElement.addEventListener("click", function(){
    var now=Date.now(); if(now-t0>1600){clicks=0;} t0=now; clicks++;
    if(clicks>=4){ clicks=0; iso.classList.add("iso-wave");
      setTimeout(function(){ iso.classList.remove("iso-wave"); }, 1400); }
  }); }
})();
