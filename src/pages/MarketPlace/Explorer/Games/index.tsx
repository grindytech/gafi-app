import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Select,
  Text,
  VStack,
  useDisclosure,
  Image,
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
import CardBox from 'components/CardBox';
import { Link } from 'react-router-dom';

const Games = () => {
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
      <HStack gap={4} mb={4} flexWrap="wrap">
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
      <HStack gap={isOpen ? 5 : 0} alignItems={'flex-start'}>
        <Box
          width={isOpen ? '280px' : '0px'}
          flex={1}
          top="120px"
          position="sticky"
        >
          <Filter isOpen={isOpen} />
        </Box>
        <Flex direction="column" gap={4} color="shader.a.900" width="full">
          <Text fontWeight="medium" lineHeight="1.5rem">
            Total 150 Games
          </Text>
          <Box>
            <Grid
              justifyContent="center"
              gridTemplateColumns={{
                lg: `repeat(${isOpen ? 4 : 5},1fr)`,
                md: 'repeat(3,1fr)',
                base: 'repeat(2,1fr)',
              }}
              gap={{ md: isOpen ? 3 : 5, base: 2 }}
            >
              {' '}
              {/* <CardTypeOne
                  key={item.title}
                  item={{
                    image:
                      'https://i.seadn.io/gcs/files/1deeafe9cb7d2eeb2e2116804e06dc88.gif?auto=format&dpr=1&w=282',
                    name: item.title,
                    floor: item.id,
                    volume: item.id,
                    id: item.id,
                    isVerified: true,
                  }}
                /> */}
              {products.map((item: any) => (
                <>
                  <Link to={'/game/213'}>
                    <CardBox
                      key={item.id}
                      mt={2}
                      padding={0}
                      variant="baseStyle"
                      boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
                      cursor="pointer"
                      role="group"
                      _hover={{
                        transform: 'translateY(-5px)',
                        boxShadow: 'rgba(0, 0, 0, 0.08) 7px 16px 16px',
                      }}
                      transition="box-shadow 0.25s ease-in-out 0s, transform 0.25s ease 0s"
                    >
                      <VStack alignItems="flex-start" gap={0}>
                        <Box width="full" padding={2}>
                          <Box overflow="hidden" borderRadius="xl">
                            <Image
                              objectFit="cover"
                              _groupHover={{
                                transform: 'scale(1.2)',
                                transition: ' 0.25s ease-in-out',
                              }}
                              src={
                                'https://i.seadn.io/gcs/files/1deeafe9cb7d2eeb2e2116804e06dc88.gif?auto=format&dpr=1&w=282'
                              }
                              alt={`Image ${item.name}`}
                              width="full"
                              h="10.5rem"
                            />
                          </Box>
                        </Box>

                        <Box
                          p={4}
                          width="full"
                          borderTop="0.063rem solid "
                          borderColor="shader.a.200"
                        >
                          <HStack
                            gap={1.5}
                            mb={3.5}
                            justifyContent="space-between"
                          >
                            <Text
                              fontWeight="medium"
                              fontSize="lg"
                              noOfLines={1}
                            >
                              {item.title}
                            </Text>
                            <Flex>
                              <Text color="shader.a.600">ID:</Text>
                              <Text>{item.id}</Text>
                            </Flex>
                          </HStack>

                          <HStack justifyContent="space-between" width="full">
                            <Box>
                              <Text color="shader.a.600" fontSize="sm">
                                Floor:
                              </Text>
                              <Text fontWeight="medium">{item.stock} GAFI</Text>
                            </Box>
                            <Box>
                              <Text color="shader.a.600" fontSize="sm">
                                Volume:
                              </Text>
                              <Text fontWeight="medium">{item.price} GAFI</Text>
                            </Box>
                          </HStack>
                        </Box>
                      </VStack>
                    </CardBox>
                  </Link>
                </>
              ))}
            </Grid>
            {hasMore && (
              <>
                <Grid
                  ref={ref}
                  gridTemplateColumns={{
                    lg: `repeat(${isOpen ? 4 : 5},1fr)`,
                    md: 'repeat(3,1fr)',
                    base: 'repeat(2,1fr)',
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

export default Games;
