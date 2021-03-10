import React, { useState } from "react";
import {
  Input,
  Button,
  Select,
  Form,
  Card,
  DatePicker,
  message,
  Radio,
  Row,
  Col,
} from "antd";

import { Moment } from "moment";

import styles from "./index.module.less";

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
  type: "private",
};

const DEFAULT_ON_SUBMIT = (values: FourColumnFormProps, errors: []): void => {
  if (errors) {
    console.log("errors", errors);
    return;
  }
  console.log("values:", values);
  message.success("提交成功");
};

const FourColumnForm: React.FC<FourColumnFormProps> = (props): JSX.Element => {
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
    <Card className={styles.FourColumnForm}>
      <Form
        // value={postData}
        labelAlign="right"
        onValuesChange={formChange}
      >
        <Row>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目名称：" required>
              <Input placeholder="请输入项目名称" name="name" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目所属分类：" required>
              <Input placeholder="请输入你的分类" name="category" />
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem {...formItemLayout} label="申请人：" required>
              <Input placeholder="申请人" name="person" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目权限：">
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
            <FormItem {...formItemLayout} label="状态：" required>
              <Select name="state" aria-labelledby="state of project">
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
            <FormItem {...formItemLayout} label="联系人：" required>
              <Input placeholder="请输入联系人" name="relative" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="关联项目：" required>
              <Input placeholder="请输入关联项目" name="relaventProject" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="申请日期：" required>
              <DatePicker.RangePicker name="date" />
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号1：">
              <Input placeholder="请输入" name="data1" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号2：">
              <Input placeholder="请输入" name="data2" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号3：">
              <Input placeholder="请输入" name="data3" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号4：">
              <Input placeholder="请输入" name="data4" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号5：">
              <Input placeholder="请输入" name="data5" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号6：">
              <Input placeholder="请输入" name="data6" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号7：">
              <Input placeholder="请输入" name="data7" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem {...formItemLayout} label="项目编号8：">
              <Input placeholder="请输入" name="data8" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              {/* <Box spacing={8} direction="row">
              <Form.Submit
                type="primary"
                onClick={onSubmit}
                validate
              >提交
              </Form.Submit>
              <Button onClick={onCancel} type="secondary">取消</Button>
            </Box> */}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default FourColumnForm;