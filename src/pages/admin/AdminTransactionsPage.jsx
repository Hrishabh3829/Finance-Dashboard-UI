import { useState } from "react";
import { useAppState } from "@/lib/state";
import { TransactionsFilters } from "@/components/dashboard/TransactionsFilters";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
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

      {isAdmin ? (
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="h-10 px-6 rounded-xl">Add transaction</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[480px]">
              <PopoverHeader>
                <PopoverTitle>Add transaction</PopoverTitle>
                <PopoverDescription>
                  Capture income or expense with clean, structured inputs.
                </PopoverDescription>
              </PopoverHeader>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Description</label>
                    <input
                      type="text"
                      value={form.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="e.g. Dinner, Phone bill"
                      className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Amount (₹)</label>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(e) => handleChange("amount", e.target.value)}
                      min={0}
                      className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Category</label>
                    <Select
                      value={form.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      className="h-10 w-full text-sm rounded-xl"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Type</label>
                    <Select
                      value={form.type}
                      onChange={(e) => handleChange("type", e.target.value)}
                      className="h-10 w-full text-sm rounded-xl"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="text-xs text-muted-foreground">
                    All fields are required before adding a transaction.
                  </p>
                  <Button type="submit" className="h-10 px-6 rounded-xl">
                    Add transaction
                  </Button>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Admin only</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Viewer role is read-only. Switch to admin from the header to add
              or delete transactions.
            </p>
          </CardContent>
        </Card>
      )}

      <section className="space-y-3">
        <TransactionsFilters />
        <TransactionsTable showActions={isAdmin} />
      </section>
    </div>
  );
}
