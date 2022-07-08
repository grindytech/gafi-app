import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { mdiPlus } from '@mdi/js';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import NumberInput from 'components/numberInput/NumberInput';
import TargetFields from 'components/TargetFields';
import useCreatePool from 'hooks/useCreatePool';
import { usePolkadotBalance } from 'hooks/useUserBalance';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ISponsoredPoolForm {
  targets: { contractAddress: string }[];
  name: string;
  poolAmount: number;
  discount: string;
  txLimit: string;
}

const ModalAddSponsoredPool: React.FC<IProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, control } = useForm<ISponsoredPoolForm>({
    defaultValues: { targets: [{ contractAddress: '' }] },
  });
  const history = useHistory();
  const { polkadotBalance } = usePolkadotBalance();
  const { createPool, isLoading } = useCreatePool(() => {
    onClose();
    history.push('/admin/sponsored-pool?type=owned');
  });
  const { fields, append, remove } = useFieldArray<ISponsoredPoolForm>({
    control,
    name: 'targets',
  });

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent
        sx={{
          borderRadius: '16px',
        }}
        p={3}
      >
        <ModalHeader>{t('CREATE_SPONSORED_POOL')}</ModalHeader>
        <form
          name="add-pool-form"
          onSubmit={handleSubmit((data: ISponsoredPoolForm) => {
            createPool(data);
          })}
        >
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel fontSize="md" fontWeight="normal" htmlFor="">
                {t('POOL_AMOUNT')}
              </FormLabel>
              <Controller
                control={control}
                name="poolAmount"
                render={({ field }) => (
                  <NumberInput
                    inputName="poolAmount"
                    value={field.value}
                    onChange={field.onChange}
                    max={parseFloat(polkadotBalance?.toString() || '0')}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'REQUIRED_VALIDATION',
                  },
                }}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize="md" fontWeight="normal" htmlFor="">
                {t('DISCOUNT')}
              </FormLabel>
              <Input
                size="lg"
                id="discount"
                type="text"
                {...register('discount', { required: true })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize="md" fontWeight="normal" htmlFor="">
                {t('TRANSACTION_LIMIT')}
              </FormLabel>
              <Input
                size="lg"
                id="txLimit"
                type="text"
                {...register('txLimit', { required: true })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize="md" fontWeight="normal" htmlFor="">
                {t('TARGETS')}
              </FormLabel>
              <TargetFields
                fields={fields}
                remove={remove}
                register={register}
              />
            </FormControl>

            <Button
              disabled={fields.length >= 5}
              variant="primary"
              size="sm"
              onClick={() => append({ contractAddress: '' })}
              leftIcon={
                <Icon w={18} h={18}>
                  <path fill="currentColor" d={mdiPlus} />
                </Icon>
              }
            >
              {t('ADD_TARGETS')}
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" variant="transparent" mr={3} onClick={onClose}>
              {t('CANCEL')}
            </Button>
            <Button
              type="submit"
              color="white"
              size="sm"
              px={8}
              variant="solid"
              isLoading={isLoading}
            >
              {t('SAVE')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddSponsoredPool;
