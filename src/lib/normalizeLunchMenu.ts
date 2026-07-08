import type { LunchMenuData, LunchMenuDay, MenuMeal } from '@/types/content'

export const MENU_FORWARD_WORKDAYS = 10

function emptyMeal(id: string): MenuMeal {
  return { id, name: '', description: '' }
}

function normalizeDay(day: LunchMenuDay, index: number, date: Date): LunchMenuDay {
  const label =
    day.label ||
    new Intl.DateTimeFormat('cs-CZ', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
    }).format(date)

  const existingMains = day.rotatingMains ?? []
  const mainsCount = existingMains.length > 0 ? existingMains.length : 3
  const rotatingMains = Array.from({ length: mainsCount }, (_, i) => {
    const existing = existingMains[i]
    return existing?.id
      ? { ...emptyMeal(`main-${index}-${i}`), ...existing }
      : emptyMeal(`main-${index}-${i}`)
  })

  return {
    id: day.id || date.toISOString().slice(0, 10),
    label,
    closed: day.closed === true,
    soup: day.soup?.id
      ? { ...emptyMeal(`soup-${index}`), ...day.soup }
      : emptyMeal(`soup-${index}`),
    rotatingMains,
  }
}

export function buildWorkdayWindow(startDate = new Date(), count = MENU_FORWARD_WORKDAYS): LunchMenuDay[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + index)
    return normalizeDay(
      {
        id: date.toISOString().slice(0, 10),
        label: '',
        soup: emptyMeal(`soup-${index}`),
        rotatingMains: [emptyMeal(`main-${index}-0`), emptyMeal(`main-${index}-1`), emptyMeal(`main-${index}-2`)],
      },
      index,
      date,
    )
  })
}

export function normalizeLunchMenu(raw: LunchMenuData | null | undefined): LunchMenuData {
  const startKey = raw?.menuFirstWorkdayKey ?? new Date().toISOString().slice(0, 10)
  const startDate = new Date(`${startKey}T12:00:00`)
  const template = buildWorkdayWindow(startDate)
  const byId = new Map((raw?.days ?? []).map((day) => [day.id, day]))

  return {
    title: raw?.title ?? 'Polední menu',
    menuFirstWorkdayKey: startKey,
    days: template.map((fallback) => {
      const existing = byId.get(fallback.id)
      return existing ? normalizeDay(existing, 0, new Date(`${fallback.id}T12:00:00`)) : fallback
    }),
    updatedAt: raw?.updatedAt,
  }
}

export function emptyLunchMenu(): LunchMenuData {
  const today = new Date()
  return normalizeLunchMenu({
    title: 'Polední menu',
    menuFirstWorkdayKey: today.toISOString().slice(0, 10),
    days: [],
  })
}
