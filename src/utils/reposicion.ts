export const REPO_KEY = 'ekilia-reposicion';

export const STANCES = [
  {
    id: 'known',
    label: 'Ya tomo uno y lo repongo yo',
  },
  {
    id: 'looking',
    label: 'Quiero ver el frasco antes de empezar',
  },
  {
    id: 'unsure',
    label: 'No me convencen, y entré a mirar',
  },
] as const;

export const HABITS = [
  {
    id: 'late',
    label: 'Tardo en comprar otro',
    payoff: 'El siguiente envase sale solo, cada 30 días.',
  },
  {
    id: 'drop',
    label: 'Empiezo y a las dos semanas lo dejo',
    payoff: 'Un ciclo. Lo pausas desde tu cuenta, sin llamar a nadie.',
  },
  {
    id: 'steady',
    label: 'Ya soy constante, solo quiero que llegue',
    payoff: 'Mismo ritmo. Tú no persigues el pedido.',
  },
] as const;

export const FORMULAS = [
  {
    id: 'centia',
    name: 'Centia',
    line: 'Gymnema, canela, nopal, berberina.',
    summary: 'Centia. 60 cápsulas, cada 30 días.',
    photo: '/centia.jpg?v=3',
    photoAlt: '',
  },
  {
    id: 'nervia',
    name: 'Nervia',
    line: 'Pasiflora, valeriana, ashwagandha.',
    summary: 'Nervia. 60 cápsulas, cada 30 días.',
    photo: '/nervia.jpg?v=3',
    photoAlt: '',
  },
  {
    id: 'both',
    name: 'Las dos',
    line: 'Un envase de cada fórmula. El mismo ciclo.',
    summary: 'Centia y Nervia. Un envase de cada una, cada 30 días.',
    photo: '',
    photoAlt: '',
  },
] as const;

export const REPO_STEPS = ['stance', 'habit', 'formula', 'cycle'] as const;

export type StanceId = (typeof STANCES)[number]['id'];
export type HabitId = (typeof HABITS)[number]['id'];
export type FormulaId = (typeof FORMULAS)[number]['id'];
export type RepoStep = (typeof REPO_STEPS)[number];

export interface RepoState {
  stance: StanceId | null;
  habit: HabitId | null;
  formula: FormulaId | null;
  step: number;
  complete: boolean;
}

const isStance = (value: unknown): value is StanceId =>
  STANCES.some((item) => item.id === value);

const isHabit = (value: unknown): value is HabitId => HABITS.some((item) => item.id === value);

const isFormula = (value: unknown): value is FormulaId =>
  FORMULAS.some((item) => item.id === value);

export const emptyRepo = (): RepoState => ({
  stance: null,
  habit: null,
  formula: null,
  step: 0,
  complete: false,
});

export const readRepo = (): RepoState | null => {
  try {
    const raw = sessionStorage.getItem(REPO_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<RepoState>;
    return {
      stance: isStance(data.stance) ? data.stance : null,
      habit: isHabit(data.habit) ? data.habit : null,
      formula: isFormula(data.formula) ? data.formula : null,
      step: typeof data.step === 'number' ? data.step : 0,
      complete: data.complete === true,
    };
  } catch {
    return null;
  }
};

export const writeRepo = (state: RepoState) => {
  try {
    sessionStorage.setItem(REPO_KEY, JSON.stringify(state));
  } catch {
    /* modo privado */
  }
};

export const clearRepo = () => {
  try {
    sessionStorage.removeItem(REPO_KEY);
  } catch {
    /* modo privado */
  }
};

export const stanceById = (id: StanceId | null) => STANCES.find((item) => item.id === id);
export const habitById = (id: HabitId | null) => HABITS.find((item) => item.id === id);
export const formulaById = (id: FormulaId | null) => FORMULAS.find((item) => item.id === id);
