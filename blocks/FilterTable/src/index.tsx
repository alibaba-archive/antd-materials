import React from 'react';
import { Select, Form, Table, Card, Pagination, Button, Row, Col } from 'antd';
import { useAntdTable } from 'ahooks';

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

const FilterTable: React.FunctionComponent = (): JSX.Element => {
  const [form] = Form.useForm();
  const { pagination, tableProps, search } = useAntdTable(getTableData, {
    form,
  });
  const { submit, reset } = search;

  return (
    <div>
      <Card>
        <Form className="filter-form" layout="vertical" form={form}>
          <Row>
            <Col span={6}>
              <FormItem
                label="数据状态"
                required
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
                name="status"
              >
                <Select
                  options={[
                    {
                      label: '正常状态',
                      value: 'normal',
                    },
                    {
                      label: '空数据状态',
                      value: 'empty',
                    },
                    {
                      label: '数据异常状态',
                      value: 'exception',
                    },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={14}>
              <FormItem />
            </Col>
            <Col span={4}>
              <FormItem
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Button type="primary" onClick={submit} htmlType="submit" style={{ marginRight: '20px' }}>
                  提交
                </Button>
                <Button onClick={reset}>重置</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table {...tableProps} rowKey="email" pagination={false}>
          <Table.Column title="name" dataIndex="phone" />
          <Table.Column title="email" dataIndex="email" />
          <Table.Column title="phone" dataIndex="phone" />
          <Table.Column title="gender" dataIndex="gender" />
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

export default FilterTable;
