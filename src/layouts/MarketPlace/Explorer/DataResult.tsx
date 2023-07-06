import { useEffect, useRef, useState } from 'react';
// It only use for test layout
import { Box, Grid, Skeleton } from '@chakra-ui/react';
import CardTypeOne from 'components/ProductCard/CardTypeOne';
import CardBox from 'components/CardBox';
const DataResult = () => {
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
      `https://dummyjson.com/products?limit=11&&skip=${page * 10}`
    );
    const data = await response.json();
    console.log(data);
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
    console.log(products);
  }, products);
  return (
    <>
      <Box overflow="auto" width="full">
        <Grid gridTemplateColumns={{ md: 'repeat(4,1fr)' }} gap={5}>
          {products.map((item: any) => (
            <CardTypeOne
              key={item.id}
              item={{
                image: item.images[0],
                name: item.title,
                floor: item.stock,
                volume: item.stock,
                id: item.id,
              }}
            />
          ))}
        </Grid>
        {hasMore && (
          <>
            <Grid
              ref={ref}
              gridTemplateColumns={{ md: 'repeat(4,1fr)' }}
              gap={5}
            >
              <CardBox
                padding={0}
                variant="baseStyle"
                boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
                cursor="pointer"
                transition="all linear 0.6s"
              >
                <Skeleton>
                  <Box height="200px"></Box>
                </Skeleton>
              </CardBox>
              <CardBox
                padding={0}
                variant="baseStyle"
                boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
                cursor="pointer"
                transition="all linear 0.6s"
              >
                <Skeleton>
                  <Box height="200px"></Box>
                </Skeleton>
              </CardBox>
              <CardBox
                padding={0}
                variant="baseStyle"
                boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
                cursor="pointer"
                transition="all linear 0.6s"
              >
                <Skeleton>
                  <Box height="200px"></Box>
                </Skeleton>
              </CardBox>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default DataResult;
