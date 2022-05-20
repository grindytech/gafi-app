// Chakra imports
import {
  CircularProgress, Table,
  TableCaption,
  Tbody,
  Text, Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import CardHeader from 'components/card/CardHeader';
import { SponsoredPool } from 'graphQL/generates';
import React from 'react';
import TablesTableRow from './SponsoredPoolTableRow';

export interface ISponsoredPool {
  id: string | undefined;
  amount: any | undefined;
  owner: string | undefined;
  discount: number | undefined;
  limit: number | undefined;
}

interface ISponsoredPoolTableProps {
  title: string;
  captions: string[];
  sponsoredPools: SponsoredPool[];
  children: React.ReactNode;
}

const SponsoredPoolTable = (props: ISponsoredPoolTableProps) => {
  const { title, captions, sponsoredPools, children } = props;
  const textColor = useColorModeValue('gray.700', 'white');
  return (
    <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>

      <CardBody>
        <Table variant="simple" textAlign="center" color={textColor}>
          <TableCaption>{children}</TableCaption>
          {sponsoredPools ? (
            <>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  {captions.map((caption, idx) => (
                    <Th color="gray.400" key={idx}>
                      {caption}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody justifyContent="flex-start">
                {sponsoredPools?.map(pool => (
                  <TablesTableRow SponsoredPool={pool} />
                ))}
              </Tbody>
            </>
          ) : (
            <CircularProgress isIndeterminate color="green.300" />
          )}
        </Table>
      </CardBody>
    </Card>
  );
};

export default SponsoredPoolTable;
