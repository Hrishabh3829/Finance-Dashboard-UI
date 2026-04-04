import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceTrend } from "@/components/dashboard/BalanceTrend";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { TransactionsFilters } from "@/components/dashboard/TransactionsFilters";

export function OverviewPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">Dashboard overview</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          A quick snapshot of your balance, recent activity, and spending
          patterns. This view is read-only and works well for viewer role.
        </p>
      </section>

      <SummaryCards />

      <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
        <BalanceTrend />
        <CategoryBreakdown />
      </div>

      <section className="space-y-3">
        <TransactionsFilters />
        <TransactionsTable />
      </section>
    </div>
  );
}
