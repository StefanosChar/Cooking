import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) =>
  <div className="relative w-full overflow-auto" data-id="hs3fwmd96" data-path="src/components/ui/table.tsx">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props} data-id="sbyb2jc5u" data-path="src/components/ui/table.tsx" />

  </div>
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) =>
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} data-id="rqafbfgqn" data-path="src/components/ui/table.tsx" />
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) =>
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props} data-id="cqb9ea2k6" data-path="src/components/ui/table.tsx" />

);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) =>
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props} data-id="pxo97iciz" data-path="src/components/ui/table.tsx" />

);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) =>
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props} data-id="xzpbxqyum" data-path="src/components/ui/table.tsx" />

);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) =>
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props} data-id="t68u2u233" data-path="src/components/ui/table.tsx" />

);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) =>
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props} data-id="j66jefdgu" data-path="src/components/ui/table.tsx" />

);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) =>
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props} data-id="8kxra0w0p" data-path="src/components/ui/table.tsx" />

);
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption };