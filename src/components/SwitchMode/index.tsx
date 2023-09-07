import { Switch } from '@chakra-ui/react';
import { colors } from 'theme/theme';

interface SwitchModeProps {
  isChecked: boolean;
  onChange: () => void;
}

export default ({ isChecked, onChange }: SwitchModeProps) => {
  return (
    <Switch
      sx={{
        span: {
          '--switch-bg': colors.shader.a[800],
          border: '0.0625rem solid',
          borderColor: 'shader.a.600',
          borderRadius: 'xl',
          padding: 1,

          '&[data-checked]': {
            '--switch-bg': colors.primary.a[500],
            borderColor: 'transparent',
          },
        },
      }}
      isChecked={isChecked}
      onChange={onChange}
    />
  );
};
