import React, { useCallback } from 'react';
import {
  Button,
  Select,
  Input,
  Form,
  Table,
  Card,
  Pagination,
  Row,
  Col,
} from 'antd';
import { useAntdTable, useSetState } from 'ahooks';

import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { useForm } from '_antd@4.12.3@antd/lib/form/Form';
import styles from './index.module.less';

const FormItem = Form.Item;

const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: { status: 'normal' | 'empty' | 'exception' },
): Promise<any> => {
  console.log(current, pageSize, formData);
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
  name: number;
  email: number;
  phone: number;
  gender: number;
}

interface MultiColState {
  columnWidth: ColumnWidth;
  expandStatus: boolean;
  actionListSpan: number;
}

const defaultColumnWidth: ColumnWidth = {
  name: 140,
  email: 500,
  phone: 500,
  gender: 140,
};

// Filter区域 默认为收起状态
const defaultExpandStatus = false;
// 展开状态下一共有多少个项
const expandFieldLenth = 5;
// 收起状态下一共有多少项目
const collapseFieldLenth = 3;

const getNextActionListSpan = (expandStatus: boolean): number => {
  const totalFieldLength = expandStatus ? expandFieldLenth : collapseFieldLenth;
  if (totalFieldLength < 3) {
    return 3;
  }
  return (4 - (totalFieldLength % 4)) * 3;
};

const MultiColFilterTable: React.FC = () => {
  const [state, setState] = useSetState<MultiColState>({
    columnWidth: defaultColumnWidth,
    expandStatus: defaultExpandStatus,
    actionListSpan: getNextActionListSpan(defaultExpandStatus),
  });
  const [form] = useForm();
  const { pagination, tableProps, search } = useAntdTable(getTableData, {
    form,
  });
  const { submit, reset } = search;
  const { columnWidth } = state;

  const handleSetExpand = useCallback(() => {
    const nextExpand = !state.expandStatus;
    setState({
      expandStatus: nextExpand,
      actionListSpan: getNextActionListSpan(nextExpand),
    });
  }, [state, setState]);
  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <div className={styles.container}>
      <Card>
        <Form
          className="filter-form"
          labelAlign="right"
          form={form}
          layout="vertical"
        >
          <Row>
            <Col span={6}>
              <FormItem label="ID:" {...formLayout} name="id">
                <Input />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="性别:"
                initialValue="mail"
                required
                rules={[
                  {
                    message: '必填',
                  },
                ]}
                name="gender"
                {...formLayout}
              >
                <Select
                  options={[
                    {
                      label: '男',
                      value: 'mail',
                    },
                    {
                      label: '女',
                      value: 'femail',
                    },
                    {
                      label: 'All',
                      value: 'all',
                    },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="邮箱:" {...formLayout} name="email">
                <Input />
              </FormItem>
            </Col>
            {!state.expandStatus ? null : (
              <>
                <Col span={6}>
                  <FormItem label="手机号:" {...formLayout} name="phone">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    label="国家:"
                    initialValue={[]}
                    name="nat"
                    {...formLayout}
                  >
                    <Select
                      allowClear
                      mode="multiple"
                      options={[
                        { value: 'AU' },
                        { value: 'BR' },
                        { value: 'CA' },
                        { value: 'CH' },
                        { value: 'DE' },
                        { value: 'DK' },
                        { value: 'ES' },
                        { value: 'FI' },
                        { value: 'FR' },
                        { value: 'GB' },
                        { value: 'IE' },
                        { value: 'IR' },
                        { value: 'NL' },
                        { value: 'NZ' },
                        { value: 'TR' },
                        { value: 'US' },
                      ]}
                    />
                  </FormItem>
                </Col>
              </>
            )}
            <Col span={state.actionListSpan === 9 ? 16 : 4}>
              <FormItem className={styles['form-actions']} label=" ">
                <Button
                  type="primary"
                  onClick={submit}
                  style={{ marginRight: 10 }}
                  htmlType="submit"
                >
                  提交
                </Button>
                <Button onClick={reset} style={{ marginRight: 10 }}>
                  重置
                </Button>
                <Button onClick={handleSetExpand}>
                  {state.expandStatus ? (
                    <>
                      收起
                      <UpOutlined />
                    </>
                  ) : (
                    <>
                      展开
                      <DownOutlined />
                    </>
                  )}
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table {...tableProps} pagination={false} rowKey="email">
          <Table.Column
            title="name"
            dataIndex="phone"
            width={columnWidth.name}
          />
          <Table.Column
            title="email"
            dataIndex="email"
            width={columnWidth.email}
          />
          <Table.Column
            title="phone"
            dataIndex="phone"
            width={columnWidth.phone}
          />
          <Table.Column
            title="gender"
            dataIndex="gender"
            width={columnWidth.gender}
          />
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
    </div>
  );
};

export default MultiColFilterTable;
