# Piloto de Stories · Verano 2027

Cuatro secuencias, dos láminas por secuencia, Instagram y Facebook: 19, 20, 22 y 24/10/2026 a las 12:30 Argentina; segunda lámina 12:31. Ninguna está aprobada, subida o programada. No se generaron los otros meses.

Panel: **http://127.0.0.1:4178/social-preview**. Si se cerró, iniciar `npm run social:preview`. Solo accesible desde este equipo. No se incluye en la exportación ni en Hostinger ni en la navegación pública. Para acceso remoto se necesitarían servidor y autenticación; no exponer este puerto a Internet.

## Arquitectura

Calendario/fotos → generador → revisión local → aprobación con huellas → cola privada → operador Codex/navegador → Business Suite → recibos por red/lámina → estado verificado en panel.

- `content/stories-calendar.json`: fuente editorial; DRAFT y assets vacíos representan su inicio reproducible. El estado actual de generación, aprobación y resultados se superpone desde `.social-private/state.json`, excluido de Git.
- `social/catalog.mjs`: doce plantillas declarativas. Hero/Destination/Photo usan fotos verificadas; Feature/Question/Poll/Checklist/Map/Calendar/Humor/Holiday/CTA usan composiciones tipográficas verde/marfil. Map/Calendar admiten textos de ubicación/fechas, sin geografía o disponibilidad inventada. Poll es editorial, no una encuesta nativa. Comparten familias visuales reutilizables.
- `social/renderer.mjs`: PNG 1080×1920, contenido esencial dentro de x90–990/y260–1590, control de longitud, procedencia de fotos, logo y huellas. La revisión visual sigue siendo necesaria.
- `social/engine.mjs`: escritura atómica y exclusión concurrente; aprobación ligada a datos, fecha, redes, renderizador, catálogo, logo, fotos y políticas; cola idempotente y bloqueo ante intentos inciertos.
- `scripts/social/server.mjs`: solo 127.0.0.1, valida Host/origen/CSRF/formato/tamaño. El cliente no recibe credenciales ni dispone de un endpoint para declarar resultados de Meta.
- `scripts/social/worker.mjs`: contrato del operador externo al panel, detallado en [SOCIAL_OPERATOR.md](SOCIAL_OPERATOR.md).
- `.social-private/`: aprobaciones/recibos/IDs reales. `output/social-stories/`: PNG. `output/social-evidence/`: capturas. Fuera de Git y despliegue público. El registro muestra fecha, secuencia, acción, resultado, referencia local y error depurado; Meta ID permanece privado.

## Estados

Generar: DRAFT → GENERATED → READY_FOR_APPROVAL. Aprobar encola automáticamente: APPROVED; no se declara SCHEDULED hasta confirmar ambas redes y todas las láminas. Programar exige aprobación de la versión vigente. Aprobar mes pide confirmación con cantidad y destinos. Abrir/refrescar la página o ampliar una imagen no publica.

PUBLISHED requiere comprobar publicación real. FAILED conserva piezas; UNCERTAIN bloquea reintentos automáticos. Cancelar una cola local la retira; cancelar algo ya aceptado exige retirada real en Meta. Regenerar invalida aprobación y se bloquea si existen intentos externos sin reconciliar. WAITING_WINDOW conserva la aprobación para fechas fuera del horizonte.

## Factibilidad y límites

Se mantiene el mecanismo funcional del navegador, sin API ni credenciales supuestas. Se verificaron ambos destinos, imágenes y programación de Stories en Business Suite; el 18/10 permitía hasta el 16/11. Las cuatro fechas están dentro. No se probó una subida/envío porque se debe esperar aprobación. La primera secuencia aprobada validará el flujo externo de Stories de extremo a extremo; todavía no se afirma ese resultado.

Hostinger Premium conserva la web estática. El usuario solo revisa/aprueba; el operador carga archivos y configura fechas. El coordinador depende del equipo encendido, Codex abierto y sesión disponible. No garantiza continuidad con el equipo apagado. Auditoría completa: [META_PUBLISHING_AUDIT.md](META_PUBLISHING_AUDIT.md).

Seguimiento creado: **Procesar Stories aprobadas La Lucila**, activo cada hora en este chat. La consulta inicial devolvió cero trabajos aprobados. No se reactivó el seguimiento antiguo del feed. El control automático de permisos del navegador bloqueó la última recarga del panel por límite de uso; no se intentó eludirlo. La programación futura también requiere disponibilidad de esas herramientas. El panel ya había mostrado las cuatro secuencias y los meses vacíos antes del bloqueo.

## Comprobaciones

`npm run social:test`: nueve pruebas aisladas sin Meta ni aprobación del piloto real. Cubren aprobación múltiple, falta de autorización, duplicados, archivos alterados, recibos incompletos, incertidumbre, cancelación, protección de IDs, origen/CSRF y doce plantillas. Los datos temporales solo se crean/eliminan bajo output/social-tests.

`npm run social:generate`: regenera la fuente actual, invalida aprobación y no publica. `npm run social:worker -- inspect`: consulta sin IDs privados. No ampliar hasta enero antes de validar el piloto.

Resultado final: nueve pruebas aprobadas, compilación de producción correcta y verificación de las once páginas comerciales correcta. La ruta administrativa no existe en out/. Las cuatro secuencias reales continúan READY_FOR_APPROVAL, sin trabajos de envío.
