import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import Pagination from 'components/Pagination';
import { useState } from 'react';
import PoolsSponsoredChangeOwner from './PoolsSponsoredChangeOwner';

export default function PoolsSponsoredTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [changeOwner, setChangeOwner] = useState<undefined | string>(undefined);
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg="white"
        borderRadius="lg"
        border="0.0625rem solid"
        borderColor="shader.a.300"
      >
        <Table variant="poolBlockchain">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Owner</Th>
              <Th>Discount</Th>
              <Th>Txn Limit</Th>
              <Th>Time Limit</Th>
              <Th>Balance</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {[...Array(8)].map((_, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>

                <Td>0xe3808...26abe</Td>

                <Td>50%</Td>

                <Td>400</Td>

                <Td>30 minutes</Td>

                <Td>1000 GAKI</Td>

                <Td>
                  <Button
                    onClick={() => {
                      onToggle();

                      setChangeOwner(`xin chao ${index}`);
                    }}
                    variant="unstyled"
                    height="auto"
                    minWidth="auto"
                    py={3}
                    px={4}
                    border="0.0625rem solid"
                    borderColor="shader.a.400"
                    borderRadius="lg"
                  >
                    Change owner
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {isOpen && changeOwner ? (
        <PoolsSponsoredChangeOwner onClose={onClose} owner={changeOwner} />
      ) : null}

      <Pagination
        amount={120}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sx={{
          justifyContent: 'center',
          mt: 6,
        }}
      />
    </>
  );
}
