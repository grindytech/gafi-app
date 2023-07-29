import { Image } from '@chakra-ui/react';
import { Navigation, Thumbs, Mousewheel } from 'swiper';
import Carousel from 'components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';

interface IProps {
  items: Array<{ image: string; id: string }>;
  thumbsSwiper: any;
}
const ThumbProductImage = ({ items, thumbsSwiper }: IProps) => {
  return (
    <Carousel
      options={{
        thumbs: { swiper: thumbsSwiper },
        modules: [Navigation, Thumbs, Mousewheel],
        slidesPerView: 1,
        /*     freeMode: true, */

        breakpoints: {
          360: {
            slidesPerView: 1,
          },
          630: {
            slidesPerView: 1,
          },
          920: {
            slidesPerView: 1,
          },
          1280: {
            slidesPerView: 1,
          },
        },
      }}
      sxProps={{
        width: '90%',
        left: '5%',
        right: '5%',
      }}
    >
      {items.map(item => (
        <SwiperSlide
          key={`product-gallery-${item.id}`}
          style={{
            width: 'inherit',
            transition: 'all linear 300ms',
          }}
        >
          <Image
            src={item.image}
            alt={`Product gallery ${item.id}`}
            objectFit="cover"
          />
        </SwiperSlide>
      ))}
    </Carousel>
  );
};

export default ThumbProductImage;
