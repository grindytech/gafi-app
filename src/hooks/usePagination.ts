import { useMemo } from 'react';

/**
 * @parmas getStartToEnd(1, 3)
      
  - summary logic:
    end - start = (3 - 1) = 2 + 1 the reason we need + 1, 
    is because I don't want to use like index [0,1,2] should to be [1,2,3]

    expected:
      index: [0]  start: [1] // 0+1
      index: [1]  start: [1] // 1+1
      index: [2]  start: [1] // 2+1
 */
export const getStartToEnd = (start: number, end: number) => {
  return Array.from(
    {
      length: end - start + 1,
    },
    (_, index) => index + start
  );
};

interface usePaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  amount: number;
}

export default function usePagination({
  currentPage,
  setCurrentPage,
  amount,
}: usePaginationProps) {
  const data = useMemo(() => {
    const shouldSlider = 4;
    const shouldShowLeftDots = currentPage - 1 >= shouldSlider;
    const shouldThreeDots = '...';

    return shouldShowLeftDots
      ? (function () {
          const shouldShowRightDots = currentPage - 1 >= amount - shouldSlider;
          const middleRange = getStartToEnd(currentPage - 1, currentPage + 1);
          const endRange = getStartToEnd(amount - 3, amount);

          return shouldShowRightDots
            ? [1, shouldThreeDots, ...endRange] // (currentPage = 117) (amount = 120) should (1, ..., 117, 118, 119)
            : [1, shouldThreeDots, ...middleRange, shouldThreeDots, amount]; // amount = 120 should (1, 115, 116, 117, ..., 120)
        })()
      : (function () {
          const lessThanSliderRange = amount <= shouldSlider;

          return lessThanSliderRange
            ? [...getStartToEnd(1, amount)] // amount = 4 should (1, 2, 3, 4)
            : [...getStartToEnd(1, shouldSlider), shouldThreeDots, amount]; // amount = 5 should (1, 2, 3, 4, ..., 5)
        })();
  }, [amount, currentPage]);

  const onClickPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    onClickPage,
    data,
  };
}
