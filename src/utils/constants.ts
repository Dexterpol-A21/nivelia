export const SITE = {
  title: 'Ekilia',
  description: 'Nutrición para tu bienestar. Reposición periódica.',
  url: 'https://somosekilia.com',
} as const;

export const HERO = {
  wordmark: 'Ekilia',
  h1: 'Nutrición para tu bienestar.',
  body: 'Dos cápsulas al día, con los alimentos. Ciencia clara, origen botánico.',
  cta: 'Empezar reposición',
  secondary: 'Ver fórmula',
  band: 'Bienestar que nace del equilibrio.',
  bandNote: 'Se pueden pedir juntas. El ritmo es el mismo: 30 días, luego otro envase.',
  specs: [
    { k: 'Porción', v: '2 cápsulas' },
    { k: 'Envase', v: '60 cápsulas' },
    { k: 'Ciclo', v: '30 días' },
    { k: 'Origen', v: 'Natural' },
  ],
} as const;

export const PRODUCTS = [
  {
    id: 'ekilia-centia',
    slug: 'centia',
    name: 'Centia',
    line: 'Recupera el equilibrio',
    claim: 'Equilibra tu glucosa de forma natural.',
    focus: 'Metabolismo',
    use: 'Dos cápsulas al día, con los alimentos.',
    pack: '60 cápsulas · 30 días',
    ingredients: 'Gymnema, canela, nopal, berberina, ácido alfa lipoico, cromo.',
    cta: 'Quiero Centia',
    formula: 'Ver ingredientes',
    tone: 'centia',
    photo: '/centia.jpg?v=3',
    photoAlt: 'Frasco Ekilia Centia con nopal, canela y cápsulas',
    gallery: [
      {
        src: '/centia-botanica.png',
        alt: 'Nopal y canela sobre lino crema',
        caption: 'Origen botánico.',
      },
      {
        src: '/centia-toma.png',
        alt: 'Dos cápsulas en el plato, con pan y hojas',
        caption: 'Con los alimentos.',
      },
      {
        src: '/centia-ingredientes.png?v=3',
        alt: 'Frasco Centia junto a cápsulas, nopal y canela',
        caption: 'La fórmula, a la vista.',
      },
      {
        src: '/centia-manana.png?v=3',
        alt: 'Frasco Centia en la cocina, por la mañana',
        caption: 'Cada mañana.',
      },
    ],
    benefits: [
      { icon: 'balance', label: 'Equilibrio metabólico' },
      { icon: 'crave', label: 'Menos antojos' },
      { icon: 'energy', label: 'Más energía' },
    ],
    specs: [
      { k: 'Porción', v: '2 cápsulas' },
      { k: 'Momento', v: 'Con los alimentos' },
      { k: 'Envase', v: '60 cápsulas' },
      { k: 'Ciclo', v: '30 días' },
    ],
    nutrition: {
      serving: '2 cápsulas (1,000 mg)',
      servings: '30',
      rows: [
        { name: 'Gymnema sylvestre (hoja)', amount: '300 mg', vnr: '**' },
        { name: 'Canela (corteza)', amount: '250 mg', vnr: '**' },
        { name: 'Nopal (penca)', amount: '200 mg', vnr: '**' },
        { name: 'Berberina HCl', amount: '150 mg', vnr: '**' },
        { name: 'Ácido alfa lipoico', amount: '100 mg', vnr: '**' },
        { name: 'Cromo (picolinato)', amount: '100 mcg', vnr: '286%' },
      ],
    },
    other:
      'Celulosa microcristalina, cápsula vegetal (hipromelosa), estearato de magnesio.',
    marks: [
      { k: 'Origen', v: 'Hecho en México' },
      { k: 'Cápsula', v: 'Vegetal' },
      { k: 'Gluten', v: 'Sin gluten' },
      { k: 'OGM', v: 'Sin OGM' },
      { k: 'Calidad', v: 'GMP' },
      { k: 'Línea', v: 'Ingredientes naturales' },
    ],
    caution:
      'No excedas la porción. No se use en embarazo o lactancia. Si estás bajo tratamiento, habla con tu médico antes de empezar.',
    sister: { name: 'Nervia', href: '/nervia', label: 'Ver Nervia' },
  },
  {
    id: 'ekilia-nervia',
    slug: 'nervia',
    name: 'Nervia',
    line: 'Recupera el equilibrio',
    claim: 'Equilibra tu mente. Recupera tu bienestar.',
    focus: 'Descanso',
    use: 'Dos cápsulas al día, con los alimentos.',
    pack: '60 cápsulas · 30 días',
    ingredients: 'Pasiflora, valeriana, ashwagandha, magnesio, vitamina B6, melatonina.',
    cta: 'Quiero Nervia',
    formula: 'Ver ingredientes',
    tone: 'nervia',
    photo: '/nervia.jpg?v=3',
    photoAlt: 'Frasco Ekilia Nervia con pasiflora y cápsulas',
    gallery: [
      {
        src: '/nervia-botanica.png',
        alt: 'Pasiflora sobre lino crema',
        caption: 'Origen botánico.',
      },
      {
        src: '/nervia-toma.png',
        alt: 'Dos cápsulas junto a una taza de té',
        caption: 'Con los alimentos.',
      },
      {
        src: '/nervia-ingredientes.png?v=3',
        alt: 'Frasco Nervia junto a cápsulas y pasiflora',
        caption: 'La fórmula, a la vista.',
      },
      {
        src: '/nervia-noche.png?v=3',
        alt: 'Frasco Nervia en la mesa de noche',
        caption: 'Al cerrar el día.',
      },
    ],
    benefits: [
      { icon: 'rest', label: 'Mejor descanso' },
      { icon: 'calm', label: 'Menos estrés' },
      { icon: 'nerve', label: 'Bienestar nervioso' },
    ],
    specs: [
      { k: 'Porción', v: '2 cápsulas' },
      { k: 'Momento', v: 'Con los alimentos' },
      { k: 'Envase', v: '60 cápsulas' },
      { k: 'Ciclo', v: '30 días' },
    ],
    nutrition: {
      serving: '2 cápsulas (1,000 mg)',
      servings: '30',
      rows: [
        { name: 'Pasiflora (parte aérea)', amount: '250 mg', vnr: '**' },
        { name: 'Valeriana (raíz)', amount: '200 mg', vnr: '**' },
        { name: 'Ashwagandha (raíz)', amount: '200 mg', vnr: '**' },
        { name: 'Magnesio (óxido)', amount: '150 mg', vnr: '36%' },
        { name: 'Vitamina B6', amount: '10 mg', vnr: '588%' },
        { name: 'Melatonina', amount: '2 mg', vnr: '**' },
      ],
    },
    other:
      'Celulosa microcristalina, cápsula vegetal (hipromelosa), estearato de magnesio.',
    marks: [
      { k: 'Origen', v: 'Hecho en México' },
      { k: 'Cápsula', v: 'Vegetal' },
      { k: 'OGM', v: 'Sin OGM' },
      { k: 'Calidad', v: 'GMP' },
      { k: 'Línea', v: 'Ingredientes naturales' },
    ],
    caution:
      'No excedas la porción. No se use en embarazo o lactancia. Si estás bajo tratamiento, habla con tu médico antes de empezar.',
    sister: { name: 'Centia', href: '/centia', label: 'Ver Centia' },
  },
] as const;

export type ProductTone = (typeof PRODUCTS)[number]['tone'];
export type Product = (typeof PRODUCTS)[number];

export const getProduct = (slug: string) => PRODUCTS.find((item) => item.slug === slug);

export const NAV_PRODUCTS = [
  {
    label: PRODUCTS[0].name,
    href: `/${PRODUCTS[0].slug}`,
    claim: PRODUCTS[0].claim,
    tone: PRODUCTS[0].tone,
  },
  {
    label: PRODUCTS[1].name,
    href: `/${PRODUCTS[1].slug}`,
    claim: PRODUCTS[1].claim,
    tone: PRODUCTS[1].tone,
  },
] as const;

export const NAV_PAGES = [
  { label: 'Cómo funciona', href: '/como-funciona' },
  { label: 'Nosotros', href: '/sobre-nosotros' },
  { label: 'Contacto', href: '/contacto' },
] as const;

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  ...NAV_PRODUCTS.map(({ label, href }) => ({ label, href })),
  ...NAV_PAGES,
] as const;

export const FOOTER_LINKS = NAV_LINKS;

export const PAGES = {
  home: {
    title: 'Inicio',
    description: 'Ekilia. Nutrición para tu bienestar, con reposición periódica.',
  },
  centia: {
    title: 'Centia',
    description:
      'Centia. Suplemento alimenticio para el equilibrio metabólico. 60 cápsulas, reposición cada 30 días.',
  },
  nervia: {
    title: 'Nervia',
    description:
      'Nervia. Suplemento alimenticio para descanso y calma. 60 cápsulas, reposición cada 30 días.',
  },
  servicios: {
    title: 'Cómo funciona',
    description:
      'Eliges Centia o Nervia, llega un envase de 30 días y la reposición vuelve. Sin permanencia.',
  },
  about: {
    title: 'Nosotros',
    description:
      'Ekilia: suplementos alimenticios con reposición mensual. Qué somos y qué no pretendemos ser.',
  },
  contacto: {
    title: 'Contacto',
    description: 'Escribe a Ekilia a contacto@somosekilia.com: el envase, la reposición o tus datos.',
  },
  carrito: {
    title: 'Tu envase',
    description: 'Centia, Nervia, o las dos. 60 cápsulas, cada 30 días.',
  },
  reposicion: {
    title: 'Reposición',
    description:
      'Cómo llegas a los suplementos, qué pasa cuando se acaba el envase, y la fórmula: Centia, Nervia o las dos. Cada 30 días.',
  },
  cuenta: {
    title: 'Cuenta',
    description: 'Entra a tu cuenta Ekilia: la suscripción, la próxima entrega, el pedido y el comprobante.',
  },
  app: {
    title: 'App',
    description: 'Tu cuenta Ekilia.',
  },
  sistema: {
    title: 'Sistema',
    description: 'Sistema gráfico de Ekilia. Color, tipo, botones y reglas de uso.',
  },
  marca: {
    title: 'Marca',
    description: 'Wordmark, nombres y fotos de Ekilia para descargar, con fondo y sin fondo.',
  },
  terminos: {
    title: 'Términos y condiciones',
    description:
      'Aceptación, suplemento alimenticio, reposición, pago, envío y límite de responsabilidad de Ekilia.',
  },
  privacidad: {
    title: 'Política de privacidad',
    description:
      'Aviso de privacidad de Ekilia: datos, finalidades, encargados y derechos ARCO.',
  },
} as const;

export const HOW_PAGE = {
  h1: 'Cómo funciona.',
  lead: 'No es una compra suelta. Es un frasco de 30 días que vuelve a tu puerta.',
  steps: [
    {
      n: '1',
      title: 'Eliges.',
      body: 'Centia para el día a día del metabolismo, Nervia para el descanso y la calma, o las dos. El ritmo no cambia.',
      figure: 'eliges',
    },
    {
      n: '2',
      title: 'Llega.',
      body: 'Si el pago se confirma, sale un envase a tu puerta. El envío cubre México. Plazo y costo se confirman al empezar.',
      figure: 'llega',
    },
    {
      n: '3',
      title: 'Se repite.',
      body: 'Cada 30 días se prepara el siguiente frasco, salvo que pauses o canceles. No hay permanencia. El envase ya pagado se entrega.',
      figure: 'repite',
    },
  ],
  cycleTitle: 'Así se toma.',
  cycleLead: 'Centia y Nervia. La misma porción y el mismo envase.',
  specs: [
    { k: 'Porción', v: '2 cápsulas' },
    { k: 'Momento', v: 'Con los alimentos' },
    { k: 'Envase', v: '60 cápsulas' },
    { k: 'Ciclo', v: '30 días' },
    { k: 'Origen', v: 'Hecho en México' },
    { k: 'Envío', v: 'Todo México' },
  ],
  note: 'No excedas la porción. No se use en embarazo o lactancia. Si estás bajo tratamiento, habla con tu médico antes de empezar.',
  closeTitle: 'El siguiente frasco, sin pedirlo.',
  closeBody: 'Empieza con Centia o Nervia. Pausas o cancelas cuando lo indiques, desde tu cuenta o por Contacto.',
  primary: 'Empezar reposición',
  secondary: 'Contacto',
} as const;

export const CONTACT = {
  email: 'contacto@somosekilia.com',
  href: 'mailto:contacto@somosekilia.com',
} as const;

export const FACEBOOK = {
  label: 'Facebook',
  href: 'https://www.facebook.com/share/18uR7vZB8p/?mibextid=wwXIfr',
} as const;

export const SOCIAL = [
  {
    id: 'facebook',
    label: FACEBOOK.label,
    href: FACEBOOK.href,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/somosekilia',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@somosekilia',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@somosekilia',
  },
] as const;

export const LEGAL_LINKS = [
  { label: 'Términos y condiciones', href: '/terminos' },
  { label: 'Política de privacidad', href: '/privacidad' },
] as const;

export const DISCLAIMER =
  'Este producto es un suplemento alimenticio, no es un medicamento y no intenta diagnosticar, tratar, curar ni prevenir ninguna enfermedad. No sustituye una alimentación balanceada ni los tratamientos prescritos por su médico tratante.';

export const HOME_PAGE = {
  promise: {
    h2: 'Un suplemento. Un hábito. Un frasco que vuelve.',
    left: 'Ekilia no es farmacia, ni clínica, ni un milagro. No sustituye a tu médico ni a lo que ya te recetaron.',
    rightTitle: 'Llega cada mes.',
    rightClaim: 'Dos cápsulas al día, con los alimentos.',
    right: 'Es un suplemento alimenticio. Ciencia clara, origen botánico.',
  },
  choose: {
    h2: 'Dos fórmulas. Un mismo ritmo.',
    items: [
      {
        name: 'Centia',
        href: '/centia',
        claim: 'Para el día a día del metabolismo.',
        body: 'Gymnema, canela, nopal, berberina, ácido alfa lipoico, cromo.',
      },
      {
        name: 'Nervia',
        href: '/nervia',
        claim: 'Para el descanso y la calma.',
        body: 'Pasiflora, valeriana, ashwagandha, magnesio, B6, melatonina.',
      },
    ],
    note: 'Se pueden pedir juntas. El ritmo es el mismo: 30 días, luego otro envase.',
  },
  ritual: {
    h2: 'Así se toma.',
    same: 'Centia y Nervia. La misma porción y el mismo envase.',
    specs: [
      { k: 'Porción', v: '2 cápsulas' },
      { k: 'Momento', v: 'Con los alimentos' },
      { k: 'Envase', v: '60 cápsulas' },
      { k: 'Ciclo', v: '30 días' },
    ],
    note: 'No excedas la porción. Si estás bajo tratamiento, habla con tu médico antes de empezar.',
  },
  audience: {
    yesTitle: 'Para quién',
    yes: 'Para quien quiere un hábito mensual, claro, sin trámites. Complemento de la alimentación, no un recambio de receta.',
    noTitle: 'Para quién no',
    no: 'No en embarazo o lactancia. No como sustituto de un tratamiento. No si buscas un resultado milagroso en unos días.',
  },
  formula: {
    h2: 'Botánica, con dosis de etiqueta.',
    body: 'Cada ingrediente está en el envase, con su miligramo. Sin misterio en la fórmula.',
    marks: [
      { k: 'Origen', v: 'Hecho en México' },
      { k: 'Cápsula', v: 'Vegetal' },
      { k: 'Gluten', v: 'Sin gluten' },
      { k: 'OGM', v: 'Sin OGM' },
      { k: 'Calidad', v: 'GMP' },
      { k: 'Línea', v: 'Ingredientes naturales' },
    ],
  },
  steps: {
    id: 'como-funciona',
    h2: 'Tres pasos. Luego, se sostiene.',
    lead: 'No es una compra suelta. Es un frasco de 30 días que vuelve a tu puerta.',
    items: [
      {
        n: '1',
        title: 'Eliges.',
        body: 'Centia, Nervia, o ambos.',
      },
      {
        n: '2',
        title: 'Llega.',
        body: 'Un envase, a tu puerta.',
      },
      {
        n: '3',
        title: 'Se repite.',
        body: 'Otro frasco al mes.',
      },
    ],
  },
  reviews: {
    h2: 'Lo que se nota es el hábito.',
    items: [
      {
        quote: 'El frasco llega sin que yo tenga que acordarme. Eso es lo que me importa.',
        name: 'Laura',
        place: 'Ciudad de México',
      },
      {
        quote: 'Lo tomo con el desayuno. Es parte del día, no un trámite extra.',
        name: 'Diego',
        place: 'Guadalajara',
      },
      {
        quote: 'Me siento más constante. Nada milagroso: un hábito que se sostiene.',
        name: 'Carmen',
        place: 'Monterrey',
      },
    ],
  },
  faq: {
    h2: 'Preguntas claras.',
    items: [
      {
        q: '¿Ekilia es un medicamento?',
        a: 'No. Es un suplemento alimenticio. No diagnostica, trata, cura ni previene ninguna enfermedad, y no sustituye lo que te recete tu médico.',
      },
      {
        q: '¿Cómo llega cada mes?',
        a: 'Eliges el producto y la reposición. Cada 30 días sale un envase nuevo hacia tu puerta. No tienes que volver a pedir si no quieres.',
      },
      {
        q: '¿Puedo pausar o cancelar?',
        a: 'Sí. La reposición se pausa o se cancela cuando tú lo indiques. No hay permanencia.',
      },
      {
        q: '¿Puedo tomar Centia y Nervia juntos?',
        a: 'Sí. Son fórmulas distintas: Centia para el equilibrio cotidiano de tu metabolismo, Nervia para descanso y calma. Si estás bajo tratamiento, consulta a tu médico antes.',
      },
      {
        q: '¿Quién no debe tomarlo?',
        a: 'No se use en embarazo o lactancia. Si estás bajo tratamiento médico, habla con tu médico antes de empezar. No excedas dos cápsulas al día.',
      },
      {
        q: '¿Envían a todo México?',
        a: 'Sí. El envase sale hecho en México. El detalle de envío se confirma al empezar la reposición.',
      },
    ],
  },
  close: {
    h2: 'El siguiente frasco, sin pedirlo.',
    body: 'Empieza con Centia o Nervia. Cada mes, en tu puerta.',
    primary: 'Empezar reposición',
    secondary: 'Ver Centia',
  },
} as const;

export const SYSTEM = {
  colors: [
    {
      name: 'Hueso',
      role: 'Claridad',
      hex: '#F6F3EE',
      rgb: '246, 243, 238',
      hsl: '38, 31%, 95%',
      use: 'Fondo. Blanco hueso, no un blanco puro.',
      on: 'ink',
    },
    {
      name: 'Azul',
      role: 'Confianza',
      hex: '#0E6E9E',
      rgb: '14, 110, 158',
      hsl: '200, 84%, 34%',
      use: 'Primario. Menú, Centia, enredaderas sobre hueso, pulgar del scroll.',
      on: 'cream',
    },
    {
      name: 'Turquesa',
      role: 'Naturaleza',
      hex: '#0F6468',
      rgb: '15, 100, 104',
      hsl: '183, 75%, 23%',
      use: 'Complemento. Franja de reposición y bloom.',
      on: 'cream',
    },
    {
      name: 'Mora',
      role: 'Equilibrio',
      hex: '#3E2770',
      rgb: '62, 39, 112',
      hsl: '259, 48%, 30%',
      use: 'Acento. Nervia. Innovación después.',
      on: 'cream',
    },
  ],
  type: {
    display: 'Fraunces',
    body: 'Outfit',
    weights: '500 y 600 en Fraunces. 400 y 600 en Outfit.',
  },
  rules: [
    'Placas, no tarjetas. Cero radio.',
    'Dos familias: Fraunces para lo que se lee como título, Outfit para lo que se usa.',
    'El corte de color es la estructura. No lo decoras con sombras.',
    'Un campo de color no toca otro del mismo color, ni al lado ni arriba ni abajo.',
    'Las enredaderas no se montan sobre el texto ni encima de la foto.',
    'Un CTA dice lo que ocurre: Empezar reposición, no Enviar.',
    'Las placas entran desde los lados, una vez. Hero ya está en pantalla: no entra.',
  ],
  avoid: ['Rosa, naranja o terracota', 'Verde bosque de la paleta anterior', 'Amarillo de marca', 'Botones redondos', 'Hamburguesa genérica'],
} as const;
