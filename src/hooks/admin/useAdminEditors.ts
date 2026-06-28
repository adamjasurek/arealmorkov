import { defaultDrinksMenu, defaultFoodMenu, defaultLunchMenu, defaultSiteContent, defaultWaterTemp, defaultWeekendMenu } from '@/lib/contentDefaults'
import { normalizeLunchMenu } from '@/lib/normalizeLunchMenu'
import { defaultMenuPdfs } from '@/lib/menuPdfDefaults'
import { useAdminContent } from '@/hooks/admin/useAdminContent'

export function useAdminWaterTemp() {
  return useAdminContent({
    key: 'water-temp',
    queryKey: ['admin', 'water-temp'],
    empty: () => ({ ...defaultWaterTemp }),
    saveToast: 'live',
  })
}

export function useAdminFoodMenu() {
  return useAdminContent({
    key: 'food-menu',
    queryKey: ['admin', 'food-menu'],
    empty: () => ({ ...defaultFoodMenu }),
  })
}

export function useAdminDrinksMenu() {
  return useAdminContent({
    key: 'drinks-menu',
    queryKey: ['admin', 'drinks-menu'],
    empty: () => ({ ...defaultDrinksMenu }),
  })
}

export function useAdminLunchMenu() {
  return useAdminContent({
    key: 'lunch-menu',
    queryKey: ['admin', 'lunch-menu'],
    empty: () => ({ ...defaultLunchMenu }),
    normalize: normalizeLunchMenu,
  })
}

export function useAdminWeekendMenu() {
  return useAdminContent({
    key: 'weekend-menu',
    queryKey: ['admin', 'weekend-menu'],
    empty: () => ({ ...defaultWeekendMenu }),
  })
}

export function useAdminSiteContent() {
  return useAdminContent({
    key: 'site',
    queryKey: ['admin', 'site-content'],
    empty: () => ({ ...defaultSiteContent }),
  })
}

export function useAdminMenuPdfs() {
  return useAdminContent({
    key: 'menu-pdfs',
    queryKey: ['admin', 'menu-pdfs'],
    empty: () => ({ ...defaultMenuPdfs }),
    saveToast: 'default',
  })
}
