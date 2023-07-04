import { act, renderHook } from '@testing-library/react';
import useMaybeOption from 'hooks/useMaybeOption';

/**
   @parmas n = [1, 2, 3, 4]
    - summary logic: 
      we've got an array included [n] and using the index to 
      get the last element of fields so expecting 
        - fields.length = (3) that's means fields[3] result = (4)
      step end will plus of number to up 1 (4 + 1)
      result equal: [n, 5]
 */
describe('setField', () => {
  it('should return [0, 1]', () => {
    const { result } = renderHook(() => useMaybeOption());
    const output = [0, 1];

    act(() => {
      result.current.setField();
    });

    expect(result.current.fields).toEqual(output);
  });

  it('should return [0, 1, 2]', () => {
    const { result } = renderHook(() => useMaybeOption());
    const input = [1, 2];
    const output = [0, 1, 2];

    act(() => {
      input.forEach(() => result.current.setField());
    });

    expect(result.current.fields).toStrictEqual(output);
  });
});

describe('removeField(index)', () => {
  it('should return from [0, 1] to [0]', () => {
    const { result } = renderHook(() => useMaybeOption());
    const input = 1;
    const output = [0];

    act(() => {
      result.current.setField();
    });

    act(() => {
      result.current.removeField(input);
    });

    expect(result.current.fields).toStrictEqual(output);
  });

  it('should return from [0, 1, 2] to []', () => {
    const { result } = renderHook(() => useMaybeOption());
    const input = [1, 2];
    const output: number[] = [];

    act(() => {
      input.forEach(() => result.current.setField());
    });

    act(() => {
      [0, 1, 2].forEach(item => result.current.removeField(item));
    });

    expect(result.current.fields).toStrictEqual(output);
  });
});
