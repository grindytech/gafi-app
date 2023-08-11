import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import RatioPicture from 'components/RatioPicture';
import { useNavigate, useParams } from 'react-router-dom';

import useSubscribeSystem from 'hooks/useSubscribeSystem';
import React from 'react';

import useMetaNFT from 'hooks/useMetaNFT';
import { cloundinary_link } from 'axios/cloudinary_axios';
import StartIcon from 'public/assets/line/start.svg';
import { stringToHex } from '@polkadot/util';
import { useAppSelector } from 'hooks/useRedux';
import SuccessIcon from 'public/assets/Illustration/success.svg';

interface PoolSuccessfulyProps {
  onCloseSuccess: () => void;
}

interface metaProps {
  nft_id: number;
  collection_id: number;
  amount?: number;
}

export default function PoolSuccessfuly({
  onCloseSuccess,
}: PoolSuccessfulyProps) {
  const { event, setEvent } = useSubscribeSystem('game::Minted');
  const [getNFT, setGetNFT] = React.useState<metaProps[]>([]);
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { id } = useParams();

  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    const subscribe = () => {
      if (event) {
        event.forEach(({ eventValue }) => {
          const who: string = JSON.parse(eventValue)[1];
          const meta = JSON.parse(eventValue)[3];
          const sums: Partial<metaProps> = {};

          meta.forEach(
            ({ item, collection }: { item: number; collection: number }) => {
              const key = `${collection}/${item}` as keyof typeof sums;
              const notFound = 0;

              // unique key object { 0/10: n++ } this collection/nft_id: amount
              sums[key] = (sums[key] || notFound) + 1;
            }
          );

          const getMinted = Object.entries(sums).map(data => {
            const [collection, item] = data[0].split('/');

            return {
              collection_id: Number(collection),
              nft_id: Number(item),
              amount: data[1],
            };
          });

          if (account?.address === who) {
            setGetNFT(getMinted);
          }

          setEvent([]);
        });
      }
    };

    subscribe();

    return () => subscribe();
  }, [event]);

  const { metaNFT } = useMetaNFT({
    key: id,
    group: getNFT?.map(item => ({
      collection_id: item.collection_id,
      nft_id: item.nft_id,
    })),
  });

  return (
    <Modal isOpen={true} onClose={onCloseSuccess} size="2xl">
      <ModalOverlay />

      <ModalContent borderRadius="2xl">
        <ModalHeader textAlign="center">
          <Icon as={SuccessIcon} width={16} height={16} />

          <Heading
            fontSize="xl"
            lineHeight={4}
            fontWeight="semibold"
            color="shader.a.900"
          >
            Minted Successful
          </Heading>
        </ModalHeader>

        <ModalBody>
          <Center
            gap={4}
            flexWrap="wrap"
            sx={{
              '> div': {
                borderRadius: 'xl',
                borderWidth: '0.0625rem',
                borderStyle: 'solid',
              },
            }}
          >
            {getNFT.length ? (
              React.Children.toArray(
                getNFT.map(meta => {
                  const currentNFT = metaNFT?.find(
                    data =>
                      data?.collection_id === meta.collection_id &&
                      data?.nft_id === meta.nft_id
                  );

                  return (
                    <Box
                      borderColor="shader.a.300"
                      bg="white"
                      width={getNFT.length <= 3 ? 40 : 28}
                    >
                      <RatioPicture
                        src={
                          currentNFT?.image
                            ? cloundinary_link(currentNFT.image)
                            : null
                        }
                        sx={{ height: 28 }}
                      />

                      <Center
                        justifyContent="space-between"
                        fontSize="sm"
                        padding={2}
                      >
                        <Center gap={1} color="second.orange">
                          <Icon as={StartIcon} width={4} height={4} />

                          <Text>{meta.nft_id}</Text>
                        </Center>

                        <Text
                          as="span"
                          fontWeight="medium"
                          color="shader.a.900"
                        >
                          x{meta.amount}
                        </Text>
                      </Center>
                    </Box>
                  );
                })
              )
            ) : (
              <Box padding={12} borderColor="shader.a.300" bg="shader.a.200">
                Good luck next time
              </Box>
            )}
          </Center>
        </ModalBody>

        <ModalFooter justifyContent="center" gap={2}>
          <Button
            px={12}
            isDisabled={!getNFT.length}
            _hover={{}}
            borderRadius="xl"
            variant="primary"
            onClick={() => {
              const formatSelected = getNFT.map(
                ({ collection_id, nft_id }) => `${collection_id}/${nft_id}`
              );

              navigate({
                pathname: `/account/${account?.address}`,
                search: `?select_nft=${stringToHex(
                  JSON.stringify(formatSelected)
                )}`,
              });
            }}
          >
            Sell now
          </Button>

          <Button
            px={12}
            borderRadius="xl"
            variant="cancel"
            onClick={onCloseSuccess}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
