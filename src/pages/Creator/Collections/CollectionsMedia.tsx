import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { BoxProps, Flex } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import BackgroundUpload, {
  BackgroundUploadProps,
} from 'components/BackgroundUpload';
import { CollectionsFieldProps } from '.';
import { validateLength } from 'utils/utils.validate';

interface CollectionsMedia {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

interface fieldsSetMediaProps {
  fieldName: keyof CollectionsFieldProps;
  isRequired?: boolean;
  size: BackgroundUploadProps['size'];
  name: BackgroundUploadProps['name'];
  onChange: React.Dispatch<React.SetStateAction<File | undefined>>;
  value: File | undefined;
  sx?: BoxProps;
}

export default ({ setValue, watch, setRequired }: CollectionsMedia) => {
  const { logo, banner, cover } = watch();

  const [backgroundAvatar, setBackgroundAvatar] = useState(logo);
  const [backgroundBanner, setBackgroundBanner] = useState(banner);
  const [backgroundCover, setBackgroundCover] = useState(cover);

  const fieldsSet: fieldsSetMediaProps[] = [
    {
      fieldName: 'logo',
      isRequired: true,
      name: 'Background Logo',
      size: '350x350px',
      onChange: setBackgroundAvatar as typeof setBackgroundBanner,
      value: backgroundAvatar,
      sx: {
        width: { base: 'full', md: '11.25rem' },
        sx: {
          '> div': { height: '11.25rem' },
        },
      },
    },
    {
      fieldName: 'banner',
      name: 'Background Banner',
      size: '512x512px',
      onChange: setBackgroundBanner,
      value: backgroundBanner,
      sx: {
        width: { base: 'full', md: 80 },
        sx: {
          '> div': { height: '11.25rem' },
        },
      },
    },
    {
      fieldName: 'cover',
      name: 'Background Cover',
      size: '1400x280px',
      onChange: setBackgroundCover,
      value: backgroundCover,
      sx: {
        width: 'full',
        sx: {
          '> div': { height: '11.25rem' },
        },
      },
    },
  ];

  // update setValue when useState change
  useEffect(() => {
    setValue('logo', backgroundAvatar);
    setValue('banner', backgroundBanner);
    setValue('cover', backgroundCover);
  }, [backgroundAvatar, backgroundBanner, backgroundCover]);

  // update setRequired when watch existed
  useEffect(() => {
    validateLength({
      watch,
      fieldsSet,
      setRequired,
      step: 1,
    });
  }, [logo, banner, cover]);

  return (
    <Flex gap={6} flexWrap="wrap" width="full">
      {fieldsSet.map(meta => (
        <BackgroundUpload
          key={meta.fieldName}
          isRequired={meta.isRequired}
          name={meta.name}
          size={meta.size}
          setBackground={meta.onChange}
          background={meta.value}
          sx={{
            ...meta.sx,
          }}
        />
      ))}
    </Flex>
  );
};
