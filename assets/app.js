/* ===== CONFIG PILAR — pegar la URL del webhook CX aqui y TODOS los formularios (22) + chat quedan conectados ===== */
const CX_WEBHOOK_URL = ""; /* ej: "https://services.leadconnectorhq.com/hooks/XXXX/webhook/YYYY" */
function sendLead(formName, data){
  if(!CX_WEBHOOK_URL) return;
  try{
    const payload = Object.assign({_form:formName,_page:location.pathname,_ts:new Date().toISOString()}, data);
    if(navigator.sendBeacon){
      navigator.sendBeacon(CX_WEBHOOK_URL, new Blob([JSON.stringify(payload)],{type:'application/json'}));
    }else{
      fetch(CX_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),keepalive:true}).catch(function(){});
    }
  }catch(e){}
}

/* ================= DATOS CANÓNICOS ================= */
const AREAS=[
{k:"contable",n:"Contable",t:"La base de toda decisión empresarial correcta",d:"Una contabilidad desactualizada o mal estructurada significa decidir con números que no reflejan la realidad. El diagnóstico contable revisa si tu información financiera es oportuna, confiable y útil para decidir — o solo un trámite para cumplir."},
{k:"fiscal",n:"Fiscal",t:"El área con mayor exposición económica en México",d:"El SAT tiene 5 años para revisar tus ejercicios y actualiza deudas con recargos del 1.47% mensual más actualización. El diagnóstico fiscal identifica contingencias activas, régimen correcto, deducibilidad y obligaciones omitidas — antes de que llegue un requerimiento."},
{k:"laboral",n:"Laboral",t:"Cada relación de trabajo es una exposición potencial",d:"Un contrato desactualizado es una demanda que espera. La reforma de 2019 cambió las reglas y los contratos de hace 5 años pueden no proteger hoy. El diagnóstico laboral revisa contratos, nómina, prestaciones y cumplimiento."},
{k:"juridica",n:"Jurídica",t:"Los contratos que no se revisan no protegen a nadie",d:"Sin cláusula de rescisión clara, sin jurisdicción definida, sin protección de propiedad intelectual — el contrato existe, pero no te cuida. El diagnóstico jurídico identifica los acuerdos que te exponen en lugar de protegerte."},
{k:"patrimonial",n:"Patrimonial",t:"La planeación patrimonial separa el éxito del riesgo total",d:"Cuando el patrimonio personal y el empresarial están mezclados, un problema de la empresa se vuelve un problema de tu familia. El diagnóstico patrimonial revisa la separación de riesgos, la estructura de activos y la planeación sucesoria."}
];
const PAINS=[
{n:"01",t:"Contabilidad desactualizada",d:"Decisiones sobre números que no reflejan la realidad de tu operación."},
{n:"02",t:"Contingencias fiscales activas",d:"El SAT no avisa antes de actuar. La mayoría de las empresas descubre el problema cuando ya es expediente."},
{n:"03",t:"Exposición laboral sin gestionar",d:"Un contrato desactualizado es una demanda que espera el momento."},
{n:"04",t:"Contratos que no protegen",d:"Sin cláusula de rescisión, sin jurisdicción, sin propiedad intelectual: papel firmado, protección cero."},
{n:"05",t:"Sin forma verificada de elegir",d:"Miles de despachos disponibles. Ninguna forma objetiva de saber cuál es el correcto para tu giro."}
];
const ESPECIALIDADES=[
{k:"pyme",n:"PyME",d:"Empresas de 5 a 250 colaboradores: manufactura, comercio, servicios y empresas familiares. La especialidad con mayor volumen del ecosistema.",f:"Estructura, cumplimiento y orden para crecer sin multiplicar el riesgo."},
{k:"real-estate",n:"Real Estate",d:"Desarrolladores, arrendadores e inversores inmobiliarios con tributación compleja.",f:"Estructura fiscal de arrendamiento, acuerdos entre socios y planeación patrimonial de activos."},
{k:"sellers",n:"Sellers",d:"Vendedores de Mercado Libre, Amazon México y e-commerce con operación fiscal digital.",f:"Régimen correcto, retenciones de plataforma y estructura que escala con las ventas."},
{k:"comercio-exterior",n:"Comercio Exterior",d:"PyMEs que importan o exportan: comercio, manufactura y distribución con operación internacional.",f:"Pedimentos, IVA de importación y cumplimiento aduanero sin frenar tu operación."}
];
const PERFILES=[
{n:"Dueño de PyME",h:"Operas con intuición. Tu empresa ya necesita estructura.",p:["Un contador de años al que nadie ha verificado ni actualizado","Contratos firmados que nadie ha vuelto a revisar","Patrimonio personal mezclado con el de la empresa"],dg:"El Check-Up te muestra qué tan lejos está tu estructura de tu tamaño real — y qué atender primero."},
{n:"Director / CFO",h:"Dominas los números. Los huecos están en lo que nadie integra.",p:["Despachos trabajando en silos, sin visión conjunta","Las áreas patrimonial y jurídica sin agenda propia","Huecos entre áreas que ningún despacho aislado detecta porque nadie mira el todo"],dg:"El Check-Up te entrega la visión integral que los silos no pueden dar — con hallazgos accionables para tu consejo."},
{n:"PFAE",h:"Operas como empresa con RFC de persona física. El riesgo es doble.",p:["Régimen fiscal posiblemente incorrecto para tu nivel de ingresos","Contratos que no te protegen como prestador","Tu patrimonio personal respondiendo directamente por tu actividad"],dg:"El Check-Up determina si tu régimen, tus contratos y tu separación patrimonial corresponden a lo que ya facturas."},
{n:"Real Estate",h:"Tu patrimonio está en activos inmobiliarios. La estructura lo es todo.",p:["Estructura fiscal de arrendamiento sin optimizar","Socios sin acuerdos formales que definan reglas","Planeación sucesoria pendiente desde hace años"],dg:"El Check-Up mapea la exposición de tu portafolio: tributación, acuerdos y sucesión, en un solo diagnóstico."}
];
const TESTI=[
{q:"El Check-Up reveló contingencias fiscales de más de dos años. El despacho aliado las resolvió en seis semanas.",n:"Marco R.",r:"Director General · Manufacturera · CDMX · PyME/Fiscal"},
{q:"Cuatro años con el mismo contador sin saber si la estructura era correcta. La diferencia fue inmediata.",n:"Ana L.",r:"Propietaria · Clínica · CDMX · Salud/Contable"},
{q:"Exactamente lo que buscaba: estructurado, objetivo, concreto. Sin ventas genéricas.",n:"Jorge P.",r:"CFO · Grupo empresarial · Edomex · Fiscal Premium"},
{q:"Estaba en el régimen equivocado y mis contratos no me protegían. Resuelto en mes y medio.",n:"Claudia R.",r:"Consultora · PFAE · CDMX · PFAE/Fiscal"},
{q:"Seis propiedades sin estructura correcta. El Check-Up detectó tres riesgos que ignoraba.",n:"Fernando V.",r:"Inversionista · Real Estate · CDMX · Real/Patrimonial"},
{q:"Facturaba +2M mensuales sin el régimen correcto. PILAR me conectó con alguien que ya conocía el problema.",n:"Diego H.",r:"Seller · Mercado Libre · Edomex · Sellers/Fiscal"}
];
const FAQS_DATA=[
{c:"Sobre el Check-Up y el Score",qs:[
["¿Qué es el Score de Salud Empresarial?","Es el resultado cuantificado de tu Check-Up: un valor de 0 a 100 que resume el estado de tu empresa en las 5 áreas críticas. Te permite ver tu situación, compararla en el tiempo y priorizar qué atender primero."],
["¿El Check-Up tiene algún costo?","No. Es 100% gratuito para empresas: el diagnóstico, la entrega de resultados y la conexión con despachos aliados. PILAR nunca te cobra ni intermedia dinero."],
["¿Cuánto tiempo toma?","Responder el Check-Up toma alrededor de 5 minutos. Recibes tu diagnóstico en menos de 24 horas hábiles."],
["¿Necesito documentos o estados financieros?","No para iniciar. El Check-Up trabaja con lo que tú sabes de tu operación. Si avanzas con un despacho aliado, él te indicará qué documentación requiere su trabajo."],
["¿Qué pasa si el diagnóstico no encuentra problemas?","Es el mejor resultado posible: confirmas que tu estructura está sana y en qué nivel. El diagnóstico sirve igual para confirmar que para detectar."]]},
{c:"Sobre los despachos aliados",qs:[
["¿Cómo se verifica a los despachos?","Mediante 5 etapas obligatorias: revisión documental, credenciales profesionales, experiencia comprobable, especialización y estándares de servicio firmados."],
["¿Puedo elegir el despacho yo mismo?","La selección humana especializada de PILAR propone el despacho correcto según tu diagnóstico, giro y zona. Si la conexión no te convence, puedes solicitar otra — la decisión final siempre es tuya."],
["¿Qué pasa si el despacho no cumple?","Los despachos aliados firman estándares de servicio. El incumplimiento reiterado los retira del ecosistema, y tú puedes reportar cualquier situación directamente a PILAR."]]},
{c:"Sobre el modelo y los pagos",qs:[
["¿Cómo gana dinero PILAR si es gratis?","Los despachos aliados sostienen el ecosistema: pagan por acceder a reuniones calificadas con empresas correctamente diagnosticadas. Tú nunca pagas a PILAR."],
["¿PILAR cobra comisión sobre lo que contrate?","No. Cero comisión al cliente. Pagas siempre directo al despacho, sin sobreprecio ni retención de pagos por parte de PILAR."]]},
{c:"Sobre datos y privacidad",qs:[
["¿Qué hacen con mi información?","Se trata conforme a la LFPDPPP, exclusivamente para diagnosticar y conectar. Solo se comparte con el despacho aliado que tú autorices."],
["¿Puedo pedir que borren mis datos?","Sí. Puedes ejercer tus derechos ARCO (Acceso, Rectificación, Cancelación, Oposición) siguiendo la guía publicada en este sitio."]]},
{c:"Sobre cobertura",qs:[
["¿En qué ciudades opera PILAR?","Fase actual: Ciudad de México y Estado de México. Próximas plazas: Mérida, Cancún, Guadalajara y Monterrey."],
["Mi empresa está en otra ciudad, ¿puedo registrarme?","Sí — deja tus datos en el Check-Up. Las nuevas plazas se priorizan por demanda registrada."]]}
];
const RECURSOS=[
{t:"Las 5 señales de que tu contador se quedó atrás",c:"Fiscal",d:"Cómo detectar, sin ser experto, si tu despacho actual sigue al nivel que tu empresa ya exige."},
{t:"Requerimiento del SAT: los primeros 10 días deciden todo",c:"Fiscal",d:"Qué hacer (y qué no firmar) desde el día uno para no convertir un requerimiento en una multa."},
{t:"La reforma laboral y tus contratos: lo que cambió y nadie te dijo",c:"Laboral",d:"Por qué los contratos de hace 5 años pueden no protegerte hoy — y qué cláusulas revisar primero."},
{t:"RESICO, Actividad Empresarial u Honorarios: la decisión que define tu carga fiscal",c:"PFAE",d:"Cómo saber si tu régimen actual corresponde a lo que ya facturas."},
{t:"Patrimonio mezclado: el error más caro del empresario mexicano",c:"Patrimonial",d:"Cómo separar el riesgo de tu empresa del futuro de tu familia."},
{t:"Cómo elegir despacho sin jugarte la empresa en el intento",c:"Método",d:"Los criterios objetivos que un directorio no te muestra — y un ecosistema verificado sí."}
];
/* SEO + ULTRA LANDINGS */
const SEO_PAGES={
"contador-cdmx":{h1:"Estás buscando un contador en CDMX. El problema no es encontrar uno — es encontrar el correcto.",i:"Miles disponibles, ninguna forma verificada de saber cuál domina tu giro. PILAR diagnostica tu empresa gratis y te conecta con el despacho aliado correcto para tu operación específica en la Ciudad de México.",f:"Encontrar mi despacho aliado en CDMX",mt:"Contador en CDMX verificado | Diagnóstico gratuito · PILAR",md:"Encuentra el contador correcto para tu empresa en CDMX. Diagnóstico gratuito en 5 áreas y conexión con despachos aliados verificados. Cero comisión.",faq:[["¿Cómo sé que el despacho es confiable?","Cada despacho aliado pasó 5 etapas de verificación: documental, credenciales, experiencia comprobable, especialización y estándares de servicio firmados."],["¿Cuánto cuesta el servicio de PILAR?","Nada. El diagnóstico y la conexión son gratuitos. Pagas únicamente los honorarios del despacho que decidas contratar, directo y sin comisión."],["¿Qué pasa si ya tengo contador?","El Check-Up funciona como segunda opinión: verifica si tu estructura actual es correcta, sin obligarte a cambiar nada."]]},
"contador-edomex":{h1:"Tu empresa está en el Estado de México. Tu despacho contable debería conocer exactamente eso.",i:"Las obligaciones fiscales y laborales del Edomex tienen especificidades locales que un despacho sin experiencia regional puede no conocer. PILAR te conecta con despachos aliados verificados que ya operan en tu zona.",f:"Encontrar mi despacho aliado en Edomex",mt:"Contador en Estado de México verificado | PILAR Empresarial",md:"Despachos contables verificados con experiencia en el Estado de México. Diagnóstico gratuito en 5 áreas. Cero comisión al cliente.",faq:[["¿Atienden todo el Estado de México?","Sí, con las especialidades PyME y cobertura Fiscal y Laboral activas en la entidad y despachos aliados con operación regional comprobada."],["¿El diagnóstico es presencial?","No es necesario: el Check-Up es digital y la entrega del diagnóstico se coordina por el medio que prefieras."],["¿Tiene costo?","No. Diagnóstico y conexión gratuitos. Cero comisión: pagas directo al despacho que contrates."]]},
"despacho-fiscal-cdmx":{h1:"No todos los despachos fiscales en CDMX son iguales. La diferencia está en el que no encontraste todavía.",i:"El SAT tiene 5 años para auditarte. Un despacho sin actualización constante no puede protegerte de lo que no sabe que existe. PILAR diagnostica tu situación fiscal gratis y te conecta con especialistas verificados.",f:"Diagnóstico fiscal gratuito",mt:"Despacho fiscal en CDMX verificado | Diagnóstico gratuito",md:"Conecta con despachos fiscales verificados en CDMX. Diagnóstico gratuito de contingencias, régimen y deducibilidad. Cero comisión.",faq:[["¿Qué revisa el diagnóstico fiscal?","Contingencias activas, régimen correcto, deducibilidad, obligaciones omitidas y exposición ante revisión del SAT."],["¿Cuándo recibo resultados?","En menos de 24 horas hábiles después de completar el Check-Up."],["¿Me comprometo a algo?","No. El diagnóstico es informativo y la decisión de avanzar es siempre tuya."]]},
"asesor-fiscal-pyme-cdmx":{h1:"Tu PyME no necesita un contador genérico. Necesita un asesor que ya haya visto exactamente tu tipo de problema.",i:"Deducibilidad, nómina, régimen — todo varía por giro. La Especialidad PyME de PILAR agrupa despachos aliados que dominan empresas como la tuya, verificados en 5 etapas.",f:"Asesoría fiscal para mi PyME",mt:"Asesor fiscal para PyME en CDMX | PILAR Empresarial",md:"Asesores fiscales verificados especializados en PyMEs de CDMX. Diagnóstico gratuito por giro. Conexión sin comisión.",faq:[["¿Qué tamaño de empresa atienden?","La Especialidad PyME cubre empresas de 5 a 250 colaboradores: manufactura, comercio, servicios y empresas familiares."],["¿El asesor conocerá mi giro?","Sí: el matching especializado asigna despachos con experiencia comprobada en tu tipo de operación."],["¿Cuánto cuesta?","El diagnóstico y la conexión, nada. Los honorarios del despacho se acuerdan directamente con él, sin comisión de PILAR."]]},
"abogado-laboral-empresa-cdmx":{h1:"La demanda laboral que no llegó todavía no significa que no exista el riesgo.",i:"La reforma de 2019 cambió las reglas. Los contratos de hace 5 años pueden no estar protegiendo hoy. PILAR diagnostica tu exposición laboral gratis y te conecta con abogados laborales verificados para empresas.",f:"Diagnóstico laboral preventivo",mt:"Abogado laboral para empresas en CDMX | Diagnóstico preventivo",md:"Diagnóstico laboral preventivo gratuito para empresas en CDMX. Contratos, nómina y cumplimiento revisados por especialistas verificados.",faq:[["¿Es para defenderme de una demanda actual?","También — pero el mayor valor es preventivo: detectar la exposición antes de que se convierta en expediente."],["¿Qué revisa el diagnóstico laboral?","Contratos individuales, esquema de nómina, prestaciones, reglamentos y cumplimiento con la reforma vigente."],["¿Tiene costo?","No. El diagnóstico y la conexión son gratuitos. Honorarios directos con el despacho, sin comisión."]]},
"sat-requerimiento":{h1:"Recibiste una carta del SAT. Tienes tiempo limitado. Aquí está lo que necesitas hacer primero.",i:"Un requerimiento no es una multa automática — pero ignorarlo sí puede serlo. Días 1–2: documentar todo. Días 2–3: no responder nada sin asesoría. Días 3–5: especialista revisando tu caso. Días 5–10: respuesta estratégica presentada.",f:"Necesito asesoría fiscal urgente",mt:"Requerimiento del SAT: qué hacer primero | PILAR Empresarial",md:"Recibiste un requerimiento del SAT. Guía de los primeros 10 días y conexión urgente con especialistas fiscales verificados. Respuesta en menos de 24h.",how:["Documenta todo: guarda el requerimiento, acuses y fechas exactas (días 1–2)","No respondas ni firmes nada sin asesoría especializada (días 2–3)","Conecta con un especialista fiscal verificado que revise tu caso (días 3–5)","Presenta una respuesta estratégica dentro del plazo legal (días 5–10)"],faq:[["¿Cuánto plazo tengo para responder?","Depende del tipo de requerimiento — típicamente entre 10 y 15 días hábiles. Por eso los primeros días son críticos."],["¿PILAR responde el requerimiento?","No: PILAR diagnostica y conecta. La respuesta la elabora el despacho fiscal verificado que atienda tu caso."],["¿Qué tan rápido me conectan?","Los casos con requerimiento activo se priorizan: respuesta en menos de 24 horas hábiles."]]},
"regimen-fiscal-pfae":{h1:"Tu régimen fiscal actual puede estar costándote más de lo necesario — o exponerte más de lo que sabes.",i:"RESICO vs. Actividad Empresarial vs. Honorarios: la elección incorrecta tiene consecuencias permanentes. El Check-Up determina si tu régimen corresponde a lo que ya facturas — gratis.",f:"Diagnóstico de régimen fiscal",mt:"¿Estás en el régimen fiscal correcto? PFAE | Diagnóstico gratuito",md:"RESICO, Actividad Empresarial u Honorarios: diagnóstico gratuito para saber si tu régimen fiscal como PFAE es el correcto.",faq:[["¿Cómo sé si estoy en el régimen incorrecto?","Señales típicas: tu facturación creció y nadie revisó el régimen, pagas más ISR del esperado, o superaste los límites de RESICO sin ajuste."],["¿Cambiar de régimen es complicado?","Tiene reglas y tiempos específicos. El despacho aliado correcto lo gestiona sin interrumpir tu operación."],["¿El diagnóstico tiene costo?","No. El Check-Up es gratuito y sin compromiso."]]},
"planeacion-patrimonial-cdmx":{h1:"Tu empresa puede tener un problema mañana. Tu patrimonio personal no debería pagarlo.",i:"La confusión entre patrimonio personal y empresarial es el error más costoso y más común del empresario mexicano. El Check-Up diagnostica tu separación de riesgos gratis y te conecta con especialistas patrimoniales verificados.",f:"Proteger mi patrimonio",mt:"Planeación patrimonial para empresarios en CDMX | PILAR",md:"Diagnóstico patrimonial gratuito: separación de riesgos, estructura de activos y planeación sucesoria con especialistas verificados en CDMX.",faq:[["¿Qué incluye la planeación patrimonial?","Separación entre patrimonio personal y empresarial, estructura de tenencia de activos y planeación sucesoria."],["¿Es solo para grandes patrimonios?","No: el riesgo de mezclar patrimonio existe desde la primera empresa. Cuanto antes se estructura, menos cuesta."],["¿El diagnóstico es confidencial?","Sí: tratamiento conforme a la LFPDPPP y compartido únicamente con el despacho que tú autorices."]]},
"riesgos-laborales-empresa":{h1:"Las demandas laborales no avisan. El diagnóstico preventivo sí puede.",i:"La mayoría de las demandas son prevenibles. Existen en silencio durante años antes de convertirse en expediente. El Check-Up identifica tu exposición laboral real — gratis y en 5 minutos.",f:"Diagnóstico laboral preventivo",mt:"Riesgos laborales en tu empresa: diagnóstico preventivo gratuito",md:"Identifica la exposición laboral de tu empresa antes de que se convierta en demanda. Diagnóstico preventivo gratuito con especialistas verificados.",faq:[["¿Qué riesgos laborales son los más comunes?","Contratos desactualizados tras la reforma, esquemas de nómina mal estructurados y prestaciones inconsistentes con la operación real."],["¿Cuánto cuesta prevenir vs. litigar?","Resolver en etapa temprana cuesta entre 3 y 10 veces menos que en conciliación o laudo."],["¿Tiene costo el diagnóstico?","No. Es gratuito y sin compromiso."]]},
"contabilidad-online-cdmx":{h1:"La contabilidad de tu empresa no debería depender de que el contador pueda visitarte.",i:"Contabilidad remota no es solo conveniencia — es acceso a los mejores sin límite geográfico. PILAR te conecta con despachos aliados verificados que operan en digital con estándares firmados.",f:"Encontrar contador verificado",mt:"Contabilidad online para empresas en CDMX | Despachos verificados",md:"Contabilidad remota con despachos verificados en 5 etapas. Diagnóstico gratuito y conexión sin comisión para empresas de CDMX.",faq:[["¿La contabilidad remota es segura?","Con el despacho correcto, sí: los despachos aliados firman estándares de servicio que incluyen manejo seguro de información."],["¿Cómo se entrega la información?","Cada despacho define su flujo digital; el diagnóstico de PILAR identifica el que mejor encaja con tu operación."],["¿Qué cuesta?","El diagnóstico y la conexión, nada. Los honorarios se pactan directo con el despacho, sin comisión."]]},
/* ESPECIALIDADES LANDINGS */
"especialidad-pyme":{ultra:1,h1:"Tu PyME creció. Tu estructura, probablemente no.",i:"Manufactura, comercio, servicios o empresa familiar: de 5 a 250 colaboradores, los riesgos crecen más rápido que el orden. Obtén tu Score de Salud Empresarial (0–100) gratis y conecta con despachos aliados que ya dominan empresas exactamente como la tuya.",f:"Obtener mi Score como PyME — gratis",mt:"Score de Salud Empresarial para PyMEs | CDMX y Edomex · PILAR",md:"Score gratuito (0–100) para PyMEs de 5 a 250 colaboradores. Diagnóstico en 5 áreas y despachos aliados especializados en tu giro. CDMX y Edomex.",bullets:[["El cruce digital ya te alcanzó.","CFDI 4.0, buzón tributario y cruces SAT–IMSS automáticos: la era de pasar desapercibido terminó. La pregunta es si tu información está en orden."],["Especialistas en empresas como la tuya.","No un generalista: despachos aliados verificados que ya resolvieron los problemas típicos de tu tamaño y giro."],["El orden suele pagarse solo.","En muchos casos, los ahorros de una estrategia fiscal correcta cubren los honorarios del despacho. Patrón, no promesa."]],faq:[["¿Qué tamaño de empresa cubre esta especialidad?","De 5 a 250 colaboradores: manufactura, comercio, servicios y empresas familiares."],["¿Qué recibo exactamente?","Tu Score de Salud Empresarial (0–100) en las 5 áreas, el detalle de exposiciones y la conexión con el despacho aliado correcto — todo gratuito."],["¿Y si ya tengo contador?","El Score funciona como segunda opinión: confirma lo que está bien y detecta lo que nadie ha mirado, sin obligarte a cambiar nada."]]},
"especialidad-real-estate":{ultra:1,h1:"En Real Estate, la estructura vale tanto como la ubicación.",i:"Arrendamiento, desarrollo, plusvalía, socios, sucesión: cada decisión inmobiliaria tiene una capa fiscal y patrimonial que puede multiplicar — o devorar — el rendimiento. Obtén tu Score de Salud Empresarial gratuito con especialistas que viven este mercado.",f:"Obtener mi Score Real Estate — gratis",mt:"Score de Salud Empresarial Real Estate | Inmobiliario CDMX · PILAR",md:"Score gratuito para desarrolladores, arrendadores e inversores inmobiliarios: estructura fiscal, acuerdos entre socios y planeación patrimonial.",bullets:[["Tu portafolio, radiografiado.","Tributación de arrendamiento, estructura de tenencia y exposición por activo — cuantificado en un Score de 0 a 100."],["Socios sin acuerdos = riesgo dormido.","Los acuerdos no formalizados funcionan hasta el día que dejan de funcionar. El diagnóstico los pone sobre la mesa antes."],["Sucesión: el tema que nadie agenda.","La planeación patrimonial separa el éxito construido del riesgo total. Empezar hoy cuesta menos que cualquier alternativa."]],faq:[["¿Aplica si solo arriendo propiedades?","Sí: la estructura fiscal del arrendamiento es una de las áreas con más optimización desaprovechada del sector."],["¿Revisan acuerdos entre socios?","El diagnóstico identifica los riesgos; la formalización la ejecuta el despacho aliado especializado que corresponda."],["¿Tiene costo?","No. Score y conexión gratuitos, cero comisión: pagas directo al despacho que decidas contratar."]]},
"especialidad-sellers":{ultra:1,h1:"Vendes en línea a velocidad digital. ¿Tu estructura fiscal va al mismo ritmo?",i:"Mercado Libre, Amazon México, tienda propia: las plataformas reportan, retienen y cruzan información con el SAT automáticamente. Cada mes de crecimiento sin la estructura correcta amplía la exposición. Obtén tu Score gratuito con especialistas en comercio digital.",f:"Obtener mi Score como Seller — gratis",mt:"Score fiscal para Sellers de Mercado Libre y Amazon | PILAR",md:"Score de Salud Empresarial gratuito para sellers y e-commerce: régimen correcto, retenciones de plataforma y estructura que escala con tus ventas.",bullets:[["Las plataformas ya reportan por ti.","Retenciones, CFDI y reportes automáticos al SAT: tu información fiscal viaja sin que la toques. El Score te dice si lo que reportan y lo que declaras cuentan la misma historia."],["El régimen incorrecto cobra caro.","Crecer con el régimen equivocado multiplica el costo de corregir después. Detectarlo hoy es la diferencia entre ajustar y regularizar."],["Especialistas que ya vieron tu caso.","Despachos aliados que dominan e-commerce: retenciones de plataforma, deducibilidad de logística y estructura para escalar."]],faq:[["Facturo poco todavía, ¿aplica?","Sí — la estructura correcta cuesta menos al inicio. El Score te dice si tu régimen actual corresponde a tu nivel de ventas."],["¿Cubren varias plataformas?","Sí: Mercado Libre, Amazon México, tienda propia y modelos mixtos."],["¿Qué cuesta?","Nada: Score y conexión gratuitos. Honorarios directos con el despacho, sin comisión de PILAR."]]},
"especialidad-comercio-exterior":{ultra:1,h1:"Tu PyME importa o exporta. Cada pedimento es una revisión esperando turno.",i:"IVA de importación, pedimentos, certificaciones de origen, cumplimiento aduanero: el comercio exterior suma una capa de obligaciones que la mayoría de los despachos generalistas no domina. Obtén tu Score de Salud Empresarial gratuito con especialistas en PyMEs con operación internacional.",f:"Obtener mi Score de Comercio Exterior — gratis",mt:"Score de Salud Empresarial Comercio Exterior PyME | PILAR",md:"Score gratuito para PyMEs que importan o exportan: pedimentos, IVA de importación y cumplimiento aduanero con despachos aliados especializados.",bullets:[["La aduana también cruza información.","Pedimentos, CFDI y declaraciones se verifican entre sí de forma automática. Un detalle inconsistente puede detener tu mercancía — o abrir una revisión completa."],["El IVA de importación, bien jugado.","Acreditamiento, padrones y certificaciones: las áreas donde una PyME deja dinero en la mesa o acumula riesgo sin saberlo."],["Especialistas, no generalistas.","Despachos aliados que dominan comercio exterior PyME: el tipo de problema que un contador tradicional ve dos veces en su carrera — y ellos cada semana."]],faq:[["¿Aplica si apenas empiezo a importar?","Sí — estructurar bien desde el inicio cuesta una fracción de corregir después. El Score te dice exactamente en qué punto estás."],["¿Cubren padrón de importadores y certificaciones?","El diagnóstico identifica tu situación; el despacho aliado especializado gestiona padrones, certificaciones y cumplimiento aplicable."],["¿Tiene costo?","No. Score y conexión gratuitos, pago directo al despacho, cero comisión."]]},
/* ULTRA LANDINGS */
"segunda-opinion":{ultra:1,h1:"Tu contador puede estar haciéndolo bien. La pregunta es: ¿cómo lo sabes?",i:"No te pedimos cambiar de despacho. Te ofrecemos lo que la medicina normalizó hace décadas: una segunda opinión. El Check-Up gratuito revisa tu estructura en las 5 áreas y te dice — con hechos — si tu equipo actual te está protegiendo o solo facturando.",f:"Solicitar mi segunda opinión gratuita",mt:"Segunda opinión empresarial gratuita | ¿Tu contador lo está haciendo bien?",md:"Verifica gratis si tu contador y tus asesores actuales te protegen de verdad. Segunda opinión en 5 áreas, sin cambiar nada, sin compromiso.",bullets:[["El 70% confía. El 70% no ha verificado.","7 de cada 10 PyMEs operan con una contingencia fiscal activa sin saberlo — la mayoría con contador de confianza desde hace años."],["Verificar no es traicionar.","Una segunda opinión no acusa a nadie: confirma lo que está bien y detecta lo que nadie ha mirado. Tu contador ni siquiera tiene que enterarse."],["Dos resultados posibles. Ambos ganas.","Si todo está bien, lo confirmas con evidencia. Si algo está expuesto, lo sabes antes que el SAT."]],faq:[["¿Tengo que cambiar de contador?","No. La segunda opinión es informativa: la mayoría de las empresas la usa para confirmar o ajustar, no para reemplazar."],["¿Mi contador se enterará?","No. El Check-Up es confidencial y se realiza solo con la información que tú proporcionas."],["¿Qué cuesta?","Nada. Es gratuito, sin compromiso y sin comisión."]]},
"checkup-5-minutos":{ultra:1,h1:"5 minutos. 5 áreas. El estado real de tu empresa.",i:"Sin documentos. Sin tecnicismos. Sin costo. Responde sobre tu operación y recibe en menos de 24 horas el diagnóstico que 7 de cada 10 empresas descubren demasiado tarde.",f:"Iniciar mi Check-Up ahora",mt:"Check-Up Empresarial gratuito en 5 minutos | PILAR",md:"Diagnóstico empresarial gratuito en 5 minutos: Contable, Fiscal, Laboral, Jurídica y Patrimonial. Resultados en menos de 24 horas. CDMX y Edomex.",bullets:[["5 minutos hoy.","Lo que tú ya sabes de tu operación es suficiente. Sin estados financieros, sin juntas, sin compromiso."],["Diagnóstico en menos de 24 horas.","Qué está cubierto, qué está expuesto, qué urge — en lenguaje de empresario, no de auditor."],["Conexión verificada solo si tú quieres.","Si decides actuar, te conectamos con el despacho aliado correcto. Si no, el diagnóstico es tuyo igual."]],faq:[["¿De verdad es gratis?","Sí: el modelo de PILAR se sostiene con los despachos aliados, nunca con las empresas. Cero comisión."],["¿Qué pasa después de enviar el formulario?","Un especialista te contacta en menos de 24 horas hábiles para entregarte tu diagnóstico."],["¿Mis datos están protegidos?","Sí: tratamiento conforme a la LFPDPPP, compartidos solo con el despacho que tú autorices."]]},
"cuanto-te-cuesta-no-saber":{ultra:1,calc:1,h1:"Hay un número que no conoces de tu propia empresa.",i:"Es tu exposición acumulada: lo que crece en silencio cada mes sin revisión. Calcúlalo con tus propios datos en 30 segundos — y decide si quieres seguir sin saberlo.",f:"Cuantificar mi caso real — gratis",mt:"¿Cuánto te cuesta no saber? Calculadora de riesgo empresarial",md:"Calcula en 30 segundos tu exposición fiscal y laboral estimada. Después, cuantifica tu caso real con el Check-Up gratuito de PILAR.",bullets:[["El número lo generas tú.","No es un dato de marketing: sale de tu facturación, tu nómina y tu tiempo sin revisión."],["La estimación es el inicio.","El número exacto — con contingencias específicas y prioridades — lo entrega el Check-Up gratuito."],["Esperar tiene tarifa.","El SAT actualiza deudas con recargos del 1.47% mensual más actualización inflacionaria. El reloj ya corre."]],faq:[["¿Qué tan precisa es la calculadora?","Es una estimación referencial con parámetros generales. El Check-Up cuantifica tu caso específico con tus circunstancias reales."],["¿Guardan los datos de la calculadora?","No: el cálculo ocurre en tu navegador. Solo los datos del formulario, si decides enviarlo, se tratan conforme a la LFPDPPP."],["¿Cuánto cuesta el Check-Up?","Nada. Es gratuito, sin compromiso y sin comisión."]]}
};

/* ================= ROUTER ================= */
const CORE_PAGES=["home","checkup","como-funciona","areas","especialidades","perfiles","despachos","calculadora","casos","recursos","faq","cobertura","nosotros","verificacion","aviso-privacidad","terminos","para-despachos","cookies","politica-datos","derechos-arco","modelo-economico","proceso-verificacion-detallado","sitemap","404"];
const META={
home:["PILAR Empresarial — Tu Score de Salud Empresarial gratuito","Score 0–100 en las 5 áreas críticas de tu empresa y conexión con despachos aliados verificados. CDMX y Edomex."],
checkup:["Check-Up Empresarial gratuito | PILAR","5 minutos, 5 áreas, el estado real de tu empresa. Diagnóstico gratuito con respuesta en menos de 24 horas."],
"como-funciona":["Cómo funciona PILAR | Del Check-Up a la conexión verificada","El proceso completo en 5 pasos: diagnóstico, cuantificación, conexión y decisión — sin letras pequeñas."],
areas:["Las 5 Áreas del diagnóstico | PILAR Empresarial","Contable, Fiscal, Laboral, Jurídica y Patrimonial: los 5 pilares de la salud de tu empresa."],
especialidades:["Especialidades PILAR: el especialista de tu tipo de empresa","PyME, Real Estate, Sellers y Comercio Exterior: despachos aliados que ya dominan tu tipo de operación."],
perfiles:["¿Para quién es PILAR? | Perfiles de empresa","Dueño de PyME, Director/CFO, PFAE y Real Estate: cuatro perfiles, un punto de partida — el diagnóstico."],
despachos:["El ecosistema de despachos aliados verificados | PILAR","Despachos aliados verificados en 5 etapas. La conexión correcta sale de tu diagnóstico, no de un catálogo."],
calculadora:["Calculadora de riesgo empresarial | PILAR","Estima tu exposición fiscal y laboral con tus propios números. El dato exacto lo entrega el Check-Up gratuito."],
casos:["Casos PILAR | Diagnósticos que cambiaron decisiones","Empresas reales de CDMX y Edomex: del 'creo que todo está bien' al estado real sobre la mesa."],
recursos:["Recursos | Tu Salud Empresarial","Guías prácticas sobre las 5 áreas, escritas para quien dirige una empresa."],
faq:["Preguntas frecuentes | PILAR Empresarial","Costo, despachos, modelo, datos y cobertura: respuestas directas a lo que toda empresa pregunta."],
cobertura:["Cobertura PILAR | CDMX y Estado de México","Dónde opera PILAR hoy y el roadmap de expansión: Mérida, Cancún, Guadalajara y Monterrey."],
nosotros:["Nosotros | PILAR Empresarial","PILAR diagnostica, cuantifica y conecta. Conoce el equipo y el propósito detrás del estándar."],
verificacion:["Verificación de despachos en 5 etapas | PILAR","El estándar que separa un ecosistema verificado de un directorio cualquiera."],
"aviso-privacidad":["Aviso de Privacidad | PILAR Empresarial","Tratamiento de datos personales conforme a la LFPDPPP."],
terminos:["Términos de Servicio | PILAR Empresarial","Condiciones de uso de la plataforma PILAR Empresarial."],
"para-despachos":["Para despachos | Únete al ecosistema PILAR","Reuniones calificadas con empresas correctamente diagnosticadas. Postula tu despacho al proceso de verificación."],
cookies:["Política de Cookies | PILAR Empresarial","Tecnologías de seguimiento del sitio y sus finalidades."],
"politica-datos":["Política de Tratamiento de Datos | PILAR","Principios que rigen el ciclo de vida de tus datos en PILAR."],
"derechos-arco":["Derechos ARCO | PILAR Empresarial","Guía para ejercer Acceso, Rectificación, Cancelación y Oposición."],
"modelo-economico":["El modelo cero-comisión | PILAR Empresarial","Quién paga, quién nunca paga y por qué PILAR no intermedia dinero."],
"proceso-verificacion-detallado":["Criterios técnicos de verificación | PILAR","Las 5 etapas de verificación de despachos aliados con criterios públicos."],
sitemap:["Mapa del sitio | PILAR Empresarial","Todas las páginas del ecosistema PILAR."],
"404":["Página no encontrada | PILAR Empresarial","La página no existe — tu Check-Up gratuito sí."]
};
function nav(p){
  if(p==="nodos")p="especialidades";
  if(p==="especialidad-cross-border")p="especialidad-comercio-exterior";
  location.href=(p==="home"?"index":p)+".html";
}
function showPage(domKey,routeKey){
  document.querySelectorAll(".page").forEach(el=>el.classList.remove("act"));
  const el=document.getElementById("pg-"+domKey);
  if(el)el.classList.add("act");
  const isLP=domKey==="landing";
  document.querySelector(".announce").style.display=isLP?"none":"flex";
  document.querySelector(".nav").style.display=isLP?"block":"block";
  if(isLP)document.querySelector(".nav").style.display="none";
  document.getElementById("footMain").style.display=isLP?"none":"block";
  const m=META[routeKey];
  if(m){document.title=m[0];document.querySelector('meta[name="description"]').setAttribute("content",m[1]);}
  else if(SEO_PAGES[routeKey]){document.title=SEO_PAGES[routeKey].mt;document.querySelector('meta[name="description"]').setAttribute("content",SEO_PAGES[routeKey].md);}
  document.querySelector('link[rel="canonical"]').setAttribute("href","https://pilarempresarial.mx/"+(routeKey==="home"?"":"#/"+routeKey));
  if(location.hash!=="#/"+routeKey&&!(routeKey==="home"&&location.hash===""))location.hash=routeKey==="home"?"":"#/"+routeKey;
  window.scrollTo({top:0});
  document.querySelector(".nav-links").classList.remove("open");
}

/* ================= LANDING RENDER ================= */
function lpScroll(){const f=document.querySelector("#lpBody .form-card");if(f)f.scrollIntoView({behavior:"smooth"})}
function renderLP(key){
  const d=SEO_PAGES[key];
  let bullets="";
  const bl=d.bullets||[["Diagnóstico gratuito en 5 áreas","Contable, Fiscal, Laboral, Jurídica y Patrimonial — el mapa completo, no un pedazo."],["Despachos verificados en 5 etapas","Credenciales, experiencia y estándares firmados antes de la primera conexión."],["Cero comisión, decisión tuya","Pagas directo al despacho. PILAR nunca intermedia dinero ni te presiona."]];
  bl.forEach(b=>{bullets+=`<div class="dolor"><span class="dolor-num">●</span><div><b>${b[0]}</b><p style="font-size:.92rem">${b[1]}</p></div></div>`});
  let how="";
  if(d.how){how=`<section class="sec-tight gray-bg"><div class="wrap" style="max-width:760px"><h2 style="font-size:1.5rem">Los primeros 10 días, paso a paso</h2><div class="mt24">`;d.how.forEach((s,i)=>{how+=`<div class="dolor"><span class="dolor-num">0${i+1}</span><div><p style="font-size:.94rem"><b>${s}</b></p></div></div>`});how+=`</div></div></section>`}
  let calc="";
  if(d.calc){calc=`<section class="sec-tight"><div class="wrap grid g2c" style="align-items:start;max-width:980px">
    <div class="calc">
      <div class="calc-row"><label>Facturación mensual <output id="lOut1">$500,000</output></label><input type="range" id="lR1" min="100000" max="10000000" step="100000" value="500000" oninput="calcRunL()"></div>
      <div class="calc-row"><label>Colaboradores <output id="lOut2">10</output></label><input type="range" id="lR2" min="1" max="250" value="10" oninput="calcRunL()"></div>
      <div class="calc-row"><label>Meses sin revisión integral <output id="lOut3">12</output></label><input type="range" id="lR3" min="0" max="60" value="12" oninput="calcRunL()"></div>
    </div>
    <div><div class="calc-out">
      <div class="row">Exposición fiscal estimada <b id="lFis">—</b></div>
      <div class="row">Exposición laboral estimada <b id="lLab">—</b></div>
      <div class="total">Tu número <b id="lTot">—</b></div>
    </div><p class="calc-note">Estimación referencial. El Check-Up gratuito cuantifica tu caso específico.</p></div>
  </div></section>`}
  let faqs="";d.faq.forEach(q=>{faqs+=`<div class="faq-item"><button class="faq-q" onclick="this.parentElement.classList.toggle('open')">${q[0]}</button><div class="faq-a">${q[1]}</div></div>`});
  document.getElementById("lpBody").innerHTML=`
  <section class="page-hero"><div class="wrap" style="max-width:840px">
    <div class="eyebrow" style="color:var(--lima)">PILAR Empresarial · Diagnóstico gratuito · CDMX y Edomex</div>
    <h1>${d.h1}</h1><p>${d.i}</p>
    <button class="btn btn-lima" style="margin-top:26px" onclick="lpScroll()">${d.f}</button>
  </div></section>
  ${calc}
  <section class="sec-tight"><div class="wrap" style="max-width:760px">${bullets}</div></section>
  ${how}
  <section class="sec gray-bg"><div class="wrap" style="max-width:560px">
    <div class="form-card lp-form">
      <h3 style="margin-bottom:6px">${d.f}</h3>
      <p style="font-size:.88rem;color:var(--g4);margin-bottom:20px">Gratuito · Sin compromiso · Respuesta en menos de 24 horas</p>
      <!-- CX WEBHOOK: lp-${key} — reemplazar URL antes de go-live -->
      <form data-cx-form="lp-${key}" class="form-grid" onsubmit="return formOK(event,this,'lead_submit')">
        <div class="fld fld-full"><label>Nombre</label><input name="nombre" required></div>
        <div class="fld"><label>Correo</label><input type="email" name="correo" required></div>
        <div class="fld"><label>WhatsApp</label><input type="tel" name="whatsapp" required></div>
        <label class="chk"><input type="checkbox" required> Acepto el <a onclick="nav('aviso-privacidad')" style="color:var(--lima-dark);text-decoration:underline">Aviso de Privacidad</a> (LFPDPPP).</label>
        <button class="btn btn-lima fld-full" type="submit" style="justify-content:center">${d.f}</button>
      </form>
      <div class="form-ok"><div class="ok-ico">✓</div><h3>Solicitud recibida</h3><p style="color:var(--g4);font-size:.92rem">Ya está en manos del equipo — una persona de PILAR, no un bot, te escribe en menos de 24 horas hábiles. ¿Urge? El botón de WhatsApp responde más rápido.</p></div>
    </div>
  </div></section>
  <section class="sec-tight"><div class="wrap" style="max-width:760px"><h2 style="font-size:1.5rem">Preguntas frecuentes</h2><div class="mt24">${faqs}</div></div></section>
  <section class="sec-tight dark"><div class="wrap center" style="max-width:680px">
    <div class="stars">★★★★★</div>
    <p style="font-size:1.05rem;color:#E4E8F0">"El Check-Up reveló contingencias fiscales de más de dos años. El despacho aliado las resolvió en seis semanas."</p>
    <p class="mt8" style="color:#9AA3B8;font-size:.84rem"><b style="color:#fff">Marco R.</b> · Director General · Manufacturera · CDMX</p>
    <button class="btn btn-lima mt24" onclick="lpScroll()">${d.f}</button>
  </div></section>`;
  injectLPSchema(key,d);
  if(d.calc)calcRunL();
}
function injectLPSchema(key,d){
  document.querySelectorAll("script[data-lp-schema]").forEach(s=>s.remove());
  const faq={"@context":"https://schema.org","@type":"FAQPage","mainEntity":d.faq.map(q=>({"@type":"Question","name":q[0],"acceptedAnswer":{"@type":"Answer","text":q[1]}}))};
  const lb={"@context":"https://schema.org","@type":"LocalBusiness","name":"PILAR Empresarial","url":"https://pilarempresarial.mx/#/"+key,"priceRange":"Gratis","areaServed":["Ciudad de México","Estado de México"]};
  [faq,lb].forEach(o=>{const s=document.createElement("script");s.type="application/ld+json";s.setAttribute("data-lp-schema","1");s.textContent=JSON.stringify(o);document.head.appendChild(s)});
  if(d.how){const h={"@context":"https://schema.org","@type":"HowTo","name":d.h1,"step":d.how.map((st,i)=>({"@type":"HowToStep","position":i+1,"name":st}))};const s=document.createElement("script");s.type="application/ld+json";s.setAttribute("data-lp-schema","1");s.textContent=JSON.stringify(h);document.head.appendChild(s)}
}

/* ================= INTERACCIONES ================= */
function formOK(e,form,gaEvent){
  try{
    var data={}; Array.prototype.forEach.call(form.querySelectorAll('input,select,textarea'),function(el){if(el.name)data[el.name]=el.value;});
    sendLead(form.getAttribute('data-cx-form')||'form', data);
  }catch(err){}

  e.preventDefault();
  form.style.display="none";
  const ok=form.parentElement.querySelector(".form-ok");
  if(ok)ok.classList.add("show");
  try{gtag('event',gaEvent,{form_id:form.getAttribute('data-cx-form')})}catch(x){}
  return false;
}
const fmt=n=>"$"+Math.round(n).toLocaleString("es-MX");
function calcCore(f,emp,m){
  const fis=f*0.085*(1+0.0147*m);          /* base de exposición fiscal + recargos 1.47% mensual */
  const lab=emp*38500*(0.35+Math.min(m,36)*0.012); /* contingencia laboral promedio por colaborador */
  return [fis,lab,fis+lab];
}
function calcSet(pre,r1,r2,r3){
  const f=+document.getElementById(r1).value,e=+document.getElementById(r2).value,m=+document.getElementById(r3).value;
  document.getElementById(pre+"Out1").textContent=fmt(f);
  document.getElementById(pre+"Out2").textContent=e;
  document.getElementById(pre+"Out3").textContent=m;
  const[fis,lab,tot]=calcCore(f,e,m);
  document.getElementById(pre+"Fis").textContent=fmt(fis);
  document.getElementById(pre+"Lab").textContent=fmt(lab);
  document.getElementById(pre+"Tot").textContent=fmt(tot);
}
function calcRun(){calcSet("c","cR1","cR2","cR3")}
function calcRunP(){calcSet("p","pR1","pR2","pR3")}
function calcRunL(){calcSet("l","lR1","lR2","lR3")}
function actPick(el){
  document.querySelectorAll("#actRow .radio-opt").forEach(b=>b.classList.remove("on"));
  el.classList.add("on");
  document.getElementById("actCta").textContent=el.getAttribute("data-cta");
}
/* ================= BUILDERS ================= */
function faqItem(q,a){return `<div class="faq-item"><button class="faq-q" onclick="this.parentElement.classList.toggle('open')">${q}</button><div class="faq-a">${a}</div></div>`}
function buildTabs(tabsId,panelsId,items,renderPanel){
  const tabs=document.getElementById(tabsId),panels=document.getElementById(panelsId);
  if(!tabs||!panels)return;
  tabs.innerHTML=items.map((it,i)=>`<button class="tab${i===0?" on":""}" data-i="${i}">${it.n}</button>`).join("");
  panels.innerHTML=items.map((it,i)=>`<div class="tab-panel${i===0?" on":""}">${renderPanel(it)}</div>`).join("");
  tabs.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>{
    tabs.querySelectorAll(".tab").forEach(x=>x.classList.remove("on"));
    panels.querySelectorAll(".tab-panel").forEach(x=>x.classList.remove("on"));
    t.classList.add("on");panels.children[+t.dataset.i].classList.add("on");
  }));
}
function perfilPanel(p){
  return `<div class="card"><h3>${p.h}</h3><div class="mt16">${p.p.map(x=>`<p style="font-size:.94rem;padding:7px 0;border-bottom:1px solid var(--g2)">— ${x}</p>`).join("")}</div><p class="mt16" style="font-size:.95rem"><b>Qué te entrega el Check-Up:</b> ${p.dg}</p><button class="btn btn-lima mt16" onclick="nav('checkup')">Diagnosticar mi caso — gratis</button></div>`;
}
function areaPanel(a){
  return `<div class="card"><div class="eyebrow">${a.t}</div><h3>Área ${a.n}</h3><p class="mt16" style="font-size:.96rem">${a.d}</p><button class="btn btn-navy mt16" onclick="nav('checkup')">Diagnosticar mi área ${a.n.toLowerCase()}</button></div>`;
}
let caruIdx=0,caruTimer=null;
function caruGo(i){
  const track=document.getElementById("caruTrack");if(!track)return;
  caruIdx=(i+TESTI.length)%TESTI.length;
  track.style.transform=`translateX(-${caruIdx*100}%)`;
  document.querySelectorAll("#caruDots .dot").forEach((d,j)=>d.classList.toggle("on",j===caruIdx));
}
const ICONS3D=["<svg class=\"ico3d\" width=\"46\" height=\"46\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><defs><linearGradient id=\"jCOa\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#2A3565\"/><stop offset=\"1\" stop-color=\"#1A2348\"/></linearGradient><linearGradient id=\"jCOb\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#CDEB2E\"/><stop offset=\"1\" stop-color=\"#B3D800\"/></linearGradient></defs><rect x=\"7\" y=\"9\" width=\"34\" height=\"34\" rx=\"9\" fill=\"url(#jCOa)\"/><rect x=\"5\" y=\"6\" width=\"34\" height=\"34\" rx=\"9\" fill=\"url(#jCOb)\"/><rect x=\"12\" y=\"24\" width=\"5\" height=\"10\" rx=\"2\" fill=\"#1A2348\"/><rect x=\"20\" y=\"18\" width=\"5\" height=\"16\" rx=\"2\" fill=\"#1A2348\"/><rect x=\"28\" y=\"12\" width=\"5\" height=\"22\" rx=\"2\" fill=\"#1A2348\"/></svg>", "<svg class=\"ico3d\" width=\"46\" height=\"46\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><defs><linearGradient id=\"jFIa\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#2A3565\"/><stop offset=\"1\" stop-color=\"#1A2348\"/></linearGradient><linearGradient id=\"jFIb\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#CDEB2E\"/><stop offset=\"1\" stop-color=\"#B3D800\"/></linearGradient></defs><path d=\"M26 7l15 5v11c0 9-6 16-15 19-9-3-15-10-15-19V12z\" fill=\"url(#jFIa)\"/><path d=\"M24 4l15 5v11c0 9-6 16-15 19-9-3-15-10-15-19V9z\" fill=\"url(#jFIb)\"/><path d=\"M17 23.5l5 5 9.5-10\" stroke=\"#1A2348\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/></svg>", "<svg class=\"ico3d\" width=\"46\" height=\"46\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><defs><linearGradient id=\"jLAa\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#2A3565\"/><stop offset=\"1\" stop-color=\"#1A2348\"/></linearGradient><linearGradient id=\"jLAb\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#CDEB2E\"/><stop offset=\"1\" stop-color=\"#B3D800\"/></linearGradient></defs><circle cx=\"20\" cy=\"19\" r=\"8\" fill=\"url(#jLAa)\"/><circle cx=\"18\" cy=\"16\" r=\"8\" fill=\"url(#jLAb)\"/><path d=\"M8 40c0-7 5-11 10-11s10 4 10 11z\" fill=\"url(#jLAb)\"/><circle cx=\"34\" cy=\"18\" r=\"6\" fill=\"url(#jLAa)\"/><path d=\"M27 38c1-6 4-9 7-9 4 0 8 3 8 9z\" fill=\"url(#jLAa)\"/></svg>", "<svg class=\"ico3d\" width=\"46\" height=\"46\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><defs><linearGradient id=\"jJUa\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#2A3565\"/><stop offset=\"1\" stop-color=\"#1A2348\"/></linearGradient><linearGradient id=\"jJUb\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#CDEB2E\"/><stop offset=\"1\" stop-color=\"#B3D800\"/></linearGradient></defs><rect x=\"23\" y=\"9\" width=\"4\" height=\"28\" rx=\"2\" fill=\"url(#jJUa)\"/><rect x=\"21\" y=\"6\" width=\"4\" height=\"28\" rx=\"2\" fill=\"url(#jJUb)\"/><rect x=\"9\" y=\"9\" width=\"28\" height=\"4\" rx=\"2\" fill=\"url(#jJUb)\"/><path d=\"M8 14l-5 10h10z\" fill=\"url(#jJUa)\"/><path d=\"M7 12l-5 10h10z\" fill=\"url(#jJUb)\"/><path d=\"M40 14l-5 10h10z\" fill=\"url(#jJUa)\"/><path d=\"M39 12l-5 10h10z\" fill=\"url(#jJUb)\"/><rect x=\"14\" y=\"36\" width=\"18\" height=\"5\" rx=\"2.5\" fill=\"url(#jJUb)\"/></svg>", "<svg class=\"ico3d\" width=\"46\" height=\"46\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><defs><linearGradient id=\"jPAa\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#2A3565\"/><stop offset=\"1\" stop-color=\"#1A2348\"/></linearGradient><linearGradient id=\"jPAb\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#CDEB2E\"/><stop offset=\"1\" stop-color=\"#B3D800\"/></linearGradient></defs><rect x=\"9\" y=\"9\" width=\"34\" height=\"32\" rx=\"8\" fill=\"url(#jPAa)\"/><rect x=\"6\" y=\"6\" width=\"34\" height=\"32\" rx=\"8\" fill=\"url(#jPAb)\"/><circle cx=\"23\" cy=\"22\" r=\"9\" fill=\"#1A2348\"/><circle cx=\"23\" cy=\"22\" r=\"4\" fill=\"#B3D800\"/><rect x=\"21.5\" y=\"12\" width=\"3\" height=\"6\" rx=\"1.5\" fill=\"#1A2348\"/><rect x=\"21.5\" y=\"26\" width=\"3\" height=\"6\" rx=\"1.5\" fill=\"#1A2348\"/><rect x=\"13\" y=\"20.5\" width=\"6\" height=\"3\" rx=\"1.5\" fill=\"#1A2348\"/><rect x=\"27\" y=\"20.5\" width=\"6\" height=\"3\" rx=\"1.5\" fill=\"#1A2348\"/></svg>"];
function init(){
  /* pains */
  const pl=document.getElementById("painsList");
  if(pl)pl.innerHTML=PAINS.map(p=>`<div class="dolor"><span class="dolor-num">${p.n}</span><div><b>${p.t}</b><p style="font-size:.94rem">${p.d}</p></div></div>`).join("");
  /* areas mini */
  const am=document.getElementById("areasMini");
  if(am)am.innerHTML=AREAS.map((a,i)=>`<div class="card"><div class="card-ico">${ICONS3D[i]}<span class="hc-num" style="color:var(--lima-dark);font-size:1rem">0${i+1}</span></div><h3 class="mt8">${a.n}</h3><p class="mt8" style="font-size:.9rem">${a.t}.</p></div>`).join("");
  /* perfil tabs (home + page) */
  buildTabs("perfilTabs","perfilPanels",PERFILES,perfilPanel);
  buildTabs("perfilTabs2","perfilPanels2",PERFILES,perfilPanel);
  /* area tabs (page) */
  buildTabs("areaTabs","areaPanels",AREAS,areaPanel);
  /* especialidades */
  const espCard=n=>`<div class="card"><h3>Especialidad ${n.n}</h3><p class="mt8" style="font-size:.9rem">${n.d}</p><p class="mt8" style="font-size:.88rem;color:var(--g4)"><b style="color:var(--navy)">Enfoque:</b> ${n.f}</p><button class="btn btn-navy mt16" style="padding:11px 20px;font-size:.88rem" onclick="nav('especialidad-${n.k}')">Mi Score como ${n.n} →</button></div>`;
  const nm=document.getElementById("espMini");if(nm)nm.innerHTML=ESPECIALIDADES.map(espCard).join("");
  const nf=document.getElementById("espFull");if(nf)nf.innerHTML=ESPECIALIDADES.map(espCard).join("");
  /* carrusel */
  const track=document.getElementById("caruTrack"),dots=document.getElementById("caruDots");
  if(track){
    track.innerHTML=TESTI.map(t=>`<div class="testi"><div class="testi-card"><div class="stars">★★★★★</div><p class="testi-q">"${t.q}"</p><p class="testi-by"><b>${t.n}</b> · ${t.r}</p></div></div>`).join("");
    dots.innerHTML=TESTI.map((_,i)=>`<button class="dot${i===0?" on":""}" aria-label="Testimonio ${i+1}" onclick="caruGo(${i});clearInterval(caruTimer)"></button>`).join("");
    caruTimer=setInterval(()=>caruGo(caruIdx+1),5000);
  }
  /* faq home (primeras 6) */
  const fh=document.getElementById("faqHome");
  if(fh){const flat=[];FAQS_DATA.forEach(c=>c.qs.forEach(q=>flat.push(q)));fh.innerHTML=flat.slice(0,6).map(q=>faqItem(q[0],q[1])).join("")}
  /* faq full */
  const ff=document.getElementById("faqFull");
  if(ff)ff.innerHTML=FAQS_DATA.map(c=>`<h3 class="mt24" style="margin-bottom:14px">${c.c}</h3>`+c.qs.map(q=>faqItem(q[0],q[1])).join("")).join("");
  /* recursos */
  const recCard=r=>`<div class="card"><span class="pill" style="font-size:.74rem;padding:5px 12px">${r.c}</span><h3 class="mt16" style="font-size:1.05rem">${r.t}</h3><p class="mt8" style="font-size:.88rem">${r.d}</p><a class="mt16" style="display:inline-block;color:var(--lima-dark);font-weight:700;font-size:.88rem;cursor:pointer" onclick="nav('checkup')">Aplicarlo a mi empresa →</a></div>`;
  const rg=document.getElementById("recursosGrid");if(rg)rg.innerHTML=RECURSOS.slice(0,3).map(recCard).join("");
  const rf=document.getElementById("recursosFull");if(rf)rf.innerHTML=RECURSOS.map(recCard).join("");
  /* casos */
  const cg=document.getElementById("casosGrid");
  if(cg)cg.innerHTML=TESTI.map(t=>`<div class="card"><div class="stars">★★★★★</div><p class="testi-q" style="font-size:1rem">"${t.q}"</p><p class="testi-by"><b>${t.n}</b> · ${t.r}</p></div>`).join("");
  /* sitemap */
  const sg=document.getElementById("sitemapGrid");
  if(sg){
    const groups=[
      ["Plataforma",["home","checkup","como-funciona","areas","especialidades","perfiles","despachos","calculadora","cobertura"]],
      ["Conocer PILAR",["nosotros","casos","recursos","faq","verificacion","modelo-economico","proceso-verificacion-detallado","para-despachos"]],
      ["Legal",["aviso-privacidad","terminos","cookies","politica-datos","derechos-arco","sitemap"]],
      ["Landings",Object.keys(SEO_PAGES)]
    ];
    sg.innerHTML=groups.map(g=>`<div><h3 style="font-size:1rem;margin-bottom:12px">${g[0]}</h3>${g[1].map(k=>`<a style="display:block;padding:4px 0;font-size:.9rem;color:var(--g4);cursor:pointer" onclick="nav('${k}')">${(META[k]?META[k][0]:SEO_PAGES[k].mt).split("|")[0].trim()}</a>`).join("")}</div>`).join("");
  }
  /* calculadoras */
  if(document.getElementById("cR1"))calcRun();if(document.getElementById("pR1"))calcRunP();if(document.getElementById("lR1"))calcRunL();
  /* totop */
  const _tt=document.getElementById("toTop");if(_tt)window.addEventListener("scroll",()=>{_tt.classList.toggle("show",window.scrollY>700)});
  /* deep link inicial */

}
document.addEventListener("DOMContentLoaded",init);
