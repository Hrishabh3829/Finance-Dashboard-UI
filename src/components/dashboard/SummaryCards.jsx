import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAppState } from "@/lib/state";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function SummaryCards() {
  const { totals } = useAppState();

  const items = [
    {
      label: "Total Balance",
      value: formatCurrency(totals.balance),
      tone: totals.balance >= 0 ? "text-emerald-500" : "text-red-500",
    },
    {
      label: "Total Income",
      value: formatCurrency(totals.income),
      tone: "text-emerald-500",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(totals.expenses),
      tone: "text-red-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-semibold ${item.tone}`}>{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
