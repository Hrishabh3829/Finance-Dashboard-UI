import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/state";

export function CategoryBreakdown() {
  const { transactions } = useAppState();

  const expenses = transactions.filter((t) => t.type === "expense");

  if (!expenses.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Spending by category</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No expense data available yet.
        </CardContent>
      </Card>
    );
  }

  const totalsByCategory = new Map();
  for (const t of expenses) {
    totalsByCategory.set(t.category, (totalsByCategory.get(t.category) || 0) + t.amount);
  }

  const entries = Array.from(totalsByCategory.entries());
  const max = Math.max(...entries.map(([, value]) => value));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>Spending by category</span>
          <span className="text-xs text-muted-foreground">Categorical breakdown</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {entries.map(([category, value]) => (
          <div key={category} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{category}</span>
              <span className="font-medium">
                ₹{value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary/80"
                style={{ width: `${(value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
