# Playwright SauceDemo

Suíte de testes End-to-End para o [SauceDemo](https://www.saucedemo.com/), com Playwright, TypeScript e Page Object Model. O código, o package.json e a documentação detalhada ficam na pasta playwright-saucedemo/.

## Cobertura

São 13 casos automatizados:

- Login: credenciais válidas, usuário bloqueado, credenciais inválidas, campos vazios e logout.
- Inventário: quantidade de produtos e ordenação por preço e nome.
- Carrinho e checkout: adicionar/remover produto, validação de campos e fluxo completo.

A configuração define Chromium, Firefox e Mobile Chrome com emulação Pixel 5.

## Ferramentas e versões declaradas

| Ferramenta | Versão declarada |
|---|---|
| Node.js | 20 no workflow do GitHub Actions; package.json não declara engines |
| @playwright/test | ^1.44.0 |
| @faker-js/faker | ^8.4.1 |
| allure-playwright | ^3.0.0 |
| allure-commandline | ^2.29.0 |
| TypeScript | Usado nos arquivos .ts; package.json não declara nem fixa a dependência |

O package-lock.json da raiz está vazio e não há lockfile na pasta do projeto. Use npm install na pasta playwright-saucedemo/, não npm ci.

## Instalar e executar

Da raiz do repositório:

    cd playwright-saucedemo
    npm install
    npx playwright install
    npm test

Comandos adicionais: npm run test:headed, npm run test:ui, npm run test:debug e npm run allure:report.

Guia detalhado: [playwright-saucedemo/README.md](playwright-saucedemo/README.md).
