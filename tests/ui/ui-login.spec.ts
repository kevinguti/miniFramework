import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import users from '../../data/users.json';
import { BASE_URL } from '../../utils/config';
import { screenshotPath, waitFor2, waitFor5 } from '../../utils/helpers';
import { logger } from '../../utils/logger';

test('Login en Sylius Demo', async ({ page }) => {
  logger.info('=== INICIANDO TEST: Login en Sylius Demo ===');
  
  const loginPage = new LoginPage(page);
  
  logger.info(`Navegando a la URL: ${BASE_URL}`);
  await loginPage.goto(BASE_URL);
  
  logger.info('Realizando login con credenciales de administrador');
  logger.debug(`Usuario: ${users.admin.username}`);
  await loginPage.login(users.admin.username, users.admin.password);
  
  logger.info('Verificando que el login fue exitoso');
  const isLoggedIn = await loginPage.isLoggedIn();
  
  if (isLoggedIn) {
    logger.info('Login exitoso - Usuario autenticado correctamente');
  } else {
    logger.error('Login fallido - No se pudo autenticar el usuario');
    await page.screenshot({ path: screenshotPath('login-failed') });
  }
  
  expect(isLoggedIn).toBeTruthy();
  logger.info('=== TEST DE LOGIN COMPLETADO EXITOSAMENTE ===');
});