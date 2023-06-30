import { Stack } from '@chakra-ui/react';
import PoolsBanner from '../Pools/components/PoolsBanner';
import DeployContractUpload from './components/DeployContractUpload';

export default function DeployContract() {
  return (
    <>
      <Stack spacing={6}>
        <PoolsBanner
          heading="Deploy Contract"
          body="Let's deploy your contracts. See demo for more details."
          detail="#"
        />

        <DeployContractUpload />
      </Stack>
    </>
  );
}
