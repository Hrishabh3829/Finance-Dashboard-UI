export function Select({ className = "", children, ...props }) {
  return (
    <select
      className={
        "border border-input bg-background text-foreground text-sm rounded-md shadow-sm " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 " +
        "disabled:cursor-not-allowed disabled:opacity-60 " +
        className
      }
      {...props}
    >
      {children}
    </select>
  );
}
