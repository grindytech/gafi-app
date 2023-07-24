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
import { testOption1, testOption2, testOptionSort } from 'hooks/DataTest';
import FilterIcon from 'public/assets/line/filter.svg';

import { useEffect, useRef, useState } from 'react';

import { CardTypeOneSkeleton } from 'components/ProductCard/CardTypeOne';
import CardTypeTwo from 'components/ProductCard/CardTypeTwo';
import { Link } from 'react-router-dom';
import MarketPlaceFilter from 'components/MarketPlaceFilter';

export default function ExplorerNFTs() {
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
  }, [products]);

  return (
    <>
      <HStack gap={4} mb={4} flexWrap="wrap" py={4} bg="white">
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
          width={isOpen ? '17.5rem' : '0px'}
          flex={1}
          top="7.5rem"
          position="sticky"
        >
          <MarketPlaceFilter isOpen={isOpen} />
        </Box>
        <Flex direction="column" gap={4} color="shader.a.900" width="full">
          <Text fontWeight="medium" lineHeight="1.5rem">
            Total 2,000 Items
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
                <Link key={item.id} to={`/marketplace/nft/${item.id}`}>
                  <CardTypeTwo
                    imageStyle={{
                      height: 'inherit',
                    }}
                    item={{
                      image:
                        'https://i.seadn.io/gcs/files/f129242f85ba52d455a78cd70a379bef.png?auto=format&dpr=1&w=282',
                      name: item.title,
                      floor: '200000000000',
                      volume: item.stock,
                      id: item.id,
                      isVerified: true,
                    }}
                  />
                </Link>
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
                  {[...Array(isOpen ? 4 : 5)].map((_, index) => (
                    <CardTypeOneSkeleton key={index} />
                  ))}
                </Grid>
              </>
            )}
          </Box>
        </Flex>
      </HStack>
    </>
  );
}
