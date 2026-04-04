import { InsightsPanel } from "@/components/dashboard/InsightsPanel";

export function InsightsPage() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Insights</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          High-level observations generated from your transactions, including
          top spending categories and simple month-over-month comparisons.
        </p>
      </header>
      <InsightsPanel />
    </div>
  );
}
