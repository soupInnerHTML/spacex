export default function round (value: number | null | undefined) {
  return value ? Math.round(value) : 0
}
