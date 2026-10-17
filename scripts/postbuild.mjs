import fs from 'node:fs/promises';

// Next's static export omits dotfiles. Hostinger needs the Apache/LiteSpeed
// configuration for the custom 404 and the former WordPress article URLs.
await fs.copyFile('public/.htaccess', 'out/.htaccess');
console.log('Hostinger configuration copied to out/.htaccess');
