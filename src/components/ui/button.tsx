import * as React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { cva, type VariantProps } from "class-variance-authority";

const StyledButton = styled(MuiButton)(({ theme, variant, size }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  ...(variant === 'outlined' && {
    borderColor: theme.palette.divider,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  }),
  ...(size === 'small' && {
    height: '36px',
    padding: '0 12px',
  }),
  ...(size === 'large' && {
    height: '44px',
    padding: '0 32px',
  }),
}));

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', children, ...props }, ref) => {
    const getMuiVariant = (): MuiButtonProps['variant'] => {
      switch (variant) {
        case 'outline':
          return 'outlined';
        case 'ghost':
        case 'link':
          return 'text';
        case 'secondary':
          return 'outlined';
        default:
          return 'contained';
      }
    };

    const getMuiSize = (): MuiButtonProps['size'] => {
      switch (size) {
        case 'sm':
          return 'small';
        case 'lg':
          return 'large';
        case 'icon':
          return 'small';
        default:
          return 'medium';
      }
    };

    const getMuiColor = (): MuiButtonProps['color'] => {
      switch (variant) {
        case 'destructive':
          return 'error';
        case 'secondary':
          return 'secondary';
        default:
          return 'primary';
      }
    };

    return (
      <StyledButton
        ref={ref}
        variant={getMuiVariant()}
        size={getMuiSize()}
        color={getMuiColor()}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

// Create buttonVariants for compatibility with shadcn/ui components
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export { Button, buttonVariants };