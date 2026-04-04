import { useState } from "react";
import { useAppState } from "@/lib/state";
import { TransactionsFilters } from "@/components/dashboard/TransactionsFilters";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { categories } from "@/lib/mockData";

export function AdminTransactionsPage() {
  const { role, setTransactions, transactions } = useAppState();
  const [form, setForm] = useState({
    date: "",
    description: "",
    amount: "",
    category: "Income",
    type: "income",
  });

  const isAdmin = role === "admin";

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isAdmin) return;

    if (!form.date || !form.description || !form.amount) {
      return;
    }

    const next = {
      id: Date.now(),
      date: form.date,
      description: form.description,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
    };

    setTransactions([next, ...transactions]);
    setForm({ date: "", description: "", amount: "", category: "Income", type: "income" });
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Manage transactions</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          This section simulates role-based access. Only the admin role can add
          or delete transactions. Switch roles from the header to see the
          difference.
        </p>
      </header>

      <Card className={!isAdmin ? "opacity-60" : ""}>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            {isAdmin ? "Add transaction" : "Add transaction (admin only)"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isAdmin && (
            <p className="mb-3 text-xs text-muted-foreground">
              You are currently in viewer mode. Switch to admin using the role
              dropdown in the header to enable editing.
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid gap-3 md:grid-cols-5 md:items-end"
          >
            <div className="space-y-1 md:col-span-1">
              <label className="text-xs text-muted-foreground">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                disabled={!isAdmin}
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
            <div className="space-y-1 md:col-span-1.5">
              <label className="text-xs text-muted-foreground">Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="e.g. Dinner, Phone bill"
                disabled={!isAdmin}
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Amount (₹)</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                min={0}
                disabled={!isAdmin}
                className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Category</label>
              <Select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                disabled={!isAdmin}
                className="h-9 w-full text-xs disabled:cursor-not-allowed disabled:opacity-60"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-1 flex gap-2 md:flex-col md:gap-0">
              <div className="flex-1 space-y-1">
                <label className="text-xs text-muted-foreground">Type</label>
                <Select
                  value={form.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  disabled={!isAdmin}
                  className="h-9 w-full text-xs disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Select>
              </div>
              <Button
                type="submit"
                disabled={!isAdmin}
                className="mt-5 h-9 w-full md:w-auto disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <TransactionsFilters />
        <TransactionsTable showActions />
      </section>
    </div>
  );
}
