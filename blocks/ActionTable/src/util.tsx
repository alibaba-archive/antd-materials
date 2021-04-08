import { ColumnProps } from './CustomList';

export function getColumnKey(column: ColumnProps & { key?: string }): string | null {
  if (column) {
    return column.key || String(column.title) || column.dataIndex || null;
  }
  return null;
}
