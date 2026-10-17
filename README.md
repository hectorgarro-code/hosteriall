# Hostería La Lucila · Web Verano 2027

Sitio de presentación y consultas para Hostería La Lucila, La Lucila del Mar. Preparado como **exportación estática compatible con Hostinger Premium**, sin Node.js en el hosting.

## Desarrollo y compilación local

Requisito en el equipo de desarrollo: Node.js 20.9 o superior y npm. El servidor público solo necesita servir archivos HTML, CSS, JS e imágenes.

```sh
npm ci
npm run dev
```

Para generar y comprobar la entrega:

```sh
npm run build
npm run verify
npm run preview
```

La compilación crea `out/`. La vista previa sirve esos mismos archivos en `http://127.0.0.1:4178`; no depende de un servidor Next.js. El paso `postbuild` incorpora `.htaccess`, omitido por la exportación de Next.

**En Hostinger se sube el contenido de `out/`, con `index.html` directamente en la raíz del sitio.** No subir la carpeta como `public_html/out/`. No subir `node_modules/`, `.next/` ni los archivos fuente al directorio público.

Ver [HOSTINGER_PREMIUM.md](./HOSTINGER_PREMIUM.md) para el reemplazo con respaldo y prueba previa. No se realizó ninguna publicación durante esta implementación.

## Contenido real incorporado

- 33 archivos importados de la web propia: fotografías y logo.
- 21 fotos seleccionadas para la galería, con filtros y ampliación accesible.
- Cuatro categorías de habitación, con sus imágenes correspondientes.
- Página `/verano-2027/` para enlazar desde Instagram.
- Desayuno incluido, ingreso 14:00, salida 10:00, mascotas permitidas, efectivo o transferencia, reserva con seña y pileta climatizada al aire libre todo el verano: confirmados por el propietario en esta conversación.
- Cancelación a consulta; no se inventaron tarifas, porcentaje de seña ni condiciones de devolución.
- Los testimonios de muestra fueron retirados. Se conserva un enlace para buscar opiniones en Google Maps.
- Fotografías optimizadas a WebP, sin generar escenas ni retocar instalaciones. Se preservan originales y procedencia en archivos separados.

## Dónde editar

| Tema | Archivo |
| --- | --- |
| Marca, contacto, dirección y dominio | `src/data/config.ts` |
| Condiciones confirmadas | `src/data/policies.ts` |
| Categorías, capacidades, fotos y equipamiento publicado | `src/data/rooms.ts` |
| Servicios y sus descripciones | `src/data/services.ts` |
| Preguntas frecuentes | `src/data/faqs.ts` |
| Galería y textos alternativos | `src/data/gallery.ts` |
| Portada y campaña de Instagram | `src/app/page.tsx`, `src/app/verano-2027/page.tsx` |
| Colores y presentación | `src/app/globals.css` |
| Metadatos, canónicas y vistas compartidas | `src/lib/metadata.ts` y cada página |
| Mapa de origen de todas las fotos | `content-sources/photos.json` |
| Formulario y mensajes WhatsApp | `src/components/QuickInquiry.tsx`, `src/lib/whatsapp.ts` |

Si cambia una condición, actualizar tanto las respuestas frecuentes como los textos de servicios, fichas y campaña que la mencionen, además de la configuración central. Después recompilar.

## Fotografías y archivos de referencia

Las imágenes usadas por la aplicación están en `public/images/real/`. La procedencia, dimensiones originales y huellas SHA-256 están en `content-sources/photos.json`.

`scripts/import-public-photos.mjs` reproduce la importación desde las URLs observadas en el HTML guardado y requiere acceso a Internet si falta un original. No se ejecuta durante la compilación normal. Los originales descargados están en `output/importacion-fotos/originales/`.

Las imágenes de muestra y SVG genéricos retirados de la carpeta pública están conservados en `output/archivo-modelo-inicial/`. Ninguno se usa en la versión exportada. El informe y las maquetas del plan de Instagram permanecen en `output/temporada-2027/` y no se publican con el sitio.

## Qué comprueba la verificación

`npm run verify` inspecciona las 11 páginas comerciales exportadas, las canónicas individuales, la existencia y procedencia de las imágenes, la ausencia de textos internos o testimonios de muestra, la configuración de Hostinger y los mensajes de consulta. El funcionamiento visual debe revisarse también en navegador.

El sitio prepara mensajes para WhatsApp: no tiene inventario de disponibilidad, cobros ni confirmación automática. El formulario de contacto no envía correos ni guarda consultas en una base de datos.

La medición dispone de eventos locales preparados, pero no se instaló un proveedor de analítica ni se envían nombres o teléfonos como parámetros de esos eventos.
