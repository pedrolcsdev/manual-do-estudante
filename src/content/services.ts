export type Category = { slug: string; title: string };

export type Service = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  keywords: string[];
  steps: string[];
  status: "documentado" | "parcial" | "divergente";
  sources: { file: string; page: number }[];
  channel?: string;
  sector?: string;
  requirements?: string[];
  location?: string;
  hours?: string;
  contact?: string[];
  caveat?: string;
};

export const categories: Category[] = [
  { slug: "documentos", title: "Documentos e solicitações" },
  { slug: "matricula-acesso", title: "Matrícula e acesso" },
  { slug: "aulas-avaliacoes", title: "Aulas e avaliações" },
  { slug: "biblioteca-estudo", title: "Biblioteca e estudo" },
  { slug: "financas-bolsas", title: "Finanças e bolsas" },
  { slug: "estagio-conclusao", title: "Estágio e conclusão" },
  { slug: "ajuda-imprevistos", title: "Ajuda e imprevistos" },
];

export const services: Service[] = [
  {
    slug: "declaracao-matricula",
    title: "Conseguir uma declaração de matrícula",
    category: "documentos",
    summary:
      "A emissão de declaração de matrícula regular é indicada como autoatendimento no Portal do Aluno.",
    keywords: [
      "comprovante",
      "declaração",
      "matrícula",
      "vínculo",
      "aluno regular",
    ],
    steps: [
      "Acesse o Portal do Aluno e procure a emissão de declarações acadêmicas.",
    ],
    status: "parcial",
    sources: [
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 4 },
      { file: "Central de atendimento Ceuma.pdf", page: 1 },
    ],
    channel: "Portal do Aluno",
    sector: "Central de Atendimento ao Aluno",
    caveat:
      "Os documentos não informam o nome exato do menu, o prazo nem o valor específico desta declaração.",
  },
  {
    slug: "historico-escolar",
    title: "Solicitar histórico escolar",
    category: "documentos",
    summary:
      "O histórico escolar aparece entre os serviços do Portal do Aluno.",
    keywords: [
      "histórico",
      "notas",
      "disciplinas cursadas",
      "documento acadêmico",
    ],
    steps: ["Solicite o histórico escolar pelo Portal do Aluno."],
    status: "parcial",
    sources: [{ file: "Central de atendimento Ceuma.pdf", page: 1 }],
    channel: "Portal do Aluno",
    sector: "Atendimento Acadêmico",
    caveat: "Prazo e etapas da solicitação não foram detalhados.",
  },
  {
    slug: "ementas",
    title: "Consultar e solicitar ementas",
    category: "documentos",
    summary:
      "O programa de disciplinas (ementas) é listado entre os serviços do Portal do Aluno.",
    keywords: ["ementa", "programa de disciplina", "conteúdo da disciplina"],
    steps: ["Solicite o programa de disciplinas pelo Portal do Aluno."],
    status: "parcial",
    sources: [{ file: "Central de atendimento Ceuma.pdf", page: 1 }],
    channel: "Portal do Aluno",
    sector: "Atendimento Acadêmico",
    caveat: "Prazo e etapas da solicitação não foram detalhados.",
  },
  {
    slug: "segunda-via-carteira",
    title: "Pedir segunda via da carteira estudantil",
    category: "documentos",
    summary:
      "A segunda via da carteira estudantil consta entre os requerimentos do Portal do Aluno.",
    keywords: [
      "carteirinha",
      "carteira",
      "identidade estudantil",
      "segunda via",
      "2ª via",
    ],
    steps: ["Solicite a segunda via pelo Portal do Aluno."],
    status: "parcial",
    sources: [{ file: "Central de atendimento Ceuma.pdf", page: 1 }],
    channel: "Portal do Aluno",
    sector: "Atendimento Acadêmico",
    caveat:
      "O documento informa uma taxa, mas o valor e a vigência devem ser confirmados antes da solicitação.",
  },
  {
    slug: "matricula-ingresso",
    title: "Resolver matrícula de ingresso",
    category: "matricula-acesso",
    summary:
      "A Central de Matrícula formaliza o vínculo de ingressantes com a universidade.",
    keywords: ["ingresso", "calouro", "matricular", "matrícula", "vestibular"],
    steps: ["Procure a Central de Matrícula para formalizar o vínculo."],
    status: "parcial",
    sources: [{ file: "Central de Matrícula-atualizado.pdf", page: 1 }],
    sector: "Central de Matrícula",
    location:
      "Próxima à Praça da Gratidão, ao lado da Central de Atendimento ao Aluno",
    hours: "Segunda a sexta, das 8h às 20h (conforme relatório)",
    contact: ["matricula.vestibular@ceuma.br", "WhatsApp: (98) 99178-1978"],
    caveat:
      "Documentos necessários e sequência da matrícula não foram descritos. O relatório também informa encerramento do atendimento presencial a partir do dia 15 de cada mês; confirme a regra antes de ir.",
  },
  {
    slug: "cracha",
    title: "Emitir ou retirar crachá institucional",
    category: "matricula-acesso",
    summary:
      "A Central de Matrícula é responsável pela emissão e entrega do crachá institucional.",
    keywords: ["crachá", "identificação", "acesso laboratório", "estágio"],
    steps: [
      "Procure a Central de Matrícula para emissão ou entrega do crachá.",
    ],
    status: "parcial",
    sources: [{ file: "Central de Matrícula-atualizado.pdf", page: 1 }],
    sector: "Central de Matrícula",
    caveat: "Requisitos, prazo e dias de retirada não foram informados.",
  },
  {
    slug: "cadastro-facial",
    title: "Cadastrar reconhecimento facial",
    category: "matricula-acesso",
    summary: "O cadastro facial é feito presencialmente pelo Apoio ao Aluno.",
    keywords: [
      "facial",
      "biometria",
      "catraca",
      "entrar na faculdade",
      "reconhecimento facial",
    ],
    steps: [
      "Vá ao Apoio ao Aluno e informe seu RA para consultar o cadastro facial.",
    ],
    status: "parcial",
    sources: [
      { file: "Relatorioentrevistaapoioaoaluno.pdf", page: 1 },
      { file: "Entrevista - Setor-2.pdf", page: 4 },
    ],
    sector: "Apoio ao Aluno",
    requirements: ["Número do RA"],
    location: "Pátio principal, próximo às quatro telas de TV",
    hours: "Segunda a sexta, das 8h às 19h (conforme relatório)",
    caveat:
      "Se o cadastro foi feito mas a catraca não reconhece o aluno, os relatórios não identificam o setor responsável por corrigir a falha.",
  },
  {
    slug: "prouni-fies",
    title: "Buscar ajuda com PROUNI ou FIES",
    category: "matricula-acesso",
    summary:
      "O encaminhamento depende do tipo de necessidade: ingresso, aditamento ou questão financeira.",
    keywords: ["prouni", "fies", "bolsa", "financiamento", "aditamento"],
    steps: [
      "Para suporte inicial de PROUNI/FIES, procure a Central de Matrícula.",
      "Para processo de aditamento FIES, consulte o requerimento no Portal do Aluno.",
      "Para dúvidas financeiras, a Coordenação encaminha à Central de Atendimento ao Aluno.",
    ],
    status: "divergente",
    sources: [
      { file: "Central de Matrícula-atualizado.pdf", page: 1 },
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 3 },
      { file: "Central de atendimento Ceuma.pdf", page: 2 },
    ],
    sector: "Central de Matrícula ou Central de Atendimento ao Aluno",
    caveat:
      "As fontes apontam setores diferentes para dúvidas gerais. O fluxo precisa ser confirmado para cada situação.",
  },
  {
    slug: "provas",
    title: "Entregar ou retirar uma prova",
    category: "aulas-avaliacoes",
    summary:
      "A Central de Atendimento recebe e entrega avaliações cadastradas.",
    keywords: [
      "prova",
      "avaliação",
      "exame",
      "semestre anterior",
      "retirar prova",
    ],
    steps: [
      "Procure a Central de Atendimento ao Aluno para entrega ou retirada de avaliação cadastrada.",
    ],
    status: "divergente",
    sources: [
      { file: "Central de atendimento Ceuma.pdf", page: 1 },
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 4 },
    ],
    sector: "Central de Atendimento ao Aluno",
    location:
      "Ao lado da Central de Matrícula, em frente à escadaria próxima da rampa principal",
    caveat:
      "Para provas antigas, um relatório aponta a CAA e outro indica Secretaria Acadêmica / Atendimento. Confirme o balcão antes de se deslocar. A disponibilização pode levar mais tempo.",
  },
  {
    slug: "retificacao-notas-faltas",
    title: "Pedir retificação de nota ou falta",
    category: "aulas-avaliacoes",
    summary:
      "Retificação de notas e faltas está entre os requerimentos acadêmicos do Portal do Aluno.",
    keywords: [
      "corrigir nota",
      "nota errada",
      "falta",
      "presença",
      "retificação",
    ],
    steps: ["Abra o requerimento de retificação pelo Portal do Aluno."],
    status: "parcial",
    sources: [{ file: "Central de atendimento Ceuma.pdf", page: 1 }],
    channel: "Portal do Aluno",
    sector: "Atendimento Acadêmico",
    caveat:
      "Documentos necessários, prazo e acompanhamento não foram detalhados.",
  },
  {
    slug: "acesso-ava",
    title: "Resolver problema de acesso ao AVA",
    category: "aulas-avaliacoes",
    summary:
      "O relatório encaminha problemas de acesso ou disciplinas ausentes no AVA ao Suporte de TI ou atendimento da Coordenação.",
    keywords: [
      "ava",
      "ambiente virtual",
      "disciplina sumiu",
      "login",
      "acesso",
      "ead",
    ],
    steps: [
      "Procure o Suporte de TI ou atendimento da Coordenação, conforme sua modalidade de ensino.",
    ],
    status: "parcial",
    sources: [
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 2 },
      { file: "planilhasetoresporandar.pdf", page: 1 },
    ],
    sector: "Suporte de TI / Help Desk ou Coordenação",
    location:
      "A planilha lista o Help Desk no 1º andar; o prédio não está identificado.",
    caveat:
      "O canal de contato e como escolher entre TI e Coordenação não foram especificados.",
  },
  {
    slug: "regime-domiciliar",
    title: "Solicitar regime domiciliar",
    category: "aulas-avaliacoes",
    summary:
      "O relatório cita protocolo pelo Portal do Aluno com atestado médico anexado.",
    keywords: [
      "afastamento",
      "atestado",
      "doença",
      "cirurgia",
      "regime domiciliar",
      "amparo legal",
    ],
    steps: [
      "Abra o protocolo de regime domiciliar no Portal do Aluno e anexe o atestado médico.",
      "O relatório cita afastamentos de sete dias ou mais.",
    ],
    status: "parcial",
    sources: [
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 3 },
      { file: "Central de atendimento Ceuma.pdf", page: 1 },
    ],
    channel: "Portal do Aluno",
    sector: "Coordenação de Curso",
    caveat:
      "Os critérios formais e o prazo para solicitar precisam ser confirmados.",
  },
  {
    slug: "livros-biblioteca",
    title: "Emprestar ou renovar livro",
    category: "biblioteca-estudo",
    summary:
      "A biblioteca faz empréstimos; renovações e consulta de empréstimos são feitas pelo Meu Pérgamo.",
    keywords: [
      "livro",
      "emprestar",
      "devolver",
      "renovar",
      "biblioteca",
      "meu pergamo",
      "pérgamo",
      "ebook",
      "artigo",
    ],
    steps: [
      "Para empréstimo, apresente documento com foto e use sua senha da biblioteca.",
      "Para acompanhar ou pedir renovação, acesse Meu Pérgamo no Portal do Aluno.",
    ],
    status: "parcial",
    sources: [
      { file: "Relatorio_entrevista_biblioteca.pdf", page: 1 },
      { file: "Relatorio_entrevista_biblioteca.pdf", page: 2 },
    ],
    sector: "Biblioteca",
    requirements: ["Documento com foto", "Senha da biblioteca"],
    hours:
      "Segunda a sexta, das 8h às 21h30; sábado, das 8h às 12h30 (conforme relatório)",
    location:
      "Ao lado da entrada da quadra; acesso pelas escadas junto ao Café CB",
    caveat:
      "O relatório informa prazo inicial de dez dias e total de até cinquenta dias com renovações, mas não detalha limites ou elegibilidade.",
  },
  {
    slug: "sala-estudo",
    title: "Reservar sala de estudo",
    category: "biblioteca-estudo",
    summary:
      "A biblioteca informa que as salas podem ser reservadas em períodos de duas horas.",
    keywords: ["sala", "estudar", "grupo", "reservar", "agendar sala"],
    steps: [
      "Agende com pelo menos uma hora de antecedência.",
      "Escolha um dos períodos disponíveis durante a semana.",
      "Apresente documento com foto e informe a senha da biblioteca, conforme necessário.",
    ],
    status: "parcial",
    sources: [
      { file: "Relatorio_entrevista_biblioteca.pdf", page: 1 },
      { file: "Relatorio_entrevista_biblioteca.pdf", page: 2 },
    ],
    sector: "Biblioteca",
    requirements: ["Documento com foto", "Senha da biblioteca"],
    location:
      "Ao lado da entrada da quadra; acesso pelas escadas junto ao Café CB",
    caveat:
      "O meio de agendamento, capacidade das salas e disponibilidade não foram informados.",
  },
  {
    slug: "nada-consta",
    title: "Solicitar nada consta da biblioteca",
    category: "biblioteca-estudo",
    summary:
      "A biblioteca emite o nada consta, descrito na entrevista como certidão relacionada a débitos.",
    keywords: [
      "nada consta",
      "certidão",
      "débito",
      "formatura",
      "concluir curso",
    ],
    steps: ["Solicite o nada consta à equipe da biblioteca."],
    status: "parcial",
    sources: [
      { file: "Relatorio_entrevista_biblioteca.pdf", page: 1 },
      { file: "Relatorio_entrevista_biblioteca.pdf", page: 3 },
    ],
    sector: "Biblioteca",
    location:
      "Ao lado da entrada da quadra; acesso pelas escadas junto ao Café CB",
    caveat:
      "O escopo da certidão, documentos necessários e prazo não foram informados.",
  },
  {
    slug: "declaracao-financeira",
    title: "Solicitar declaração financeira",
    category: "financas-bolsas",
    summary:
      "Declarações financeiras aparecem entre os requerimentos do Portal do Aluno.",
    keywords: [
      "declaração financeira",
      "financeiro",
      "pagamento",
      "mensalidade",
      "boleto",
    ],
    steps: ["Solicite a declaração financeira pelo Portal do Aluno."],
    status: "parcial",
    sources: [{ file: "Central de atendimento Ceuma.pdf", page: 2 }],
    channel: "Portal do Aluno",
    sector: "Atendimento Financeiro",
    caveat:
      "O relatório lista uma taxa, mas valor e vigência devem ser confirmados. Prazo e etapas não foram detalhados.",
  },
  {
    slug: "regularizacao-financeira",
    title: "Resolver pendência financeira",
    category: "financas-bolsas",
    summary:
      "Regularização financeira está listada como requerimento de autoatendimento no Portal do Aluno.",
    keywords: [
      "pendência",
      "dívida",
      "negociar",
      "mensalidade",
      "parcelas",
      "ressarcimento",
    ],
    steps: [
      "Abra o requerimento de regularização financeira no Portal do Aluno.",
    ],
    status: "parcial",
    sources: [{ file: "Central de atendimento Ceuma.pdf", page: 2 }],
    channel: "Portal do Aluno",
    sector: "Atendimento Financeiro",
    caveat:
      "As etapas de negociação e os canais para casos que não podem ser resolvidos pelo portal não foram detalhados.",
  },
  {
    slug: "estagio",
    title: "Resolver documentação de estágio",
    category: "estagio-conclusao",
    summary:
      "Seguro, convênio e validação de estágio são tratados pelo Setor de Estágio.",
    keywords: [
      "estágio",
      "estagio obrigatório",
      "extracurricular",
      "seguro",
      "convênio",
      "relatório",
    ],
    steps: [
      "Inicie a tramitação com o Setor de Estágio antes de entregar documentos à Coordenação.",
    ],
    status: "parcial",
    sources: [
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 3 },
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 4 },
    ],
    sector: "Setor de Estágio",
    caveat: "Contato, localização e lista de documentos não foram informados.",
  },
  {
    slug: "tcc",
    title: "Encontrar orientação para o TCC",
    category: "estagio-conclusao",
    summary:
      "A Coordenação esclarece regras e disponibiliza a ficha de inscrição; a entrega aparece como requerimento no Portal do Aluno.",
    keywords: [
      "tcc",
      "trabalho conclusão curso",
      "monografia",
      "inscrição tcc",
    ],
    steps: [
      "Consulte a Coordenação de Curso para regras e ficha de inscrição.",
      "A entrega de TCC também aparece entre os requerimentos do Portal do Aluno.",
    ],
    status: "parcial",
    sources: [
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 3 },
      { file: "Central de atendimento Ceuma.pdf", page: 1 },
    ],
    sector: "Coordenação de Curso",
    channel: "Coordenação e Portal do Aluno",
    caveat:
      "As regras variam por curso; o relatório não traz os contatos ou a ficha.",
  },
  {
    slug: "atividades-complementares",
    title: "Validar atividades complementares",
    category: "estagio-conclusao",
    summary:
      "A Coordenação orienta envio e validação; atividades complementares externas são requeridas pelo Portal do Aluno.",
    keywords: [
      "horas complementares",
      "certificados",
      "extensão",
      "atividades complementares",
    ],
    steps: [
      "Consulte a Coordenação sobre os critérios do seu curso.",
      "Para atividades externas, use o requerimento no Portal do Aluno.",
    ],
    status: "parcial",
    sources: [
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 3 },
      { file: "Central de atendimento Ceuma.pdf", page: 1 },
    ],
    sector: "Coordenação de Curso",
    channel: "Coordenação e Portal do Aluno",
    caveat:
      "Carga horária e limites variam por curso; confirme a regra aplicável à sua graduação.",
  },
  {
    slug: "kit-formando",
    title: "Entender o Kit Formando",
    category: "estagio-conclusao",
    summary:
      "Kit Formando é a documentação obrigatória para expedição do diploma digital.",
    keywords: [
      "formatura",
      "diploma",
      "colação de grau",
      "kit formando",
      "documentos formando",
    ],
    steps: [
      "Use o requerimento Kit Formando no Portal do Aluno.",
      "A Coordenação distingue a colação de grau oficial da cerimônia simbólica.",
    ],
    status: "parcial",
    sources: [
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 2 },
      { file: "Coordenação de Curso__Equipe_M25.pdf", page: 3 },
      { file: "Central de atendimento Ceuma.pdf", page: 1 },
    ],
    channel: "Portal do Aluno",
    sector: "Coordenação de Curso",
    caveat: "A lista de documentos e os prazos não foram informados.",
  },
  {
    slug: "objetos-perdidos",
    title: "Recuperar objeto perdido",
    category: "ajuda-imprevistos",
    summary:
      "Objetos encontrados são registrados e guardados para retirada pelo responsável.",
    keywords: [
      "perdi",
      "perdido",
      "achados",
      "perdidos",
      "objeto",
      "pertence",
      "documento perdido",
    ],
    steps: [
      "Vá ao 4º andar do CEUMA III e descreva as características do objeto.",
      "Se o objeto estiver registrado, informe nome, RA e CPF e assine a retirada.",
    ],
    status: "documentado",
    sources: [
      { file: "guia_achados_e_perdidos_ceuma_atualizado.pdf", page: 1 },
    ],
    sector: "Achados e Perdidos",
    requirements: ["Nome", "RA", "CPF"],
    location: "4º andar do prédio CEUMA III, campus Renascença",
    hours: "7h–12h e 13h–21h30 (conforme guia)",
  },
];
