import React from 'react';

export default function useMaybeOption() {
  const initialValue: number[] = [0];

  const [fields, setFields] = React.useState(initialValue);

  const removeField = (index: number) => {
    setFields(prev => {
      const filter = prev.filter(item => item !== index);

      return filter;
    });
  };

  /*
    @parmas n = [1, 2, 3, 4]
    - summary logic: 
      we've got an array included [n] and using the index to 
      get the last element of fields so expecting 
        - fields.length = (3) that's means fields[3] result = (4)
      step end will plus of number to up 1 (4 + 1)
      result equal: [n, 5]
  */
  const setField = () => {
    setFields(prev => {
      const lastField = prev[prev.length - 1];

      return [...prev, lastField + 1];
    });
  };

  return {
    fields,
    setField,
    removeField,
    setFields,
  };
}
