import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DataResult from 'layouts/MarketPlace/Explorer/DataResult';
import FilterIcon from 'public/assets/line/filter.svg';
import { testOption1, testOption2, testOption3 } from '..';
import Filter from 'layouts/MarketPlace/Explorer/Filter';
const Activities = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <HStack gap={4} mb={4} flexWrap="wrap">
        <Button
          variant={isOpen ? 'primary' : 'baseStyle'}
          leftIcon={<Icon as={FilterIcon} />}
          onClick={onToggle}
        >
          Filter
        </Button>
        <Select variant="formFilter" width="fit-content">
          {testOption1.map(item => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </Select>
        <Select variant="formFilter" width="fit-content">
          {testOption2.map(item => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </Select>
        <Select variant="formFilter" width="fit-content">
          {testOption3.map(item => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack gap={isOpen ? 5 : 0} alignItems={'flex-start'}>
        <Box>
          <Filter isOpen={isOpen} />
        </Box>

        <Flex direction="column" gap={4} color="shader.a.900" width="full">
          <Text fontWeight="medium" lineHeight="1.5rem">
            Total 150 Projects
          </Text>
          <DataResult isOpen={isOpen} />
        </Flex>
      </HStack>
    </>
  );
};

export default Activities;
