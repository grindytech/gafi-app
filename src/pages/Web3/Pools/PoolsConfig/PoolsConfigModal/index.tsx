import {
  Box,
  Button,
  Center,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import RatioPicture from 'components/RatioPicture';
import { colors } from 'theme/theme';
import { convertHex } from 'utils/utils';
import CloseIcon from 'public/assets/fill/close.svg';
import { PropsWithChildren } from 'react';
import SearchIcon from 'public/assets/line/search.svg';
import { UseFormSetValue } from 'react-hook-form';
import { cloundinary_link } from 'axios/cloudinary_axios';
import { PoolsFieldProps } from '../..';

interface PoolsConfigModalProps extends PropsWithChildren {
  onClose: () => void;
  setValue: UseFormSetValue<PoolsFieldProps>;
  product: PoolsFieldProps['add_item_supply'];
  add_key: keyof PoolsFieldProps;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default ({
  onClose,
  setValue,
  children,
  add_key,
  product,
  setSearch,
}: PoolsConfigModalProps) => {
  return (
    <Modal isOpen={true} onClose={onClose} size="4xl">
      <ModalOverlay />

      <ModalContent
        mx={4}
        border="0.0625rem solid"
        borderColor="shader.a.900"
        borderRadius="xl"
      >
        <ModalHeader
          padding={0}
          position="sticky"
          top={0}
          bg="shader.a.900"
          zIndex="docked"
        >
          <Box
            padding={4}
            borderBottom="0.0625rem solid"
            borderColor="shader.a.800"
          >
            <Center justifyContent="space-between">
              <Text color="white" fontWeight="medium">
                Select Items
              </Text>

              <ModalCloseButton
                width={5}
                height={5}
                color="white"
                position="unset"
              />
            </Center>

            <InputGroup
              mt={4}
              bg={convertHex(colors.shader.a[800], 0.25)}
              borderRadius="xl"
              border="0.0625rem solid"
              borderColor="shader.a.800"
            >
              <InputLeftAddon
                bg="transparent"
                padding={0}
                py={3.5}
                pl={4}
                border="unset"
              >
                <Icon
                  color="shader.a.500"
                  as={SearchIcon}
                  width={5}
                  height={5}
                />
              </InputLeftAddon>

              <Input
                pl={3}
                variant="validate"
                placeholder="Search by ID or name..."
                bg="transparent"
                onChange={event => setSearch(event.target.value)}
                _placeholder={{
                  color: 'shader.a.500',
                }}
              />
            </InputGroup>
          </Box>

          <Center
            padding={4}
            justifyContent="space-between"
            color="white"
            fontSize="sm"
            fontWeight="medium"
            borderRadius="lg"
          >
            <Button
              variant="unstyled"
              border="0.0625rem solid"
              borderColor="primary.a.500"
              borderRadius="inherit"
              px={6}
              py={3}
              onClick={() => {
                setValue(add_key, undefined);
              }}
            >
              Clear selected ({product?.length})
            </Button>

            <Button
              variant="primary"
              fontWeight="inherit"
              fontSize="inherit"
              color="inherit"
              borderRadius="inherit"
              px={6}
              py={3}
              onClick={onClose}
            >
              Confirm
            </Button>
          </Center>

          {product?.length ? (
            <Grid
              borderTop="0.0625rem solid"
              borderColor="shader.a.800"
              padding={4}
              flexWrap="wrap"
              gap={4}
              gridTemplateColumns={{
                base: 'repeat(3, 1fr)',
                sm: 'repeat(5, 1fr)',
                md: 'repeat(8, 1fr)',
                lg: 'repeat(12, 1fr)',
              }}
            >
              {product.map(({ collection, nft }) => {
                const key = `${add_key}.${collection.id}/${nft.id}`;

                return (
                  <Box
                    key={`${collection.id}/${nft.id}`}
                    borderRadius="lg"
                    border="0.0625rem solid"
                    borderColor="primary.a.400"
                    position="relative"
                    bg="shader.a.800"
                  >
                    <RatioPicture
                      src={nft?.image ? cloundinary_link(nft.image) : null}
                      sx={{
                        sx: {
                          '> div': { height: 12 },
                        },
                      }}
                    />

                    <Icon
                      position="absolute"
                      inset="0 0 auto auto"
                      transform="translate(25%, -25%)"
                      as={CloseIcon}
                      width={5}
                      height={5}
                      cursor="pointer"
                      color="shader.a.400"
                      onClick={() => {
                        setValue(
                          key as unknown as keyof PoolsFieldProps,
                          undefined
                        );
                      }}
                    />
                  </Box>
                );
              })}
            </Grid>
          ) : null}
        </ModalHeader>

        <ModalBody bg="shader.a.1000" padding={0}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
