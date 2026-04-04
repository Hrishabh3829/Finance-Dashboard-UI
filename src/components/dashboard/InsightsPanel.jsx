import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppState } from "@/lib/state";

export function InsightsPanel() {
  const { insights, isLoading } = useAppState();

  const { highestCategory, monthlyComparison } = insights;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Highest spending category
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-3 w-44" />
              <Skeleton className="h-3 w-28" />
            </div>
          ) : !highestCategory ? (
            <p className="text-sm text-muted-foreground">
              No expense data yet. Once you add expenses, we will highlight the
              category where you spend the most.
            </p>
          ) : (
            <div className="space-y-1 text-sm">
              <p>
                You spend the most on
                <span className="font-semibold"> {highestCategory.category}</span>
                .
              </p>
              <p className="text-muted-foreground text-xs">
                Total so far: ₹
                {highestCategory.amount.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Monthly comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          ) : !monthlyComparison ? (
            <p className="text-sm text-muted-foreground">
              Not enough data to compare months yet.
            </p>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Last 30 days</span>
                <span>
                  ₹
                  {monthlyComparison.last30Expense.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Previous 30 days</span>
                <span>
                  ₹
                  {monthlyComparison.prev30Expense.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <p className="text-xs mt-1">
                {monthlyComparison.trend === "no-change" &&
                  "Your spending is roughly the same compared to the previous month."}
                {monthlyComparison.trend === "up" && (
                  <span className="text-red-600">
                    You are spending more than last month by approximately ₹
                    {Math.abs(monthlyComparison.diff).toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                    .
                  </span>
                )}
                {monthlyComparison.trend === "down" && (
                  <span className="text-emerald-600">
                    Good job! You are spending less than last month by roughly ₹
                    {Math.abs(monthlyComparison.diff).toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                    .
                  </span>
                )}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
