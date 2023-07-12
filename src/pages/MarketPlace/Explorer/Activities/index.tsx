import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  testOption1,
  testOption2,
  testOptionSort,
} from 'layouts/MarketPlace/Explorer/DataTest';
import FilterIcon from 'public/assets/line/filter.svg';

import { useEffect, useRef, useState } from 'react';
import Filter from 'layouts/MarketPlace/Explorer/Filter';
import { CardTypeOneSkeleton } from 'components/ProductCard/CardTypeOne';
import CardTypeThree from 'components/ProductCard/CardTypeThree';
const Activities = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [products, setProducts] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const ref = useRef(null);

  function onIterection(entries: any) {
    const firstEntries = entries[0];
    if (firstEntries.isIntersecting && hasMore) {
      fetchMore();
    }
  }
  async function fetchMore() {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${isOpen ? 4 * 3 : 5 * 3}&&skip=${
        page * 10
      }`
    );
    const data = await response.json();

    if (data.products.length == 0) {
      setHasMore(false);
    } else {
      setProducts((prev: any) => [...prev, ...data.products]);
      setPage(prevPage => prevPage + 1);
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(onIterection);
    if (observer && ref.current) {
      observer.observe(ref.current);
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, products);
  return (
    <>
      <HStack
        gap={4}
        mb={4}
        flexWrap="wrap"
        top="70px"
        py={4}
        position="sticky"
        bg="white"
        zIndex={6}
      >
        <Button
          variant={isOpen ? 'primary' : 'baseStyle'}
          leftIcon={<Icon as={FilterIcon} />}
          onClick={onToggle}
        >
          Filter
        </Button>
        <Select variant="formFilter" width="fit-content">
          {testOption1.map(item => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </Select>
        <Select variant="formFilter" width="fit-content">
          {testOption2.map(item => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </Select>
        <Select variant="formFilter" width="fit-content">
          {testOptionSort.map(item => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack gap={{ lg: isOpen ? 5 : 0, md: 0 }} alignItems={'flex-start'}>
        <Box
          width={isOpen ? '280px' : '0px'}
          flex={1}
          top="150px"
          position="sticky"
        >
          <Filter isOpen={isOpen} />
        </Box>
        <Flex direction="column" gap={4} color="shader.a.900" width="full">
          <Text fontWeight="medium" lineHeight="1.5rem">
            Total 150 Projects
          </Text>
          <Box>
            <Grid
              justifyContent="center"
              gridTemplateColumns={{
                lg: `repeat(${isOpen ? 4 : 5},1fr)`,
                md: 'repeat(2,1fr)',
                base: 'repeat(1,1fr)',
              }}
              gap={{ md: isOpen ? 3 : 5, base: 2 }}
            >
              {products.map((item: any) => (
                <CardTypeThree
                  key={item.id}
                  item={{
                    image:
                      'https://i.seadn.io/gcs/files/7eb724aadba564601666b4371241a2b5.png?auto=format&dpr=1&w=282',
                    name: item.title,
                    currentAuction: '100000',
                    id: item.id,
                    isVerified: true,
                  }}
                />
              ))}
            </Grid>
            {hasMore && (
              <>
                <Grid
                  ref={ref}
                  gridTemplateColumns={{
                    lg: `repeat(${isOpen ? 4 : 5},1fr)`,
                    md: 'repeat(2,1fr)',
                    base: 'repeat(1,1fr)',
                  }}
                  gap={5}
                >
                  {[...Array(isOpen ? 4 : 5)].map(item => (
                    <CardTypeOneSkeleton key={item} />
                  ))}
                </Grid>
              </>
            )}
          </Box>
        </Flex>
      </HStack>
    </>
  );
};

export default Activities;
