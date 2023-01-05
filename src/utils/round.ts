export default function round (value: number | null | undefined) {
  return Math.round(value ?? 0)
}
