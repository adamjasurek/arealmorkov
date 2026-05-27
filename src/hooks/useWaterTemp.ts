import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY_MAIN = 'areal-morkov-water-temp'
const STORAGE_KEY_WADING = 'areal-morkov-wading-temp'
const STORAGE_KEY_UPDATED_AT = 'areal-morkov-water-temp-updated-at'
const STORAGE_SCHEMA_KEY = 'areal-morkov-water-temp-schema'
const STORAGE_SCHEMA = 2

function migrateStorage() {
  try {
    if (localStorage.getItem(STORAGE_SCHEMA_KEY) === String(STORAGE_SCHEMA)) return
    localStorage.removeItem(STORAGE_KEY_MAIN)
    localStorage.removeItem(STORAGE_KEY_WADING)
    localStorage.removeItem(STORAGE_KEY_UPDATED_AT)
    localStorage.setItem(STORAGE_SCHEMA_KEY, String(STORAGE_SCHEMA))
  } catch {
    /* ignore */
  }
}

function readMainTemp(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MAIN)
    if (raw == null || raw.trim() === '') return null
    const n = Number.parseFloat(raw)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
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

function syncUpdatedAtStorage() {
  if (readMainTemp() == null && readWadingTemp() == null) {
    localStorage.removeItem(STORAGE_KEY_UPDATED_AT)
    return null
  }
  const now = Date.now()
  localStorage.setItem(STORAGE_KEY_UPDATED_AT, String(now))
  return new Date(now)
}

export function useWaterTemp() {
  const [temp, setTempState] = useState<number | null>(null)
  const [wadingTemp, setWadingTempState] = useState<number | null>(null)
  const [updatedAt, setUpdatedAtState] = useState<Date | null>(null)

  const refreshFromStorage = useCallback(() => {
    setTempState(readMainTemp())
    setWadingTempState(readWadingTemp())
    setUpdatedAtState(readUpdatedAt())
  }, [])

  useEffect(() => {
    migrateStorage()
    refreshFromStorage()
  }, [refreshFromStorage])

  const setTemp = useCallback((value: number | null) => {
    if (value == null) {
      localStorage.removeItem(STORAGE_KEY_MAIN)
      setTempState(null)
    } else {
      const clamped = Math.min(45, Math.max(0, value))
      localStorage.setItem(STORAGE_KEY_MAIN, String(clamped))
      setTempState(clamped)
    }
    setUpdatedAtState(syncUpdatedAtStorage())
    window.dispatchEvent(new CustomEvent('water-temp-updated'))
  }, [])

  const setWadingTemp = useCallback((value: number | null) => {
    if (value == null) {
      localStorage.removeItem(STORAGE_KEY_WADING)
      setWadingTempState(null)
    } else {
      const clamped = Math.min(45, Math.max(0, value))
      localStorage.setItem(STORAGE_KEY_WADING, String(clamped))
      setWadingTempState(clamped)
    }
    setUpdatedAtState(syncUpdatedAtStorage())
    window.dispatchEvent(new CustomEvent('water-temp-updated'))
  }, [])

  useEffect(() => {
    const onUpdate = () => refreshFromStorage()
    window.addEventListener('water-temp-updated', onUpdate)
    window.addEventListener('storage', onUpdate)
    return () => {
      window.removeEventListener('water-temp-updated', onUpdate)
      window.removeEventListener('storage', onUpdate)
    }
  }, [refreshFromStorage])

  return { temp, setTemp, wadingTemp, setWadingTemp, updatedAt }
}
