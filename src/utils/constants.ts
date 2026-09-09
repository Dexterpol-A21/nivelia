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
  sistema: {
    title: 'Sistema',
    description: 'Sistema gráfico de Glyv. Color, tipo, botones y reglas de uso.',
  },
} as const;

export const DISCLAIMER =
  'Este producto es un suplemento alimenticio, no es un medicamento y no intenta diagnosticar, tratar, curar ni prevenir ninguna enfermedad. No sustituye una alimentación balanceada ni los tratamientos prescritos por su médico tratante.';

export const HOME_PAGE = {
  promise: {
    kicker: 'Qué es',
    h2: 'Un suplemento. Un hábito. Un frasco que vuelve.',
    left: 'Glyv no es farmacia, ni clínica, ni un milagro. No sustituye a tu médico ni a lo que ya te recetaron.',
    right: 'Es un suplemento alimenticio que llega cada mes. Dos cápsulas al día, con los alimentos. Ciencia clara, origen botánico.',
  },
  choose: {
    h2: 'Dos fórmulas. Un mismo ritmo.',
    items: [
      {
        name: 'Centia',
        href: '/#glyv-centia',
        claim: 'Para el día a día del metabolismo.',
        body: 'Gymnema, canela, nopal, berberina, ácido alfa lipoico, cromo.',
      },
      {
        name: 'Nervia',
        href: '/#glyv-nervia',
        claim: 'Para el descanso y la calma.',
        body: 'Pasiflora, valeriana, ashwagandha, magnesio, B6, melatonina.',
      },
    ],
    note: 'Se pueden pedir juntas. El ritmo es el mismo: 30 días, luego otro envase.',
  },
  ritual: {
    h2: 'Así se toma.',
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
        body: 'Centia, Nervia, o ambos. Dos cápsulas al día, con los alimentos.',
      },
      {
        n: '2',
        title: 'Llega.',
        body: 'Un envase, 60 cápsulas, 30 días. Hecho en México, sin que tengas que ir a buscarlo.',
      },
      {
        n: '3',
        title: 'Se repite.',
        body: 'Al mes siguiente, otro frasco. Pausas o cancelas cuando quieras.',
      },
    ],
    cta: 'Empezar reposición',
    secondary: 'Ver el detalle',
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
        q: '¿Glyv es un medicamento?',
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
  paths: {
    h2: 'Sigue por aquí.',
    items: [
      {
        title: 'Cómo funciona',
        body: 'La reposición, el envase, lo que pasa al mes 2.',
        href: '/servicios',
        label: 'Ver el detalle',
      },
      {
        title: 'Nosotros',
        body: 'Por qué Glyv existe y qué no pretende ser.',
        href: '/sobre-nosotros',
        label: 'Conocer Glyv',
      },
      {
        title: 'Contacto',
        body: 'Una duda, un pedido, un comienzo.',
        href: '/contacto',
        label: 'Escribir',
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
    { name: 'Crema', hex: '#F4EFE6', use: 'Campos claros, fotos de Centia, riel del menú.' },
    { name: 'Crema profunda', hex: '#EBE4D4', use: 'Primera capa del bloom. Nunca como marca sola.' },
    { name: 'Bosque', hex: '#1E4A32', use: 'Texto sobre crema, placas de Centia, botón Menú.' },
    { name: 'Petróleo', hex: '#0B4F6C', use: 'Nervia, franja de reposición, hover de la barra.' },
    { name: 'Petróleo profundo', hex: '#083D54', use: 'Foto de Nervia. Un tono, no una paleta extra.' },
    { name: 'Tinta', hex: '#1A2A22', use: 'Wordmark y cuerpo sobre crema.' },
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
    'Las enredaderas no se montan sobre el texto ni encima de la foto.',
    'Un CTA dice lo que ocurre: Empezar reposición, no Enviar.',
  ],
  avoid: ['Rosa o morado', 'Amarillo de marca', 'Naranja o terracota', 'Botones redondos', 'Hamburguesa genérica'],
} as const;
