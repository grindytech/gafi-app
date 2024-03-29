import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import EditPoolNameForm from './EditPoolNameForm';
import EditTargetsForm from './EditTargetsForm';

import { SponsoredPool } from 'graphQL/generates';

interface IModalEditPoolProps {
  pool?: SponsoredPool;
  isOpen: boolean;
  onClose: () => void;
  onCloseDetail: () => void;
}

const ModalEditPool: React.FC<IModalEditPoolProps> = ({
  pool,
  isOpen,
  onClose,
  onCloseDetail,
}) => {
  const { t } = useTranslation();

  const [isPending, setIsPending] = useState(false);

  return (
    <>
      {pool && (
        <Modal
          isOpen={isOpen}
          onClose={() => (isPending ? null : onClose())}
          scrollBehavior="inside"
          size="2xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{t('EDIT_POOL')}</ModalHeader>
            <ModalBody>
              <Tabs variant="enclosed">
                <TabList>
                  <Tab>{t('TARGETS')}</Tab>
                  <Tab>{t('POOL_NAME')}</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <EditTargetsForm
                      setIsPending={setIsPending}
                      onCloseDetail={onCloseDetail}
                      onClose={onClose}
                      poolId={pool.id}
                      targets={pool.targets}
                    />
                  </TabPanel>
                  <TabPanel>
                    <EditPoolNameForm
                      onCloseDetail={onCloseDetail}
                      onClose={onClose}
                      poolId={pool.id}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ModalEditPool;
