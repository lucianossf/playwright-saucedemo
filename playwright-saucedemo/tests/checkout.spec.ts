import { test, expect } from '../fixtures';
import { PRODUCTS } from '../utils/constants';
import { generateCheckoutData, generateInvalidCheckoutData } from '../utils/faker.helpers';

test.describe('Carrinho & Checkout', () => {

  test.beforeEach(async ({ authenticatedPage }) => {});

  test('TC-011 | Remover produto do carrinho deve deixar o carrinho vazio', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.assertOnCartPage();
    await cartPage.assertItemInCart(PRODUCTS.backpack);

    await cartPage.removeItem(PRODUCTS.backpack);

    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
    await cartPage.assertItemNotInCart(PRODUCTS.backpack);
  });

  test('TC-012 | Checkout sem preencher nome deve exibir erro de validação', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.assertOnStep1();

    const { missingFirstName } = generateInvalidCheckoutData();
    await checkoutPage.fillShippingInfo(
      missingFirstName.firstName,
      missingFirstName.lastName,
      missingFirstName.postalCode,
    );
    await checkoutPage.continue();

    await checkoutPage.assertErrorVisible();
    await checkoutPage.assertErrorContains('First Name is required');
  });

  test('TC-013 | Fluxo completo de compra com dados gerados pelo Faker', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // Adiciona 2 produtos
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.addItemToCart(PRODUCTS.bikeLight);
    expect(await inventoryPage.getCartBadgeCount()).toBe('2');

    // Vai ao carrinho e verifica itens
    await inventoryPage.goToCart();
    await cartPage.assertOnCartPage();
    await cartPage.assertItemInCart(PRODUCTS.backpack);
    await cartPage.assertItemInCart(PRODUCTS.bikeLight);

    // Inicia checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.assertOnStep1();

    // Preenche dados com Faker
    const { firstName, lastName, postalCode } = generateCheckoutData();
    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutPage.continue();
    await checkoutPage.assertOnStep2();

    // Verifica resumo e finaliza
    const total = await checkoutPage.getTotalPrice();
    expect(total).toContain('Total:');

    await checkoutPage.finish();
    await checkoutPage.assertOrderComplete();
  });
});
