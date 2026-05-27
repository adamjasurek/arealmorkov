import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY_MAIN = 'areal-morkov-water-temp'
const STORAGE_KEY_WADING = 'areal-morkov-wading-temp'
const STORAGE_KEY_UPDATED_AT = 'areal-morkov-water-temp-updated-at'
const DEFAULT_MAIN_TEMP = 24

function readMainTemp(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MAIN)
    if (raw == null) return DEFAULT_MAIN_TEMP
    const n = Number.parseFloat(raw)
    return Number.isFinite(n) ? n : DEFAULT_MAIN_TEMP
  } catch {
    return DEFAULT_MAIN_TEMP
  }
}

function readWadingTemp(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WADING)
    if (raw == null || raw.trim() === '') return null
    const n = Number.parseFloat(raw)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

function readUpdatedAt(): Date | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_UPDATED_AT)
    if (raw == null || raw.trim() === '') return null
    const ms = Number.parseInt(raw, 10)
    if (!Number.isFinite(ms)) return null
    const d = new Date(ms)
    return Number.isNaN(d.getTime()) ? null : d
  } catch {
    return null
  }
}

export function useWaterTemp() {
  const [temp, setTempState] = useState<number>(() =>
    typeof window !== 'undefined' ? readMainTemp() : DEFAULT_MAIN_TEMP,
  )
  const [wadingTemp, setWadingTempState] = useState<number | null>(() =>
    typeof window !== 'undefined' ? readWadingTemp() : null,
  )
  const [updatedAt, setUpdatedAtState] = useState<Date | null>(() =>
    typeof window !== 'undefined' ? readUpdatedAt() : null,
  )

  useEffect(() => {
    setTempState(readMainTemp())
    setWadingTempState(readWadingTemp())
    setUpdatedAtState(readUpdatedAt())
  }, [])

  const setTemp = useCallback((value: number) => {
    const clamped = Math.min(45, Math.max(0, value))
    localStorage.setItem(STORAGE_KEY_MAIN, String(clamped))
    localStorage.setItem(STORAGE_KEY_UPDATED_AT, String(Date.now()))
    setTempState(clamped)
    setUpdatedAtState(new Date())
    window.dispatchEvent(new CustomEvent('water-temp-updated'))
  }, [])

  const setWadingTemp = useCallback((value: number | null) => {
    if (value == null) {
      localStorage.removeItem(STORAGE_KEY_WADING)
      localStorage.setItem(STORAGE_KEY_UPDATED_AT, String(Date.now()))
      setWadingTempState(null)
      setUpdatedAtState(new Date())
      window.dispatchEvent(new CustomEvent('water-temp-updated'))
      return
    }

    const clamped = Math.min(45, Math.max(0, value))
    localStorage.setItem(STORAGE_KEY_WADING, String(clamped))
    localStorage.setItem(STORAGE_KEY_UPDATED_AT, String(Date.now()))
    setWadingTempState(clamped)
    setUpdatedAtState(new Date())
    window.dispatchEvent(new CustomEvent('water-temp-updated'))
  }, [])

  useEffect(() => {
    const onUpdate = () => {
      setTempState(readMainTemp())
      setWadingTempState(readWadingTemp())
      setUpdatedAtState(readUpdatedAt())
    }
    window.addEventListener('water-temp-updated', onUpdate)
    window.addEventListener('storage', onUpdate)
    return () => {
      window.removeEventListener('water-temp-updated', onUpdate)
      window.removeEventListener('storage', onUpdate)
    }
  }, [])

  return { temp, setTemp, wadingTemp, setWadingTemp, updatedAt }
}
