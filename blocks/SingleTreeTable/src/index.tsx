import React, { useState } from 'react';
import { Card, Table, Menu, Dropdown, message, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const data = [
  {
    id: 'first',
    rowNo: '中华人民共和国国内安全管理条例',
    rowContent: '',
    children: [
      {
        id: 1,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 2,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 3,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 4,
        rowNo: '第四条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'second',
    rowNo: '中华人民共和国海商法',
    rowContent: '',
    children: [
      {
        id: 5,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 6,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 7,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 8,
        rowNo: '第四条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'third',
    rowNo: '纳税担保试行方法',
    rowContent: '',
    children: [
      {
        id: 9,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 10,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 11,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 12,
        rowNo: '第四条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'fourth',
    rowNo: '中华人民共和国担保法',
    rowContent: '',
    children: [
      {
        id: 13,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 14,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 15,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 16,
        rowNo: '第四条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'fifth',
    rowNo: '纳税担保试行方法',
    rowContent: '',
    children: [
      {
        id: 17,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 18,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 19,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 20,
        rowNo: '第四条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
];
export default function SingleTreeTable() {
  const renderContent = (value: string, row: any) => {
    if (row.children) {
      return {
        children: value,
        props: {
          colSpan: 0,
        },
      };
    } else {
      return {
        children: value,
        props: {},
      };
    }
  };
  const columns = [
    {
      title: '法律条文编号',
      dataIndex: 'rowNo',
      width: 180,
      render: (value: string, row: any) => {
        if (!row.children) {
          return <span>{value}</span>;
        }
        return {
          children: <span>{value}</span>,
          props: {
            colSpan: 2,
          },
        };
      },
    },
    {
      title: '法律条文内容',
      dataIndex: 'rowContent',
      render: renderContent,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 180,
      render: (value: unknown, row: any) => {
        return (
          <div className={styles.buttonGroup}>
            <a
              type="link"
              onClick={fetchRemote}
              style={{ marginRight: '10px' }}
            >
              删除
            </a>
            {row && row.children && (
              <>
                <a
                  type="link"
                  onClick={() => setVisible(true)}
                  style={{ marginRight: '10px' }}
                >
                  编辑
                </a>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a>
                    更多 <DownOutlined />
                  </a>
                </Dropdown>
              </>
            )}
          </div>
        );
      },
    },
  ];
  const [visible, setVisible] = useState<boolean>(false);

  const fetchRemote = () => {
    message.success('请求成功');
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={fetchRemote}>提交审核</Menu.Item>
      <Menu.Item onClick={fetchRemote}>打回</Menu.Item>
    </Menu>
  );

  return (
    <Card className={styles.container}>
      <Table dataSource={data} rowKey="id" columns={columns} />
      <Modal
        title="编辑窗口"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          fetchRemote();
          setVisible(false);
        }}
      >
        这里是编辑内容
      </Modal>
    </Card>
  );
}
