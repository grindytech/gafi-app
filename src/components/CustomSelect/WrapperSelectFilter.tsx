import {
  Box,
  HStack,
  useDisclosure,
  Text,
  Icon,
  Collapse,
} from '@chakra-ui/react';
import ChevronIcon from 'public/assets/line/chevron-01.svg';
interface IProps {
  defaultTitle?: string;
  children: React.ReactNode;
}
//Wrapper
const WrapperSelectFilter = ({ children, defaultTitle }: IProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Box
        width="full"
        borderRadius="lg"
        border="0.063rem solid"
        borderColor="shader.a.300"
      >
        <HStack
          px={4}
          py={2.5}
          borderBottom={isOpen ? '0.063rem solid' : 'none'}
          borderBottomColor="shader.a.200"
          justifyContent="space-between"
        >
          <Text color="shader.a.800" lineHeight="1.5rem" fontWeight="medium">
            {defaultTitle || 'All'}
          </Text>
          <Icon
            as={ChevronIcon}
            height={5}
            width={5}
            onClick={onToggle}
            cursor="pointer"
            transition="ease-in-out 0.3s"
            transform={isOpen ? 'rotate(180deg)' : ''}
          />
        </HStack>
        <Collapse in={isOpen} animateOpacity>
          {children}
        </Collapse>
      </Box>
    </>
  );
};

export default WrapperSelectFilter;
