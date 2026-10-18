# Operador de la cola de Stories

Contrato de `browser-meta-session`. Se conserva el navegador autorizado; no hay Graph API configurada ni servicio Node en Hostinger. No extraer cookies, tokens ni credenciales. La operación se coordina fuera del navegador del panel.

## Despacho

1. Desde la raíz, ejecutar `node scripts/social/worker.mjs claim`. Si responde `pending:false`, terminar silenciosamente sin abrir Meta. Nunca aprobar, editar fechas ni ampliar el calendario por iniciativa del operador. Las cuatro secuencias iniciales requieren aprobación del usuario.
2. El trabajo contiene referencia editorial, archivos y entregas por plataforma/lámina con ISO exacto. Cada lámina es una Story independiente: primera a la hora aprobada, siguientes a intervalos de un minuto para conservar orden. No convertirlas en carrusel.
3. Leer la habilidad Computer Use y usar sus controles. Seleccionar portfolio hosterialalucila, Página **Hosteria La Lucila** e Instagram **@hosterialalucila**. Verificar destinos antes de subir y antes del envío. No usar otra marca ni cambiar permisos o conexiones.
4. Revisar la cola existente por cuenta, fecha, hora y contenido. La discrepancia entre Business Suite e Instagram no autoriza duplicar. Si hay una coincidencia o incertidumbre, detener y reconciliar.
5. Crear historia y cargar el PNG local mediante selector de archivos; el usuario no descarga ni carga nada. Elegir Programar, configurar fecha/hora de ambas redes y comprobar America/Buenos_Aires y AM/PM. Sin stickers, filtros ni textos adicionales. No usar Compartir ahora para una fecha futura.
6. Justo antes del envío final, registrar `node scripts/social/worker.mjs attempt REFERENCIA Instagram:LAMINA` y el equivalente Facebook. Si un clic procesa ambas redes, registrar ambos intentos antes de ese clic. Un fallo de registro impide enviar.
7. Verificar confirmación y entrada real del calendario de cada plataforma/lámina. Guardar evidencia en `output/social-evidence/`. El clic, la selección de fecha y la cola local no constituyen confirmación.
8. Escribir el recibo únicamente en `.social-private/receipt-REFERENCIA.json`, sin imprimirlo. Ejecutar `node scripts/social/worker.mjs result RUTA_ABSOLUTA_PRIVADA`. No inventar IDs cuando el editor no los proporciona.

Formato del recibo: `reference` y `deliveries`. Cada entrega: `platform`, `slideId`, `scheduledAt` (ISO exacto del trabajo), `metaPostId` (real o null), `confirmed:true`, `accountVerified:true`, `evidencePath` (ruta relativa dentro de output/social-evidence). Todas las entregas deben estar confirmadas antes de SCHEDULED. IDs solo en estado/recibos privados, nunca en logs o interfaz. Para reconciliar, consultar el estado privado localmente sin volcarlo a la conversación.

## Errores y cancelación

- Acceso perdido, CAPTCHA o acuerdo nuevo: detener y solicitar intervención/autorización aplicable. No cambiar contraseñas ni aceptar términos por autorización genérica.
- Registrar errores mediante `node scripts/social/worker.mjs fail REFERENCIA "MOTIVO_SIN_DATOS_PRIVADOS"`. Tras un intento externo queda UNCERTAIN, sin reintento automático, aunque parte del envío haya funcionado. Conservar piezas y evidencia. No borrar intentos para desbloquear.
- Fuera de la ventana observada de 29 días, esperar; no modificar fecha ni declarar MANUAL_REQUIRED. Releer el límite del editor antes de operar. Una limitación de formato exige contrastar primero mecanismos oficiales.
- CANCEL: retirar solo las entradas identificadas de la secuencia, registrar cada intento y confirmar retirada por red/lámina con evidencia. El estado permanece SCHEDULED hasta esa comprobación. No tocar otras publicaciones.
- Tras la fecha prevista, comprobar publicación real; no inferir PUBLISHED por el reloj. Completar el mismo recibo con `published:true` en raíz y cada entrega, con evidencia actualizada. Las referencias necesarias están en el estado privado; no imprimir IDs.
- El reclamo tipo VERIFY es solo lectura de entregas ya confirmadas: no subir, programar ni registrar nuevos intentos de publicación. El motor reutiliza los intentos y referencia originales. Confirmar publicación real en ambas redes y completar el recibo con published:true; si no se puede verificar, detener sin repetir el envío.

## Coordinador

El seguimiento de este chat reclama trabajos aprobados periódicamente; nunca genera/aprueba nuevo contenido. Mantener silencio si no hay trabajos y avisar ante confirmación, error o intervención necesaria. Requiere equipo encendido, Codex abierto y navegador accesible con sesión autorizada. No es ejecución cloud 24/7. El panel se inicia aparte mediante `npm run social:preview`.

[Requisitos oficiales de las automatizaciones locales de Codex](https://learn.chatgpt.com/docs/automations?surface=app).
