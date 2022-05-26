import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { handleTxError } from 'components/utils';
import { SponsoredPool } from 'gafi-dashboard/graphQL/generates';
import { t } from 'i18next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubstrateState } from 'substrate-lib';
import EditPoolNameForm from './EditPoolNameForm';
import EditTargetsForm from './EditTargetsForm';

interface IModalEditPoolProps {
  pool: SponsoredPool;
  isOpen: boolean;
  onClose: () => void;
}
interface IEditTargetsForm {
  poolName: string;
}

const ModalEditPool: React.FC<IModalEditPoolProps> = ({
  pool,
  isOpen,
  onClose,
}) => {
  const { poolId, targets } = pool;
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('EDIT_POOL')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Targets</Tab>
              <Tab>Pool name</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <EditTargetsForm poolId={poolId} targets={targets} />
              </TabPanel>
              <TabPanel>
                <EditPoolNameForm poolId={poolId} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditPool;
