import React, { createContext, useContext } from "react";

const PopoverContext = createContext(null);

export function Popover({ open, onOpenChange, children }) {
  return (
    <PopoverContext.Provider value={{ open, onOpenChange }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ asChild = false, children }) {
  const ctx = useContext(PopoverContext);
  if (!ctx) return children;

  const triggerProps = {
    onClick: (event) => {
      if (children?.props?.onClick) {
        children.props.onClick(event);
      }
      ctx.onOpenChange(!ctx.open);
    },
    "aria-expanded": ctx.open,
    "aria-haspopup": "dialog",
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps);
  }

  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  );
}

export function PopoverContent({
  className = "",
  children,
  align = "end",
  side = "bottom",
}) {
  const ctx = useContext(PopoverContext);
  if (!ctx?.open) return null;

  const alignClass = align === "start" ? "left-0" : "right-0";
  const sideClass = side === "top" ? "bottom-full mb-2" : "top-full mt-2";

  return (
    <div
      className={`absolute z-50 rounded-md border bg-popover text-popover-foreground shadow-lg ${alignClass} ${sideClass} ${className}`}
    >
      {children}
    </div>
  );
}
