"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "@/components/common/Spinner";

type Event = {
  _id: string;
  eventName: string;
  date: string;
  location: string;
};

const fakeEvents: Event[] = [
  {
    _id: "1",
    eventName: "Event 1",
    date: "2022-01-01",
    location: "Location 1",
  },
  {
    _id: "2",
    eventName: "Event 2",
    date: "2022-02-02",
    location: "Location 2",
  },
  {
    _id: "3",
    eventName: "Event 3",
    date: "2022-03-03",
    location: "Location 3",
  },
  {
    _id: "4",
    eventName: "Event 4",
    date: "2022-04-04",
    location: "Location 4",
  },
  {
    _id: "5",
    eventName: "Event 5",
    date: "2022-05-05",
    location: "Location 5",
  },
  {
    _id: "6",
    eventName: "Event 6",
    date: "2022-06-06",
    location: "Location 6",
  },
  {
    _id: "7",
    eventName: "Event 7",
    date: "2022-07-07",
    location: "Location 7",
  },
  {
    _id: "8",
    eventName: "Event 8",
    date: "2022-08-08",
    location: "Location 8",
  },
  {
    _id: "9",
    eventName: "Event 9",
    date: "2022-09-09",
    location: "Location 9",
  },
  {
    _id: "10",
    eventName: "Event 10",
    date: "2022-10-10",
    location: "Location 10",
  },
];

const EventManagementPage = () => {
  const [data, setData] = useState<Event[]>(fakeEvents);
  const [loading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Event>[] = [
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
      header: "Event Name",
      cell: ({ row }) => <div>{row.getValue("eventName")}</div>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <div>{row.getValue("location")}</div>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const id = row.original._id; // Get the id of the current row
        return (
          <div className='flex divide-x-2 divide-emerald-400'>
            <span
              onClick={() => handleEdit(id)}
              className='cursor-pointer text-primary pr-2'
            >
              <Pencil />
            </span>

            <span
              onClick={() => handleDelete(id)}
              className='cursor-pointer text-red-500 pl-2'
            >
              <Trash2 />
            </span>
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

  // handle Edit button
  const handleEdit = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        setData(prevData => prevData.map(event => 
          event._id === id 
            ? { ...event, eventName: "Updated Name" } 
            : event
        ));
        toast.success("Event updated successfully");
      }
    });
  };

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
      }).then((result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) {
          setData(prevData => prevData.filter(event => event._id !== id));
          alert(`Delete ${id}`);
        }
      });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (loading) {
    return <Spinner />;
  }
  if ((data?.length ?? 0) === 0) {
    return (
      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-red-500'>No data found</h1>
      </div>
    );
  }
  return (
    <div className='w-full p-6'>
      <div className='flex gap-4 items-center py-4'>
        <Input
          placeholder='Search by EventName...'
          value={
            (table.getColumn("eventName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("eventName")?.setFilterValue(event.target.value)
          }
          className='max-w-xs'
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

export default EventManagementPage;