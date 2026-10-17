# Publicación en Hostinger Premium

La aplicación ya está preparada como sitio estático. **No requiere Node.js en Hostinger.** Se genera localmente con `npm run build` y se verifica con `npm run verify`.

## Archivos de entrega

- `output/entrega-web-2027/hosteria-web-2027-hostinger.zip`: contenido listo para extraer en la raíz del sitio.
- `out/`: los mismos archivos sin comprimir.
- `output/entrega-web-2027/ENTREGA_WEB_2027.md`: resumen de contenido y comprobaciones.

El paquete contiene `index.html`, `_next/`, `images/real/`, páginas por carpetas, `robots.txt`, `sitemap.xml`, `404.html`, favicon y `.htaccess`. No contiene el proyecto de desarrollo, las maquetas de Instagram, los originales descargados ni imágenes de muestra.

## Procedimiento de reemplazo

1. **Conservar una copia recuperable del WordPress actual**, tanto archivos como base de datos. Guardar también el `.htaccess` actual. Evitar guardar copias o archivos ZIP del respaldo dentro de una carpeta accesible públicamente.
2. Probar primero el paquete en un subdominio o directorio de prueba que no reemplace la web actual. Para revisar en una subcarpeta, las rutas de esta entrega están pensadas para la raíz: usar preferentemente un subdominio de prueba, sin cambiar el dominio principal.
3. Revisar portada, cuatro fichas de habitación, galería, contacto, campaña 2027, enlace a Instagram y apertura de WhatsApp. Las canónicas están preparadas para `https://www.hosterialalucila.com.ar/`.
4. En el Administrador de archivos de Hostinger, localizar el directorio público del dominio correcto —habitualmente `public_html`—. El reemplazo es de este sitio; no tocar otros dominios, correo, DNS ni bases de datos ajenas.
5. Una vez aprobado el reemplazo, retirar de la raíz pública los archivos de WordPress según el procedimiento de respaldo acordado. No superponer los nuevos archivos sin revisar: un `index.php` o reglas antiguas de WordPress pueden tomar prioridad o interceptar las rutas nuevas.
6. Extraer **el contenido** del ZIP en la raíz del dominio. Debe quedar `public_html/index.html`, no `public_html/out/index.html` ni una carpeta extra de entrega. Comprobar que `.htaccess` se haya extraído.
7. Verificar HTTPS y abrir directamente `/verano-2027/`, `/habitaciones/triple-parque/`, `/galeria/`, `/contacto/` y una ruta inexistente. La ruta inexistente debe devolver estado 404 y mostrar la página de error.
8. Probar las redirecciones conocidas de los artículos antiguos y revisar que imágenes y mapas carguen. Si el hosting usa caché, vaciar la caché del sitio después de verificar el contenido nuevo.
9. Retirar el ZIP del directorio público una vez extraído y conservar el respaldo fuera del sitio. Guardar el paquete compilado y el proyecto fuente en una ubicación de trabajo.

## Enlaces antiguos previstos

El `.htaccess` usa `DirectoryIndex index.html`, una página 404 y estas redirecciones 301:

| Ruta anterior | Destino nuevo |
| --- | --- |
| `/index.php/2019/05/17/muelle-la-lucila/` | `/la-lucila-del-mar/` |
| `/index.php/2019/05/17/escapada-romantica/` | `/habitaciones/` |
| `/index.php/blog/` | `/la-lucila-del-mar/` |
| `/index.php` | `/` |

Las anclas antiguas `/#habitaciones`, `/#servicios`, `/#info` y `/#ubicacion` siguen teniendo un destino en el sitio. No se afirma haber descubierto todas las URLs históricas: pueden añadirse redirecciones a partir de Search Console o registros del alojamiento.

## Cambios posteriores

Modificar las fuentes, ejecutar `npm run build`, después `npm run verify` y volver a subir los archivos generados. No se necesita ejecutar `npm start` ni instalar Node.js en el hosting. El formulario sigue funcionando en el navegador y prepara el mensaje para WhatsApp.

La vista previa local se abre con `npm run preview`. Permite comprobar el sitio estático, aunque no ejecuta las reglas `.htaccess` del servidor de Hostinger.

## Referencias técnicas

- [Next.js: exportación estática](https://nextjs.org/docs/app/guides/static-exports).
- [Hostinger: opciones de alojamiento para aplicaciones y sitios estáticos](https://www.hostinger.com/support/node-js-hosting-options-at-hostinger/).

Se consultó además la documentación incluida en la versión de Next.js instalada en este proyecto. No se contrató ningún servicio ni se publicó la web durante esta preparación.
