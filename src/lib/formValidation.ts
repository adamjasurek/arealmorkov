export function requiredField(value: string, label: string): string | null {
  if (!value.trim()) return `${label} je povinné.`
  return null
}

export function emailField(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'E-mail je povinný.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return 'Zadejte platný e-mail (např. jmeno@email.cz).'
  }
  return null
}

export function phoneField(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Telefon je povinný.'
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 9) return 'Zadejte platné telefonní číslo.'
  return null
}

export function numberMinField(
  value: string,
  label: string,
  min: number,
): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const num = Number(trimmed)
  if (!Number.isFinite(num) || num < min) {
    return `${label} musí být alespoň ${min}.`
  }
  return null
}
