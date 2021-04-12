import React, { useState } from 'react';
import { Input, Button, Form, Card, DatePicker, message, Radio, Upload, UploadProps, Row, Col } from 'antd';

import { Moment } from 'moment';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 30 },
};

export interface DataSource {
  name?: string;
  category?: string;
  date?: Moment[];
  type?: string;
  pic?: UploadProps[];
  desc?: string;
}

export interface TwoColumnFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  type: 'private',
};

const DEFAULT_ON_SUBMIT = (values: TwoColumnFormProps): void => {
  console.log('values:', values);
  message.success('提交成功');
};

const TwoColumnForm: React.FC<TwoColumnFormProps> = (props: TwoColumnFormProps): JSX.Element => {
  const { dataSource = DEFAULT_DATA, onSubmit = DEFAULT_ON_SUBMIT, onCancel = () => {} } = props;

  const [postData, setValue] = useState<DataSource>(dataSource);

  const formChange = (value: DataSource): void => {
    setValue(value);
  };

  return (
    <Card>
      <Form
        initialValues={postData}
        labelAlign="right"
        onChange={formChange}
        onFinish={(values) => onSubmit(values)}
        onFinishFailed={({ errorFields }) => console.log('error', errorFields)}
      >
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="项目名称："
              name="name"
              required
              rules={[
                {
                  required: true,
                  message: 'name是必填字段',
                },
              ]}
            >
              <Input placeholder="请输入项目名称" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="项目所属分类："
              name="category"
              required
              rules={[
                {
                  required: true,
                  message: 'category是必填字段',
                },
              ]}
            >
              <Input placeholder="请输入你的分类" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="可访问日期："
              name="date"
              required
              rules={[
                {
                  required: true,
                  message: 'date是必填字段',
                },
              ]}
            >
              <DatePicker.RangePicker />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} name="type" label="项目权限：">
              <Radio.Group aria-labelledby="authority of project">
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
          <Col span={24}>
            <FormItem labelCol={{ span: 2 }} label="项目描述：" name="desc">
              <Input.TextArea placeholder="请输入项目详细信息" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem wrapperCol={{ offset: 2 }} name="pic" help="请选择大小不超过5M的文件，支持doc，docx，xls，xlsx，zip格式">
              <Upload action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload">
                <Button style={{ margin: '0 0 10px' }}>上传文件</Button>
              </Upload>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem wrapperCol={{ offset: 2 }}>
              <div style={{ marginTop: '20px' }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
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

export default TwoColumnForm;
