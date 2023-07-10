import { useEffect, useRef, useState } from 'react';
// It only use for test layout
import { Grid } from '@chakra-ui/react';
import CardTypeOne, {
  CardTypeOneSkeleton,
} from 'components/ProductCard/CardTypeOne';

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
      `https://dummyjson.com/products?limit=12&&skip=${page * 10}`
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
  }, products);
  return (
    <>
      <Grid
        justifyContent="center"
        gridTemplateColumns={{
          lg: 'repeat(4,1fr)',
          md: 'repeat(3,1fr)',
        }}
        gap={5}
      >
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
          <Grid ref={ref} gridTemplateColumns={{ md: 'repeat(4,1fr)' }} gap={5}>
            <CardTypeOneSkeleton />
            <CardTypeOneSkeleton />
            <CardTypeOneSkeleton />
            <CardTypeOneSkeleton />
          </Grid>
        </>
      )}
    </>
  );
};

export default DataResult;
