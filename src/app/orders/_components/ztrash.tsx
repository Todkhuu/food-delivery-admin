{
  /* <Input
  placeholder="Filter emails..."
  value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  onChange={(event) =>
    table.getColumn("email")?.setFilterValue(event.target.value)
  }
  className="max-w-sm"
/>; */
}

// {
//   id: "actions",
//   enableHiding: false,
//   cell: ({ row }) => {
//     const payment = row.original;

//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//           <DropdownMenuItem
//             onClick={() => navigator.clipboard.writeText(payment.id)}
//           >
//             Copy payment ID
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>View customer</DropdownMenuItem>
//           <DropdownMenuItem>View payment details</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     );
//   },
// },

// checked={column.getIsVisible()}
// onCheckedChange={(value) => column.toggleVisibility(!!value)}
