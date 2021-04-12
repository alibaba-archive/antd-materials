import * as React from 'react';
import { Card, Table, Pagination } from 'antd';
import { useAntdTable } from 'ahooks';

const MockData = [
  {
    gender: 'female',
    name: 'Sando',
    email: 'melissa.sando@example.com',
    phone: '82757809',
    id: '27096632423',
    groupCount: 2,
    groupIndex: 0,
  },
  {
    gender: 'female',
    name: 'ihle',
    email: 'torvald.ihle@example.com',
    phone: '(18) 2827578509',
    id: '27096632423',
    groupCount: 2,
    groupIndex: 1,
  },
  {
    gender: 'male',
    name: 'Ortega',
    email: 'jesus.ortega@example.com',
    phone: '902-264-345',
    id: '67967111-Y',
    groupCount: 4,
    groupIndex: 0,
  },
  {
    gender: 'male',
    name: 'Daluz',
    email: 'dositeu.daluz@example.com',
    phone: '(98) 2534-5239',
    id: '0b2dffc6a3e282dbee19b432371a1248',
    groupCount: 4,
    groupIndex: 1,
  },
  {
    gender: 'male',
    name: 'Rousseau',
    email: 'marcel.rousseau@example.com',
    phone: '077 383 91 73',
    id: '3c51c6551a2a263ee1626d84e6426ea53fa60a3a',
    groupCount: 4,
    groupIndex: 2,
  },
  {
    gender: 'male',
    name: 'Berger',
    email: 'evan.berger@example.com',
    phone: '02-46-03-53-36',
    id: '1NNaN50556983-14',
    groupCount: 4,
    groupIndex: 3,
  },
];

const getTableData = () =>
  Promise.resolve({ total: MockData.length, list: MockData });

export default function MergeCellTable() {
  const { pagination, tableProps } = useAntdTable(getTableData, {});
  const columns = [
    {
      title: 'gender',
      dataIndex: 'gender',
      width: 500,
      render: (value: string, record: any) => {
        const { groupCount, groupIndex } = record;

        // 合并待 merge 的行
        if (groupIndex === 0) {
          return {
            children: <span>{value}</span>,
            props: {
              rowSpan: groupCount,
            },
          };
        } else {
          return {
            children: <span>{value}</span>,
            props: {
              rowSpan: 0,
            },
          };
        }
      },
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: 240,
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: 500,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      width: 500,
    },
  ];
  return (
    <Card>
      <Table {...tableProps} rowKey="email" columns={columns} />
      <Pagination
        style={{ marginTop: 16, textAlign: 'right' }}
        {...pagination}
      />
    </Card>
  );
}
