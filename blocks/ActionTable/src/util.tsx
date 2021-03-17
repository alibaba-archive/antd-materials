import { ColumnProps } from "_antd@4.12.3@antd/lib/table";

export function getColumnKey(column: ColumnProps<any> & { key?: string }): string | null  {
  
  if (column) {
    return column.key || String(column.title) || column.dataIndex || null;
  }
  return null;
}
