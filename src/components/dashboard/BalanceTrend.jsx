import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppState } from "@/lib/state";

// very light-weight, SVG based "time" visualization using running balance
export function BalanceTrend() {
  const { transactions, totals, isLoading } = useAppState();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Balance trend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!transactions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Balance trend</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No transactions yet. Add a few to see the trend.
        </CardContent>
      </Card>
    );
  }

  const sorted = [...transactions].sort((a, b) =>
    a.date < b.date ? -1 : 1
  );

  let running = 0;
  const points = sorted.map((t, index) => {
    running += t.type === "income" ? t.amount : -t.amount;
    return { index, balance: running };
  });

  const maxBalance = Math.max(...points.map((p) => p.balance), totals.balance, 1);
  const minBalance = Math.min(...points.map((p) => p.balance), 0);

  const width = 260;
  const height = 120;

  const pathD = points
    .map((p, i) => {
      const x = (p.index / Math.max(points.length - 1, 1)) * width;
      const normalized = (p.balance - minBalance) / (maxBalance - minBalance || 1);
      const y = height - normalized * height;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>Balance trend</span>
          <span className="text-xs text-muted-foreground">Time based overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-32 text-primary/80"
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-2 text-xs text-muted-foreground">
          Simple running balance plotted over transaction order. This is a
          lightweight visualization built without external chart libraries.
        </p>
      </CardContent>
    </Card>
  );
}
