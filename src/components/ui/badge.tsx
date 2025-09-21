import * as React from "react";
import { Chip, ChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: '9999px',
  fontSize: '0.75rem',
  fontWeight: 600,
  height: '24px',
}));

export interface BadgeProps extends Omit<ChipProps, 'variant'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

function Badge({ variant = 'default', children, ...props }: BadgeProps) {
  const getMuiVariant = (): ChipProps['variant'] => {
    switch (variant) {
      case 'outline':
        return 'outlined';
      default:
        return 'filled';
    }
  };

  const getMuiColor = (): ChipProps['color'] => {
    switch (variant) {
      case 'destructive':
        return 'error';
      case 'secondary':
        return 'secondary';
      case 'outline':
        return 'default';
      default:
        return 'primary';
    }
  };

  return (
    <StyledChip
      label={children}
      variant={getMuiVariant()}
      color={getMuiColor()}
      size="small"
      {...props}
    />
  );
}

export { Badge };