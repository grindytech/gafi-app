import React from 'react';

export default function useToggleMultiple() {
  const [status, setStatus] = React.useState<Record<number, boolean>>({
    0: false,
  });

  const removeIsExpanded = (index: number) => {
    setStatus(prev => {
      delete prev[index];

      return prev;
    });
  };

  /* 
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
  };
}
