export const campusMapUrl = "https://www.openstreetmap.org/way/533398538";

// OpenStreetMap way 533398538, version 10. Coordinates are [latitude, longitude].
export const campusBoundary: [number, number][] = [
  [-2.5024572, -44.2869724],
  [-2.5026771, -44.2870976],
  [-2.502963, -44.2870873],
  [-2.5035821, -44.2870649],
  [-2.5042639, -44.2870403],
  [-2.5042061, -44.2863109],
  [-2.5044132, -44.2863758],
  [-2.5046077, -44.2862341],
  [-2.5051906, -44.2858308],
  [-2.503881, -44.2839096],
  [-2.5037851, -44.2838969],
  [-2.503359, -44.2841491],
  [-2.5029788, -44.2836501],
  [-2.5022982, -44.2836609],
];

// shortcut: illustrative positions for the prototype, replace after an on-campus survey.
export const campusPoints = [
  { slug: "central-matricula", orientation: "matricula-ingresso", position: [-2.50295, -44.28644] },
  { slug: "apoio-ao-aluno", orientation: "cadastro-facial", position: [-2.50319, -44.28554] },
  { slug: "biblioteca", orientation: "livros-biblioteca", position: [-2.50386, -44.28594] },
  { slug: "achados-e-perdidos", orientation: "objetos-perdidos", position: [-2.50342, -44.28462] },
  { slug: "central-atendimento-ao-aluno", orientation: "provas", position: [-2.50358, -44.28662] },
] satisfies { slug: string; orientation: string; position: [number, number] }[];

export type CampusSector = {
  slug: string;
  name: string;
  location: string;
  orientation?: string;
  position: [number, number];
  locationPending?: boolean;
};

// Posições de exemplo dentro do campus para setores com localização a confirmar.
export const campusUnlocatedSectors: CampusSector[] = [
  { slug: "nadd", name: "NADD", location: "1º andar. Prédio a confirmar.", position: [-2.50253, -44.28693] },
  { slug: "setor-de-estagio", name: "Setor de Estágio", location: "1º andar. Prédio a confirmar.", orientation: "estagio", position: [-2.50252, -44.28546] },
  { slug: "suporte-de-ti", name: "Suporte de TI (Help Desk)", location: "1º andar. Prédio a confirmar.", orientation: "acesso-ava", position: [-2.50251, -44.28436] },
  { slug: "coordenacoes-de-curso", name: "Coordenações de Curso", location: "1º andar. O corredor varia por curso. Prédio a confirmar.", orientation: "tcc", position: [-2.50305, -44.28394] },
  { slug: "secretaria-academica", name: "Secretaria Acadêmica de Graduação", location: "Subsolo. Prédio a confirmar.", position: [-2.50413, -44.28684] },
  { slug: "pronto-atendimento", name: "Pronto Atendimento", location: "Localização a confirmar.", position: [-2.50455, -44.28549] },
];
