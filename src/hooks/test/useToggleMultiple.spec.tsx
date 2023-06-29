import useToggleMultiple from 'hooks/useToggleMultiple';
import { act, renderHook } from '@testing-library/react';

/** 
    @parmas callback(n = 2)
            original = [false, false]
    - summary logic:
      when you implement input [index] this is [1] or [2] etc...
      negation value of it's, that consider will toggle the value
      so my expected result [false, true]
      is below example will for me to understand
        params: [n]
          [index]: !orignal[index] // false equal true
*/
describe('setIsExpanded(index)', () => {
  it(`should return to { 0: false }`, () => {
    const { result } = renderHook(() => useToggleMultiple());
    const output = { 0: false };

    expect(result.current.isExpanded).toEqual(output);
  });

  it(`should return to { 0: true }`, () => {
    const { result } = renderHook(() => useToggleMultiple());
    const input = 0;
    const output = { 0: true };

    act(() => {
      result.current.setIsExpanded(input);
    });

    expect(result.current.isExpanded).toEqual(output);
  });

  it(`should return to { 0: true, 1: true }`, () => {
    const { result } = renderHook(() => useToggleMultiple());
    const input = [0, 1];
    const output = { 0: true, 1: true };

    act(() => {
      input.forEach(item => result.current.setIsExpanded(item));
    });

    expect(result.current.isExpanded).toEqual(output);
  });

  it(`should return to { 0: false, 1: false }`, () => {
    const { result } = renderHook(() => useToggleMultiple());
    const input = [0, 0, 1, 1];
    const output = { 0: false, 1: false };

    act(() => {
      input.forEach(item => result.current.setIsExpanded(item));
    });

    expect(result.current.isExpanded).toEqual(output);
  });
});

describe('removeIsExpanded(index)', () => {
  it(`should return from { 0: false } to {}`, () => {
    const { result } = renderHook(() => useToggleMultiple());
    const input = 0;
    const output = {};

    act(() => {
      result.current.removeIsExpanded(input);
    });

    expect(result.current.isExpanded).toEqual(output);
  });

  it(`should return from { 0: false, 1: true } to { 0: false }`, () => {
    const { result } = renderHook(() => useToggleMultiple());
    const input = 1;
    const output = { 0: false };

    // initial isExpanded so result equal { 0: false, 1: true }
    act(() => {
      result.current.setIsExpanded(input);
    });

    act(() => {
      result.current.removeIsExpanded(input);
    });

    expect(result.current.isExpanded).toEqual(output);
  });
});
