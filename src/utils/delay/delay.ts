export default function delay(ms: number, callback: () => unknown) {
  let id: NodeJS.Timeout;
  function cancel() {
    clearTimeout(id);
  }
  setTimeout(() => callback(), ms)
  return {cancel}
}

