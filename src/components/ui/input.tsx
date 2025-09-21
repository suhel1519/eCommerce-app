import * as React from "react";
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
}));

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <StyledTextField
        inputRef={ref}
        type={type}
        variant="outlined"
        size="small"
        fullWidth
        className={className}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };