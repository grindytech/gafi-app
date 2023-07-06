import { Center, Heading, Spinner } from '@chakra-ui/react';
import ConnectSubstrate from 'components/ConnectSubstrate';
import { connectAPI } from 'components/ConnectSubstrate/ConnectSubstrateUtils';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { RouterProvider } from 'react-router-dom';
import router from 'routes/routes';

export default function App() {
  /*   const dispatch = useAppDispatch();

  const { apiState, socket, jsonrpc } = useAppSelector(
    state => state.substrate
  );

  connectAPI({ socket, jsonrpc, apiState, dispatch });

  if (apiState !== 'READY') {
    return (
      <Center height="100vh" gap={4}>
        <Spinner color="primary.a.500" size="md" />
        <Heading fontSize="lg" color="shader.a.600" fontWeight="medium">
          Connecting to Substrate
        </Heading>
      </Center>
    );
  } */

  return (
    <>
      <ConnectSubstrate />

      <RouterProvider router={router} />
    </>
  );
}
