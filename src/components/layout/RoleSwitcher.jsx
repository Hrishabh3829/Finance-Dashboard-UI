import { useAppState } from "@/lib/state";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export function RoleSwitcher() {
  const { role, setRole } = useAppState();

  const roles = [
    { value: "viewer", label: "Viewer" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <Combobox value={role} onValueChange={setRole}>
      <ComboboxInput
        className="h-8 min-w-[110px] text-xs"
        placeholder="Role"
      />
      <ComboboxContent align="end">
        <ComboboxList>
          <ComboboxEmpty>No roles found.</ComboboxEmpty>
          {roles.map((item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
