import {DependencyList, useEffect} from "react";

export default function useAsyncEffect(asyncEffect: () => (() => unknown) | void, deps: DependencyList) {
  return useEffect(() => {
    let cleanup = () => {}
    (async () => {
      const _cleanup = await asyncEffect()
      _cleanup && (cleanup = _cleanup)
    })()

    return () => cleanup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
