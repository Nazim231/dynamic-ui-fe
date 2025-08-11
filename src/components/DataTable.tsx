import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shadcn/ui/table';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> extends React.ComponentProps<'div'> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  ...props
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });

  return (
    <div className={cn('overflow-hidden', props.className)}>
      <Table>
        <TableHeader className='*:bg-gray-200'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className='pointer-events-none'>
              {headerGroup.headers.map((header) => (
                <TableHead>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='cursor-pointer'>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
