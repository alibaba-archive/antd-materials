import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Radio,
  Steps,
  Button,
  Typography,
  Row,
  Col,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { useForm } from "_antd@4.12.3@antd/lib/form/Form";

export interface DataSource {
  name?: string;
  category?: string;
  authority?: string;
  desc?: string;
}

export interface StepFormProps {
  dataSource?: DataSource;
  onSubmit?: (data: DataSource) => void;
}

const DEFAULT_DATA: DataSource = {
  name: "",
  category: "",
  authority: "private",
  desc: "",
};

const StepForm: React.FunctionComponent<StepFormProps> = (
  props: StepFormProps
): JSX.Element => {
  const { dataSource = DEFAULT_DATA, onSubmit = (): void => {} } = props;

  const [currentStep, setStep] = useState<number>(0);
  const [form] = useForm();
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
  };

  const steps = ["填写信息", "确认信息", "完成"].map(
    (item, index): React.ReactElement => (
      <Steps.Step
        aria-current={index === currentStep ? "step" : undefined}
        key={index}
        title={item}
      />
    )
  );

  const submit = (): void => {
    const values = form.getFieldsValue(true);
    console.log("values:", values);
    // @ts-ignore
    onSubmit(values);

    setStep(currentStep + 1);
  };

  const goNext = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      setStep(currentStep + 1);
      console.log("Success:", values);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const goPrev = (): void => {
    setStep(currentStep - 1);
  };

  const goInitial = (): void => {
    setStep(0);
    form.resetFields();
  };

  let actions: JSX.Element = <Button />;
  let mainbody: JSX.Element = <div />;
  switch (currentStep) {
    case 0:
      actions = (
        <Button type="primary" onClick={goNext}>
          下一步
        </Button>
      );
      break;
    case 1:
      actions = (
        <>
          <Button onClick={goPrev} style={{ marginRight: "5px" }}>
            上一步
          </Button>
          <Button type="primary" onClick={submit} htmlType="submit">
            下一步
          </Button>
        </>
      );
      break;
    case 2:
      mainbody = (
        <>
          <div className={styles.submitSuccess}>
            <CheckCircleOutlined className={styles.succesIcon} />
            <Typography.Title level={2}>提交成功</Typography.Title>
            <Typography.Text>5s 后自动跳转至工单页</Typography.Text>
            <div>
              <Button
                type="primary"
                style={{ marginRight: "5px" }}
                onClick={goInitial}
              >
                返回主页
              </Button>
              <Button onClick={goInitial}>继续创建</Button>
            </div>
          </div>
        </>
      );
      break;
    default:
      break;
  }

  if (currentStep == 0) {
    mainbody = (
      <>
        <Form
          form={form}
          className={styles.form}
          labelAlign="right"
          initialValues={dataSource}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="项目名称"
                {...formLayout}
                required
                rules={[
                  {
                    required: true,
                    message: "必填",
                  },
                ]}
              >
                <Input placeholder="给项目起个名字" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="项目所属分类"
                required
                name="category"
                {...formLayout}
                rules={[
                  {
                    required: true,
                    message: "必填",
                  },
                ]}
              >
                <Input placeholder="请输入你的分类" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="项目权限" name="authority" {...formLayout}>
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
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="项目描述" name="desc" {...formLayout}>
                <Input.TextArea placeholder="请输入项目详细信息" name="desc" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item wrapperCol={{ span: 15, offset: 6 }}>
                {actions}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  } else if (currentStep == 1) {
    const values = form.getFieldsValue(true);
    const { name, category, authority, desc = "" } = values;
    mainbody = (
      <>
        <Form
          form={form}
          className={styles.form}
          labelAlign="right"
          initialValues={dataSource}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="项目名称"
                {...formLayout}
                required
                rules={[
                  {
                    required: true,
                    message: "必填",
                  },
                ]}
              >
                {name}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="项目所属分类"
                required
                name="category"
                {...formLayout}
                rules={[
                  {
                    required: true,
                    message: "必填",
                  },
                ]}
              >
                {category}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="项目权限" name="authority" {...formLayout}>
                <Radio.Group aria-labelledby="authority of project">
                  <Radio id={authority} value={authority} disabled>
                    {authority == "private"
                      ? "私密项目"
                      : authority == "internal"
                      ? "内部项目"
                      : "开放项目"}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="项目描述" name="desc" {...formLayout}>
                {desc}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item wrapperCol={{ span: 15, offset: 6 }}>
                {actions}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  }

  return (
    <div>
      <Card className={styles.StepForm}>
        <Steps current={currentStep}>{steps}</Steps>
        {mainbody}
      </Card>
    </div>
  );
};

export default StepForm;
