import { TransactionsFilters } from "@/components/dashboard/TransactionsFilters";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";

export function TransactionsPage() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Transactions</h1>
        <p className="text-sm text-muted-foreground">
          Browse all records with simple search, filtering and sorting.
        </p>
      </header>
      <TransactionsFilters />
      <TransactionsTable />
    </div>
  );
}
