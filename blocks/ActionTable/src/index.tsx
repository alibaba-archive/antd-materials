import React, { useState } from 'react';
import { Card, Table, Button, Pagination, message, Space } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useAntdTable, useFullscreen } from 'ahooks';

import { SizeType } from 'antd/lib/config-provider/SizeContext';
import CustomList, { Column } from './CustomList';
import { getColumnKey } from './util';

import styles from './index.module.less';

const TableActionIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1899388_oxn3zhg34oj.js',
});

const getTableData = ({ current, pageSize }: { current: number; pageSize: number }): Promise<any> => {
  const query = `page=${current}&size=${pageSize}`;
  return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: 55,
      list: res.results.slice(0, 10),
    }));
};

// 根据 hidden 切换当前 column 是否显示
const filterColumns = (columnList: any) => {
  const newColumnList = [...columnList];
  return newColumnList
    .filter((columnItem) => {
      if (columnItem && columnItem.hidden) {
        return false;
      }
      return true;
    })
    .map((columnItem) => {
      if (columnItem.children) {
        const groupProps = { ...columnItem };
        delete groupProps.children;

        return (
          <Table.ColumnGroup key={getColumnKey(columnItem)} {...groupProps}>
            {filterColumns(columnItem.children)}
          </Table.ColumnGroup>
        );
      }

      return <Table.Column key={getColumnKey(columnItem)} {...columnItem} />;
    });
};

const defaultColumns: Column[] = [
  {
    id: '1',
    title: '名称',
    children: [
      {
        id: '1-1',
        title: '前缀',
        dataIndex: 'cell',
      },
      {
        id: '1-2',
        title: '名',
        dataIndex: 'name.first',
      },
      {
        id: '1-3',
        title: '姓',
        dataIndex: 'name.last',
      },
    ],
  },
  {
    id: '2',
    title: 'Email',
    dataIndex: 'email',
  },
  {
    id: '3',
    title: '电话号码',
    dataIndex: 'phone',
  },
  {
    id: '4',
    title: '性别',
    dataIndex: 'gender',
  },
];

const AppList = () => {
  // 切换紧凑模式
  const [sizeStatus, changeSize] = useState<SizeType>('middle');
  const autoChangeSize = () => {
    if (sizeStatus === 'middle') {
      changeSize('small');
    } else {
      changeSize('middle');
    }
  };

  // 切换全屏
  const [, { toggleFull }] = useFullscreen(document.getElementById('table-container'), {
    onFull: () => {
      const ele = document.getElementById('table-container');
      if (ele) {
        ele.setAttribute('style', 'padding: 20px;background: #ffffff');
      }
    },
  });

  // 获取表格数据
  const { pagination, tableProps } = useAntdTable(getTableData, {});

  // 切换当前 columns
  const [columns, onColumnChange] = useState(defaultColumns);

  return (
    <Card className={styles.container} id="table-container">
      <div className={styles.actionBar}>
        <div className={styles.buttonGroup}>
          <Space>
            <Button type="primary" onClick={() => message.success('已批量处理xx条数据')}>
              批量提交
            </Button>
            <Button onClick={() => message.success('已批量处理xx条数据')}>批量删除</Button>
            <Button onClick={() => message.success('已批量处理xx条数据')}>批量下载</Button>
          </Space>
        </div>
        <div className={styles.rightButtonGroup}>
          <Button onClick={autoChangeSize}>
            <TableActionIcon type="narrow" />
          </Button>
          <Button onClick={toggleFull}>
            <TableActionIcon type="fullscreen" />
          </Button>
          <CustomList columns={columns} onChange={onColumnChange} />
        </div>
      </div>
      <Table {...tableProps} size={sizeStatus} rowKey="cell" pagination={false} bordered>
        {filterColumns(columns)}
      </Table>
      <Pagination
        style={{ marginTop: 16, textAlign: 'right' }}
        showTotal={(total) => (
          <>
            共 <a>{total}</a> 个记录
          </>
        )}
        {...pagination}
      />
    </Card>
  );
};

export default AppList;
