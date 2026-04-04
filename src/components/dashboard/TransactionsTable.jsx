import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppState } from "@/lib/state";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

export function TransactionsTable({ showActions = false }) {
  const { filteredTransactions, role, setTransactions, transactions } = useAppState();

  const handleDelete = (id) => {
    if (role !== "admin") return;
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.date),
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
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
        <p className="text-xs text-muted-foreground">
          {filteredTransactions.length} record
          {filteredTransactions.length === 1 ? "" : "s"} visible
        </p>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No transactions match the current filters.
          </p>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
