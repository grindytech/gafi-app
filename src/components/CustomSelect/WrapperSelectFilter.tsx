import { Box, HStack, useDisclosure, Text, Icon } from '@chakra-ui/react';
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
        borderBottom={!isOpen ? '0.063rem solid' : 'none'}
        borderColor="shader.a.300"
        position="relative"
      >
        <HStack px={4} py={2.5} justifyContent="space-between">
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

        <Box
          background="white"
          border={isOpen ? '0.063rem solid' : 'none'}
          borderColor="shader.a.300"
          zIndex={10}
          position="absolute"
          width="full"
          display={isOpen ? 'block' : 'none'}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default WrapperSelectFilter;
