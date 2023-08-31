import { Box } from '@chakra-ui/react';
import BackgroundUpload from 'components/BackgroundUpload';
import { useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { NFTsFieldProps } from '..';

interface NFTsMediaProps {
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

export default ({ setValue, setRequired, watch }: NFTsMediaProps) => {
  const { media_avatar } = watch();

  const [avatar, setAvatar] = useState(media_avatar);

  useEffect(() => {
    setValue(`media_avatar`, avatar);
  }, [avatar]);

  useEffect(() => {
    const fieldsRequired = () => {
      return watch().media_avatar ? 0 : 1;
    };

    setRequired({
      1: fieldsRequired(),
    });
  }, [media_avatar]);

  return (
    <Box padding={3} width="full" borderRadius="xl" bg="shader.a.900">
      <BackgroundUpload
        name="Background Avatar"
        size="512x512px"
        setBackground={setAvatar}
        background={avatar}
        isRequired={true}
        sx={{
          sx: {
            '> div': { height: 'lg' },
          },
        }}
      />
    </Box>
  );
};
