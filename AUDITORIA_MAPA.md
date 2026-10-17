# Auditoría y mapa de la carpeta

Fecha: 16 de octubre de 2026. Carpeta: `C:\Proyectos\hosteriall`.

## Resultado

La carpeta contiene el sitio web de Hostería La Lucila: presentación del alojamiento, catálogo de habitaciones, servicios, guía del destino, galería y contacto. La conversión principal es abrir WhatsApp con una consulta preparada. No se encontraron rutas API, base de datos, autenticación, panel administrativo ni motor de reservas dentro del código revisado.

La compilación de producción y la validación de TypeScript finalizaron correctamente. Hay problemas de contenido, SEO, accesibilidad y mantenimiento que conviene resolver antes de publicar una nueva versión. Esta auditoría no modificó el código de la aplicación.

## Alcance y comprobaciones

- Inventario de archivos propios, configuración, documentación, código y referencias de imágenes.
- Lectura de la documentación instalada de Next.js sobre instalación y metadatos, conforme a AGENTS.md.
- `npm run build`: completado correctamente, incluida la generación de 16 entradas internas de compilación; este número incluye rutas auxiliares y no representa 16 páginas comerciales.
- El primer intento se interrumpió por `EPERM` al crear una carpeta de `.next`. La repetición con permisos ampliados finalizó con código 0; no se atribuye ese primer error al código.
- Inspección del HTML generado para inicio, contacto, galería y doble estándar: confirma las canónicas heredadas y los títulos descriptos más abajo.
- 13 rutas únicas de imágenes revisadas: todas existen y sus formatos son válidos según sus metadatos.
- No se hicieron cambios funcionales, publicaciones ni comunicaciones externas. La compilación regeneró archivos de `.next`.
- No se realizó una prueba visual en navegador, Lighthouse, una prueba integral de interacción ni una auditoría de vulnerabilidades contra un registro actualizado. Tampoco se verificaron enlaces externos, autenticidad de fotografías/reseñas ni datos comerciales con el propietario. Los hallazgos de diseño móvil se basan en el código.

## Inventario

Conteos previos a agregar este informe; excluyen dependencias y archivos generados.

| Sector | Archivos | Tamaño | Contenido |
| --- | ---: | ---: | --- |
| `src/` | 34 | 173.539 bytes | Aplicación, componentes, contenido, utilidades y tipos |
| `public/` | 18 | 11.568.938 bytes | 13 imágenes, 5 SVG de plantilla |
| Raíz | 11 | No agregado al total | Documentación y configuración |
| Total propio | 63 | — | 64 con este informe |

`node_modules/` contiene las dependencias instaladas; `.next/` contiene resultados y cachés de desarrollo/compilación. No son fuentes editoriales. No se inventariaron sus archivos individualmente.

## Mapa de archivos

```text
hosteriall/
├── AGENTS.md                     Reglas de trabajo para agentes
├── README.md                     Instalación, despliegue y edición del contenido
├── INVENTORY.md                  Relevamiento previo declarado de la hostería
├── PENDIENTE_DE_CONFIRMAR.md      Datos pendientes de validar con administración
├── DESIGN_SYSTEM.md              Guía de identidad y diseño
├── AUDITORIA_MAPA.md              Este informe
├── package.json                  Dependencias y comandos
├── package-lock.json             Versiones resueltas; formato de lock 3
├── next.config.ts                Cache Components y Partial Prefetching activados
├── tsconfig.json                 TypeScript estricto y alias @/* → src/*
├── next-env.d.ts                 Declaraciones generadas de Next.js
├── .gitignore                    Exclusiones previstas para Git
├── src/
│   ├── app/
│   │   ├── layout.tsx            Marco global, metadatos y datos estructurados
│   │   ├── page.tsx              Inicio
│   │   ├── globals.css           Tokens y estilos compartidos
│   │   ├── page.module.css       Estilos residuales de plantilla, sin importaciones
│   │   ├── favicon.ico           Icono del sitio; identidad visual no verificada
│   │   ├── robots.ts             Genera /robots.txt
│   │   ├── sitemap.ts            Genera /sitemap.xml
│   │   ├── habitaciones/page.tsx  Catálogo
│   │   ├── habitaciones/[slug]/page.tsx  Ficha por categoría
│   │   ├── servicios/page.tsx    Instalaciones
│   │   ├── la-lucila-del-mar/page.tsx  Guía del destino
│   │   ├── galeria/page.tsx      Galería filtrable
│   │   └── contacto/page.tsx     Formulario, canales y mapa
│   ├── components/
│   │   ├── Header.tsx            Navegación y menú móvil
│   │   ├── Footer.tsx            Enlaces y contacto
│   │   ├── QuickInquiry.tsx      Fechas, huéspedes y habitación → WhatsApp
│   │   ├── FloatingWhatsApp.tsx  Acceso flotante tras desplazamiento
│   │   ├── RoomCard.tsx          Tarjeta de habitación
│   │   ├── RoomGallery.tsx       Foto principal y miniaturas
│   │   ├── ServiceCard.tsx       Tarjeta de servicio
│   │   ├── GalleryGrid.tsx       Filtros y ampliación de fotos
│   │   ├── ReviewsSection.tsx    Testimonios
│   │   ├── FaqAccordion.tsx      Preguntas frecuentes
│   │   ├── JsonLd.tsx            Schema LodgingBusiness y HotelRoom
│   │   └── SocialIcons.tsx       Iconos de redes
│   ├── data/
│   │   ├── config.ts             Identidad, contacto, ubicación y temporada
│   │   ├── rooms.ts              4 categorías de habitación
│   │   ├── services.ts           6 servicios
│   │   ├── gallery.ts            12 fotos y categorías
│   │   ├── faqs.ts               8 preguntas frecuentes
│   │   └── reviews.ts            4 testimonios
│   ├── lib/
│   │   ├── whatsapp.ts           Construye mensajes y enlaces
│   │   └── analytics.ts          Emite eventos si existe window.gtag
│   └── types/index.ts            Contratos de datos
├── public/
│   ├── images/                   12 JPEG y 1 PNG de logo
│   └── file.svg, globe.svg, next.svg, vercel.svg, window.svg
├── node_modules/                 Dependencias; generado
└── .next/                        Compilación y cachés; generado
```

## Rutas y contenido

| URL | Contenido principal | Fuente |
| --- | --- | --- |
| `/` | Presentación, consulta rápida, beneficios, habitaciones, servicios, destino, reseñas y FAQ | `src/app/page.tsx` y `src/data/` |
| `/habitaciones` | Catálogo y consulta | `rooms.ts`, `RoomCard`, `QuickInquiry` |
| `/habitaciones/doble-estandar` | Habitación para 2 personas | `rooms.ts` |
| `/habitaciones/triple-estandar` | Habitación para 3 personas | `rooms.ts` |
| `/habitaciones/triple-parque` | Habitación para 3 personas con vista al parque | `rooms.ts` |
| `/habitaciones/triple-balcon` | Habitación para 3 personas con balcón | `rooms.ts` |
| `/servicios` | Pileta, desayuno, parque/quincho, parrilla, estacionamiento y WiFi/comedor | `services.ts` |
| `/la-lucila-del-mar` | Playa, muelle, pinares, gastronomía y distancias | Texto de página y `config.ts` |
| `/galeria` | 12 fotos; 5 categorías más filtro Todo | `gallery.ts`, `GalleryGrid` |
| `/contacto` | Datos personales y consulta → WhatsApp; teléfono, correo, redes y mapa | `config.ts` y formulario local |

Hay 10 URLs comerciales previstas. Se agregan `/robots.txt`, `/sitemap.xml`, favicon y manejo de rutas inexistentes. Las fichas se generan a partir de los slugs del catálogo; no representan disponibilidad en tiempo real.

Flujo principal: `src/data/` → páginas/componentes → enlace con mensaje preparado → WhatsApp. El formulario de contacto arma su mensaje por separado; no guarda consultas en el proyecto ni envía correos.

## Hallazgos priorizados

### Alta — resolver antes de una nueva publicación

1. **Pendientes editoriales expuestos al público.** `src/data/faqs.ts:43`, `:50` y `:57` incluyen literalmente `[TODO: Confirmar ...]`. `FaqAccordion` muestra esas respuestas al abrirlas en inicio y fichas de habitación. Confirmar las políticas y reemplazar las notas internas por contenido aprobado.

2. **Canónicas internas apuntan al inicio.** `src/app/layout.tsx:70` define una única canónica absoluta y ninguna página la reemplaza. El HTML generado de contacto, galería y doble estándar confirma `https://hosterialalucila.com.ar` como canónica. Esto comunica una URL preferida incorrecta para páginas con contenido propio. Definir una canónica por ruta y revisar también los `og:url` heredados.

3. **Fechas fijas y sin validación de estadía.** `src/components/QuickInquiry.tsx:16` inicia siempre con 10–17 de enero de 2027. Los campos requieren un valor, pero no tienen fecha mínima ni se compara salida con ingreso antes de abrir WhatsApp. Se pueden generar consultas con fechas pasadas o invertidas. Elegir valores iniciales conscientes y validar salida posterior al ingreso. La cantidad de huéspedes tampoco se contrasta con la capacidad de la categoría seleccionada; conviene aclarar consultas por varias habitaciones.

4. **Información pendiente se publica como definida.** `PENDIENTE_DE_CONFIRMAR.md` marca horarios como provisionales, pero `src/components/JsonLd.tsx:28` los publica como 14:00/10:00. `src/data/services.ts:7` promete disfrutar la pileta fuera del verano, mientras la operatividad fuera de temporada figura pendiente. Unificar contenido visible, documentación y datos estructurados con la información aprobada.

5. **Reseñas sin trazabilidad local suficiente.** `src/data/reviews.ts` marca cuatro testimonios como verificados, todos con cinco estrellas, pero no conserva URL individual, fecha completa ni respaldo de origen. `ReviewsSection.tsx` los presenta como experiencias reales de Google. Esto no demuestra que sean falsos; impide corroborar su atribución desde la carpeta. Incorporar evidencia o retirar la atribución hasta validarla. La galería también dice “Fotografías Reales”, sin documentación local de procedencia o autorización.

### Media — calidad de uso y medición

6. **Galería inaccesible desde el teclado.** `src/components/GalleryGrid.tsx:79` usa un `div` con `onClick` para abrir cada foto, sin semántica de botón ni foco. El lightbox no implementa rol de diálogo, gestión/restauración de foco ni cierre con Escape. Usar controles nativos y un diálogo accesible. En `Header.tsx:191`, el disparador del menú tampoco comunica estado expandido ni relación con el menú.

7. **Riesgo concreto de recorte en móviles.** Inicio, contacto, servicios y fichas usan columnas con mínimo de 320 px, mientras `.container` descuenta 48 px de ancho por padding. En una pantalla de 360 px quedan 312 px: la columna mínima ya no entra. `body { overflow-x: hidden }` oculta el desborde. Los botones tienen además `white-space: nowrap`. Confirmar visualmente a 320, 360 y 375 px y permitir columnas/botones que se adapten al espacio disponible.

8. **Color usado pero no definido.** `--color-ocean-400` aparece en encabezados, pie y el gradiente de `.wave-divider`, pero falta en `globals.css`. Al no tener fallback, las declaraciones que lo usan quedan inválidas; el gradiente puede desaparecer. La guía de diseño sí declara ese token. Sincronizar la paleta real y la documentada.

9. **Analítica preparada, sin inicialización encontrada.** `src/lib/analytics.ts:17` solo envía si existe `window.gtag`; no se encontró carga/configuración del proveedor en el código. Los eventos no permiten acreditar medición activa en producción. Además `src/app/contacto/page.tsx:25` pasa nombre y teléfono a `trackEvent`: si se conecta un proveedor, esos datos se enviarían como parámetros. Excluir datos personales antes de activar la integración. El evento `room_whatsapp` está declarado pero no se dispara en las fichas revisadas.

10. **Metadatos poco específicos o repetidos.** Contacto hereda título y descripción globales. Galería y fichas incluyen la marca en el título y reciben nuevamente el sufijo del layout; confirmado en HTML: `Galería de Fotos | Hostería La Lucila del Mar | Hostería La Lucila`. Algunos `openGraph` se heredan del inicio. Asignar títulos y vistas compartidas específicos para cada ruta.

### Baja — mantenimiento y orden

11. **README incompatible con el requisito instalado.** `README.md:21` indica Node.js 18+, pero el paquete Next.js instalado y su guía exigen 20.9 o superior. La auditoría utilizó Node.js 24.11.1. Actualizar el requisito y declarar una versión de entorno reproducible.

12. **La carpeta no tiene repositorio Git detectable.** `git status` informó que no pertenece a un repositorio y no hay `.git` en su raíz. Existe `.gitignore`, pero eso no constituye historial ni respaldo. No se puede inspeccionar cambios previos, ramas o recuperaciones desde esta carpeta.

13. **No hay comprobaciones automatizadas configuradas.** `package.json` solo ofrece `dev`, `build` y `start`; no se encontraron pruebas ni configuración de lint. La compilación verifica tipos, pero no detecta fechas invertidas, políticas pendientes ni navegación inaccesible. Incorporar verificaciones pequeñas centradas en esos comportamientos.

14. **Imágenes originales pesadas.** Los 12 JPEG suman aproximadamente 11,55 MB decimales, de 624 KB a 1,23 MB cada uno; el logo suma 15 KB. Se usa `next/image`, que puede servir derivados optimizados, por lo que esto no equivale al peso descargado por cada visita. Optimizar originales y medir las imágenes entregadas. La imagen social declara 1200×675 en metadatos, mientras el original de portada mide 1376×768.

15. **Restos de plantilla y centralización parcial.** No se encontraron importaciones de `page.module.css` ni referencias a los cinco SVG genéricos de `public/`. `seasonNotice` e `inquiryDefaultMessage` están definidos pero no se consumen. Dominio, horarios, distancias y algunos textos se repiten fuera de `config.ts`; cambiar un dato central no actualiza necesariamente todo el sitio. Revisar antes de retirar archivos y centralizar los valores compartidos.

## Dónde editar cada tema

| Necesidad | Ubicación principal | Revisar también |
| --- | --- | --- |
| Teléfonos, correo, redes y mapa | `src/data/config.ts` | Textos fijos de contacto y pie |
| Horarios y políticas | `src/data/faqs.ts` | `JsonLd.tsx`, documento de pendientes |
| Habitaciones | `src/data/rooms.ts` | Imágenes y ficha dinámica |
| Servicios | `src/data/services.ts` | Beneficios escritos en inicio |
| Galería | `src/data/gallery.ts`, `public/images/` | Procedencia y descripciones de fotos |
| Reseñas | `src/data/reviews.ts` | Evidencia y presentación en `ReviewsSection` |
| Dominio y SEO | `layout.tsx`, páginas y `generateMetadata` | `JsonLd.tsx`, `sitemap.ts`, `robots.ts` |
| Estética | `globals.css` y estilos de componentes/páginas | `DESIGN_SYSTEM.md` |
| Mensajes de consulta | `src/lib/whatsapp.ts` | Contacto construye su propio mensaje |

## Próxima mejora propuesta

Preparar una revisión previa a publicación centrada en cinco resultados: políticas aprobadas sin TODO visibles; canónicas correctas; fechas válidas; galería operable con teclado; y formularios que entren a 360 px. Esto atiende los defectos que más afectan confianza, descubrimiento y consultas. La propuesta requiere un pedido posterior: no se implementó durante esta auditoría.
