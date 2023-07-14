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
import MoneyIcon from 'public/assets/line/money.svg';
import { Link } from 'react-router-dom';
export interface TestPropsSold {
  image: string;
  name: string;
  timestamp: string;
  from: string;
  to: string;
  price: string;
  id: string;
}
const RecentSold = () => {
  const dataTest: TestPropsSold[] = [
    {
      image:
        'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&dpr=1&w=256',
      name: 'Azuki',
      from: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      to: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      timestamp: '1688350614',
      id: '5478',
      price: '200',
    },
    {
      image:
        'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&dpr=1&w=256',
      name: 'Azuki',
      from: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      to: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      timestamp: '1688350614',
      id: '54278',
      price: '200',
    },
    {
      image:
        'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&dpr=1&w=256',
      name: 'Azuki',
      from: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      to: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      timestamp: '1688350614',
      id: '54738',
      price: '200',
    },
    {
      image:
        'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&dpr=1&w=256',
      name: 'Azuki',
      from: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      to: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      timestamp: '1688350614',
      id: '54748',
      price: '200',
    },
    {
      image:
        'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&dpr=1&w=256',
      name: 'Azuki',
      from: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      to: '0x01683bd6a2e285aa24fb1e022f2eb1d4e083053f',
      timestamp: '1688350614',
      id: '55478',
      price: '200',
    },
  ];
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
              as={MoneyIcon}
              height={6}
              w={6}
              sx={{
                path: {
                  fill: 'url(#MoneySucessColor)',
                },
              }}
              aria-label="Money Icon"
              color="#2E4FF4"
            />
            <Text fontSize="lg">Recently Sold</Text>
          </HStack>

          <HStack
            color="primary.a.500"
            as={Link}
            to="/marketplace/explorer/activities"
          >
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
          <Tbody>
            {dataTest.map(item => (
              <>
                <Tr key={item.id}>
                  <Td>
                    <HStack flexWrap={{ md: 'nowrap', base: 'wrap' }}>
                      <Image
                        src={item.image}
                        width="4.5rem"
                        height="4.5rem"
                        borderRadius="lg"
                      />
                      <VStack alignItems="flex-start">
                        <Box>
                          <Text
                            color="shader.a.900"
                            fontWeight="medium"
                            fontSize="md"
                          >
                            {item.name}
                          </Text>
                          <Text color="shader.a.500">#{item.id}</Text>
                        </Box>

                        <Box display={{ base: 'none', md: 'block' }}>
                          <CustomRow
                            fieldName="timestamp"
                            label={item.timestamp}
                          />
                        </Box>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td display={{ md: 'table-cell', base: 'none' }}>
                    <HStack mb={2}>
                      <Text color="shader.a.600">From:</Text>
                      <CustomRow fieldName="address" label={item.from} />
                    </HStack>
                    <HStack flexWrap="wrap">
                      <Text color="shader.a.600">To:</Text>
                      <CustomRow fieldName="address" label={item.to} />
                    </HStack>
                  </Td>
                  <Td>
                    <VStack alignItems="flex-end">
                      <HStack
                        spacing={1}
                        display={{ base: 'flex', md: 'none' }}
                      >
                        <Text color="shader.a.600">From:</Text>
                        <CustomRow fieldName="address" label={item.from} />
                      </HStack>
                      <HStack
                        textAlign="right"
                        display={{ base: 'flex', md: 'none' }}
                      >
                        <Text color="shader.a.600">To:</Text>
                        <CustomRow fieldName="address" label={item.to} />
                      </HStack>
                      <HStack>
                        <Text color="shader.a.600">Price:</Text>
                        <HStack gap={0.5} fontWeight="medium">
                          <Text>{item.price} </Text>
                          <Text>GAKI</Text>
                        </HStack>
                      </HStack>

                      <CustomRow
                        fieldName="timestamp"
                        label={item.timestamp}
                        sx={{
                          display: { md: 'none', base: 'block' },
                        }}
                      />
                    </VStack>
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default RecentSold;
