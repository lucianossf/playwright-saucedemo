import { test, expect } from '../fixtures';
import { USERS, MESSAGES } from '../utils/constants';

test.describe('Autenticação', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC-001 | Login com credenciais válidas deve redirecionar para inventário', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.assertOnInventoryPage();
  });

  test('TC-002 | Login com usuário bloqueado deve exibir mensagem de erro', async ({
    loginPage,
  }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.assertErrorVisible();
    await loginPage.assertErrorContains(MESSAGES.locked_error);
  });

  test('TC-003 | Login com credenciais inválidas deve exibir mensagem de erro', async ({
    loginPage,
  }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await loginPage.assertErrorVisible();
    await loginPage.assertErrorContains(MESSAGES.invalid_error);
  });

  test('TC-004 | Login sem preencher campos deve exibir erro de campo obrigatório', async ({
    loginPage,
  }) => {
    await loginPage.login('', '');
    await loginPage.assertErrorVisible();
    await loginPage.assertErrorContains(MESSAGES.empty_username);
  });

  test('TC-005 | Logout deve retornar o usuário para a tela de login', async ({
    loginPage,
    inventoryPage,
    authenticatedPage,
  }) => {
    await inventoryPage.logout();
    await loginPage.assertOnLoginPage();
  });
});
