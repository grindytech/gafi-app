import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { BoxProps, Flex } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import BackgroundUpload, {
  BackgroundAvatarProps,
} from 'components/BackgroundUpload';
import { CollectionsFieldProps } from '..';

interface CollectionsMedia {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

interface fieldsSetMediaProps {
  fieldName: keyof CollectionsFieldProps;
  isRequired?: boolean;
  size: BackgroundAvatarProps['size'];
  name: BackgroundAvatarProps['name'];
  onChange: React.Dispatch<React.SetStateAction<File | undefined>>;
  value: File | undefined;
  sx?: BoxProps;
}

export default ({ setValue, watch, setRequired }: CollectionsMedia) => {
  const { media_avatar, media_banner, media_cover } = watch();

  const [avatar, setAvatar] = useState(media_avatar);
  const [banner, setBanner] = useState(media_banner);
  const [cover, setCover] = useState(media_cover);

  const fieldsSet: fieldsSetMediaProps[] = [
    {
      fieldName: 'media_avatar',
      isRequired: true,
      name: 'Background Avatar',
      size: '320x320px',
      onChange: setAvatar,
      value: avatar,
      sx: {
        width: { base: 'full', md: '11.25rem' },
        sx: {
          '> div': { height: '11.25rem' },
        },
      },
    },
    {
      fieldName: 'media_banner',
      name: 'Background Banner',
      size: '320x192px',
      onChange: setBanner,
      value: banner,
      sx: {
        width: { base: 'full', md: 80 },
        sx: {
          '> div': { height: '11.25rem' },
        },
      },
    },
    {
      fieldName: 'media_cover',
      name: 'Background Cover',
      size: '1400x280px',
      onChange: setCover,
      value: cover,
      sx: {
        width: 'full',
        sx: {
          '> div': { height: '11.25rem' },
        },
      },
    },
  ];

  // update setValue
  useEffect(() => {
    setValue('media_avatar', avatar);
    setValue('media_banner', banner);
    setValue('media_cover', cover);
  }, [avatar, cover, banner]);

  // update setRequired
  useEffect(() => {
    const fieldsRequired = () => {
      const findRequired = fieldsSet.filter(
        meta => meta.isRequired && !watch()[meta.fieldName]
      );

      return findRequired.length;
    };

    setRequired(prev => ({
      ...prev,
      1: fieldsRequired(),
    }));
  }, [avatar, banner, cover]);

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