import { cloundinary_link } from 'axios/cloudinary_axios';
import CardBox from 'components/CardBox';
import RatioPicture from 'components/RatioPicture';
import SwiperThumbs from 'layouts/SwiperThumbs';
import SwiperThumbsButton from 'layouts/SwiperThumbs/SwiperThumbsButton';
import { Swiper as SwiperType } from 'swiper/types';

import React, { PropsWithChildren } from 'react';
import { SwiperSlide } from 'swiper/react';
import { TypeMetadataOfItem } from 'types';
import { GafiSupportGameTypesPackage } from '@polkadot/types/lookup';

interface BundleLayoutModelProps extends PropsWithChildren {
  swiperRef: React.MutableRefObject<SwiperType | undefined>;
  thumbs: SwiperType | null;
  data: GafiSupportGameTypesPackage[];
  metaNFT: TypeMetadataOfItem[] | undefined;
}

export default function BundleLayoutModel({
  swiperRef,
  thumbs,
  data,
  metaNFT,
  children,
}: BundleLayoutModelProps) {
  return (
    <CardBox
      variant="baseStyle"
      padding={0}
      position={{ lg: 'sticky' }}
      top={24}
      overflow="hidden"
      height="fit-content"
      role="group"
    >
      <SwiperThumbs swiperRef={swiperRef} thumbs={thumbs as SwiperType}>
        <SwiperThumbsButton swiperRef={swiperRef} />

        {React.Children.toArray(
          data.map(meta => {
            const currentMetaNFT = metaNFT?.find(
              data =>
                data?.collection_id === meta.collection.toNumber() &&
                data?.nft_id === meta.item.toNumber()
            );

            return (
              <SwiperSlide>
                <RatioPicture
                  src={
                    currentMetaNFT?.image
                      ? cloundinary_link(currentMetaNFT.image)
                      : null
                  }
                  sx={{ height: '40rem' }}
                />
              </SwiperSlide>
            );
          })
        )}

        {children}
      </SwiperThumbs>
    </CardBox>
  );
}
