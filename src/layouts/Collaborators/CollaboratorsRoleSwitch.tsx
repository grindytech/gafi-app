import { Text, useDisclosure } from '@chakra-ui/react';
import JohnPopover from 'layouts/John/JohnPopover';
import { ColorOfCollaborator, convertHex } from 'utils/utils';
import {
  TypeCollaboratorsRole,
  TypeCollaboratorsState,
} from './CollaboratorsUtils';
import { Dispatch, SetStateAction } from 'react';

interface CollaboratorsRoleSwitchProps {
  options: TypeCollaboratorsRole[];
  role: TypeCollaboratorsRole;
  index: number;
  setCollaborators: Dispatch<SetStateAction<TypeCollaboratorsState>>;
}

export default ({
  options,
  role,
  index,
  setCollaborators,
}: CollaboratorsRoleSwitchProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <JohnPopover
      isOpen={isOpen}
      onClose={onClose}
      onToggle={onToggle}
      sx={{
        sx: {
          '> button': {
            svg: {
              width: 5,
              height: 5,
              color: ColorOfCollaborator(role),
            },
          },
          '.chakra-popover__content': {
            height: 'auto',
          },
        },
      }}
    >
      {options.map(option => (
        <Text
          key={option}
          color={ColorOfCollaborator(option)}
          bg={convertHex(ColorOfCollaborator(option), 0.15)}
          cursor="pointer"
          padding={2}
          onClick={() => {
            onClose();

            setCollaborators(prev => {
              const instance = [...prev];

              /* 
                origin ['Owner', 'Admin', 'Issuer']
                output: ['Issuer', 'Admin', 'Owner']

                summary logic:
                  1. map instance and found if(role === input) 
                      we should set which role to role clicked
                  2. change currentRole to input
              */

              instance.map(({ role }, i) => {
                if (role === option) {
                  instance[i].role = instance[index].role;
                }
              });

              instance[index].role = option;

              return instance;
            });
          }}
        >
          {option}
        </Text>
      ))}
    </JohnPopover>
  );
};
