export function Calendar({ selected, onSelect }) {
  const value = selected ? selected.toISOString().slice(0, 10) : "";

  return (
    <input
      type="date"
      className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      value={value}
      onChange={(e) => {
        const next = e.target.value ? new Date(e.target.value) : undefined;
        onSelect?.(next);
      }}
    />
  );
}
