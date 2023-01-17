import {CancellablePromise} from "real-cancellable-promise";

export default function delay(ms: number, callback: () => unknown = () => {}) {
  let id: NodeJS.Timeout;
  function cancel() {
    clearTimeout(id);
  }

  const promise = new Promise((resolve) => {
    id = setTimeout(() => resolve(callback()), ms)
  })

  return new CancellablePromise(promise, cancel)
}

