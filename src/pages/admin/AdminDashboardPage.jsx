import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceTrend } from "@/components/dashboard/BalanceTrend";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Admin dashboard</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Admin sees the same high-level picture, with additional ability to
          manage data from the Admin → Manage transactions section.
        </p>
      </section>
      <SummaryCards />
      <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
        <BalanceTrend />
        <CategoryBreakdown />
      </div>
      <InsightsPanel />
    </div>
  );
}
