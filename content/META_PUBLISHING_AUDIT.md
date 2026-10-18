# Auditoría del sistema de publicaciones Meta

Fecha: 18/10/2026 · Zona de trabajo: America/Buenos_Aires.

## Resultado principal

No hay una integración Graph API implementada en este repositorio. El mecanismo que funcionó fue **automatización del navegador por Codex**, con la sesión autorizada de Instagram y Meta Business Suite. No se sustituye. El panel editorial añadirá generación, aprobación y una cola local para ese mismo operador; una cola local no equivale a una programación aceptada por Meta.

## Evidencia y configuración existente

- Sitio: Next.js con `output: export`; Hostinger Premium sirve HTML, CSS y JavaScript y no tiene Node.js servidor. El despliegue existente solo sube `out/` mediante GitHub Actions/FTP. Esas credenciales son de hosting, no de publicación social.
- No se encontraron archivos `.env` del proyecto, variables de entorno con nombres Meta/Facebook/Instagram/Metricool, SDK de Meta, aplicación OAuth, endpoints Graph, scripts de publicación ni tokens de publicación configurados. La búsqueda inspeccionó nombres/presencia, sin registrar valores de secretos. No se buscan credenciales en copias WordPress ni en perfiles del navegador.
- No se extraen ni copian cookies, contraseñas, sesiones o tokens. La sesión permanece en el navegador del usuario.
- Página conectada observada: **Hosteria La Lucila**. Instagram profesional observado: **@hosterialalucila**. El editor de Stories de Business Suite muestra ambos como destinos.
- Metricool está disponible como conector del asistente, pero la marca conectada es otra. No se utiliza para esta hostería y no se modifica esa conexión.
- El Centro de cuentas personal y Business Suite tienen funciones distintas. Administrar la página en Facebook no prueba que Instagram figure entre los perfiles personales del Centro de cuentas.

## Flujo que ya funcionó

1. Crear composiciones HTML/CSS con identidad verde/marfil y fotografías reales de la web.
2. Renderizar piezas individuales, comprobar encuadre y textos.
3. Subir mediante el selector de archivos de Instagram, elegir 4:5 y conservar la imagen sin filtros.
4. Cargar descripción y texto alternativo; activar Programar; elegir día y hora en los controles visibles.
5. Comprobar «Se programó tu publicación» y después la entrada en el calendario de la cuenta correcta.
6. Registrar resultado local y evidencia. Las nuevas Stories tendrán aprobación explícita previa a cualquier subida.

El feed no se publicó automáticamente en Facebook: lo confirmado en esta conversación corresponde a Instagram. Los PNG/textos y registros históricos están en `output/instagram-2027/`, que no se despliega como parte de la web.

## Capacidades: no confundir posibilidad con prueba de publicación

| Formato | Instagram, navegador actual | Facebook / Business Suite | Nivel de verificación |
| --- | --- | --- | --- |
| Foto de feed inmediata | Sí | Editor disponible | Instagram: tres publicaciones verificadas; Facebook: no se hizo prueba de publicación |
| Foto de feed futura | Sí | Editor con fecha y hora disponible | Instagram: cola verificada; no equivale a verificación en Business Suite |
| Carrusel | Selector múltiple disponible | Editor permite varios medios | No se publicó un carrusel de prueba |
| Reel | Editor/filtro de video disponible | Crear reel disponible | No se publicó ni programó un Reel de prueba; requiere video real |
| Story con imagen | No es el flujo del feed de Instagram | Crear historia muestra Facebook e Instagram y admite imágenes/videos | Verificado en el editor, sin subir ni publicar el piloto |
| Story futura | Usar Business Suite | Botón Programar y campos separados para ambas plataformas | Controles y fechas verificados; resultado final se validará tras aprobación |
| Encuesta/pregunta/sticker nativo | No auditado como operación automatizable | No se comprobó soporte de escritura de esos stickers | El piloto no depende de ellos; no se dibujan controles falsos |
| Story con varias láminas | No es un carrusel de feed | Editor permite hasta diez imágenes/videos | El piloto usa dos láminas; el operador debe verificar orden, fecha y cada plataforma |

## Horizonte máximo observado

En el editor de Stories de Business Suite, el **18/10/2026**, tanto Facebook como Instagram permiten elegir **16/11/2026**, y **17/11/2026 aparece deshabilitado**. Es una ventana observada de 29 días, no una promesa permanente. Se inspeccionaron los calendarios sin medios y se canceló el editor, sin subir ni programar las cuatro secuencias.

Para el feed de Instagram se observó el 17/10 que el 15/11 estaba habilitado y fechas posteriores deshabilitadas. No se generaliza esa observación a todas las cuentas, versiones ni formatos. El operador debe leer nuevamente los controles antes de cada despacho. Un contenido fuera de ventana queda **APPROVED + WAITING_WINDOW**, no SCHEDULED ni MANUAL_REQUIRED.

## Diferencia respecto de Graph API

La documentación primaria de Meta en su colección oficial de Postman confirma publicación para cuentas profesionales y Stories para cuentas Business. Instagram distingue Facebook Login de Instagram Login y sus permisos. Que exista ese endpoint no lo convierte en una integración autenticada de este proyecto.

Los recursos oficiales a comprobar son los contenedores `media` / `media_publish` de Instagram y Page Stories API (`photo_stories` / `video_stories`) de Facebook. No se ha verificado con credenciales de esta cuenta ninguna llamada, permiso, versión Graph, cuota ni programación diferida mediante esos endpoints. No se implementará un supuesto `scheduled_publish_time` de Stories sin soporte comprobado. Publicación inmediata vía API y retención en una cola propia hasta una fecha futura son mecanismos distintos.

La lectura directa de algunas guías de developers.facebook.com respondió HTTP 429 y algunos artículos del Help Center pidieron sesión. Por eso las limitaciones específicas de esta cuenta se documentan desde el editor observado; no se afirma que la API carezca de Stories ni se marca MANUAL_REQUIRED por falta de investigación.

## Limitaciones reales encontradas

- La sesión de Instagram puede cerrarse o cambiar de cuenta. Antes de subir se debe confirmar expresamente @hosterialalucila. En Business Suite se selecciona el portfolio de la hostería; nunca usar el negocio predeterminado sin comprobarlo.
- Business Suite no mostró la misma cola que Instagram. Una lista vacía en una herramienta no autoriza volver a publicar desde otra. Ante discrepancia, reconciliar antes de reintentar.
- Las confirmaciones de envío y las entradas del calendario son pruebas distintas. Solo el resultado verificado del destino se registra como SCHEDULED. Si falta certeza, FAILED/UNCERTAIN y sin reintento automático.
- El sitio estático en Hostinger no puede ejecutar operaciones Meta del lado servidor. El panel será un servicio **local**, en `/social-preview`, enlazado solo a localhost, separado de `out/` y de la navegación pública. Para uso remoto/continuo hará falta un entorno servidor adecuado; no se contrata ni despliega uno sin indicación del usuario.
- El mecanismo del asistente depende de Codex activo, navegador accesible y sesión autorizada. No hay servicio cloud autónomo 24/7 ni token de API oculto. El coordinador local conserva la cola cuando no hay operador.
- Los IDs de Meta, capturas de confirmación y recibos completos viven fuera de Git y del directorio público. La interfaz y el log muestran referencias opacas locales y errores depurados. No se vuelcan IDs privados, tokens o URLs de sesión.

## Decisión de arquitectura

Se conserva el adaptador **browser-meta-session**. El servidor local genera imágenes desde plantillas y datos, valida, registra aprobaciones con hash y encola automáticamente al aprobar. Un operador Codex con las herramientas de navegador existentes reclama los trabajos y ejecuta el flujo real de Business Suite. El servidor valida los recibos por plataforma/lámina, deduplica y actualiza estados. Ningún clic al abrir la página publica. No se declara SCHEDULED por haber creado un trabajo local.

No se añade una segunda integración Graph sin credenciales. El adaptador de API queda deshabilitado y explicado, no sustituye al mecanismo funcional. MANUAL_REQUIRED se reserva para una limitación de formato confirmada después de contrastar mecanismos oficiales; una sesión cerrada es un bloqueo de acceso, no una imposibilidad técnica del formato.

## Fuentes primarias

- [Colección oficial de Meta: Instagram API](https://www.postman.com/meta/instagram/collection/6yqw8pt/instagram-api).
- [Meta: Instagram API con Facebook Login](https://www.postman.com/meta/instagram/folder/u4g5a2a/instagram-api-with-facebook-login).
- [Meta: Content Publishing](https://developers.facebook.com/docs/instagram-platform/content-publishing/) — lectura directa limitada por HTTP 429 en esta auditoría.
- [Meta: Page Stories API](https://developers.facebook.com/docs/page-stories-api/) — lectura directa limitada por HTTP 429.
- [Meta: programar publicaciones e historias](https://www.facebook.com/business/help/609176706604372) — acceso web a ayuda limitado; editor autenticado inspeccionado sin publicar.
- Evidencia propia: editor Crear historia de Business Suite, destinos públicos nombrados arriba, límite 16/11 habilitado y 17/11 deshabilitado para ambas redes. Captura local en `output/instagram-2027/auditoria-editor-stories.png`.
