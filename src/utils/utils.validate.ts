import { UseFormWatch } from 'react-hook-form';

export const validateLength = ({
  watch,
  fieldsSet,
  setRequired,
  step,
}: {
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  watch: UseFormWatch<any>;
  fieldsSet: { isRequired?: boolean; isValue?: boolean; fieldName: string }[];
  step: number;
}) => {
  /* 
      Find every field contains the required
      Check 'fieldName' of the watch is not None, that should length >= 1
      so length = 0, this means you can next step
      Ex: 
        isRequired = [true, true, true]
        fieldName = ['something', 'something']
        result = [true true] 
    */
  const findRequired = fieldsSet.filter(({ fieldName, isRequired, isValue }) =>
    isValue
      ? !Number.isInteger(watch()[fieldName])
      : isRequired && !watch()[fieldName]
  );

  setRequired({
    [step]: findRequired.length,
  });
};
