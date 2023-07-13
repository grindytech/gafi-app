import { Table, Tbody } from '@chakra-ui/react';
import React from 'react';

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
      <Table>
        <Tbody></Tbody>
      </Table>
    </>
  );
};

export default NftActivityTable;
