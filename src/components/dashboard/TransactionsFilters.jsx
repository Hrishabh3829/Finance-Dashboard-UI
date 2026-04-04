import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppState } from "@/lib/state";
import { categories } from "@/lib/mockData";

export function TransactionsFilters() {
  const {
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    categoryFilters,
    setCategoryFilters,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    sortBy,
    setSortBy,
  } = useAppState();

  const toggleCategory = (category) => {
    setCategoryFilters((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }
      return [...prev, category];
    });
  };

  const clearCategories = () => setCategoryFilters([]);

  const clearAllFilters = () => {
    setDateFrom("");
    setDateTo("");
    setMinAmount("");
    setMaxAmount("");
    setCategoryFilters([]);
  };

  const activeAdvancedCount = [
    dateFrom,
    dateTo,
    minAmount,
    maxAmount,
    categoryFilters.length ? "cats" : "",
  ].filter(Boolean).length;

  return (
    <div className="space-y-3">
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-8 min-w-[130px]"
          >
            <option value="date-desc">Newest first</option>
            <option value="amount-desc">Amount high → low</option>
            <option value="amount-asc">Amount low → high</option>
          </Select>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 rounded-md text-xs"
              >
                Filters
                {activeAdvancedCount > 0 && (
                  <span className="ml-2 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                    {activeAdvancedCount}
                  </span>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex h-full flex-col">
                <DrawerHeader>
                  <DrawerTitle>Advanced filters</DrawerTitle>
                  <DrawerDescription>
                    Narrow down by date, amount, and category.
                  </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Date range</p>
                    <div className="grid gap-2">
                      <DatePickerInput
                        label="From"
                        value={dateFrom}
                        onChange={setDateFrom}
                        placeholder="June 01, 2026"
                      />
                      <DatePickerInput
                        label="To"
                        value={dateTo}
                        onChange={setDateTo}
                        placeholder="June 30, 2026"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Amount range</p>
                    <div className="grid gap-2">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Min amount</label>
                        <input
                          type="number"
                          min={0}
                          value={minAmount}
                          onChange={(e) => setMinAmount(e.target.value)}
                          placeholder="0"
                          className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Max amount</label>
                        <input
                          type="number"
                          min={0}
                          value={maxAmount}
                          onChange={(e) => setMaxAmount(e.target.value)}
                          placeholder="Any"
                          className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant={categoryFilters.length === 0 ? "default" : "outline"}
                        size="xs"
                        onClick={clearCategories}
                      >
                        All
                      </Button>
                      {categories.map((category) => {
                        const active = categoryFilters.includes(category);
                        return (
                          <Button
                            key={category}
                            type="button"
                            variant={active ? "default" : "outline"}
                            size="xs"
                            onClick={() => toggleCategory(category)}
                          >
                            {category}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <DrawerFooter className="flex items-center justify-between">
                  <Button type="button" variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear all
                  </Button>
                  <DrawerClose asChild>
                    <Button type="button" size="sm">
                      Apply filters
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
