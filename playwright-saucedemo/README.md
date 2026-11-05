<h1 align="center">Playwright SauceDemo — testes E2E</h1>

<p align="center">
  Suíte de automação de testes para os principais fluxos do e-commerce <a href="https://www.saucedemo.com">SauceDemo</a>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-1.44-45ba4b?style=for-the-badge&logo=playwright&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-CI_20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Allure-Report-orange?style=for-the-badge&logo=databricks&logoColor=white"/>
  <img src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/testes-13_casos-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/padrão-Page_Object_Model-purple?style=flat-square"/>
  <img src="https://img.shields.io/badge/dados-Faker.js-red?style=flat-square"/>
</p>

---

## Visão geral

Projeto de QA que exercita autenticação, catálogo, carrinho e checkout do SauceDemo. Os testes usam TypeScript, Playwright Test, Page Object Model, fixtures compartilhadas e dados dinâmicos do Faker.js.

A suíte contém **13 cenários** distribuídos entre login, inventário, carrinho e finalização de compra. Playwright captura screenshot e vídeo quando um teste falha e gera resultados para os relatórios HTML e Allure.

## Estrutura

```text
playwright-saucedemo/
├── .github/workflows/playwright.yml  # pipeline de CI e publicação Allure
├── fixtures/                         # fixtures compartilhadas e autenticação
├── pages/                            # Page Objects de login, inventário, carrinho e checkout
├── tests/
│   ├── login.spec.ts                 # TC-001 a TC-005
│   ├── inventory.spec.ts             # TC-006 a TC-010
│   └── checkout.spec.ts              # TC-011 a TC-013
├── utils/                            # constantes e helpers Faker
├── playwright.config.ts              # projetos e evidências
└── package.json                      # scripts e dependências
```

## Cenários cobertos

| Arquivo | Casos | Cobertura |
|---|---:|---|
| `tests/login.spec.ts` | TC-001 a TC-005 | Login válido e inválido, usuário bloqueado, campos obrigatórios e logout |
| `tests/inventory.spec.ts` | TC-006 a TC-010 | Listagem, ordenação de produtos e inclusão no carrinho |
| `tests/checkout.spec.ts` | TC-011 a TC-013 | Remoção de item, validação do checkout e compra completa |

## Ferramentas e versões

| Ferramenta | Versão declarada/configurada | Uso |
|---|---|---|
| `@playwright/test` | `^1.44.0` | Framework de testes E2E |
| `@faker-js/faker` | `^8.4.1` | Geração de dados para os testes |
| `allure-playwright` | `^3.0.0` | Integração dos testes com Allure |
| `allure-commandline` | `^2.29.0` | Geração e visualização local do relatório Allure |
| Node.js | `20` no workflow | Runtime configurado na automação do GitHub Actions |
| TypeScript | Sem versão declarada no `package.json` | Os testes estão escritos em arquivos `.ts`; o projeto não fixa uma dependência TypeScript direta |
| GitHub Actions | `checkout`/`setup-node`/`upload-artifact`/`download-artifact` `@v4`; Allure `@master`; Pages `@v3` | CI e publicação do relatório |

O `package.json` não declara o campo `engines`; Node.js 20 é a versão configurada no CI.

## Executar localmente

O pacote e seu arquivo de lock ficam nesta pasta `playwright-saucedemo/`, dentro do repositório. Clone e entre na pasta do projeto:

```bash
git clone https://github.com/lucianossf/playwright-saucedemo.git
cd playwright-saucedemo/playwright-saucedemo
npm ci
npx playwright install chromium firefox
```

Execute todos os projetos de browser:

```bash
npm test
```

Comandos disponíveis em `package.json`:

| Comando | Ação |
|---|---|
| `npm run test:headed` | Executa com o browser visível |
| `npm run test:ui` | Abre o Playwright UI Mode |
| `npm run test:debug` | Inicia a execução em modo de depuração |
| `npx playwright test tests/login.spec.ts` | Executa apenas os testes de login |
| `npm run allure:report` | Gera o relatório Allure local |
| `npm run allure:open` | Abre o relatório Allure gerado |
| `npm run allure:serve` | Inicia o Allure em modo servidor |

## Browsers configurados

| Projeto Playwright | Ambiente |
|---|---|
| `chromium` | Desktop Chrome |
| `firefox` | Desktop Firefox |
| `Mobile Chrome` | Perfil emulado Pixel 5 |

## Integração contínua

O workflow `.github/workflows/playwright.yml` executa os testes em pushes para `main` e `develop`, em pull requests para `main` e de segunda a sexta às **08:00 UTC**. Ele configura Node.js 20, instala dependências com `npm ci` e executa `npm run test:ci`.

Os relatórios Playwright e Allure são guardados como artefatos por 30 dias. Após a execução, o workflow gera o histórico Allure e publica o site na branch `gh-pages`.

## Autor

Desenvolvido por [Luciano Silveira](https://github.com/lucianossf).
