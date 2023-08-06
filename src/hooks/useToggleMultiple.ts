import React from 'react';

export default function useToggleMultiple(args?: Record<number, boolean>) {
  const initialValue: Record<number, boolean> = { 0: false };

  const [status, setStatus] = React.useState(args || initialValue);

  const removeIsExpanded = (index: number) => {
    setStatus(prev => {
      delete prev[index];

      return prev;
    });
  };

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

    - summary index:
        why not used an index
        because element maybe 1 | 2 | 4 | 10 | 20
        and index actually 0 | 1 | 2 | 3 | 4
        that when removing params correctly is 'element'
  */
  const setIsExpanded = (index: number) => {
    setStatus(prev => {
      const toggle = !prev[index];

      return {
        ...prev,
        [index]: toggle,
      };
    });
  };

  return {
    setIsExpanded,
    removeIsExpanded,
    isExpanded: status,
    setExpanded: setStatus,
  };
}
