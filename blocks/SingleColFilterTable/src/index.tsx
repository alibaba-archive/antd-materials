import * as React from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  Checkbox,
  Table,
  Row,
  Col,
  Button,
  Card,
  Pagination
} from 'antd';

import { useAntdTable } from 'ahooks';

import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { useForm } from '_antd@4.12.3@antd/lib/form/Form';
import styles from './index.module.less';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};

const LANGUAGES = [
  { label: '汉语', value: 'cn' },
  { label: '粤语', value: 'gd' },
  { label: '朝鲜语', value: 'kr' },
  { label: '法语', value: 'fr' },
  { label: '英语', value: 'en' },
  { label: '西班牙语', value: 'sp' },
  { label: '意大利语', value: 'it' },
  { label: '德文', value: 'gm' },
  { label: '其他', value: 'other' }
];

const STAFF_COUNTS = [
  { label: '0-50', value: '0' },
  { label: '50-100', value: '1' },
  { label: '100-200', value: '2' },
  { label: '200-500', value: '3' },
  { label: '500以上', value: '4' }
];

const YES_NO = [
  { label: '是', value: '0' },
  { label: '否', value: '1' }
];

const LOCATIONS = [
  { label: '北京', value: 'bj' },
  { label: '上海', value: 'sh' },
  { label: '深圳', value: 'sz' },
  { label: '广州', value: 'gz' },
  { label: '杭州', value: 'hz' }
];

const getTableData = async (
  { current, pageSize }: { current: number; pageSize: number },
  formData: Record<string, any>
) => {
  const query = Object.entries(formData)
    .map(([key, value]) => (value ? `&${key}=${value}` : ''))
    .reduce((prev, curr) => prev + curr, `page=${current}&size=${pageSize}`);

  return fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: 55,
      list: res.results.slice(0, 10)
    }));
};

export default function SingleColFilterTable() {
  const [form] = useForm();
  const { pagination, tableProps, search } = useAntdTable(getTableData, {
    form
  });

  const { type, changeType, submit } = search;
  return (
    <Card>
      <div className={styles.formWrap}>
        <Form {...formItemLayout} labelAlign="left" form={form}>
          <FormItem label="语言能力:">
            <CheckboxGroup name="languages" options={LANGUAGES} />
          </FormItem>
          <FormItem label="员工人数:">
            <RadioGroup name="staffCount" options={STAFF_COUNTS} />
          </FormItem>
          <FormItem label="公司已上市:">
            <RadioGroup name="ipo" options={YES_NO} />
          </FormItem>
          {type === 'simple' ? null : (
            <>
              <FormItem label="公司所在地:" name="location">
                <Select options={LOCATIONS} />
              </FormItem>
              <FormItem label="境外办公室设立:" name="overseaOffice">
                <Select options={YES_NO} />
              </FormItem>
              <FormItem label="服务商名称(中文或英文):" name="isvName">
                <Input style={{ width: 260 }} />
              </FormItem>
            </>
          )}

          <Row>
            <Col span={14}>
              <Button type="primary" onClick={submit}>
                搜索
              </Button>
            </Col>
            <Col span={10} style={{ textAlign: 'right' }}>
              {type === 'simple' ? (
                <Button onClick={changeType}>
                  展开 <DownOutlined />
                </Button>
              ) : (
                <Button onClick={changeType}>
                  收起 <UpOutlined />
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>
      <Table {...tableProps} rowKey="email" pagination={false}>
        <Table.Column title="name" dataIndex="nat" width={140} />
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={500} />
        <Table.Column title="gender" dataIndex="gender" width={500} />
      </Table>
      <Pagination
        {...pagination}
        className={styles.pagination}
        showQuickJumper
      />
    </Card>
  );
}
