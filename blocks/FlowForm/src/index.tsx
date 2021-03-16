import React, { FC, useEffect, useState, useRef } from "react";
import { findDOMNode } from "react-dom";
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Radio,
  Steps,
  Divider,
  Tag,
  Avatar,
  Typography,
  Row,
  Col,
  Space,
} from "antd";
import styles from "./index.module.less";

export interface Experience {
  company?: string;
  position?: string;
  region?: string;
  description?: string;
  salary?: string;
  time?: number;
  allowance?: string;
  rsu?: boolean;
}

export interface Approval {
  approverId?: number;
  signatureId?: number;
  assessmentType?: number;
  feedback?: string;
}

export interface DataSource {
  approval?: Approval;
  person?: {
    avatar?: string;
    surname?: string;
    name?: string;
    phone?: string;
    email?: string;
    region?: string;
    address?: string;
    workTime?: number;
    education?: string;
    rank?: string;
    position?: string;
    department?: string;
    workAddress?: string;
    salary?: string;
    experiences?: Experience[];
  };
}

export interface FlowFormProps {
  dataSource?: DataSource;
  footerLeft?: number;
  footerRight?: number;
  onAgree?: (data: Approval) => void;
  onRefuse?: () => void;
  onTransfer?: () => void;
  onSignature?: () => void;
}

const DEFAULT_DATA: DataSource = {
  approval: {
    approverId: 1,
    assessmentType: 1,
  },
  person: {
    avatar:
      "https://img.alicdn.com/tfs/TB1WpoDouH2gK0jSZJnXXaT1FXa-1072-1608.jpg",
    surname: "谢",
    name: "莉莉",
    phone: "13676349585",
    email: "Xielili@aliwork-inc.com",
    region: "中国/浙江",
    address: "杭州",
    workTime: 3,
    education: "Singapore University of Technology and Design",
    rank: "P10",
    position: "Senior Director",
    department: "aliwork&EHR",
    workAddress: "杭州",
    salary: "20,000",
    experiences: [
      {
        company: "浙江杭州天猫有限公司",
        position: "高级研发专家",
        region: "中国/浙江",
        description:
          "Fusion 是一套企业级中后台设计系统解决方案，致力于解决产品体验一致性问题、设计研发协同问题，以及UI开发效率问题。",
        salary: "20,000 USD",
        time: 13,
        allowance: "5,000 USD",
        rsu: false,
      },
    ],
  },
};

const FlowForm: FC<FlowFormProps> = (props) => {
  const {
    dataSource = DEFAULT_DATA,
    onAgree = () => {},
    onRefuse = () => {},
    onTransfer = () => {},
    onSignature = () => {},
  } = props;

  // const field = Field.useField({
  //   values: dataSource.approval,
  // });

  const containerRef = useRef(null);
  const formValueRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react/no-find-dom-node
    const dom = findDOMNode(containerRef.current) as HTMLDivElement;
    const rect = (dom && dom.getBoundingClientRect()) || { left: 0, width: 0 };
    setLeft(rect.left);
    setRight(document.documentElement.offsetWidth - rect.left - rect.width);
  }, []);

  return (
    <div ref={containerRef} className={styles.FlowForm}>
      <Space direction="vertical" size={20}>
        <Card>
          <Steps current={1}>
            <Steps.Step key={0} title="申请" />
            <Steps.Step key={1} title="审批" description="李强" />
            <Steps.Step key={2} title="接受" />
            <Steps.Step key={3} title="合同发送" />
            <Steps.Step key={4} title="合同接受" />
            <Steps.Step key={5} title="入职准备" />
            <Steps.Step key={6} title="完成" />
          </Steps>
        </Card>
        <Card title="审批信息">
          <Form
            labelAlign="right"
            ref={formValueRef}
            onFinish={(value) => onAgree(value)}
            labelCol={{ span: 4, offset: 1 }}
          >
            <Row>
              <Col span={8}>
                <Form.Item label="审批人" required name="approverId">
                  <Select placeholder="请选择审批人">
                    <Select.Option value={1}>李强</Select.Option>
                    <Select.Option value={2}>张三</Select.Option>
                    <Select.Option value={3}>李四</Select.Option>
                    <Select.Option value={4}>王五</Select.Option>
                    <Select.Option value={5}>阮小二</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="加签人" name="signatureId">
                  <Select placeholder="请选择加签人">
                    <Select.Option value={1}>李强</Select.Option>
                    <Select.Option value={2}>张三</Select.Option>
                    <Select.Option value={3}>李四</Select.Option>
                    <Select.Option value={4}>王五</Select.Option>
                    <Select.Option value={5}>阮小二</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="评估方式" name="assessmentType">
                  <Radio.Group>
                    <Radio value={1}>已电面</Radio>
                    <Radio value={2}>未电面</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="意见&反馈">
                  <Input.TextArea maxLength={500} placeholder="请输入描述" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="候选人信息">
          <Row>
            <Col span={12}>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "20px" }}>
                  <Avatar src={dataSource.person?.avatar} />
                </div>
                <div>
                  <Form labelAlign="left">
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label={`${dataSource.person?.surname}${dataSource.person?.name}`}
                        >
                          <span className="next-form-preview">
                            {dataSource.person?.phone} |{" "}
                            {dataSource.person?.email}
                          </span>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="现在所在地">
                          <span className="next-form-preview">
                            {dataSource.person?.address}
                          </span>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="工作经验">
                          <span className="next-form-preview">
                            {dataSource.person?.workTime}
                          </span>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="教育经历">
                          <span className="next-form-preview">
                            {dataSource.person?.education}
                          </span>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </Col>
            <Col span={12} style={{ position: "relative" }}>
              <Divider className={styles.Divider} type="vertical" />
              <Form labelAlign="right">
                <Row>
                  <Col span={12}>
                    <Form.Item label="职级">
                      <span className="next-form-preview">
                        {dataSource.person?.rank}
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="职位">
                      <span className="next-form-preview">
                        {dataSource.person?.position}
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="部门">
                      <span className="next-form-preview">
                        {dataSource.person?.department}
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="工作地">
                      <span className="next-form-preview">
                        {dataSource.person?.workAddress}
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="薪水">
                      <div className="next-form-preview">
                        {dataSource.person?.salary}{" "}
                        <Tag color="green">+23.2%</Tag>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card title="基础信息">
          <Form labelAlign="right">
            <Row>
              <Col span={8}>
                <Form.Item label="姓氏" required>
                  <span className="next-form-preview">
                    {dataSource.person?.surname}
                  </span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="名字" required>
                  <span className="next-form-preview">
                    {dataSource.person?.name}
                  </span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="国家/地区">
                  <span className="next-form-preview">
                    {dataSource.person?.region}
                  </span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="电话号码" required>
                  <span className="next-form-preview">
                    {dataSource.person?.phone}
                  </span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="邮箱" required>
                  <span className="next-form-preview">
                    {dataSource.person?.email}
                  </span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="现居地址" required>
                  <span className="next-form-preview">
                    {dataSource.person?.address}
                  </span>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="工作经历">
          {dataSource && dataSource.person && dataSource.person.experiences
            ? dataSource?.person?.experiences.map((experience, idx) => (
                <div key={idx}>
                  <div>
                    <Typography.Text className={styles.SubTitle}>
                      公司信息
                    </Typography.Text>
                    <Form labelAlign="right" className={styles.formMarinTop}>
                      <Row>
                        <Col span={8}>
                          <Form.Item label="工作单位" required>
                            <span className="next-form-preview">
                              {experience.company}
                            </span>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="职位" required>
                            <span className="next-form-preview">
                              {experience.position}
                            </span>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="国家/地区">
                            <span className="next-form-preview">
                              {experience.region}
                            </span>
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          <Form.Item label="职责描述" required>
                            <span className="next-form-preview">
                              {experience.description}
                            </span>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                  <Divider dashed />
                  <div>
                    <Typography.Text className={styles.SubTitle}>
                      待遇信息
                    </Typography.Text>
                    <Form labelAlign="right" className={styles.formMarinTop}>
                      <Row>
                        <Col span={8}>
                          <Form.Item label="月薪">
                            <span className="next-form-preview">
                              {experience.salary}
                            </span>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="月数">
                            <span className="next-form-preview">
                              {experience.time}
                            </span>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="国家/地区">
                            <span className="next-form-preview">
                              {experience.region}
                            </span>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Options/RSU">
                            <span className="next-form-preview">
                              {experience.rsu ? "Yes" : "No"}
                            </span>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              ))
            : null}
        </Card>
      </Space>
      <div>
        <div style={{ left, right }} className={styles.FlowFormFooter}>
          <Button onClick={() => formValueRef.current.submit()} type="primary">
            同意
          </Button>
          <Button onClick={onRefuse}>拒绝</Button>
          <Button onClick={onTransfer}>转移</Button>
          <Button onClick={onSignature}>加签</Button>
        </div>
      </div>
    </div>
  );
};

export default FlowForm;
