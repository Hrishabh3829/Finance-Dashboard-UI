export function Field({ className = "", ...props }) {
  return <div className={`space-y-1 ${className}`} {...props} />;
}

export function FieldLabel({ className = "", ...props }) {
  return (
    <label
      className={`text-xs text-muted-foreground ${className}`}
      {...props}
    />
  );
}
