import { TypeReturnJSXElement } from 'types';
import { Text, TextProps } from '@chakra-ui/react';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';
interface IProps {
  fieldName: 'timestamp' | 'address';
  label?: string;
  sx?: TextProps;
  link?: string;
}
const CustomRow = ({ fieldName, label, sx }: IProps) => {
  const displayField: TypeReturnJSXElement = {
    address: () => (
      <Text
        as={Link}
        noOfLines={1}
        fontWeight="medium"
        color="primary.a.500"
        width="10.5rem"
        overflow="hidden"
        {...sx}
      >
        {label}
      </Text>
    ),

    timestamp: () => (
      <Text fontSize="sm" whiteSpace="nowrap" color="shader.a.600" {...sx}>
        {formatDistanceToNowStrict(Number(label), {
          addSuffix: true,
        })}
      </Text>
    ),
  };
  const JSXElementField = displayField[fieldName];

  return <JSXElementField />;
};

export default CustomRow;
