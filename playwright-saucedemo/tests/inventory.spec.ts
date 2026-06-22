import { test, expect } from '../fixtures';
import { PRODUCTS } from '../utils/constants';

test.describe('inventário de Produtos', () => {

  // Usa a fixture que já faz login automaticamente
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('TC-006 | Deve exibir exatamente 6 produtos no inventário', async ({
    inventoryPage,
  }) => {
    const count = await inventoryPage.getItemCount();
    expect(count).toBe(6);
  });

  test('TC-007 | Ordenar por preço (menor → maior) deve reordenar lista corretamente', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getAllPrices();

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('TC-008 | Ordenar por preço (maior → menor) deve reordenar lista corretamente', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getAllPrices();

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  test('TC-009 | Ordenar por nome (A→Z) deve reordenar lista alfabeticamente', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getAllNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('TC-010 | Adicionar produto ao carrinho deve atualizar badge com quantidade correta', async ({
    inventoryPage,
  }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');

    await inventoryPage.addItemToCart(PRODUCTS.bikeLight);
    expect(await inventoryPage.getCartBadgeCount()).toBe('2');
  });
});
