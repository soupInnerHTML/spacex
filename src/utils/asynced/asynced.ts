export default function asynced(callback: (resolve: () => void) => unknown) {
  return new Promise(resolve => callback(() => resolve('resolved')))
}
