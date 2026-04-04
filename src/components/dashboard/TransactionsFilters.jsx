import { Select } from "@/components/ui/select";
import { useAppState } from "@/lib/state";
import { categories } from "@/lib/mockData";

export function TransactionsFilters() {
  const {
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
  } = useAppState();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by description or category"
          className="flex-1 h-9 rounded-md border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-end text-xs">
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-8 min-w-[96px]"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-8 min-w-[120px]"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-8 min-w-[130px]"
        >
          <option value="date-desc">Newest first</option>
          <option value="amount-desc">Amount high → low</option>
          <option value="amount-asc">Amount low → high</option>
        </Select>
      </div>
    </div>
  );
}
