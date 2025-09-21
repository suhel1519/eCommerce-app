import * as React from "react";
import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@mui/material';

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const Tooltip = MuiTooltip;

const TooltipTrigger = React.forwardRef<
  HTMLElement,
  { children: React.ReactElement; asChild?: boolean }
>(({ children, asChild }, ref) => {
  return React.cloneElement(children, { ref });
});

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; side?: 'top' | 'right' | 'bottom' | 'left'; align?: 'start' | 'center' | 'end' }
>(({ children, side = 'top', ...props }, ref) => {
  return <>{children}</>;
});

TooltipTrigger.displayName = "TooltipTrigger";
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };