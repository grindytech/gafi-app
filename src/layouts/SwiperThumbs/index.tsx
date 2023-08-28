import React, { PropsWithChildren } from 'react';
import { Swiper } from 'swiper/react';
import { SwiperOptions, Swiper as SwiperType } from 'swiper/types';
import { Mousewheel, Thumbs } from 'swiper';

interface SwiperThumbsProps extends PropsWithChildren {
  swiperRef: React.MutableRefObject<SwiperType | undefined | null>;
  thumbs: SwiperType;
  sx?: SwiperOptions;
}

export default function SwiperThumbs({
  swiperRef,
  thumbs,
  children,
  sx,
}: SwiperThumbsProps) {
  return (
    <Swiper
      onSwiper={swiper => (swiperRef.current = swiper)}
      loop={true}
      slidesPerView={1}
      modules={[Thumbs, Mousewheel]}
      thumbs={{ swiper: thumbs }}
      mousewheel={{ forceToAxis: true }}
      spaceBetween={32}
      {...sx}
    >
      {children}
    </Swiper>
  );
}
