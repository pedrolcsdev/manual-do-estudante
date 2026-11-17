# Manual de Sobrevivência do Estudante

Protótipo mobile-first para encontrar orientações de serviços do campus Renascença da Universidade CEUMA.

## Executar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Se essa porta estiver ocupada, use `npm run dev -- --port 3001`.

## Verificar

```bash
npm test
npm run lint
npm run build
```

## Conteúdo

O catálogo em `src/content/services.ts` resume os relatórios disponíveis. As orientações citam o documento e a página de origem; estados parcial e divergente indicam quando o procedimento não está completo ou quando as fontes discordam. Os relatórios não são políticas institucionais homologadas, e horários, preços e fluxos precisam de validação antes de uso oficial.

O protótipo usa busca local por título, termos e sinônimos. Ele não envia consultas para terceiros, não usa IA, não acessa o Portal do Aluno e não armazena dados do estudante.

A busca sugere até cinco serviços a partir de dois caracteres. Use as setas para selecionar, Enter para abrir uma sugestão e Escape para fechar. O botão Buscar exibe todos os resultados. Apenas os campos usados na busca são enviados ao componente interativo; procedimentos e fontes permanecem nas páginas de serviço.
