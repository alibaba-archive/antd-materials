import React, { FC, useRef, useState,useEffect } from "react";
import {
  // Box,
  Button,
  Card,
  Form,
  Input,
  Select,
  Row,
  Col,
  Space,
  Radio,
  // Field,
  Divider,
  message,
} from "antd";
import styles from "./index.module.less";

export interface DataSource {
  job: {
    address?: string;
    position?: string;
    companyName?: string;
    currency?: string;
    annualSalary?: number;
    expectAnnualSalary?: number;
  };
  treatment: {
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

const DEFAULT_DATA: DataSource = {
  job: {
    address: "美国 洛杉矶",
  },
  treatment: {
    rsu: true,
  },
};

const ClassifiedForm: FC<ClassifiedFormProps> = (props): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    onSubmit = () => {},
    onCancel = () => {},
  } = props;

  const jobRef = useRef(null);
  const treatmentField = useRef(null);

const [jobError,setJobError] = useState({})
const [flag,setFlag] = useState(false)
  const handleSubmit = () => {
   jobRef.current.submit()
    // setFlag(true)
    console.log(jobError);
    // console.log(
    //   jobField.current.submit((value: unknown)=>value),
    //   treatmentField.current.submit((value: unknown)=>value)
    // );
    
    // const { errors: jobErrors } = await jobField.validatePromise();
    // const { errors: treatmentErrors } = await treatmentField.validatePromise();

    // if (treatmentErrors || jobErrors) {
    //   console.log('errors', jobErrors, treatmentErrors);
    //   return;
    // }
    // const values = {
    //   basic: jobField.getValues(),
    //   member: treatmentField.getValues(),
    // };
    // console.log('values:', values);
    // onSubmit(values);
    // message.success('提交成功');
  };
  const geterrorValues = (value)=>{
    if(value.type == 'jobErrors'){
     const joberror = value.errorFields
    }else{

    }
  }
  useEffect(()=>{
    if(flag){
      console.log(jobError);
    }
  },[flag])
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 60 },
  };

  return (
    <div className={styles.ClassifiedForm}>
      <Card className={styles.Card} title="工作经历">
        <Space direction='vertical'>
        <Card title="分类信息" >
          <Form ref={jobRef} labelAlign="right" onFinish={value=>console.log(value)
          }
          onFinishFailed={value=>{
          setJobError((prevState)=>{
            return({
              ...prevState,
            loading: true,
            jobError:value.errorFields
            })
          })
          // geterrorValues({...jobError,type:"jobErrors"})
          }}
          >
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
                <Form.Item label="公司名称" {...formLayout} name='companyName'>
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
                      message: "必填",
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
                      message: "必填",
                    },
                  ]}
                  {...formLayout}
                >
                  <Input
                    name="annualSalary"
                    placeholder="请输入薪资信息"
                    addonAfter="CNY"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="期望年薪" {...formLayout} name="expectAnnualSalary">
                  <Input
                    name="expectAnnualSalary"
                    placeholder="请输入期望薪资"
                    addonAfter="CNY"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="分类信息">
          <Form
            // field={treatmentField}
            ref = {treatmentField}
            labelAlign="right"
          >
            <Row>
              <Col span={8}>
                <Form.Item
                  label="月薪"
                  required
                  rules={[
                    {
                      required: true,
                      message: "必填",
                    },
                  ]}
                  {...formLayout}
                >
                  <Input name="monthlySalary" placeholder="请输入月薪" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="月数" {...formLayout}>
                  <Input name="monthNumber" placeholder="请输入在职月数" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="津贴" {...formLayout}>
                  <Input name="bonus" placeholder="请输入津贴" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="年度目标奖金" {...formLayout}>
                  <Input name="targetBonus" placeholder="请输入年度目标奖金" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="去年实际奖金" {...formLayout}>
                  <Input name="lastYearBonus" placeholder="请输入实际奖金" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="选项/RSU" {...formLayout}>
                  <Radio.Group name="rsu" aria-labelledby="rsu">
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
                <Form.Item label="选项/RSU 描述">
                  <Input.TextArea
                    name="rsuDesc"
                    placeholder="请输入"
                    maxLength={500}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider />
          <Form.Item>
            <div>
              <Button
                type="primary"
                onClick={handleSubmit}
                style={{ marginRight: "10px" }}
              >
                提交
              </Button>
              <Button
              onClick={onCancel}
              >
                取消
              </Button>
            </div>
          </Form.Item>
        </Card>
        </Space>
      </Card>
    </div>
  );
};

export default ClassifiedForm;
