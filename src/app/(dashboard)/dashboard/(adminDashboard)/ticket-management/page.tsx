"use client";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type BookedTicket = {
  _id: string;
  userName: string;
  eventName: string;
  ticketPrice: number;
  location: string;
  date: string;
  time: string;
  paymentStatus: string;
  confirmationStatus: string;
};

// fake data
const bookedTickets: BookedTicket[] = [
  {
    _id: "1",
    userName: "John Doe",
    eventName: "Music Concert",
    ticketPrice: 50,
    location: "Stadium A",
    date: "2025-05-12",
    time: "19:00",
    paymentStatus: "Paid",
    confirmationStatus: "Confirmed",
  },
  {
    _id: "2",
    userName: "Jane Smith",
    eventName: "Art Exhibition",
    ticketPrice: 30,
    location: "Gallery B",
    date: "2025-06-20",
    time: "15:00",
    paymentStatus: "Pending",
    confirmationStatus: "Unconfirmed",
  },
  {
    _id: "3",
    userName: "Alice Johnson",
    eventName: "Tech Conference",
    ticketPrice: 120,
    location: "Convention Center C",
    date: "2025-07-05",
    time: "09:00",
    paymentStatus: "Paid",
    confirmationStatus: "Confirmed",
  },
  {
    _id: "4",
    userName: "Bob Brown",
    eventName: "Food Festival",
    ticketPrice: 25,
    location: "Park D",
    date: "2025-08-15",
    time: "11:00",
    paymentStatus: "Paid",
    confirmationStatus: "Confirmed",
  },
  {
    _id: "5",
    userName: "Charlie White",
    eventName: "Sports Tournament",
    ticketPrice: 75,
    location: "Arena E",
    date: "2025-09-25",
    time: "16:00",
    paymentStatus: "Pending",
    confirmationStatus: "Unconfirmed",
  },
];

const TicketManagementPage = () => {
  const [data, setData] = useState<BookedTicket[]>(bookedTickets);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Simulate data loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // handle update ConfirmationStatus by id
  const updateConfirmStatus = async (id: string) => {
    // Simulate updating confirmation status
    const updatedTickets = data.map(ticket => 
      ticket._id === id 
        ? { ...ticket, confirmationStatus: "Confirmed" }
        : ticket
    );
    
    setData(updatedTickets);
    
    //  Update the ticket confirmation status of the api call here
    alert(`Confirmation status updated successfully for ${id}`);
    toast.success("Confirmation status updated successfully");
  };

  // handle Delete button
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Remove the ticket from the data
        const updatedTickets = data.filter(ticket => ticket._id !== id);
        setData(updatedTickets);
        
        alert(`Ticket deleted successfully for ${id}`);
        toast.success("Ticket deleted successfully");
      }
    });
  };

  const columns: ColumnDef<BookedTicket>[] = [
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
      accessorKey: "userName",
      header: "User Name",
      cell: ({ row }) => <div>{row.getValue("userName")}</div>,
    },
    {
      accessorKey: "eventName",
      header: "Event Name",
      cell: ({ row }) => {
        return <div>{row.original.eventName}</div>;
      },
    },
    {
      accessorKey: "ticketPrice",
      header: "Ticket Price",
      cell: ({ row }) => {
        return <div>{row.original.ticketPrice}$</div>;
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <div>{row.getValue("location")}</div>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => <div>{row.getValue("time")}</div>,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => <div>{row.getValue("paymentStatus")}</div>,
    },
    {
      accessorKey: "confirmationStatus",
      header: "Confirmation Status",
      cell: ({ row }) => {
        const id = row.original._id; // Get the id of the current row
        return (
          <div>
            {row.original.paymentStatus === "Paid" &&
            row.original.confirmationStatus === "Unconfirmed" ? (
              <Button
                onClick={() => updateConfirmStatus(id)}
                variant={"default"}
              >
                Confirm
              </Button>
            ) : (
              <div className='cursor-not-allowed'>
                {row.original.confirmationStatus}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "cancel",
      header: "Cancel",
      cell: ({ row }) => {
        const id = row.original._id; // Get the id of the current row
        return (
          <div>
            {row.original.paymentStatus !== "Paid" ? (
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
      <h1 className='text-2xl font-semibold'>Users Ticket Management</h1>
      <div className='flex gap-4 items-center py-4'>
        <Input
          placeholder='Search by Event Name...'
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

export default TicketManagementPage;