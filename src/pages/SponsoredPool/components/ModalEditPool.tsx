import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { SponsoredPool } from 'gafi-dashboard/graphQL/generates';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EditPoolNameForm from './EditPoolNameForm';
import EditTargetsForm from './EditTargetsForm';

interface IModalEditPoolProps {
  pool: SponsoredPool;
  isOpen: boolean;
  onClose: () => void;
}

const ModalEditPool: React.FC<IModalEditPoolProps> = ({
  pool,
  isOpen,
  onClose,
}) => {
  const { id, targets } = pool;
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('EDIT_POOL')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>{t('TARGETS')}</Tab>
              <Tab>{t('POOL_NAME')}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <EditTargetsForm poolId={id} targets={targets} />
              </TabPanel>
              <TabPanel>
                <EditPoolNameForm poolId={id} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditPool;
