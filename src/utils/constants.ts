export const SITE = {
  title: 'Glyv',
  description: 'Suplementos para diabetes. Reposición periódica.',
  url: 'https://glyv.com',
} as const;

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Centia', href: '/#glyv-centia' },
  { label: 'Nervia', href: '/#glyv-nervia' },
  { label: 'Cómo funciona', href: '/servicios' },
  { label: 'Nosotros', href: '/sobre-nosotros' },
  { label: 'Contacto', href: '/contacto' },
] as const;

export const HERO = {
  wordmark: 'Glyv',
  eyebrow: 'Suplementos para diabetes',
  h1: 'Equilibra tu glucosa.',
  body: 'Dos cápsulas al día, con los alimentos. Ciencia clara, origen botánico.',
  cta: 'Empezar reposición',
  secondary: 'Ver fórmula',
  band: 'Cada mes, en tu puerta.',
  specs: [
    { k: 'Porción', v: '2 cápsulas' },
    { k: 'Envase', v: '60 cápsulas' },
    { k: 'Ciclo', v: '30 días' },
    { k: 'Origen', v: 'Natural' },
  ],
} as const;

export const PRODUCTS = [
  {
    id: 'glyv-centia',
    line: 'Glyv',
    name: 'Centia',
    claim: 'Equilibra tu glucosa de forma natural.',
    use: 'Dos cápsulas al día, con los alimentos.',
    pack: '60 cápsulas · 30 días',
    ingredients: 'Gymnema, canela, nopal, berberina, ácido alfa lipoico, cromo.',
    cta: 'Empezar reposición',
    formula: 'Ver fórmula',
    tone: 'glucose',
  },
  {
    id: 'glyv-nervia',
    line: 'Glyv',
    name: 'Nervia',
    claim: 'Equilibra tu mente. Recupera tu bienestar.',
    use: 'Dos cápsulas al día, con los alimentos.',
    pack: '60 cápsulas · 30 días',
    ingredients: 'Pasiflora, valeriana, ashwagandha, magnesio, vitamina B6, melatonina.',
    cta: 'Empezar reposición',
    formula: 'Ver fórmula',
    tone: 'nervia',
  },
] as const;

export const PAGES = {
  home: {
    title: 'Inicio',
    description: 'Glyv. Suplementos para diabetes con reposición periódica.',
  },
  servicios: {
    title: 'Servicios',
    description: 'Cómo funciona Glyv. Contenido pendiente del brief.',
  },
  about: {
    title: 'Sobre nosotros',
    description: 'Quiénes somos. Contenido pendiente del brief.',
  },
  contacto: {
    title: 'Contacto',
    description: 'Contacta con Glyv. Contenido pendiente del brief.',
  },
} as const;
