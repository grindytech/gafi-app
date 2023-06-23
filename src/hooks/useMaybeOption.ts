import React from 'react';

export default function useMaybeOption() {
  const fieldShouldHas = 1;

  const [fields, setFields] = React.useState([fieldShouldHas]);
  const [status, setStatus] = React.useState([!!fieldShouldHas]);

  const removeField = (index: number) => {
    const filter = fields.filter(prev => prev !== index);

    return setFields(filter);
  };

  const setField = () => {
    return setFields(prev => {
      /*
        @parmas n = [1, 2, 3, 4]
        - summary logic: 
          we've got an array included [n] and using the index to 
          get the last element of fields so expecting 
            - fields.length = (3) that's means fields[3] result = (4)
          step end will plus of number to up 1 (4 + 1)
          result equal: [n, 5]
      */

      const lastField = prev[prev.length - 1];

      return [...prev, lastField + 1];
    });
  };

  const setIsExpanded = (index: number) => {
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
    return setStatus(prev => {
      const toggle = !prev[index];

      return {
        ...prev,
        [index]: toggle,
      };
    });
  };

  return {
    fields,
    setField,
    removeField,
    setIsExpanded,
    isExpanded: status,
  };
}
