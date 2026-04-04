import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/state";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

export function TransactionsTable({ showActions = false }) {
  const { filteredTransactions, role, setTransactions, transactions } = useAppState();

  const handleDelete = (id) => {
    if (role !== "admin") return;
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
        <p className="text-xs text-muted-foreground">
          {filteredTransactions.length} record
          {filteredTransactions.length === 1 ? "" : "s"} visible
        </p>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No transactions match the current filters.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm border-separate border-spacing-y-1">
              <thead className="text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="text-left font-medium">Date</th>
                  <th className="text-left font-medium">Description</th>
                  <th className="text-left font-medium">Category</th>
                  <th className="text-right font-medium">Amount</th>
                  <th className="text-left font-medium">Type</th>
                  {showActions && <th className="text-right font-medium">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="bg-card/60">
                    <td className="px-2 py-2 rounded-l-md whitespace-nowrap">
                      {formatDate(t.date)}
                    </td>
                    <td className="px-2 py-2 max-w-[180px] truncate">
                      {t.description}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">{t.category}</td>
                    <td className="px-2 py-2 text-right font-medium whitespace-nowrap">
                      {t.type === "income" ? "+" : "-"}₹
                      {t.amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-2 py-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] capitalize ${
                          t.type === "income"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    {showActions && (
                      <td className="px-2 py-2 text-right rounded-r-md">
                        <Button
                          variant="outline"
                          size="xs"
                          disabled={role !== "admin"}
                          onClick={() => handleDelete(t.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
