import React, { FC, useRef } from 'react';
import { Button, Card, Form, Input, Select, Row, Col, Space, Radio, Divider, message } from 'antd';

export interface DataSource {
  values: {
    address?: string;
    position?: string;
    companyName?: string;
    currency?: string;
    annualSalary?: number;
    expectAnnualSalary?: number;
    monthlySalary?: number;
    monthNumber?: number;
    bonus?: number;
    targetBonus?: number;
    lastYearBonus?: number;
    rsu?: boolean;
    rsuDesc?: string;
  };
}

export interface ClassifiedFormProps {
  dataSource?: DataSource;
  onSubmit?: (data: DataSource) => void;
  onCancel?: () => void;
}

const ClassifiedForm: FC<ClassifiedFormProps> = (props): JSX.Element => {
  const { onSubmit = () => {}, onCancel = () => {} } = props;

  const jobRef = useRef(null);

  const [form] = Form.useForm();
  const handleSubmit = () => {
    const values = form.getFieldsValue(true);

    onSubmit({ values });
    message.success('提交成功');
  };
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 60 },
  };

  return (
    <div>
      <Card title="工作经历">
        <Space direction="vertical">
          <Card title="分类信息">
            <Form ref={jobRef} labelAlign="right" form={form}>
              <Row>
                <Col span={8}>
                  <Form.Item label="工作地址" {...formLayout} name="address">
                    <Input placeholder="请输入工作地址" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="职位" {...formLayout} name="position">
                    <Input name="position" placeholder="请输入职位名称" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="公司名称" {...formLayout} name="companyName">
                    <Input name="companyName" placeholder="请输入公司名称" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="币种"
                    required
                    rules={[
                      {
                        required: true,
                        message: '必填',
                      },
                    ]}
                    {...formLayout}
                    name="currency"
                  >
                    <Select placeholder="请选择币种">
                      <Select.Option value="CNY">¥ CNY</Select.Option>
                      <Select.Option value="USD">$ USD</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="年薪"
                    required
                    name="annualSalary"
                    rules={[
                      {
                        required: true,
                        message: '必填',
                      },
                    ]}
                    {...formLayout}
                  >
                    <Input name="annualSalary" placeholder="请输入薪资信息" addonAfter="CNY" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="期望年薪" {...formLayout} name="expectAnnualSalary">
                    <Input name="expectAnnualSalary" placeholder="请输入期望薪资" addonAfter="CNY" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card title="分类信息">
            <Form labelAlign="right" form={form}>
              <Row>
                <Col span={8}>
                  <Form.Item
                    label="月薪"
                    required
                    rules={[
                      {
                        required: true,
                        message: '必填',
                      },
                    ]}
                    {...formLayout}
                    name="monthlySalary"
                  >
                    <Input placeholder="请输入月薪" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="月数" {...formLayout} name="monthNumber">
                    <Input placeholder="请输入在职月数" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="津贴" {...formLayout} name="bonus">
                    <Input placeholder="请输入津贴" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="年度目标奖金" {...formLayout} name="targetBonus">
                    <Input placeholder="请输入年度目标奖金" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="去年实际奖金" {...formLayout} name="lastYearBonus">
                    <Input placeholder="请输入实际奖金" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="选项/RSU" {...formLayout} name="rsu">
                    <Radio.Group aria-labelledby="rsu">
                      <Radio id="has-rsu" value>
                        是
                      </Radio>
                      <Radio id="has-not-rsu" value={false}>
                        否
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item label="选项/RSU 描述" name="rsuDesc">
                    <Input.TextArea placeholder="请输入" maxLength={500} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Divider />
            <Form.Item>
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    form.submit();
                    handleSubmit();
                  }}
                  style={{ marginRight: '10px' }}
                >
                  提交
                </Button>
                <Button onClick={onCancel}>取消</Button>
              </div>
            </Form.Item>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default ClassifiedForm;
