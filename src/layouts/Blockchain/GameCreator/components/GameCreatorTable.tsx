import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Pagination from 'components/Pagination';
import { useState } from 'react';

export default function GameCreatorTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const data = [...Array(20)].fill({
    address: '0xe3808...26abe',
    owner: '0xe3808...26abe',
  });

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
              <Th>Contract Address</Th>
              <Th>Owner</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.slice(0, 10).map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.address}</Td>
                <Td>{item.owner}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      console.log(item);
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
