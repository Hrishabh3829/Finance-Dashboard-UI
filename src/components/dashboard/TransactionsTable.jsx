import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppState } from "@/lib/state";
import { formatDateShort } from "@/lib/format";

export function TransactionsTable({ showActions = false }) {
  const { filteredTransactions, role, setTransactions, transactions, isLoading } = useAppState();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const handleDelete = (id) => {
    if (role !== "admin") return;
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(filteredTransactions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => {
    const headers = ["date", "description", "category", "amount", "type"];
    const rows = filteredTransactions.map((t) => [
      formatDateShort(t.date),
      t.description,
      t.category,
      t.amount,
      t.type,
    ]);
    const csvBody = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const csv = `\ufeff${csvBody}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => formatDateShort(row.original.date),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="max-w-[180px] truncate inline-block">
            {row.original.description}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="font-medium">
            {row.original.type === "income" ? "+" : "-"}₹
            {row.original.amount.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}
          </span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] capitalize ${
              row.original.type === "income"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {row.original.type}
          </span>
        ),
      },
    ];

    if (showActions) {
      baseColumns.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            variant="outline"
            size="xs"
            disabled={role !== "admin"}
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
        ),
      });
    }

    return baseColumns;
  }, [handleDelete, role, showActions]);

  const table = useReactTable({
    data: filteredTransactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          <p className="text-xs text-muted-foreground">
            {filteredTransactions.length} record
            {filteredTransactions.length === 1 ? "" : "s"} visible
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="xs" onClick={exportCsv}>
            Export CSV
          </Button>
          <Button variant="outline" size="xs" onClick={exportJson}>
            Export JSON
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-44" />
          </div>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No transactions match the current filters.
          </p>
        ) : (
          <div className="space-y-3">
            <Table className="text-xs md:text-sm">
              <TableHeader className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={
                          header.column.id === "amount" || header.column.id === "actions"
                            ? "text-right"
                            : "text-left"
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="bg-card/60">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === "amount" || cell.column.id === "actions"
                            ? "text-right"
                            : "text-left"
                        }
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs">
              <div className="text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select
                  value={String(table.getState().pagination.pageSize)}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                  className="h-8 min-w-[110px]"
                >
                  <option value="5">5 / page</option>
                  <option value="10">10 / page</option>
                  <option value="20">20 / page</option>
                </Select>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
