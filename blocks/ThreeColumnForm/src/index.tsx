import React, { useState } from "react";
import {
  Input,
  Button,
  Select,
  Form,
  DatePicker,
  message,
  Radio,
  Upload,
  Card,
  Row,
  Col,
  UploadProps,
} from "antd";

// import { UploadProps } from '@alifd/next/types/upload';
import { Moment } from "moment";

import styles from "./index.module.less";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 20 },
};

export interface DataSource {
  name?: string;
  category?: string;
  date?: [Moment, Moment];
  type?: string;
  pic?: UploadProps[];
  desc?: string;
  person?: string;
  state?: string;
}

export interface ThreeColumnFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  type: "private",
};

const DEFAULT_ON_SUBMIT = (values: ThreeColumnFormProps, errors: []): void => {
  if (errors) {
    console.log("errors", errors);
    return;
  }
  console.log("values:", values);
  message.success("提交成功");
};

const ThreeColumnForm: React.FC<ThreeColumnFormProps> = (
  props: ThreeColumnFormProps
): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    onSubmit = DEFAULT_ON_SUBMIT,
    onCancel = () => {},
  } = props;

  const [postData, setValue] = useState<DataSource>(dataSource);

  const formChange = (value: DataSource) => {
    setValue(value);
  };

  return (
    <Card className={styles.ThreeColumnForm}>
      <Form
        initialValues={postData}
        labelAlign="right"
        onChange={formChange}
        onFinish={(values) => console.log(values)}
        onFinishFailed={({ errorFields }) => console.log("error:", errorFields)}
      >
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="项目名称："
              required
              rules={[
                {
                  required: true,
                  message: "name是必填字段",
                },
              ]}
              name="name"
            >
              <Input placeholder="请输入项目名称" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="项目所属分类："
              required
              rules={[
                {
                  required: true,
                  message: "category",
                },
              ]}
              name="category"
            >
              <Input placeholder="请输入你的分类" />
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="申请日期："
              required
              rules={[
                {
                  required: true,
                  message: "date是必填字段",
                },
              ]}
              name="date"
            >
              <DatePicker.RangePicker />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="申请人："
              required
              rules={[
                {
                  required: true,
                  message: "person是必填字段",
                },
              ]}
              name="person"
            >
              <Input placeholder="申请人" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="状态："
              required
              rules={[
                {
                  required: true,
                  message: "state是必填字段",
                },
              ]}
              name="state"
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
          <Col span={8}>
            <FormItem {...formItemLayout} label="项目权限：" name="type">
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
          <Col span={16}>
            <FormItem labelCol={{ span: 3 }} label="项目描述：" name="desc">
              <Input.TextArea placeholder="请输入项目详细信息" />
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem
              wrapperCol={{ offset: 3 }}
              name="pic"
              help="请选择大小不超过5M的文件，支持doc，docx，xls，xlsx，zip格式"
            >
              <Upload action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload">
                <Button style={{ margin: "0 0 10px" }}>上传文件</Button>
              </Upload>
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem wrapperCol={{ offset: 3 }}>
              <div style={{ marginTop: "20px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                >
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

export default ThreeColumnForm;
