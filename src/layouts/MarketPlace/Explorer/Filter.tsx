import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { testOption1 } from 'pages/MarketPlace/Explorer';
import CloseIcon from 'public/assets/line/close.svg';
import SearchIcon from 'public/assets/line/search.svg';
interface IProps {
  isOpen: boolean;
}
const Filter = ({ isOpen }: IProps) => {
  return (
    <>
      <Box
        display={isOpen ? 'block' : 'none'}
        opacity={isOpen ? 1 : 0}
        borderRadius="xl"
        width="280px"
        border="0.063rem solid"
        borderColor="shader.a.400"
        color="shader.a.900"
        top="7.5rem"
        position="sticky"
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
            <FormLabel color="shader.a.500">Chains</FormLabel>
            <Select variant="formFilter">
              {testOption1.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl gap={2}>
            <FormLabel color="shader.a.500">Bundles & Items</FormLabel>
            <Select variant="formFilter">
              {testOption1.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl gap={2}>
            <FormLabel color="shader.a.500">Type</FormLabel>
            <Select variant="formFilter">
              {testOption1.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl gap={2}>
            <FormLabel color="shader.a.500">Sort</FormLabel>
            <Select variant="formFilter">
              {testOption1.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl gap={2}>
            <FormLabel color="shader.a.500">Price</FormLabel>
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
    </>
  );
};

export default Filter;
