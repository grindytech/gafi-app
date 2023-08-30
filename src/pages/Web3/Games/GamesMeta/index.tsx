import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { GamesFieldProps, fieldsSetProps } from '..';
import { BoxProps, Flex } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import BackgroundUpload, {
  BackgroundAvatarProps,
} from 'components/BackgroundUpload';

interface GamesMetaProps {
  setValue: UseFormSetValue<GamesFieldProps>;
  watch: UseFormWatch<GamesFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

interface fieldsSetMediaProps extends Pick<fieldsSetProps, 'isRequired'> {
  fieldName: keyof GamesFieldProps;
  size: BackgroundAvatarProps['size'];
  name: BackgroundAvatarProps['name'];
  onChange: React.Dispatch<React.SetStateAction<File | undefined>>;
  value: File | undefined;
  sx?: BoxProps;
}

export default ({ setValue, watch, setRequired }: GamesMetaProps) => {
  const [avatar, setAvatar] = useState<File | undefined>();
  const [banner, setBanner] = useState<File | undefined>();
  const [cover, setCover] = useState<File | undefined>();

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
  }, [avatar, banner, cover]);

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
    <Flex gap={6} flexWrap="wrap">
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
