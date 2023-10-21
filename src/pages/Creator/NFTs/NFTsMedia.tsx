import { Box, BoxProps } from '@chakra-ui/react';
import BackgroundUpload, {
  BackgroundUploadProps,
} from 'components/BackgroundUpload';
import { useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { NFTsFieldProps } from '.';
import { validateLength } from 'utils/utils.validate';

interface NFTsMediaProps {
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

interface fieldsSetMediaProps {
  fieldName: keyof NFTsFieldProps;
  isRequired?: boolean;
  size: BackgroundUploadProps['size'];
  name: BackgroundUploadProps['name'];
  onChange: React.Dispatch<React.SetStateAction<File | undefined>>;
  value: File | undefined;
  sx?: BoxProps;
}

export default ({ setValue, setRequired, watch }: NFTsMediaProps) => {
  const { image } = watch();

  const [backgroundImage, setBackgroundImage] = useState(image);

  const fieldsSet: fieldsSetMediaProps[] = [
    {
      fieldName: 'image',
      isRequired: true,
      name: 'Background Logo',
      size: '512x512px',
      onChange: setBackgroundImage as never,
      value: backgroundImage,
      sx: {
        sx: {
          '> div': {
            height: 'lg',
          },
        },
      },
    },
  ];

  // update setValue when useState change
  useEffect(() => {
    setValue('image', backgroundImage);
  }, [backgroundImage]);

  // update setRequired when watch existed
  useEffect(() => {
    validateLength({
      watch,
      fieldsSet,
      setRequired,
      step: 1,
    });
  }, [image]);

  return (
    <Box padding={3} width="full" borderRadius="xl" bg="shader.a.900">
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
    </Box>
  );
};
