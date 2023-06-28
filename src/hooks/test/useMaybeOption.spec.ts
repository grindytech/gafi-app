import { act, renderHook } from '@testing-library/react';
import useMaybeOption from 'hooks/useMaybeOption';

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
