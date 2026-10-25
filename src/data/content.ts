import type { IconType } from 'react-icons'
import {
  LuBrain,
  LuDroplets,
  LuHeartPulse,
  LuLeaf,
  LuPill,
  LuRecycle,
  LuSnowflake,
  LuZap,
  LuCoffee,
  LuAtom,
} from 'react-icons/lu'

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'flavors', label: 'Flavors' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
] as const

export const marqueeWords = [
  'Zero Sugar',
  'Natural Caffeine',
  'B Vitamins',
  'Electrolytes',
  'Plant Based',
  'No Crash',
  'Recyclable Can',
  'Eight Flavors',
]

export interface Feature {
  icon: IconType
  title: string
  text: string
}

export const features: Feature[] = [
  {
    icon: LuZap,
    title: 'Clean, Steady Energy',
    text: 'Natural caffeine and L-theanine deliver a smooth lift for hours, with none of the jitters or the 3 pm crash.',
  },
  {
    icon: LuLeaf,
    title: 'Zero Sugar, Full Flavor',
    text: 'Sweetened only with stevia leaf extract. Bold, real fruit flavor with 0–1 g of sugar per can.',
  },
  {
    icon: LuBrain,
    title: 'Built for Focus',
    text: 'A thoughtful blend of B vitamins and green tea extract to keep your mind sharp through long days.',
  },
  {
    icon: LuDroplets,
    title: 'Hydration Boost',
    text: 'Added electrolytes (sodium, potassium and magnesium) help you stay hydrated while you perform.',
  },
  {
    icon: LuSnowflake,
    title: 'Crisp & Cold-Crafted',
    text: 'Flash-chilled and lightly sparkling for a clean, refreshing taste straight from the fridge.',
  },
  {
    icon: LuRecycle,
    title: 'Infinitely Recyclable',
    text: 'Every can is 100% aluminum and endlessly recyclable. Better for you, kinder to the planet.',
  },
]

export interface Ingredient {
  icon: IconType
  name: string
  amount: string
  short: string
  detail: string
}

export const ingredients: Ingredient[] = [
  {
    icon: LuLeaf,
    name: 'Stevia',
    amount: '0 g sugar',
    short: 'Plant-powered sweetness.',
    detail:
      'Extracted from the leaves of the Stevia rebaudiana plant, it is up to 300× sweeter than sugar with zero calories and no blood-sugar spike.',
  },
  {
    icon: LuCoffee,
    name: 'Natural Caffeine',
    amount: '120–200 mg',
    short: 'Green tea & guarana.',
    detail:
      'Sourced from green tea leaves and guarana seeds, natural caffeine is released gradually for a smoother, longer-lasting lift.',
  },
  {
    icon: LuPill,
    name: 'B Vitamins',
    amount: 'B3 · B6 · B12',
    short: 'Fuel for your metabolism.',
    detail:
      'Niacin, pyridoxine and cobalamin help your body convert food into usable energy and support normal nervous-system function.',
  },
  {
    icon: LuAtom,
    name: 'Electrolytes',
    amount: 'Na · K · Mg',
    short: 'Hydration, built in.',
    detail:
      'A balanced trio of sodium, potassium and magnesium helps replace what you lose, so you stay sharp from the first sip to the last.',
  },
]

export const nutritionFacts = [
  { label: 'Total Fat', value: '0 g', dv: '0%' },
  { label: 'Sodium', value: '90 mg', dv: '4%' },
  { label: 'Potassium', value: '120 mg', dv: '3%' },
  { label: 'Magnesium', value: '40 mg', dv: '10%' },
  { label: 'Protein', value: '0 g', dv: '' },
  { label: 'Niacin (B3)', value: '20 mg', dv: '125%' },
  { label: 'Vitamin B6', value: '2 mg', dv: '120%' },
  { label: 'Vitamin B12', value: '6 mcg', dv: '250%' },
]

export interface Testimonial {
  name: string
  role: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Maya Okafor',
    role: 'Product Designer',
    quote:
      'I switched from my usual cans and never looked back. Blaze Orange tastes like real fruit and the energy is smooth. No crash, no jitters.',
    rating: 5,
  },
  {
    name: 'Jonas Lindqvist',
    role: 'Marathon Runner',
    quote:
      'Arctic Blue is my pre-run ritual. The electrolytes are a game-changer, and knowing it has zero sugar makes it an easy choice.',
    rating: 5,
  },
  {
    name: 'Priya Raman',
    role: 'Software Engineer',
    quote:
      'Cherry Rush gets me through long debugging sessions. Strong flavor, strong focus, and a can that looks incredible on my desk.',
    rating: 5,
  },
  {
    name: 'Diego Alvarez',
    role: 'Fitness Coach',
    quote:
      'I recommend EMBER to my clients all the time. Clean ingredients, honest labeling, and Mint Frost is dangerously drinkable.',
    rating: 4,
  },
  {
    name: 'Hannah Weiss',
    role: 'Medical Student',
    quote:
      'Berry Storm keeps me going through night shifts without the sugar bomb. Deep, jammy flavor and a steady lift that lasts.',
    rating: 5,
  },
]

export const faqs = [
  {
    q: 'How much caffeine is in each can?',
    a: 'Each 250 ml can contains between 120 mg and 200 mg of natural caffeine depending on the flavor, sourced from green tea and guarana. Exact amounts are listed in the Nutrition section.',
  },
  {
    q: 'Is EMBER really zero sugar?',
    a: 'Yes. Most flavors contain 0 g of added sugar, and the rest contain 1 g or less that comes naturally from real fruit extracts. Sweetness comes from stevia leaf extract.',
  },
  {
    q: 'Is it suitable for vegans?',
    a: 'All eight flavors are 100% plant-based, gluten-free and free from artificial colors, flavors and preservatives.',
  },
  {
    q: 'How many cans can I drink per day?',
    a: 'We recommend no more than two cans per day (about 400 mg of caffeine in total). EMBER is not recommended for children, pregnant or nursing women, or people sensitive to caffeine.',
  },
  {
    q: 'Where can I buy EMBER?',
    a: 'EMBER is available online with free shipping on orders over $40, and in selected grocery and fitness stores. Use the contact form to ask about wholesale and distribution.',
  },
  {
    q: 'Are the cans recyclable?',
    a: 'Absolutely. Our cans are made from 100% aluminum, which can be recycled endlessly without losing quality. Please recycle responsibly.',
  },
]

export const stats = [
  { value: 0, suffix: 'g', label: 'Sugar in most flavors' },
  { value: 200, suffix: 'mg', label: 'Max natural caffeine' },
  { value: 8, suffix: '', label: 'Distinct flavors' },
  { value: 100, suffix: '%', label: 'Recyclable aluminum' },
]
