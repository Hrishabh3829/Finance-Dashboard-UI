import React, { createContext, useContext, useMemo, useState } from "react";

const DrawerContext = createContext(null);

function useDrawerContext() {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("Drawer components must be used within <Drawer>");
  }
  return ctx;
}

function Drawer({ open: openProp, onOpenChange, children }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;

  const setOpen = (next) => {
    if (onOpenChange) onOpenChange(next);
    if (openProp === undefined) setInternalOpen(next);
  };

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

function DrawerTrigger({ asChild = false, children }) {
  const { setOpen } = useDrawerContext();

  const props = {
    onClick: (event) => {
      if (children?.props?.onClick) {
        children.props.onClick(event);
      }
      setOpen(true);
    },
    "aria-haspopup": "dialog",
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, props);
  }

  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

function DrawerClose({ asChild = false, children }) {
  const { setOpen } = useDrawerContext();

  const props = {
    onClick: (event) => {
      if (children?.props?.onClick) {
        children.props.onClick(event);
      }
      setOpen(false);
    },
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, props);
  }

  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

function DrawerContent({ children }) {
  const { open, setOpen } = useDrawerContext();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-background shadow-xl border-l">
        {children}
      </div>
    </div>
  );
}

function DrawerHeader({ className = "", ...props }) {
  return <div className={`px-4 pt-4 ${className}`} {...props} />;
}

function DrawerTitle({ className = "", ...props }) {
  return <h3 className={`text-sm font-medium ${className}`} {...props} />;
}

function DrawerDescription({ className = "", ...props }) {
  return <p className={`text-xs text-muted-foreground ${className}`} {...props} />;
}

function DrawerFooter({ className = "", ...props }) {
  return <div className={`px-4 pb-4 ${className}`} {...props} />;
}

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
};
