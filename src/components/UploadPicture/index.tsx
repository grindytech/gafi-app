import {
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import React from 'react';
import UploadIcon from 'public/assets/line/upload.svg';
import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';
import { UseFormSetValue } from 'react-hook-form';
import Cropper, { ReactCropperElement } from 'react-cropper';
import CameraIcon from 'public/assets/fill/camera.svg';

interface UploadPictureProps {
  formState: {
    setValue: UseFormSetValue<any>;
    value: string;
    isInvalid?: boolean;
    isRequired?: boolean;
  };
}

interface stateImageProps {
  preview?: string;
  crop?: string;
}

export default function UploadPicture({ formState }: UploadPictureProps) {
  const [image, setImage] = React.useState<stateImageProps>({});
  const upload = document.getElementById('upload-image') as HTMLInputElement;

  const cropperRef = React.useRef<ReactCropperElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const revokeObject = (type: 'crop' | 'preview') => {
    if (type === 'crop' && image.crop) return URL.revokeObjectURL(image.crop);

    if (type === 'preview' && image.preview)
      return URL.revokeObjectURL(image.preview);
  };

  const handleUpload = (file: FileList | null) => {
    // delete memory
    revokeObject('preview');

    // update blob
    if (file && file[0]) {
      setImage({ preview: URL.createObjectURL(file[0]) });
      onOpen();
    }
  };

  const handleCrop = () => {
    const file_upload = upload.files as FileList;

    if (cropperRef.current) {
      cropperRef.current.cropper.getCroppedCanvas().toBlob(blob => {
        if (blob) {
          const file = new File([blob], file_upload[0].name, {
            type: file_upload[0].type,
          });

          revokeObject('crop');

          setImage({ crop: URL.createObjectURL(file) });
          formState.setValue(formState.value, file);
          onClose();
        }
      });
    }
  };

  const handleMouse = (event: React.MouseEvent, opacity: number) => {
    const target = event.target as HTMLInputElement | null;
    const sibling = target?.previousSibling as HTMLDivElement | null;

    if (image.crop && sibling) {
      sibling.style.opacity = String(opacity);
    }
  };

  React.useEffect(() => {
    if (formState?.isInvalid && upload) {
      upload.value = ''; // reset value
      revokeObject('crop');
      setImage({});
    }
  }, [formState?.isInvalid]);

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />

          <ModalContent
            px={2}
            mx={8}
            textAlign="center"
            sx={{
              '.cropper-modal': {
                opacity: 0.55,
              },
              '.cropper-line': {
                bg: 'unset',
                display: 'none',
                pointerEvents: 'none',
              },
              '.cropper-face': {
                bg: 'unset',
              },
              '.cropper-view-box': {
                border: '0.0625rem dashed white',
                outline: 'unset',
              },
              '.cropper-center': {
                display: 'none',
                pointerEvents: 'none',
              },
              '.cropper-point.point': {
                '&-e, &-w, &-n, &-s': {
                  display: 'none',
                  pointerEvents: 'none',
                },
                '&-se, &-sw, &-nw, &-ne': {
                  width: 3,
                  height: 3,
                  bg: 'white',
                  borderRadius: 'full',
                },
              },
            }}
          >
            <ModalHeader padding={0}>
              <Heading
                fontSize="md"
                color="shader.a.900"
                fontWeight="medium"
                my={4}
              >
                Crop Images
              </Heading>
            </ModalHeader>

            <ModalBody padding={0}>
              <Cropper
                style={{
                  width: '100%',
                  height: '27rem',
                }}
                src={image.preview}
                ref={cropperRef}
                viewMode={1}
                guides={false}
                zoomable={false}
                aspectRatio={16 / 9}
                autoCropArea={0.5}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              />

              <Text fontSize="sm" color="shader.a.700" mt={6}>
                Recommend: 16:9&nbsp;
                <Text as="span" color="shader.a.900">
                  (320px x 180px)
                </Text>
                &nbsp;for best quality
              </Text>
            </ModalBody>

            <ModalFooter justifyContent="center" padding={0} gap={3} my={6}>
              <Button borderRadius="3xl" variant="cancel" onClick={onClose}>
                Cancel
              </Button>

              <Button borderRadius="3xl" variant="primary" onClick={handleCrop}>
                Save Crop
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Flex gap={4}>
        <Center
          flexDirection="column"
          borderRadius="lg"
          border="0.0625rem dashed"
          bg={convertHex(colors.primary.a[500], 0.05)}
          borderColor="primary.a.200"
          textAlign="center"
          position="relative"
          color="primary.a.500"
          width={80}
          height={48}
          onDragOver={event => event.preventDefault()}
          onMouseEnter={event => handleMouse(event, 1)}
          onMouseOut={event => handleMouse(event, 0)}
          onDrop={event => {
            // prevent open new tab by image on local
            event.preventDefault();

            handleUpload(event.dataTransfer.files);
          }}
        >
          {image.crop ? (
            <>
              <Image
                borderRadius="inherit"
                position="relative"
                width="full"
                height="full"
                objectFit="cover"
                src={image.crop}
              />

              <Center
                position="absolute"
                width="full"
                height="full"
                bg={convertHex('#000000', 0.4)}
                transitionDuration="ultra-slow"
                opacity={0}
              >
                <Icon as={CameraIcon} width={12} height={12} color="white" />
              </Center>
            </>
          ) : (
            <>
              <Icon as={UploadIcon} width={5} height={5} />

              <Text fontWeight="semibold" fontSize="xs" mt={2}>
                Drag & Drop files here, or click to select
              </Text>
            </>
          )}

          <Input
            onChange={event => handleUpload(event.target.files)}
            onClick={event => {
              const trigger = event as React.FormEvent<HTMLInputElement>;

              if (trigger.currentTarget.value) {
                trigger.currentTarget.value = '';
              }
            }}
            id="upload-image"
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            position="absolute"
            cursor="pointer"
            height="full"
            inset={0}
            opacity={0}
            isRequired={formState?.isRequired}
            isInvalid={true}
          />
        </Center>

        <List
          fontSize="sm"
          fontWeight="medium"
          color="shader.a.500"
          sx={{
            span: {
              color: 'shader.a.800',
              fontWeight: 'semibold',
            },
          }}
        >
          <ListItem>
            Size:&nbsp;
            <Text as="span">320 x 192 px</Text>
          </ListItem>
          <ListItem>
            Maximum:&nbsp;
            <Text as="span">5 MB</Text>
          </ListItem>
          <ListItem>
            Support file:&nbsp;
            <Text as="span">PNG, JPG, SVG</Text>
          </ListItem>
        </List>
      </Flex>
    </>
  );
}
