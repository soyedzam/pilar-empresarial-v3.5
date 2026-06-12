/* Asistente PILAR — widget de chat (DEC-069) · convierte conversación en lead */
(function(){
"use strict";
var API="/api/chat", history=[], leadShown=false, open=false, userTurns=0;

var DISCLAIMER="Soy el asistente de contexto de PILAR. Te oriento sobre la plataforma — no doy asesoría fiscal, laboral ni legal. Eso lo entrega un despacho aliado verificado, después de tu Check-Up.";
var CHIPS=["¿Qué es el Score?","¿De verdad es gratis?","¿Cómo verifican a los despachos?","¿Aplica para mi empresa?"];

function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function ev(n,p){if(typeof gtag==="function")gtag("event",n,p||{});}

function buildUI(){
  var fab=el("button","pchat-fab");
  fab.setAttribute("aria-label","Abrir Asistente PILAR");
  fab.innerHTML='<svg width="26" height="26" viewBox="0 0 48 48" fill="none"><defs><linearGradient id="pcg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CDEB2E"/><stop offset="1" stop-color="#B3D800"/></linearGradient></defs><path d="M10 8h28a6 6 0 016 6v16a6 6 0 01-6 6H22l-9 8v-8h-3a6 6 0 01-6-6V14a6 6 0 016-6z" fill="url(#pcg)"/><rect x="14" y="18" width="4.5" height="4.5" rx="2.2" fill="#1A2348"/><rect x="22" y="18" width="4.5" height="4.5" rx="2.2" fill="#1A2348"/><rect x="30" y="18" width="4.5" height="4.5" rx="2.2" fill="#1A2348"/></svg><span class="pchat-fab-lbl">Pregúntame</span>';
  var panel=el("div","pchat");
  panel.innerHTML=
   '<div class="pchat-head"><svg width="26" height="26" viewBox="0 0 28 28"><rect width="28" height="28" rx="6" fill="#B3D800"/><rect x="5" y="4" width="3.4" height="20" fill="#1A2348"/><rect x="10.2" y="7" width="3.4" height="17" fill="#1A2348"/><rect x="15.4" y="10" width="3.4" height="14" fill="#1A2348"/><rect x="20.6" y="13" width="3.4" height="11" fill="#1A2348"/></svg>'+
   '<div><b>Asistente PILAR</b><small>Contexto de la plataforma · responde en segundos</small></div>'+
   '<button class="pchat-x" aria-label="Cerrar">×</button></div>'+
   '<div class="pchat-disc">'+DISCLAIMER+'</div>'+
   '<div class="pchat-body" role="log" aria-live="polite"></div>'+
   '<div class="pchat-chips"></div>'+
   '<form class="pchat-bar"><input type="text" maxlength="500" placeholder="Escribe tu pregunta…" aria-label="Tu pregunta"><button type="submit" aria-label="Enviar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 11l18-8-8 18-2-8z" fill="#1A2348"/></svg></button></form>';
  document.body.appendChild(fab);document.body.appendChild(panel);

  var body=panel.querySelector(".pchat-body"),chips=panel.querySelector(".pchat-chips"),
      form=panel.querySelector(".pchat-bar"),input=form.querySelector("input");

  CHIPS.forEach(function(c){var b=el("button","pchat-chip",c);b.type="button";b.onclick=function(){send(c);};chips.appendChild(b);});

  function add(role,text){var m=el("div","pchat-msg "+role);m.textContent=text;body.appendChild(m);body.scrollTop=body.scrollHeight;return m;}

  function leadForm(){
    if(leadShown)return;leadShown=true;
    var f=el("div","pchat-lead");
    f.innerHTML='<b>¿Quieres que una persona del equipo PILAR te contacte?</b><p>Respuesta en menos de 24 horas hábiles. Sin costo, sin compromiso.</p>'+
      '<input name="nombre" placeholder="Nombre" required><input name="whatsapp" placeholder="WhatsApp" required>'+
      '<label class="pchat-priv"><input type="checkbox" required> Acepto el <a href="aviso-privacidad.html" target="_blank">Aviso de Privacidad</a> (LFPDPPP)</label>'+
      '<button type="button">Quiero mi Check-Up gratuito</button>';
    /* CX WEBHOOK: chat-lead — conectar URL antes de go-live */
    f.querySelector("button").onclick=function(){
      var n=f.querySelector('[name=nombre]').value.trim(),w=f.querySelector('[name=whatsapp]').value.trim(),p=f.querySelector('[type=checkbox]').checked;
      if(!n||!w||!p){f.classList.add("err");return;}
      if(typeof sendLead==='function')sendLead('chat-lead',{nombre:n,whatsapp:w});
      ev("lead_submit",{source:"chat"});ev("chat_lead_submit");
      f.innerHTML='<div class="pchat-ok">✓ Listo, '+n.split(" ")[0]+'. Una persona del equipo PILAR — con nombre y apellido — te escribirá en menos de 24 horas hábiles. Te responde una persona, no un sistema automático.</div>';
    };
    body.appendChild(f);body.scrollTop=body.scrollHeight;
  }

  function send(text){
    text=(text||input.value).trim();if(!text)return;
    input.value="";chips.style.display="none";
    add("user",text);history.push({role:"user",content:text});userTurns++;
    ev("chat_message",{turn:userTurns});
    var t=add("bot pchat-typing","");t.innerHTML="<span></span><span></span><span></span>";
    fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:history})})
    .then(function(r){return r.json();})
    .then(function(d){t.remove();var reply=d.reply||"";add("bot",reply);history.push({role:"assistant",content:reply});
      if(userTurns>=2||/check-?up|score|contact|tel[eé]fono|whatsapp|llam/i.test(text))leadForm();})
    .catch(function(){t.remove();add("bot","No puedo responder en este momento — pero tu Check-Up gratuito sigue disponible.");leadForm();});
  }

  form.onsubmit=function(e){e.preventDefault();send();};
  fab.onclick=function(){open=!open;panel.classList.toggle("on",open);fab.classList.toggle("hide",open);
    if(open&&!body.children.length){ev("chat_open");add("bot","Hola 👋 Soy el asistente IA de PILAR. Cuéntame qué te preocupa de tu empresa — fiscal, laboral, legal, contable o patrimonial — y te explico sin tecnicismos qué haría el Check-Up por ti. También puedo contarte por qué todo esto es gratis. ¿Por dónde empezamos?");}
    if(open)input.focus();};
  panel.querySelector(".pchat-x").onclick=function(){open=false;panel.classList.remove("on");fab.classList.remove("hide");};
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",buildUI);else buildUI();
})();
