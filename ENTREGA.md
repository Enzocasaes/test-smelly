# Entrega — Refatoração de Testes e Detecção de Test Smells

Aluno: Enzo Casaes Figueiró (856804) · Disciplina: Teste de Software
Projeto-base: https://github.com/CleitonSilvaT/test-smelly

## Conteúdo
- `RELATORIO.pdf` — relatório escrito (capa, análise de smells, antes/depois, print do ESLint, conclusão); fonte em `RELATORIO.md`
- `test/userService.smelly.test.js` — suíte original (inalterada)
- `test/userService.clean.test.js` — suíte refatorada (AAA, um comportamento por teste)
- `.eslintrc.json` — ESLint + eslint-plugin-jest (no-disabled-tests, no-conditional-expect, no-identical-title)
- `package.json` — script `lint` e dependências `eslint` / `eslint-plugin-jest` adicionados
- `evidencias/` — saídas registradas em 18/10/2026 neste repositório (Windows, Node 23.1.0, ESLint 8.57.1, eslint-plugin-jest 28.14.0, Jest 29.7.0):
  - `eslint_execucao.png` / `eslint_saida.txt` — `npx eslint .`: 6 problemas no arquivo original (4 erros, 2 avisos); 0 no refatorado
  - `jest_saida.txt` — 12 aprovados na suíte refatorada + 4 aprovados e 1 ignorado na original
  - `experimento_mutacao.diff` / `experimento_mutacao_jest.txt` — validação de idade removida em uma cópia: suíte original continua passando, refatorada falha

## Como reproduzir
```bash
npm install
npx eslint .                                 # 6 problemas, todos no arquivo smelly
npx eslint test/userService.clean.test.js    # nenhum problema
npx jest
```
