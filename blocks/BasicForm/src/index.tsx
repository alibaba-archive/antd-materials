import React, { useState } from "react";
import {
  Input,
  Form,
  Button,
  Card,
  DatePicker,
  message,
  Radio,
  Upload,
} from "antd";

import { Moment } from "moment";
import { UploadOutlined } from "@ant-design/icons";

import styles from "./index.module.less";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export interface DataSource {
  name?: string;
  category?: string;
  date?: Moment[];
  type?: string;
  pic?: unknown;
  desc?: string;
}

export interface BasicFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  type: "private",
};

const BasicForm: React.FC<BasicFormProps> = (
  props: BasicFormProps
): JSX.Element => {
  const [form] = Form.useForm();
  const DEFAULT_ON_SUBMIT = async () => {
    try {
      const values = await form.validateFields();
      console.log("values:", values);
      message.success("提交成功");
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };
  const {
    dataSource = DEFAULT_DATA,
    onSubmit = DEFAULT_ON_SUBMIT,
    onCancel = () => {},
  } = props;
  const [postData, setValue] = useState<DataSource>(dataSource);

  const formChange = (values: DataSource): void => {
    setValue(values);
  };
  return (
    <Card>
      <Form
        className={styles.BasicForm}
        validateMessages={{ required: "必填" }}
        form={form}
        initialValues={postData}
        labelAlign="right"
        onChange={formChange}
      >
        <FormItem
          {...formItemLayout}
          label="项目名称："
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
          name="name"
        >
          <Input placeholder="请输入项目名称" name="name" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="项目所属分类："
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
          name="category"
        >
          <Input placeholder="请输入你的分类" name="category" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="可访问日期："
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}
          name="date"
        >
          <DatePicker.RangePicker name="date" />
        </FormItem>

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

        <FormItem {...formItemLayout} label="上传封面：" name="pic">
          <Upload name="logo" action="/upload.do" listType="picture" accept="image/png, image/jpeg">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </FormItem>

        <FormItem {...formItemLayout} label="项目描述：" name="desc">
          <Input.TextArea placeholder="请输入项目详细信息" name="desc" />
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 5 }} >
          <div>
            <Button type="primary" onClick={onSubmit} style={{marginRight:'10px'}}>
              提交
            </Button>
            <Button onClick={onCancel}>取消</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
  );
};

export default BasicForm;
