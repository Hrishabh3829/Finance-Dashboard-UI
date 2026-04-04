import { useAppState } from "@/lib/state";
import { Select } from "@/components/ui/select";

export function RoleSwitcher() {
  const { role, setRole } = useAppState();

  return (
    <Select
      value={role}
      onChange={(event) => setRole(event.target.value)}
      className="h-8 rounded-md border bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </Select>
  );
}
