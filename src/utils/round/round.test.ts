import round from './round'

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

function spyOnMathRound() {
  return jest.spyOn(Math, 'round')
}

describe('round()', () => {
  test("целое число", () => {
    const spy = spyOnMathRound()
    expect(round(50)).toBe(50)
    expect(spy).toHaveBeenCalled()
  })
  test("нецелое число", () => {
    const spy = spyOnMathRound()
    expect(round(728.929389238923)).toBe(729)
    expect(round(322.0000000001)).toBe(322)
    expect(spy).toBeCalledTimes(2)
  })
  test("ложные значения", () => {
    const spy = spyOnMathRound()
    expect(round(null)).toBe(0)
    expect(round(undefined)).toBe(0)
    expect(round(NaN)).toBe(0)
    expect(spy).toBeCalledTimes(0)
  })
})
