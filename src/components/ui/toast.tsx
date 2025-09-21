import * as React from "react";
import { Snackbar, Alert, AlertProps } from '@mui/material';

export interface ToastProps extends Omit<AlertProps, 'onClose'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
}

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ open = false, onOpenChange, title, description, children, ...props }, ref) => {
    const handleClose = () => {
      onOpenChange?.(false);
    };

    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert ref={ref} onClose={handleClose} {...props}>
          {title && <strong>{title}</strong>}
          {description && <div>{description}</div>}
          {children}
        </Alert>
      </Snackbar>
    );
  }
);

const ToastTitle = ({ children }: { children: React.ReactNode }) => (
  <strong>{children}</strong>
);

const ToastDescription = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const ToastClose = () => null; // Handled by MUI Alert
const ToastViewport = () => null; // Handled by MUI Snackbar

Toast.displayName = "Toast";

export { Toast, ToastProvider, ToastTitle, ToastDescription, ToastClose, ToastViewport };