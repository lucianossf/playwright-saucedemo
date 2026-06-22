<h1 align="center"> Playwright SauceDemo — E2E Test Suite</h1>

<p align="center">
  Suite completa de testes automatizados End-to-End para o site
  <a href="https://www.saucedemo.com">SauceDemo</a>, construída com boas práticas de QA.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-1.44-45ba4b?style=for-the-badge&logo=playwright&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Allure-Report-orange?style=for-the-badge&logo=databricks&logoColor=white"/>
  <img src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/testes-13_casos-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/padrão-Page_Object_Model-purple?style=flat-square"/>
  <img src="https://img.shields.io/badge/dados-Faker.js-red?style=flat-square"/>
  <img src="https://img.shields.io/badge/status-ativo-brightgreen?style=flat-square"/>
</p>

---

## Sobre o Projeto

Este projeto demonstra a construção de uma suite de testes E2E profissional com **Playwright** e **TypeScript**, cobrindo os principais fluxos do e-commerce [SauceDemo](https://www.saucedemo.com).

### Destaques técnicos

| Recurso | Descrição |
|---|---|
| **Page Object Model** | Cada página tem sua própria classe com locators e métodos |
| **Fixtures customizadas** | Setup reutilizável de login e instâncias de Page Objects |
| **Faker.js** | Geração de dados dinâmicos (nome, sobrenome, CEP) a cada execução |
| **Allure Report** | Relatório visual rico publicado automaticamente no GitHub Pages |
| **Screenshots** | Captura automática de tela em caso de falha |
| **Vídeos** | Gravação de vídeo retida em caso de falha |
| **GitHub Actions** | Pipeline CI com execução em push, PR e agendamento diário |
| **Multi-browser** | Chromium, Firefox e Mobile Chrome (Pixel 5) |

---

## Estrutura do Projeto

```
playwright-saucedemo/
├── .github/
│   └── workflows/
│       └── playwright.yml        # Pipeline CI/CD + deploy Allure
├── fixtures/
│   └── index.ts                  # Fixtures customizadas (POM + autenticação)
├── pages/                        # Page Objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                        # Casos de teste
│   ├── login.spec.ts             # TC-001 a TC-005
│   ├── inventory.spec.ts         # TC-006 a TC-010
│   └── checkout.spec.ts          # TC-011 a TC-013
├── utils/
│   ├── constants.ts              # Usuários, URLs e mensagens centralizados
│   └── faker.helpers.ts          # Geradores de dados com Faker.js
├── playwright.config.ts          # Configuração global
└── package.json
```

---

## Casos de Teste

### Autenticação — `login.spec.ts`

| ID | Cenário | Resultado Esperado |
|---|---|---|
| TC-001 | Login com credenciais válidas | Redireciona para `/inventory.html` |
| TC-002 | Login com usuário bloqueado | Exibe mensagem de bloqueio |
| TC-003 | Login com credenciais inválidas | Exibe mensagem de erro |
| TC-004 | Login sem preencher campos | Exibe erro de campo obrigatório |
| TC-005 | Logout do sistema | Retorna para tela de login |

### Inventário — `inventory.spec.ts`

| ID | Cenário | Resultado Esperado |
|---|---|---|
| TC-006 | Listagem de produtos | Exibe exatamente 6 produtos |
| TC-007 | Ordenar por menor preço | Lista ordenada crescentemente |
| TC-008 | Ordenar por maior preço | Lista ordenada decrescentemente |
| TC-009 | Ordenar por nome A→Z | Lista em ordem alfabética |
| TC-010 | Adicionar 2 produtos ao carrinho | Badge exibe `2` |

### Carrinho & Checkout — `checkout.spec.ts`

| ID | Cenário | Resultado Esperado |
|---|---|---|
| TC-011 | Remover produto do carrinho | Carrinho fica vazio |
| TC-012 | Checkout sem nome (Faker) | Exibe erro de validação |
| TC-013 | Fluxo completo de compra (Faker) | Pedido finalizado com sucesso |

---

## Como Executar

### Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- *(Opcional)* [Allure CLI](https://allurereport.org/docs/install/) para relatórios locais

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/playwright-saucedemo.git
cd playwright-saucedemo

# Instale as dependências
npm install

# Instale os browsers do Playwright
npx playwright install
```

### Executando os Testes

```bash
# Todos os testes (headless)
npm test

# Com browser visível
npm run test:headed

# Playwright UI Mode (melhor para debug)
npm run test:ui

# Arquivo específico
npx playwright test tests/login.spec.ts

# Teste específico pelo nome
npx playwright test -g "TC-013"

# Em modo debug
npm run test:debug
```

### Relatórios

```bash
# Abrir relatório HTML do Playwright
npx playwright show-report

# Gerar e abrir Allure Report
npm run allure:report
npm run allure:open

# Allure em modo servidor (recomendado)
npm run allure:serve
```

---

## CI/CD — GitHub Actions

A pipeline roda automaticamente:

- ✅ A cada **push** nas branches `main` e `develop`
- ✅ A cada **Pull Request** para a `main`
- ✅ **Todo dia útil às 8h** (cron agendado)

Após cada execução:
- 📊 O **Playwright HTML Report** é salvo como artefato (30 dias)
- 📈 O **Allure Report** é publicado automaticamente no **GitHub Pages**

### Ativar GitHub Pages para o Allure Report

1. Vá em **Settings → Pages**
2. Source: `Deploy from a branch`
3. Branch: `gh-pages` / `/ (root)`
4. Salve — o relatório ficará em `https://seu-usuario.github.io/playwright-saucedemo`

---

## 🌐 Browsers Testados

| Browser | Ambiente |
|---|---|
| ✅ Chromium | Desktop |
| ✅ Firefox | Desktop |
| ✅ Mobile Chrome | Pixel 5 (375px) |

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Playwright](https://playwright.dev/) | ^1.44 | Framework E2E |
| [TypeScript](https://www.typescriptlang.org/) | ^5.x | Tipagem estática |
| [Faker.js](https://fakerjs.dev/) | ^8.4 | Geração de dados falsos |
| [Allure Playwright](https://allurereport.org/) | ^3.0 | Relatórios visuais |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD |

---

## 📌 Boas Práticas Aplicadas

- ✅ **Page Object Model (POM)** — separação de responsabilidades
- ✅ **Fixtures** — setup reutilizável e sem repetição de código
- ✅ **Dados dinâmicos** — Faker.js evita dependência de dados fixos
- ✅ **Testes independentes** — cada teste pode rodar de forma isolada
- ✅ **Evidências automáticas** — screenshots e vídeos em falhas
- ✅ **Nomenclatura rastreável** — prefixo `TC-XXX` em todos os casos
- ✅ **Retries configurados** — resilência em ambientes de CI

---

## Autor

Desenvolvido por **[Luciano Silveira](https://github.com/lucianossf)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/lucianosf)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lucianossf)

---

<p align="center">⭐ Se este projeto te ajudou, deixa uma estrela!</p>
