import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Pagination from 'components/Pagination';
import { useState } from 'react';

export default function GameCreatorTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Table variant="unstyled" bg="white" border="1px solid black">
        <Thead>
          <Tr>
            <Th>Owner</Th>
            <Th>Contract Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>1</Td>
            <Td>1</Td>
          </Tr>
        </Tbody>
      </Table>

      <Pagination
        amount={120}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
