import { SwiperSlide, Swiper } from 'swiper/react';
import { Box, Image } from '@chakra-ui/react';
import { Mousewheel } from 'swiper';

interface IProps {
  items: Array<{ image: string; id: string }>;
  setThumbsSwiper: any;
}
const ThumbsProducts = ({ items, setThumbsSwiper }: IProps) => {
  return (
    <>
      {items.length > 1 && (
        <Box
          position="relative"
          sx={{
            _hover: {
              '.btn-carousel': {
                opacity: 1,
                visibility: 'visible',
              },
            },
            '.custom-thumbs.swiper-slide-thumb-active': {
              border: '0.125rem solid',
              borderRadius: 'xl',
              borderColor: 'primary.a.500',
            },
          }}
        >
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={7}
            modules={[Mousewheel]}
            mousewheel={{ forceToAxis: true, releaseOnEdges: false }}
            spaceBetween={10}
            breakpoints={{
              360: {
                slidesPerView: 4,
              },
              630: {
                slidesPerView: 5,
              },
              920: {
                slidesPerView: 6,
              },

              1280: {
                slidesPerView: 7,
              },
            }}
          >
            {items.map(item => {
              return (
                <SwiperSlide
                  key={`product-thumb-gallery-${item.id}`}
                  className="custom-thumbs"
                >
                  <Image
                    src={item.image}
                    alt={`Product thumb gallery ${item.id}`}
                    width={70}
                    padding={1}
                    objectFit="cover"
                    borderRadius="xl"
                    height={70}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      )}
    </>
  );
};

export default ThumbsProducts;
