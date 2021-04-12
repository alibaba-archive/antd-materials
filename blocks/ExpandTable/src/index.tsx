import * as React from 'react';
import { Card, Table, Pagination } from 'antd';
import { useAntdTable } from 'ahooks';
import styles from './index.module.less';

interface ParamsType {
  current?: number;
  pageSize?: number;
}
const getTableData = (
  { current, pageSize }: ParamsType,
  formData: any,
): Promise<any> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });
  return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: 55,
      list: res.results.slice(0, 10),
    }));
};

function tableActions(val: string, index: number, record: any) {
  return (
    <div className={styles.tableActions}>
      <a
        style={{ marginRight: '15px' }}
        onClick={() => console.log(record, '操作1')}
      >
        操作1
      </a>
      <a
        style={{ marginRight: '15px' }}
        onClick={() => console.log(record, '操作2')}
      >
        操作2
      </a>
      <a onClick={() => console.log(record, '操作3')}>操作3</a>
    </div>
  );
}

function subTableActions(val: string, index: number, record: any) {
  return (
    <div className={styles.tableActions}>
      <a onClick={() => console.log(record, '子表格操作1')}>子表格操作1</a>
    </div>
  );
}

function SubTable(props: any) {
  return (
    <Table dataSource={props.dataSource} size="small" rowKey="postcode">
      <Table.Column title="country" dataIndex="country" />
      <Table.Column title="state" dataIndex="state" />
      <Table.Column title="city" dataIndex="city" />
      <Table.Column title="street" dataIndex="state" />
      <Table.Column render={subTableActions} />
    </Table>
  );
}

export default function ExpandTable() {
  const { pagination, tableProps } = useAntdTable(getTableData, {});
  console.log(tableProps);

  return (
    <Card className={styles.container}>
      <Table
        {...tableProps}
        rowKey="email"
        expandedRowRender={(record) => (
          <SubTable dataSource={[record.location]} />
        )}
        pagination={false}
        scroll={{
          x: 2000,
        }}
      >
        <Table.Column title="nat" dataIndex="nat" width={140} fixed="left" />
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={300} />
        <Table.Column title="username" dataIndex="phone" width={300} />
        <Table.Column title="uuid" dataIndex="email" width={300} />
        <Table.Column title="gender" dataIndex="gender" width={200} />
        <Table.Column width={500} render={tableActions} />
      </Table>
      <Pagination
        style={{ marginTop: 16, textAlign: 'right' }}
        {...pagination}
      />
    </Card>
  );
}
