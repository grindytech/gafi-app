import { renderHook } from '@testing-library/react';

import usePagination, { getStartToEnd } from 'hooks/usePagination';

describe('getStartToEnd(start, end)', () => {
  it(`getStartToEnd should return [1, 2, 3, 4, 5]`, () => {
    const output = [1, 2, 3, 4, 5];

    expect(getStartToEnd(1, 5)).toStrictEqual(output);
  });
});

describe('usePagination({currentPage, setCurrentPage, amount})', () => {
  it('usePagination (data) should return [1, 2, 3, 4]', () => {
    const { result } = renderHook(() =>
      usePagination({
        amount: 4,
        currentPage: 1,
        setCurrentPage: () => {},
      })
    );

    expect(result.current.data).toEqual([1, 2, 3, 4]);
  });

  it(`usePagination (data) should return [1, 2, 3, 4, '...', 5]`, () => {
    const { result } = renderHook(() =>
      usePagination({
        amount: 5,
        currentPage: 1,
        setCurrentPage: () => {},
      })
    );

    expect(result.current.data).toEqual([1, 2, 3, 4, '...', 5]);
  });

  it(`usePagination (data) should return [1, '...', 2, 3, 4, 5]`, () => {
    const { result } = renderHook(() =>
      usePagination({
        amount: 5,
        currentPage: 5,
        setCurrentPage: () => {},
      })
    );

    expect(result.current.data).toEqual([1, '...', 2, 3, 4, 5]);
  });

  it(`usePagination (data) should return [1, '...', 4, 5, 6, '...', 10]`, () => {
    const { result } = renderHook(() =>
      usePagination({
        amount: 10,
        currentPage: 5,
        setCurrentPage: () => {},
      })
    );

    expect(result.current.data).toEqual([1, '...', 4, 5, 6, '...', 10]);
  });
});
