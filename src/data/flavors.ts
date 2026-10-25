export interface Flavor {
  id: string
  name: string
  tagline: string
  description: string
  ingredients: string[]
  /** grams per can */
  sugar: number
  calories: number
  /** 0–100 perceived energy level */
  energy: number
  /** mg per can */
  caffeine: number
  accent: string
  accent2: string
  /** can body gradient */
  can: string
  canDark: string
}

export const flavors: Flavor[] = [
  {
    id: 'blaze-orange',
    name: 'Blaze Orange',
    tagline: 'Sun-ripened citrus with a spark.',
    description:
      'Our signature. Cold-pressed blood orange meets a bright citrus zest and a clean, long-lasting lift that never crashes.',
    ingredients: ['Blood orange', 'Natural caffeine', 'Stevia leaf', 'B vitamins', 'Sea salt'],
    sugar: 0,
    calories: 5,
    energy: 82,
    caffeine: 160,
    accent: '#ff6a1a',
    accent2: '#ffb020',
    can: '#ff6a1a',
    canDark: '#3a1203',
  },
  {
    id: 'electric-lime',
    name: 'Electric Lime',
    tagline: 'Sharp. Zesty. Wide awake.',
    description:
      'A crackling hit of key lime and green tea extract. Crisp, tart and ridiculously refreshing over ice.',
    ingredients: ['Key lime', 'Green tea extract', 'Stevia leaf', 'Electrolytes', 'B vitamins'],
    sugar: 0,
    calories: 5,
    energy: 76,
    caffeine: 150,
    accent: '#9dff2e',
    accent2: '#e6ff4a',
    can: '#6fd414',
    canDark: '#0f2a03',
  },
  {
    id: 'arctic-blue',
    name: 'Arctic Blue',
    tagline: 'Cool focus, frozen in a can.',
    description:
      'Blue raspberry and a whisper of peppermint for an icy, glacier-clear boost that keeps your head cool and sharp.',
    ingredients: ['Blue raspberry', 'Peppermint', 'Natural caffeine', 'Stevia leaf', 'Magnesium'],
    sugar: 0,
    calories: 5,
    energy: 70,
    caffeine: 140,
    accent: '#38b6ff',
    accent2: '#7df9ff',
    can: '#1c8fe0',
    canDark: '#021a33',
  },
  {
    id: 'berry-storm',
    name: 'Berry Storm',
    tagline: 'Dark berries. Loud energy.',
    description:
      'Blackcurrant, blueberry and acai swirl together into a deep, jammy flavor with a bold, thunderous finish.',
    ingredients: ['Blackcurrant', 'Blueberry', 'Acai', 'Natural caffeine', 'Stevia leaf'],
    sugar: 1,
    calories: 10,
    energy: 88,
    caffeine: 180,
    accent: '#a45cff',
    accent2: '#ff5cf0',
    can: '#7a2fe0',
    canDark: '#1a0638',
  },
  {
    id: 'cherry-rush',
    name: 'Cherry Rush',
    tagline: 'Bold, juicy, unstoppable.',
    description:
      'Tart Montmorency cherry with a hint of vanilla. A full-throttle flavor for the days that refuse to slow down.',
    ingredients: ['Montmorency cherry', 'Vanilla', 'Natural caffeine', 'Stevia leaf', 'Potassium'],
    sugar: 0,
    calories: 5,
    energy: 92,
    caffeine: 200,
    accent: '#ff2e4d',
    accent2: '#ff8a5c',
    can: '#e0112f',
    canDark: '#35030c',
  },
  {
    id: 'solar-mango',
    name: 'Solar Mango',
    tagline: 'Golden hour, on demand.',
    description:
      'Alphonso mango and passion fruit in perfect harmony. Silky, tropical and endlessly drinkable.',
    ingredients: ['Alphonso mango', 'Passion fruit', 'Natural caffeine', 'Stevia leaf', 'B vitamins'],
    sugar: 1,
    calories: 10,
    energy: 74,
    caffeine: 150,
    accent: '#ffc21a',
    accent2: '#ff8f1a',
    can: '#f5a800',
    canDark: '#331f00',
  },
  {
    id: 'mint-frost',
    name: 'Mint Frost',
    tagline: 'Clean, calm, collected power.',
    description:
      'Spearmint, cucumber and a squeeze of lemon. The lightest, most hydrating way to power a long afternoon.',
    ingredients: ['Spearmint', 'Cucumber', 'Lemon', 'Natural caffeine', 'Electrolytes'],
    sugar: 0,
    calories: 0,
    energy: 62,
    caffeine: 120,
    accent: '#2effc4',
    accent2: '#5cffea',
    can: '#12c9a0',
    canDark: '#022a22',
  },
  {
    id: 'peach-fizz',
    name: 'Peach Fizz',
    tagline: 'Soft, sparkling, sunny.',
    description:
      'White peach and rose petal bubbles. A gentle, floral energy that feels like a summer evening in a can.',
    ingredients: ['White peach', 'Rose petal', 'Natural caffeine', 'Stevia leaf', 'B vitamins'],
    sugar: 1,
    calories: 10,
    energy: 66,
    caffeine: 130,
    accent: '#ff7ab8',
    accent2: '#ffb38a',
    can: '#ff4f9a',
    canDark: '#380a1f',
  },
]
