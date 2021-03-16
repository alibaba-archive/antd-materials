import React, { useState, useRef } from 'react';
import { Button, Checkbox,Dropdown } from 'antd';
import { ReactSortable, ItemInterface } from 'react-sortablejs';
import { createFromIconfontCN,EllipsisOutlined } from '@ant-design/icons';

import { getColumnKey } from './util';

import styles from './index.module.less';
import { ColumnProps } from '_antd@4.12.3@antd/lib/table/Column';

export type Column = ColumnProps<unknown> & ItemInterface & {
  id?: string | number;
  children?: Column[];
};

const TableActionIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1899388_oxn3zhg34oj.js',
});

function CustomList({ columns, onChange }: { columns: Column[]; onChange: (cols: Column[]) => void }) {
  const buttonRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const onColumnChildrenChange = (idx: number, newColumns: Column[]): void => {
    const newColumnList: Column[] = [...columns];
    newColumnList[idx].children = newColumns;
    onChange(newColumnList);
  };

  const onHiddenChange = (key: string |null, status: boolean): void => {
    console.log(key,status);
    
    const columnsHiddenChange = (items: Column[]) => {
      const newItems: Column[] = [];
      items.forEach((item) => {
        const columnItem: Column = { ...item };
        const columnKey = getColumnKey(columnItem);
        if (columnItem.children) {
          columnItem.children = columnsHiddenChange(columnItem.children);
        }
        if (columnKey === key) {
          columnItem.hidden = status;
        }

        newItems.push(columnItem);
      });

      return newItems;
    };

    const visibleColumns = columnsHiddenChange(columns);
    onChange(visibleColumns);
  };
const menu = (
  <React.Fragment>
  <ReactSortable
          className={styles.columnSortPanel}
          handle=".column-handle"
          list={columns}
          setList={onChange}
        >
          {columns.map((item, idx) => (
            <div
              className="sort-item-container"
              key={getColumnKey(item)}
            >
              <div className="sort-item">
                <Checkbox
                  className="sort-checkbox"
                  checked={!item.hidden}
                  onChange={(status) => onHiddenChange(getColumnKey(item), !status)}
                >
                  {item.title}
                </Checkbox>
                <EllipsisOutlined className="column-handle"/>
              </div>
              {
                Array.isArray(item.children) && (
                  <ReactSortable
                    handle=".column-handle"
                    list={item.children}
                    setList={(newState: Column[]) => onColumnChildrenChange(idx, newState)}
                  >
                    {item.children.map((childrenItem: ColumnProps<any> & { key?: string,hidden?:boolean }) => (
                      <div key={getColumnKey(childrenItem)} className="sort-item sort-item-children">
                        <Checkbox
                          checked={!childrenItem.hidden}
                          // onChange={(status) => onHiddenChange(getColumnKey(childrenItem), !status)}
                          onChange={(status) => onHiddenChange(getColumnKey(childrenItem), !status)}
                        >
                          {childrenItem.title}
                        </Checkbox>
                        <EllipsisOutlined className="column-handle"/>
                      </div>
                    ))}
                  </ReactSortable>
                )
              }
            </div>
          ))}
        </ReactSortable>

    </React.Fragment>
)

  return (
      <Dropdown overlay={menu} placement="bottomRight"  visible={visible}>
      <Button
        ref={buttonRef}
        onClick={() => setVisible(!visible)}
      >
        <TableActionIcon type="custom-list" />
      </Button>
      </Dropdown>
        
  );
}

export default CustomList;
