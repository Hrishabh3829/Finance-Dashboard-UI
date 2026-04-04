import React, { createContext, useContext, useMemo, useState } from "react";
import { initialTransactions } from "@/lib/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("viewer"); // "viewer" | "admin"
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | income | expense
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc"); // date-desc | amount-desc | amount-asc

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") {
      data = data.filter((t) => t.type === typeFilter);
    }

    if (categoryFilter !== "all") {
      data = data.filter((t) => t.category === categoryFilter);
    }

    if (sortBy === "date-desc") {
      data.sort((a, b) => (a.date < b.date ? 1 : -1));
    } else if (sortBy === "amount-desc") {
      data.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "amount-asc") {
      data.sort((a, b) => a.amount - b.amount);
    }

    return data;
  }, [transactions, search, typeFilter, categoryFilter, sortBy]);

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const insights = useMemo(() => {
    if (!transactions.length) {
      return {
        highestCategory: null,
        monthlyComparison: null,
      };
    }

    const byCategory = new Map();
    for (const t of transactions) {
      if (t.type !== "expense") continue;
      byCategory.set(t.category, (byCategory.get(t.category) || 0) + t.amount);
    }
    let highestCategory = null;
    for (const [cat, value] of byCategory.entries()) {
      if (!highestCategory || value > highestCategory.amount) {
        highestCategory = { category: cat, amount: value };
      }
    }

    // naive monthly comparison: last 30 days vs previous 30 days
    const now = new Date();
    const dayMs = 24 * 60 * 60 * 1000;
    const last30Start = new Date(now.getTime() - 30 * dayMs);
    const prev30Start = new Date(now.getTime() - 60 * dayMs);

    let last30Expense = 0;
    let prev30Expense = 0;

    for (const t of transactions) {
      const d = new Date(t.date);
      if (t.type !== "expense") continue;
      if (d >= last30Start && d <= now) {
        last30Expense += t.amount;
      } else if (d >= prev30Start && d < last30Start) {
        prev30Expense += t.amount;
      }
    }

    const diff = last30Expense - prev30Expense;
    const trend = diff === 0 ? "no-change" : diff > 0 ? "up" : "down";

    return {
      highestCategory,
      monthlyComparison: {
        last30Expense,
        prev30Expense,
        diff,
        trend,
      },
    };
  }, [transactions]);

  const value = {
    transactions,
    setTransactions,
    role,
    setRole,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    filteredTransactions,
    totals,
    insights,
  };

  return React.createElement(AppContext.Provider, { value }, children);
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used inside AppProvider");
  return ctx;
}
