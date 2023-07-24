import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select,
  VStack,
} from '@chakra-ui/react';

import WrapperSelectFilter from 'components/CustomSelect/WrapperSelectFilter';
import { testOption1, testOption2, testOptionSort } from 'hooks/DataTest';
import CloseIcon from 'public/assets/line/close.svg';
import SearchIcon from 'public/assets/line/search.svg';

interface MarketPlaceFilterProps {
  isOpen: boolean;
}

export default function MarketPlaceFilter({ isOpen }: MarketPlaceFilterProps) {
  return (
    <Box
      display={isOpen ? 'block' : 'none'}
      opacity={isOpen ? 1 : 0}
      borderRadius="xl"
      width="full!important"
      minWidth="17.5rem"
      border="0.063rem solid"
      borderColor="shader.a.400"
      color="shader.a.900"
      height="fit-content"
    >
      <Box
        padding={4}
        borderBottom="0.063rem solid"
        borderBottomColor="shader.a.300"
      >
        <HStack
          gap={2}
          background="shader.a.300"
          borderRadius="lg"
          border="0.063rem solid "
          borderColor="shader.a.300"
          px={4}
          py={2}
        >
          <Icon as={SearchIcon} color="shader.a.500" height={5} width={5} />

          <Input
            borderRadius="none"
            variant="unstyled"
            placeholder="Search..."
            _placeholder={{
              color: 'shader.a.500',
            }}
          />

          <Icon as={CloseIcon} color="shader.a.900" height={5} width={5} />
        </HStack>
      </Box>
      <VStack padding={4} gap={5}>
        <FormControl gap={2}>
          <FormLabel color="shader.a.500" fontSize="sm">
            Chains
          </FormLabel>
          <Select variant="formFilter">
            {testOption1.map(item => (
              <option key={item.value} value={item.value}>
                {item.title}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl gap={2}>
          <FormLabel color="shader.a.500" fontSize="sm">
            Bundles & Items
          </FormLabel>
          <WrapperSelectFilter>
            <RadioGroup defaultValue="all">
              <Flex flexDirection="column" gap={2.5} px={4} py={2.5}>
                {testOption1.map(item => (
                  <Radio key={item.value} value={item.value}>
                    {item.title}
                  </Radio>
                ))}
              </Flex>
            </RadioGroup>
          </WrapperSelectFilter>
        </FormControl>
        <FormControl gap={2}>
          <FormLabel color="shader.a.500" fontSize="sm">
            Type
          </FormLabel>
          <WrapperSelectFilter defaultTitle="Auction">
            <RadioGroup defaultValue="auction">
              <Flex flexDirection="column" gap={2.5} px={4} py={2.5}>
                {testOption2.map(item => (
                  <Radio key={item.value} value={item.value}>
                    {item.title}
                  </Radio>
                ))}
              </Flex>
            </RadioGroup>
          </WrapperSelectFilter>
        </FormControl>
        <FormControl gap={2}>
          <FormLabel color="shader.a.500" fontSize="sm">
            Sort
          </FormLabel>
          <Select variant="formFilter" width="full">
            {testOptionSort.map(item => (
              <option key={item.value} value={item.value}>
                {item.title}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl gap={2}>
          <FormLabel color="shader.a.500" fontSize="sm">
            Price
          </FormLabel>
          <HStack>
            <Input
              px={4}
              py={2}
              border="0.063rem solid"
              borderColor="shader.a.300"
              borderRadius="xl"
              variant="unstyled"
              type="number"
              placeholder="Min"
              _placeholder={{
                color: 'shader.a.900',
                fontWeight: 'medium',
                lineHeight: '1.5rem',
              }}
            />
            <Box>-</Box>
            <Input
              px={4}
              py={2}
              border="0.063rem solid"
              borderColor="shader.a.300"
              borderRadius="xl"
              variant="unstyled"
              type="number"
              placeholder="Max"
              _placeholder={{
                color: 'shader.a.900',
                fontWeight: 'medium',
                lineHeight: '1.5rem',
              }}
            />
          </HStack>
        </FormControl>
      </VStack>
    </Box>
  );
}
