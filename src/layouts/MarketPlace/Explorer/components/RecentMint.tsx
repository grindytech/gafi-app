import {
  Box,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  Image,
  VStack,
} from '@chakra-ui/react';
import CustomRow from 'components/Table/CustomRow';

import ArrowIcon from 'public/assets/line/chevron-02.svg';
import PickaxeIcon from 'public/assets/line/pickaxe.svg';
export interface TestPropsSold {
  image: string;
  name: string;
  timestamp: string;
  amount: string;
  id: string;
  poolID: string;
  miner: string;
  minerHash: string;
  rarity: string;
}
const dataTest: TestPropsSold[] = [
  {
    id: '9608',
    image:
      'https://cdn.dribbble.com/users/1853242/screenshots/20654670/7cf56813-cc7c-4148-aead-5eda7016e790_4x.png',
    name: 'Bean',
    timestamp: '1688375200',
    amount: '10',
    poolID: '12',
    miner: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    minerHash: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    rarity: '0.45',
  },
  {
    id: '9602',
    image:
      'https://cdn.dribbble.com/users/1853242/screenshots/20654670/7cf56813-cc7c-4148-aead-5eda7016e790_4x.png',
    name: 'Bean',
    timestamp: '1688375200',
    amount: '10',
    poolID: '12',
    miner: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    minerHash: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    rarity: '0.45',
  },
  {
    id: '9603',
    image:
      'https://cdn.dribbble.com/users/1853242/screenshots/20654670/7cf56813-cc7c-4148-aead-5eda7016e790_4x.png',
    name: 'Bean',
    timestamp: '1688375200',
    amount: '10',
    poolID: '12',
    miner: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    minerHash: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    rarity: '0.45',
  },
  {
    id: '9604',
    image:
      'https://cdn.dribbble.com/users/1853242/screenshots/20654670/7cf56813-cc7c-4148-aead-5eda7016e790_4x.png',
    name: 'Bean',
    timestamp: '1688375200',
    amount: '10',
    poolID: '12',
    miner: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    minerHash: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    rarity: '0.99',
  },
  {
    id: '9605',
    image:
      'https://cdn.dribbble.com/users/1853242/screenshots/20654670/7cf56813-cc7c-4148-aead-5eda7016e790_4x.png',
    name: 'Bean',
    timestamp: '1688375200',
    amount: '10',
    poolID: '12',
    miner: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    minerHash: '0x01683bd6a2e224fb1e022f2eb1d4e083053f',
    rarity: '0.45',
  },
];
const RecentMint = () => {
  return (
    <>
      <Box
        color="shader.a.900"
        bg="#fff"
        borderRadius="xl"
        border="0.063rem solid"
        borderColor="shader.a.300"
      >
        <HStack
          justifyContent="space-between"
          spacing={0}
          position="sticky"
          left={0}
          p={4}
          borderBottom="0.063rem solid"
          borderColor="shader.a.300"
          fontWeight="medium"
        >
          <HStack>
            <Icon
              as={PickaxeIcon}
              height={6}
              w={6}
              transform="rotate(90deg)"
              aria-label="Money Icon"
            />
            <Text fontSize="lg">Recently Mint</Text>
          </HStack>
          <HStack color="primary.a.500">
            <Text>See More</Text>
            <Icon
              as={ArrowIcon}
              transform="rotate(180deg)"
              height={5}
              width={5}
            />
          </HStack>
        </HStack>

        <Table variant="listTable">
          <Tbody></Tbody>
        </Table>
      </Box>
    </>
  );
};

export default RecentMint;
