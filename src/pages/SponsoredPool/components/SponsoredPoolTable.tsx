// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import CardHeader from 'components/card/CardHeader';
import TablesTableRow from './SponsoredPoolTableRow';

export interface ISponsoredPool {
  id: string | undefined;
  amount: any | undefined;
  owner: string | undefined;
  discount: number | undefined;
  limit: number | undefined;
};

interface ISponsoredPoolTableProps {
  title: string;
  captions: string[];
  sponsoredPools: ISponsoredPool[] | undefined;
}

const SponsoredPoolTable = (props: ISponsoredPoolTableProps) => {
  const { title, captions, sponsoredPools } = props;
  const textColor = useColorModeValue('gray.700', 'white');
  return (
    <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => (
                <Th color="gray.400" key={idx}>
                  {caption}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {sponsoredPools?.map(pool => (
              <TablesTableRow SponsoredPool={pool} />
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default SponsoredPoolTable;
