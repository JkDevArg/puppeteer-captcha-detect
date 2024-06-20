const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless: false for debugging
  const page = await browser.newPage();
  await page.goto('https://tusitioweb.com/');

  // Esperar a que el campo de nombre de usuario esté disponible
  await page.waitForSelector('input[name="username"]', { visible: true });
  
  // Introducir el nombre de usuario y la contraseña
  await page.type('input[name="username"]', 'eee@ee.com');
  await page.type('input[name="password"]', 'botpassword');
  
  // Hacer clic en el botón de envío
  await page.click('button[type="submit"]');

  // Verificar el contenido de la página
  const content = await page.content();
  if (content.includes('captcha') || content.includes('403 Forbidden')) {
    console.log('Captcha detectado');
  } else {
    console.log('Captcha no detectado');
  }

  await browser.close();
})();
