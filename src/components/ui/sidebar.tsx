import * as React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { PanelLeft } from "lucide-react";

const SIDEBAR_WIDTH = 256;

type SidebarContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, children, ...props }, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);

  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <Box ref={ref} sx={{ display: 'flex', minHeight: '100vh' }} {...props}>
        {children}
      </Box>
    </SidebarContext.Provider>
  );
});

const Sidebar = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ children, ...props }, ref) => {
    const { isMobile, open, openMobile, setOpenMobile } = useSidebar();

    if (isMobile) {
      return (
        <Drawer
          variant="temporary"
          open={openMobile}
          onClose={() => setOpenMobile(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box ref={ref} {...props}>
            {children}
          </Box>
        </Drawer>
      );
    }

    return (
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? SIDEBAR_WIDTH : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            position: 'relative',
          },
        }}
      >
        <Box ref={ref} {...props}>
          {children}
        </Box>
      </Drawer>
    );
  }
);

const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ onClick, className, style, disabled, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <IconButton
        onClick={(event) => {
          onClick?.(event as any);
          toggleSidebar();
        }}
        size="small"
        className={className}
        style={style}
        disabled={disabled}
      >
        <PanelLeft size={20} />
      </IconButton>
    );
  }
);

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} sx={{ padding: 2, height: '100%', overflow: 'auto' }} {...props}>
      {children}
    </Box>
  )
);

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} sx={{ marginBottom: 2 }} {...props}>
      {children}
    </Box>
  )
);

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ children, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'text.secondary',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 1,
        paddingX: 1
      }}
      {...props}
    >
      {children}
    </Box>
  )
);

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  )
);

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ children, ...props }, ref) => (
    <List ref={ref} sx={{ padding: 0 }} {...props}>
      {children}
    </List>
  )
);

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ children, ...props }, ref) => (
    <ListItem ref={ref} sx={{ padding: 0, marginBottom: 0.5 }} {...props}>
      {children}
    </ListItem>
  )
);

const SidebarMenuButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ children, asChild, className, style, onClick, ...props }, ref) => {
  if (asChild) {
    return <>{children}</>;
  }

  return (
    <ListItemButton
      ref={ref}
      onClick={onClick}
      className={className}
      style={style}
      sx={{
        borderRadius: 1,
        minHeight: 36,
        paddingY: 0.5,
        paddingX: 1
      }}
    >
      {children}
    </ListItemButton>
  );
});

SidebarProvider.displayName = "SidebarProvider";
Sidebar.displayName = "Sidebar";
SidebarTrigger.displayName = "SidebarTrigger";
SidebarContent.displayName = "SidebarContent";
SidebarGroup.displayName = "SidebarGroup";
SidebarGroupLabel.displayName = "SidebarGroupLabel";
SidebarGroupContent.displayName = "SidebarGroupContent";
SidebarMenu.displayName = "SidebarMenu";
SidebarMenuItem.displayName = "SidebarMenuItem";
SidebarMenuButton.displayName = "SidebarMenuButton";

export {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};