import React from "react";
import {
  Tabs,
  Card,
  Avatar,
  Button,
  Menu,
  Dropdown,
  Form,
  Row,
  Col,
  Steps,
  Typography,
  Divider,
  Table
} from "antd";
import styles from "./index.module.less";

export interface LogItem {
  opStatus?: string;
  operator?: string;
  opResult?: string;
  opTime?: string;
}

export interface DataSource {
  logs?: LogItem[];
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
  };
  preJob?: {
    company?: string;
    position?: string;
    address?: string;
    description?: string;
  };
  salary?: {
    month?: string;
    monthNumber?: number;
    bonus?: string;
    rsu?: string;
  };
}

export interface AdvancedDetailProps {
  dataSource?: DataSource;
  onTabChange?: void;
  onTableTabChange?: void;
}
const DEFAULT_DATA: DataSource = {
  logs: [
    ["主管审批", "梅长苏"],
    ["HRG", "叶周全"],
    ["C&B审核人", "吴永辉"],
    ["业务线审批", "倩倩"],
    ["HR线审批", "叶俊"],
  ].map(
    (item): LogItem => ({
      opStatus: item[0],
      operator: item[1],
      opResult: "同意",
      opTime: "2019-11-11 09:36",
    })
  ),
  person: {
    avatar:
      "https://img.alicdn.com/tfs/TB10Kr8orj1gK0jSZFOXXc7GpXa-1000-1000.png",
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
  },
  preJob: {
    company: "浙江杭州天猫有限公司",
    position: "高级研发专家",
    address: "中国/浙江",
    description:
      "Fusion 是一套企业级中后台设计系统解决方案，致力于解决产品体验一致性问题、设计研发协同问题，以及UI开发效率问题。",
  },
  salary: {
    month: "20,000 USD",
    monthNumber: 13,
    bonus: "5,000 USD",
    rsu: "No",
  },
};
const AdvancedDetail: React.FunctionComponent<AdvancedDetailProps> = (
  props: AdvancedDetailProps
): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    onTabChange = (): void => {},
    onTableTabChange = (): void => {},
  } = props;
  const { TabPane } = Tabs;
  const renderTab = (): JSX.Element => {
    return (
      <Tabs onChange={onTableTabChange}>
        <TabPane
          tab={<span className={styles.TabItemTitle}>操作日志一</span>}
          key="1"
          className={styles.TabItem}
        />
        <TabPane
          tab={<span className={styles.TabItemTitle}>操作日志二</span>}
          key="2"
          className={styles.TabItem}
        />
        <TabPane
          tab={<span className={styles.TabItemTitle}>操作日志三</span>}
          key="3"
        />
      </Tabs>
    );
  };
  const menu = (): JSX.Element => {
    return (
      <Menu>
        <Menu.Item >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            操作一
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            操作二
          </a>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <>
      <Card
        className={styles.AdvancedDetailHead}
        bodyStyle={{ paddingBottom: 0 }}
      >
        <div className={styles.nextBox}>
          <Avatar size="large" src={dataSource.person?.avatar} />
          <div className={styles.informationList}>
            <div className={styles.informationHead}>
              <div className={styles.informationName}>
                <span className={styles.TitleName}>
                  {dataSource.person?.surname}
                  {dataSource.person?.name}
                </span>
                <span className={styles.TitleInfo}>
                  {dataSource.person?.phone} | {dataSource.person?.email}
                </span>
              </div>
              <div>
                <Button type="primary" className={styles.button}>
                  主操作
                </Button>
                <Button className={styles.button}>操作一</Button>
                <Dropdown
                  overlay={menu}
                  placement="bottomCenter"
                  trigger={["click"]}
                >
                  <Button className={styles.button}>更多</Button>
                </Dropdown>
              </div>
            </div>
            <Form labelAlign="right">
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="现在所在地">
                    <span className="next-form-preview">
                      {dataSource.person?.region}
                    </span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="工作经验">
                    <span className="next-form-preview">
                      {dataSource.person?.workTime}
                    </span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="高等教育">
                    <span className="next-form-preview">
                      {dataSource.person?.education}
                    </span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="职级">
                    <span className="next-form-preview">
                      {dataSource.person?.rank}
                    </span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="职位">
                    <span className="next-form-preview">
                      {dataSource.person?.position}
                    </span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="部门">
                    <span className="next-form-preview">
                      {dataSource.person?.department}
                    </span>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Tabs
              tabBarStyle={{ margin: 0 }}
              onChange={onTabChange}
              tabBarGutter={40}
            >
              <TabPane tab="选项卡一" key="1" className={styles.TabItem} />
              <TabPane tab="选项卡二" key="2" className={styles.TabItem} />
              <TabPane tab="选项卡三" key="3" />
            </Tabs>
          </div>
        </div>
      </Card>
      <div className={styles.AdvancedDetailBody}>
        <Card className={styles.marginBottom}>
          <Steps shape="dot" current={1} labelPlacement="vertical" size="small">
            <Steps.Step
              title="申请"
              description={
                <div>
                  <span>
                    {dataSource.person?.surname}
                    {dataSource.person?.name}
                  </span>
                  <span>{dataSource.person?.email}</span>
                </div>
              }
            />
            <Steps.Step
              title="审批"
              description={<a className={styles.a}>张三</a>}
            />
            <Steps.Step title="接受" />
            <Steps.Step title="合同发送" />
            <Steps.Step title="合同接受" />
            <Steps.Step title="入职准备" />
            <Steps.Step title="完成" />
          </Steps>
        </Card>
        <Card title="基础信息" className={styles.marginBottom}>
          <div className={styles.Content}>
            <Form>
              <Row gutter={24}>
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
                  <Form.Item label="国家/地区" required>
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
          </div>
        </Card>
        <Card title="工作经历" className={styles.marginBottom}>
            <div>
              <Typography.Text className={styles.SubTitle}>分类标题</Typography.Text>
              <Form labelAlign="right" style={{marginTop: '24px'}}>
              <Row gutter={24}>
                <Col span={8}>
                <Form.Item label="工作单位" required>
                  <span className="next-form-preview">{dataSource.preJob?.company}</span>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="职位" required>
                  <span className="next-form-preview">{dataSource.preJob?.position}</span>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="国家/地区" required>
                  <span className="next-form-preview">{dataSource.preJob?.address}</span>
                </Form.Item>
                </Col>
                <Col span={24}>
                <Form.Item  label="项目描述" required>
                  <span className="next-form-preview">{dataSource.preJob?.description}</span>
                </Form.Item>
                </Col>
                </Row>
              </Form>
            </div>
            <Divider dashed />
            <Typography.Text className={styles.SubTitle}>分类标题</Typography.Text>
              <Form labelAlign="right" style={{marginTop: '24px'}}>
              <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="月薪">
                  <span className="next-form-preview">{dataSource.salary?.month}</span>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="月数">
                  <span className="next-form-preview">{dataSource.salary?.monthNumber}</span>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="津贴">
                  5.000 USD
                  <span className="next-form-preview">{dataSource.salary?.bonus}</span>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="标题">
                  <span className="next-form-preview">-</span>
                </Form.Item>
                </Col>
                <Col span={16}>
                <Form.Item label="标题">
                  <span className="next-form-preview">-</span>
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label="Options/RSU">
                  <span className="next-form-preview">{dataSource.salary?.rsu}</span>
                </Form.Item>
                </Col>
                </Row>
              </Form>
        </Card>
        <Card title={renderTab()}>
            <div className={styles.Content}>
              <Table dataSource={dataSource.logs} bordered={true} className={styles.Table}>
                <Table.Column title="操作进程" dataIndex="opStatus" />
                <Table.Column title="操作人" dataIndex="operator" />
                <Table.Column title="执行结果" dataIndex="opResult" />
                <Table.Column title="操作时间" dataIndex="opTime" />
              </Table>
            </div>
        </Card>
      </div>
    </>
  );
};

export default AdvancedDetail;
