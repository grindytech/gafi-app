import { Button, Flex, Text } from '@chakra-ui/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'; 
import Icon from '@mdi/react';

const SponsoredPoolTablePagination = () => (
  <Flex justifyContent="space-between" alignItems="center">
    <Flex flex="7" justifyContent="flex-start">
      <Text>
        Showing <b> 1 </b> to <b> 10 </b> of <b> 97 </b> results
      </Text>
    </Flex>
    <Flex flex="3" justifyContent="space-between" >
      <Button>
        <Icon size={1} path={mdiChevronLeft} />
      </Button>
      <Button variant="outline">1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>...</Button>
      <Button>8</Button>
      <Button>9</Button>
      <Button>10</Button>
      <Button>
        <Icon size={1} path={mdiChevronRight} />
      </Button>
    </Flex>
  </Flex>
);

export default SponsoredPoolTablePagination;
