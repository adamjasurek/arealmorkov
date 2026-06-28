import { useQuery } from '@tanstack/react-query'
import type {
  DrinksMenuData,
  FoodMenuData,
  MenuPdfsData,
  SiteContentData,
  WaterTempData,
  WeekendMenuData,
} from '@/types/content'
import { defaultMenuPdfs } from '@/lib/menuPdfDefaults'
import {
  defaultDrinksMenu,
  defaultFoodMenu,
  defaultLunchMenu,
  defaultSiteContent,
  defaultWaterTemp,
  defaultWeekendMenu,
} from '@/lib/contentDefaults'
import { normalizeLunchMenu } from '@/lib/normalizeLunchMenu'

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(path)
    if (!response.ok) return fallback
    return (await response.json()) as T
  } catch {
    return fallback
  }
}

export function usePublicWaterTemp() {
  return useQuery({
    queryKey: ['public', 'water-temp'],
    queryFn: async (): Promise<WaterTempData> => {
      try {
        const response = await fetch('/api/public/water-temp')
        if (response.ok) {
          return (await response.json()) as WaterTempData
        }
      } catch {
        /* fallback */
      }
      return fetchJson('/data/water-temp.json', defaultWaterTemp)
    },
    refetchInterval: 60_000,
  })
}

export function usePublicFoodMenu() {
  return useQuery({
    queryKey: ['public', 'food-menu'],
    queryFn: () => fetchJson<FoodMenuData>('/data/food-menu.json', defaultFoodMenu),
  })
}

export function usePublicDrinksMenu() {
  return useQuery({
    queryKey: ['public', 'drinks-menu'],
    queryFn: () => fetchJson<DrinksMenuData>('/data/drinks-menu.json', defaultDrinksMenu),
  })
}

export function usePublicLunchMenu() {
  return useQuery({
    queryKey: ['public', 'lunch-menu'],
    queryFn: async () => normalizeLunchMenu(await fetchJson('/data/lunch-menu.json', defaultLunchMenu)),
  })
}

export function usePublicWeekendMenu() {
  return useQuery({
    queryKey: ['public', 'weekend-menu'],
    queryFn: () => fetchJson<WeekendMenuData>('/data/weekend-menu.json', defaultWeekendMenu),
  })
}

export function usePublicSiteContent() {
  return useQuery({
    queryKey: ['public', 'site-content'],
    queryFn: () => fetchJson<SiteContentData>('/data/site-content.json', defaultSiteContent),
  })
}

export function usePublicMenuPdfs() {
  return useQuery({
    queryKey: ['public', 'menu-pdfs'],
    queryFn: () => fetchJson<MenuPdfsData>('/data/menu-pdfs.json', defaultMenuPdfs),
  })
}
