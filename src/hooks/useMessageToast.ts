import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const useMessageToast = () => {
  const toast = useToast();
  const { t } = useTranslation();

  const CopySuccessToast = () => {
    toast({
      description: t('COPIED_TO_CLIPBOARD'),
      isClosable: true,
      status: 'success',
    });
  };

  return {
    CopySuccessToast,
  };
};

export default useMessageToast;
