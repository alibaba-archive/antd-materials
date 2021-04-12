import React, { useRef, useState } from 'react';
import { Input, Button, Select, Form, Card, DatePicker, message, Radio, Row, Col } from 'antd';

import { Moment } from 'moment';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 35 },
};

export interface DataSource {
  name?: string;
  category?: string;
  date?: [Moment, Moment];
  type?: string;
  person?: string;
  state?: string;
  relative?: string;
  relaventProject?: string;
}

export interface FourColumnFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  type: 'private',
};

const DEFAULT_ON_SUBMIT = (values: FourColumnFormProps, errors: Array<{ name: Array<string | number>; errors: string[] }>): void => {
  console.log(values);

  if (errors) {
    console.log('errors', errors);
    return;
  }
  console.log('values:', values);
  message.success('提交成功');
};

const FourColumnForm: React.FC<FourColumnFormProps> = (props): JSX.Element => {
  const { dataSource = DEFAULT_DATA, onSubmit = DEFAULT_ON_SUBMIT, onCancel = () => {} } = props;

  const [postData, setValue] = useState<DataSource>(dataSource);

  const formChange = (value: DataSource) => {
    setValue(value);
  };
  const formRef = useRef(null);
  return (
    <Card>
      <Form
        initialValues={postData}
        ref={formRef}
        labelAlign="right"
        onValuesChange={formChange}
        onFinish={(value) => onSubmit(value, [])}
        onFinishFailed={(value) => onSubmit(value.values, value.errorFields)}
      >
        <Row>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="项目名称："
              rules={[
                {
                  required: true,
                  message: 'name是必填字段',
                },
              ]}
              name="name"
            >
              <Input placeholder="请输入项目名称" name="name" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="项目所属分类："
              rules={[
                {
                  required: true,
                  message: 'category是必填字段',
                },
              ]}
              name="category"
            >
              <Input placeholder="请输入你的分类" name="category" />
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="申请人："
              name="person"
              rules={[
                {
                  required: true,
                  message: 'person是必填字段',
                },
              ]}
            >
              <Input placeholder="申请人" name="person" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目权限：" name="type">
              <Radio.Group name="type" aria-labelledby="authority of project">
                <Radio id="private" value="private">
                  私密项目
                </Radio>
                <Radio id="internal" value="internal">
                  内部项目
                </Radio>
                <Radio id="publish" value="publish">
                  开放目
                </Radio>
              </Radio.Group>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="状态："
              name="state"
              rules={[
                {
                  required: true,
                  message: 'state是必填字段',
                },
              ]}
            >
              <Select aria-labelledby="state of project">
                <Select.Option id="step1" value="step1">
                  阶段一
                </Select.Option>
                <Select.Option id="step2" value="step2">
                  阶段二
                </Select.Option>
                <Select.Option id="step3" value="step3">
                  阶段三
                </Select.Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="联系人："
              name="relative"
              rules={[
                {
                  required: true,
                  message: 'relative是必填字段',
                },
              ]}
            >
              <Input placeholder="请输入联系人" name="relative" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="关联项目："
              name="relaventProject"
              rules={[
                {
                  required: true,
                  message: 'relaventProject是必填字段',
                },
              ]}
            >
              <Input placeholder="请输入关联项目" name="relaventProject" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...formItemLayout}
              label="申请日期："
              name="date"
              rules={[
                {
                  required: true,
                  message: 'date是必填字段',
                },
              ]}
            >
              <DatePicker.RangePicker name="date" />
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号1：" name="data1">
              <Input placeholder="请输入" name="data1" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号2：" name="data2">
              <Input placeholder="请输入" name="data2" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号3：" name="data3">
              <Input placeholder="请输入" name="data3" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号4：" name="data4">
              <Input placeholder="请输入" name="data4" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号5：" name="data5">
              <Input placeholder="请输入" name="data5" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号6：" name="data6">
              <Input placeholder="请输入" name="data6" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号7：" name="data7">
              <Input placeholder="请输入" name="data7" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号8：" name="data8">
              <Input placeholder="请输入" name="data8" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem wrapperCol={{ span: 12, offset: 8 }}>
              <div>
                <Button type="primary" onClick={() => formRef.current.submit()} style={{ marginRight: '10px' }}>
                  提交
                </Button>
                <Button onClick={onCancel}>取消</Button>
              </div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default FourColumnForm;
