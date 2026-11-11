# Manual de Sobrevivência do Estudante — desenho do protótipo

**Data:** 11/11/2026

**Estado:** desenho aprovado pelo solicitante

**Referência de pesquisa:** `docs/analise-documental.md`

## Objetivo e recorte

Criar um guia web mobile-first para que um estudante do campus Renascença encontre a próxima ação para resolver uma necessidade, mesmo sem conhecer o nome do setor. O protótipo usa somente serviços descritos no acervo local. CEUMA I, II, III, IV etc. são prédios do campus Renascença, conforme esclarecimento do solicitante; Achados e Perdidos fica no 4º andar do CEUMA III.

O resultado esperado de cada busca é uma página de serviço que mostre **o que fazer primeiro**, **onde ou com quem resolver**, **o que a fonte informa** e **o que ainda precisa ser confirmado**. O produto não será um diretório de setores nem um chatbot.

## Experiência aprovada

1. **Início:** pergunta “O que você precisa resolver?”, campo de busca dominante e lista de categorias por necessidade. Exemplos de buscas usam linguagem cotidiana.
2. **Resultados:** uma lista simples, ordenada por relevância, com título do serviço, resumo da próxima ação e estado da informação. O usuário pode abrir a página de serviço.
3. **Serviço:** título orientado à necessidade; primeiro passo no topo; passos adicionais somente quando aparecem nas fontes; canal, setor, requisitos, localização, horários e contato apenas quando documentados; lacunas ou divergências visíveis; referências com nome do arquivo e página.
4. **Sem resultado:** mensagem direta, sugestões de termos próximos e acesso às categorias. Não gerar uma resposta que não existe no catálogo.
5. **Categorias:** cada categoria lista apenas serviços presentes no catálogo. Não haverá página de setor como entrada principal nem seção de FAQ que repita o mesmo conteúdo.

**Direção visual:** inspirada no hotsite da Universidade CEUMA indicado pelo solicitante: azul escuro `#031D73`, branco, cinza claro, tipografia Poppins, títulos fortes, espaço generoso e linhas divisórias. A interface evita empilhar conteúdo em cards. O cabeçalho identifica o campus Renascença. O esboço visual aprovado como direção está na sessão local `.superpowers/brainstorm/46585-1794406372/content/ceuma-clean-v2.html`; o logotipo ilustrativo será substituído pelo logotipo institucional no aplicativo.

## Catálogo inicial

Os registros serão agrupados por necessidade, com nomes que o estudante usaria:

| Categoria | Páginas de serviço |
| --- | --- |
| Documentos e solicitações | Declaração de matrícula; histórico escolar; ementas; segunda via da carteira estudantil. |
| Matrícula e acesso | Matrícula/ingresso; crachá; cadastro facial e falhas na catraca; suporte a PROUNI/FIES. |
| Aulas e avaliações | Entrega/retirada de provas; retificação de notas ou faltas; acesso ao AVA; regime domiciliar. |
| Biblioteca e estudo | Empréstimo e renovação de livros; reserva de sala de estudo; nada consta. |
| Finanças e bolsas | Declarações financeiras; regularização financeira pelo Portal do Aluno. |
| Estágio e conclusão | Estágio; TCC; atividades complementares; Kit Formando. |
| Ajuda e imprevistos | Recuperar objeto perdido. |

As páginas podem ter uma única ação quando é tudo que o documento informa. A página de PROUNI/FIES separa suporte inicial de matrícula, aditamento FIES pelo Portal e dúvidas financeiras, com as fontes e a incerteza de encaminhamento. A página de provas informa a CAA como local descrito para entrega e retirada, mas explicita a divergência sobre provas antigas antes de orientar deslocamento.

NADD e Pronto Atendimento constam da análise documental, mas não entram como páginas de resolução nesta versão: os relatórios não trazem um fluxo operacional suficiente. A simples listagem de setores por andar não gera novas páginas de serviço.

## Fontes e regras editoriais

- Cada afirmação operacional do catálogo terá referência ao documento e à página. O conteúdo é uma síntese dos relatórios, não uma declaração de política institucional atual.
- O estado de cada serviço será **documentado**, **parcial** ou **divergente**. “Documentado” indica que o acervo descreve a ação, não que a universidade a tenha homologado.
- Requisitos, horários, valores, prazos, links e localizações não serão preenchidos por dedução. Dados sujeitos a mudança, especialmente preços e horários, aparecerão como “informado no relatório” quando forem essenciais; o protótipo não os tratará como informação em tempo real.
- Links externos só serão clicáveis quando o endereço estiver explicitamente documentado ou confirmado em fonte institucional. Referências aos PDFs aparecem pelo nome e página; os PDFs de entrevista não serão publicados como arquivos do site.
- Uma divergência preserva as versões das fontes e marca o ponto a confirmar. A interface não escolhe arbitrariamente um setor como resposta definitiva.

## Arquitetura e busca

Usar Next.js com App Router, TypeScript, Tailwind CSS e componentes shadcn/ui apenas nos controles que precisarem deles. O conteúdo fica em um catálogo local tipado, mantido manualmente. Não há banco de dados, autenticação, API própria, IA nem RAG no protótipo.

Rotas: `/` para início; `/buscar?q=...` para resultados; `/categorias/[slug]` para uma lista por necessidade; `/servicos/[slug]` para a orientação. As rotas de serviço e categoria são geradas a partir do catálogo. Cada serviço contém título, resumo, categoria, palavras-chave e sinônimos, passos documentados, dados úteis opcionais, estado, lacunas e fontes.

A busca normaliza maiúsculas, acentos e pontuação, compara termos significativos com título, palavras-chave, sinônimos e resumo, e ordena correspondências de título acima das demais. A consulta e os filtros não são enviados a terceiros. O conjunto é pequeno o bastante para busca local; IA/RAG acrescentaria custo e risco de resposta não sustentada por relatórios contraditórios. Erros de digitação não terão correção automática nesta versão; a tela sem resultado sugerirá outras consultas.

## Estados, acessibilidade e verificação

- Campo vazio: mostrar categorias e buscas comuns, sem uma lista arbitrária de todos os registros.
- Consulta sem resultado: mostrar mensagem clara e caminhos alternativos.
- Serviço parcial: destacar a próxima ação conhecida e os detalhes ausentes.
- Serviço divergente: mostrar as duas informações com suas fontes e a confirmação necessária.
- Link externo: abrir com rótulo que identifique o destino; não simular um portal institucional.
- Interface semântica, contraste legível, foco visível e busca operável por teclado; layout verificado em largura de celular e desktop.
- Conferir buscas representativas (“comprovante de matrícula”, “facial”, “renovar livro”, “perdi objeto”), categorias, estados vazio/parcial/divergente e referências contra os documentos. Verificar que nenhum serviço atribui ao campus ou prédio um dado ausente da fonte.

## Fora do protótipo

Mapa físico, totem, integração com Portal do Aluno, chat com IA, login, painel administrativo, atualização automática de preços/horários, fluxo clínico ou de emergência e páginas para setores sem orientação operacional suficiente.
