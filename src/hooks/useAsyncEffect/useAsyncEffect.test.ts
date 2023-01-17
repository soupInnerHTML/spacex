import useAsyncEffect from "./useAsyncEffect";
import {renderHook} from "@testing-library/react";
import delay from "../../utils/delay/delay.async";
// import delay from "../../utils/delay/delay";
// import asynced from "../../utils/asynced/asynced";

describe('useAsyncEffect() hook',  () => {
  test('должен делать cleanup', async () => {
    const asyncCallback = jest.fn(() => console.log('done'))
    const callbackWithCleanUp = jest.fn( async () => {
      return delay(1000, () => {
        asyncCallback()
      })
    });
    // @ts-ignore
    const view = renderHook(() => useAsyncEffect(async () => {
      const promise = await callbackWithCleanUp()
      // @ts-ignore
      return () => promise.cancel()
    }, []));
    view.unmount();
    expect(callbackWithCleanUp).toHaveBeenCalled()
    await delay(2000)
    expect(asyncCallback).toBeCalledTimes(0)
  })
})
