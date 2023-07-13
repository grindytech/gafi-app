import {
  HStack,
  Table,
  Tbody,
  Td,
  Tr,
  Image,
  VStack,
  Text,
  Icon,
} from '@chakra-ui/react';
import ChevronIcon from 'public/assets/line/chevron-01.svg';

const dataTest = {
  avatar:
    'https://i.seadn.io/gcs/files/c388840a729e6183fc0b3c7f1e9d5838.png?auto=format&dpr=1&w=136&h=136&fr=1',
  from: '0xe536a...6790a',
  to: '0xe536a...67933',
  amount: '0.0055',
};
const NftActivityTable = () => {
  return (
    <>
      <Table variant="activityTable">
        <Tbody>
          {[...Array(6)].map(item => (
            <Tr key={item}>
              <Td>
                <HStack gap={4}>
                  <Image
                    src={dataTest.avatar}
                    h="2.25rem"
                    width="2.25rem"
                    borderRadius="full"
                  />
                  <VStack alignItems="flex-start">
                    <Text color="shader.a.500" fontSize="sm">
                      From
                    </Text>
                    <Text color="shader.a.900" fontWeight="medium">
                      {dataTest.from}
                    </Text>
                  </VStack>
                </HStack>
              </Td>
              <Td>
                <Text>Transfer to</Text>
                <Text fontSize="sm" color="shader.a.500">
                  36 minutes ago
                </Text>
              </Td>
              <Td>
                <Text color="shader.a.500" fontSize="sm">
                  To
                </Text>
                <Text color="shader.a.900" fontWeight="medium">
                  {dataTest.to}
                </Text>
              </Td>
              <Td>
                <Text color="shader.a.900" fontWeight="medium">
                  {dataTest.amount} GAFI
                </Text>
                <Text fontSize="sm" color="shader.a.500">
                  $302,425
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <HStack width="full" justifyContent="center">
        <Text cursor="pointer">View More</Text>
        <Icon cursor="pointer" as={ChevronIcon} color="primary.a.500" />
      </HStack>
    </>
  );
};

export default NftActivityTable;
