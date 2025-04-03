"use client"
import { NoDataMessage } from "@/components/no-data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { ChevronDown, Ticket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


type TicketItem = {
  id: string;
  eventName: string;
  eventPrice: string;
  date: string;
  venue: string;
  paymentStatus: string;
  confirmationStatus: string;
};

type Prop = {
  tickets: TicketItem[];
};

const MyTicketTable = ({ tickets }:Prop) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  
  const [data, setData] = useState<TicketItem[]>(tickets);

  useEffect(()=>{
    setData(tickets);
  },[tickets]);

  // Colum Def
  const columns: ColumnDef<TicketItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "eventName",
      header: "event Name",
      cell: ({ row }) => <div>{row.original.eventName}</div>,
    },
    {
      accessorKey: "eventPrice",
      header: "Event Price",
      cell: ({ row }) => <div>{row.original.eventPrice}$</div>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div>
            {row.original.paymentStatus === "Paid" ? (
              <div className='bg-green-500 text-black w-12 text-center py-1 rounded-sm cursor-not-allowed'>
                Paid
              </div>
            ) : (
              <Link
                href={`/dashboard/payment/${id}`}
                className='bg-primary text-white dark:text-black text-center py-1 px-3.5 rounded-sm cursor-pointer'
              >
                Pay
              </Link>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "confirmationStatus",
      header: "Confirmation Status",
      cell: ({ row }) => <div>{row.getValue("confirmationStatus")}</div>,
    },
    {
      accessorKey: "cancel",
      header: "Cancel Event",
      cell: ({ row }) => {
        const id = row.original?.id;
        return (
          <div>
            {row.original?.paymentStatus !== "Paid" ? (
              <Button onClick={() => handleDelete(id)} variant={"destructive"}>
                Cancel
              </Button>
            ) : (
              <div className='cursor-not-allowed'>N/A</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "download",
      header: "Download Ticket",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.paymentStatus === "Paid" ? (
              <Link
                href={`/dashboard/ticket/${row.original.id}`}
                className='bg-primary text-white dark:text-black text-center py-1 px-3.5 rounded-sm cursor-pointer'
              >
                Download
              </Link>
            ) : (
              <div className='cursor-not-allowed'>N/A</div>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // handle Delete button
  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          //   delete api call here
          alert("Delete API call here");
        }
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (data.length === 0) {
    return (
      <NoDataMessage
        title={"No Tickets available"}
        description={"There is no tickets to display at the moment"}
        icon={<Ticket />}
      />
    );
  }

  return (
    <div className='w-full p-6'>
      <h1 className='text-2xl font-bold pb-4'>My Tickets</h1>
      <div className='flex gap-4 items-center py-4'>
        <Input
          placeholder='Search by eventName...'
          value={
            (table.getColumn("eventName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("eventName")?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyTicketTable;
