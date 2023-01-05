export default function delay(ms: number, callback: () => unknown) {
  const id = setTimeout(callback, ms)
  return () => clearTimeout(id)
}
