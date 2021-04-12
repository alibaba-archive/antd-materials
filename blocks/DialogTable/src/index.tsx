import React, { useCallback, useState } from 'react';
import { Table, Card, Pagination, message, Modal, Form } from 'antd';
import { useAntdTable, useSetState } from 'ahooks';

import DialogOperation from './DialogOperation';
import { ActionType, OperaitionProps } from './Operation';
import styles from './index.module.less';

const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: { status: 'normal' | 'empty' | 'exception' },
): Promise<any> => {
  if (!formData.status || formData.status === 'normal') {
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
  }
  if (formData.status === 'empty') {
    return Promise.resolve([]);
  }
  if (formData.status === 'exception') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('data exception'));
      }, 1000);
    });
  }

  return Promise.resolve([]);
};

interface ColumnWidth {
  nat: number;
  email: number;
  phone: number;
  gender: number;
  operation: number;
}

interface DialogState {
  columnWidth: ColumnWidth;
  optCol: any;
  actionType: ActionType;
  actionVisible: boolean;
}

const defaultColumnWidth: ColumnWidth = {
  nat: 140,
  email: 500,
  phone: 500,
  gender: 140,
  operation: 150,
};

const DialogTable: React.FC = () => {
  const [state, setState] = useSetState<DialogState>({
    columnWidth: defaultColumnWidth,
    optCol: null,
    actionType: 'preview',
    actionVisible: false,
  });
  const { actionVisible, columnWidth, optCol } = state;
  const [delMessage, setDelMessage] = useState('');
  const [form] = Form.useForm();
  const { pagination, tableProps, search } = useAntdTable(getTableData, {
    form,
  });
  const { reset } = search;
  console.log(tableProps);

  const operationCallback = useCallback(
    ({ actionType, dataSource }: OperaitionProps): void => {
      setState({
        actionType,
        optCol: dataSource,
        actionVisible: true,
      });
    },
    [setState],
  );

  const handleCancel = useCallback((): void => {
    setState({ actionVisible: false });
  }, [setState]);

  const handleOk = useCallback((): void => {
    const { actionType } = state;
    if (actionType === 'preview') {
      handleCancel();
      return;
    }
    message.success(actionType === 'add' ? '添加成功!' : '编辑成功!');
    reset();
    handleCancel();
  }, [handleCancel, reset, state]);

  const handleDelete = useCallback(
    (data: any) => {
      if (!data) {
        return;
      }
      setDelMessage(data.nat);
    },
    [reset],
  );

  const cellOperation = (values: unknown, row: any[]): React.ReactNode => {
    const record = row;

    return (
      <div>
        <a type="primary" onClick={() => operationCallback({ actionType: 'edit', dataSource: record })}>
          编辑
        </a>
        &nbsp;&nbsp;
        <a type="primary" onClick={() => handleDelete(record)}>
          删除
        </a>
        &nbsp;&nbsp;
        <a type="primary" onClick={() => operationCallback({ actionType: 'preview', dataSource: record })}>
          查看
        </a>
      </div>
    );
  };

  return (
    <div className={styles.DialogTable}>
      <Card>
        <Table {...tableProps} rowKey="email" pagination={false} bordered>
          <Table.Column title="nat" dataIndex="nat" width={columnWidth.nat} />
          <Table.Column title="email" dataIndex="email" width={columnWidth.email} />
          <Table.Column title="phone" dataIndex="phone" width={columnWidth.phone} />
          <Table.Column title="gender" dataIndex="gender" width={columnWidth.gender} />
          <Table.Column title="操作" width={columnWidth.operation} render={cellOperation} />
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
      <DialogOperation
        visible={actionVisible}
        actionType={state.actionType}
        dataSource={optCol}
        onOk={handleOk}
        onClose={handleCancel}
        onCancel={handleCancel}
      />
      <Modal
        title="删除提醒"
        visible={!!delMessage}
        onOk={() => {
          message.success(`${delMessage}删除成功!`);
          reset();
          setDelMessage('');
        }}
        onCancel={() => setDelMessage('')}
      >
        <p>确定删除 {delMessage}吗</p>
      </Modal>
      ;
    </div>
  );
};

export default DialogTable;
