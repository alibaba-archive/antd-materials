import React, { FC, useState, useRef } from 'react';
import { DownOutlined } from '@ant-design/icons';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Divider,
  Menu,
  Dropdown,
  Row,
  Col,
  Modal,
} from 'antd';
import styles from './index.module.less';

export interface Company {
  key?: string;
  name?: string;
  business?: string;
  address?: string;
  creatorName?: string;
  edited?: boolean; // 内部创建和使用数据
}

export interface DataSource {
  basic: {
    companyName?: string;
    projectNo?: string;
    investmentsCommittee?: string;
    projectType?: string;
    projectId?: number;
  };
  member: {
    contractType?: number;
    icMemberId?: number;
    forensicId?: number;
    financeId?: number;
    projectId?: number;
  };
  company: Company[];
}

export interface GroupFormProps {
  dataSource?: DataSource;
  footerLeft?: number;
  footerRight?: number;
  onSubmit?: (data: DataSource) => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  basic: {},
  member: {},
  company: [
    {
      key: '1',
      name: '蚂蚁证券投资有限公司 A',
      business: '金融证券代理',
      address: '1569 Cronin Ways Apt. 082',
      creatorName: '欧鹏',
    },
    {
      key: '2',
      name: '蚂蚁证券投资有限公司 B',
      business: '金融证券代理',
      address: '4016 Kautzer Route Suite 366',
      creatorName: '阮小五',
    },
    {
      key: '3',
      name: '蚂蚁证券投资有限公司 C',
      business: '金融证券代理',
      address: '22 Haag Manor',
      creatorName: '阮小二',
    },
    {
      key: '4',
      name: '蚂蚁证券投资有限公司 D',
      business: '金融证券代理',
      address: '1014 McLaughlin Unions',
      creatorName: '阮小七',
    },
    {
      key: '5',
      name: '蚂蚁证券投资有限公司 E',
      business: '金融证券代理',
      address: '8748 Devante Center',
      creatorName: '公孙胜',
    },
    {
      key: '6',
      name: '蚂蚁证券投资有限公司 F',
      business: '金融证券代理',
      address: '1014 McLaughlin Unions',
      creatorName: '曹正',
    },
    {
      key: '7',
      name: '蚂蚁证券投资有限公司 G',
      business: '金融证券代理',
      address: '8748 Devante Center',
      creatorName: '李立',
    },
    {
      key: '8',
      name: '蚂蚁证券投资有限公司 H',
      business: '金融证券代理',
      address: '1569 Cronin Ways Apt. 082',
      creatorName: '樊瑞',
    },
  ],
};
const GroupForm: FC<GroupFormProps> = (props) => {
  const {
    dataSource: defaultDataSource = DEFAULT_DATA,
    onSubmit = () => {},
    onCancel = () => {},
  } = props;
  const columns = [
    {
      title: '目标公司',
      dataIndex: 'name',
      width: 180,
      render: (value: string, row: any, index: number) =>
        renderEditCell(value, index, row, 'name'),
    },
    {
      title: '主营业务',
      dataIndex: 'business',
      width: 180,
      render: (value: string, row: any, index: number) =>
        renderEditCell(value, index, row, 'business'),
    },
    {
      title: '注册地',
      dataIndex: 'address',
      width: 180,
      render: (value: string, row: any, index: number) =>
        renderEditCell(value, index, row, 'address'),
    },
    {
      title: '创始人',
      dataIndex: 'creatorName',
      width: 180,
      render: (value: string, row: any, index: number) =>
        renderEditCell(value, index, row, 'creatorName'),
    },
    {
      title: '注册地',
      dataIndex: 'address',
      width: 180,
      render: (value: string, row: any, index: number) => {
        if (row.edited) {
          return (
            <div>
              <Button
                type="primary"
                onClick={() => changeRowData(index, 'edited', false)}
              >
                保存
              </Button>
              <Divider type="vertical" />
              <Button
                type="primary"
                onClick={() => {
                  deleteRow(index);
                }}
              >
                删除
              </Button>
            </div>
          );
        }
        return (
          <div>
            <a onClick={() => changeRowData(index, 'edited', true)}>编辑</a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                deleteRow(index);
              }}
            >
              删除
            </a>
            <Divider type="vertical" />
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>操作一</Menu.Item>
                  <Menu.Item>操作二</Menu.Item>
                  <Menu.Item>操作三</Menu.Item>
                </Menu>
              }
              trigger={['hover']}
            >
              <a>
                更多
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
        );
      },
    },
  ];
  const [dataSource, setDataSouce] = useState<DataSource>(defaultDataSource);

  const [isModalVisible, setIsModalVisible] = useState({
    show: false,
    index: null,
    name: null,
  });
  const basicRef = useRef(null);
  const memberRef = useRef(null);

  const changeRowData = (
    index: number,
    key: keyof Company,
    value: string | number | boolean | [],
  ) => {
    const company: Company[] = [...dataSource.company];
    (company[index][key] as string | number | boolean | []) = value;

    setDataSouce({
      ...dataSource,
      company,
    });
  };

  const deleteRow = (index: number) => {
    const company: Company[] = [...dataSource.company];
    if (!company[index].key) {
      company.splice(index, 1);
      setDataSouce({
        ...dataSource,
        company,
      });
      return;
    }
    setIsModalVisible({
      show: true,
      index,
      name: company[index].name,
    });
  };

  const addRow = () => {
    setDataSouce({
      ...dataSource,
      company: [...dataSource.company, { edited: true }],
    });
  };

  const submit = (obj: any) => {
    onSubmit({
      basic: obj.type === 'basic' ? obj.values : null,
      member: obj.type === 'member' ? obj.values : null,
      company: dataSource.company,
    });
  };

  const renderEditCell = (
    value: string,
    index: number,
    row: { edited: boolean },
    key: keyof Company,
  ) => {
    if (row.edited) {
      return (
        <Input
          style={{ width: '100%' }}
          onChange={(e) => changeRowData(index, key, e.target.value)}
          value={value || ''}
        />
      );
    }
    return value;
  };

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 30 },
  };
  return (
    <div className={styles.GroupForm}>
      <Card className={styles.Card} title="项目成员信息">
        <Form
          labelAlign="right"
          ref={basicRef}
          onFinish={(values) => submit({ type: 'basic', values })}
        >
          <Row>
            <Col span={8}>
              <Form.Item
                label="公司简称"
                required
                {...formLayout}
                name="companyName"
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
              >
                <Input placeholder="请输入公司简称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="项目代号"
                required
                {...formLayout}
                name="projectNo"
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
              >
                <Input placeholder="请输入项目代号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="投资委员会"
                required
                {...formLayout}
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
                name="investmentsCommittee"
              >
                <Input placeholder="请输入投资委员会" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="项目类型"
                required
                {...formLayout}
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
                name="projectType"
              >
                <Input placeholder="请输入项目类型" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="关联项目"
                required
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
                {...formLayout}
                name="projectId"
              >
                <Select id="relativeId" placeholder="请选择关联项目">
                  <Select.Option value={1}>项目一</Select.Option>
                  <Select.Option value={2}>项目二</Select.Option>
                  <Select.Option value={3}>项目三</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card className={styles.Card} title="基础信息">
        <Form
          labelAlign="right"
          ref={memberRef}
          onFinish={(values) => submit({ type: 'member', values })}
        >
          <Row>
            <Col span={8}>
              <Form.Item
                label="合同类型"
                required
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
                {...formLayout}
                name="contractType"
              >
                <Select placeholder="请选择合同类型">
                  <Select.Option value={1}>合同一</Select.Option>
                  <Select.Option value={2}>合同二</Select.Option>
                  <Select.Option value={3}>合同三</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="IC成员"
                required
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
                {...formLayout}
                name="icMemberId"
              >
                <Select placeholder="请选择IC成员">
                  <Select.Option value={1}>成员一</Select.Option>
                  <Select.Option value={2}>成员二</Select.Option>
                  <Select.Option value={3}>成员三</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="法务评审会"
                required
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
                {...formLayout}
                name="forensicId"
              >
                <Select placeholder="请选择法务评审">
                  <Select.Option value={1}>法务一</Select.Option>
                  <Select.Option value={2}>法务二</Select.Option>
                  <Select.Option value={3}>法务三</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="财务评审"
                required
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
                {...formLayout}
                name="financeId"
              >
                <Select placeholder="请选择财务评审">
                  <Select.Option value={1}>财务一</Select.Option>
                  <Select.Option value={2}>财务二</Select.Option>
                  <Select.Option value={3}>财务三</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="项目评审"
                required
                rules={[
                  {
                    required: true,
                    message: '必填',
                  },
                ]}
                {...formLayout}
                name="projectId"
              >
                <Select placeholder="请选择项目评审">
                  <Select.Option value={1}>项目一</Select.Option>
                  <Select.Option value={2}>项目二</Select.Option>
                  <Select.Option value={3}>项目三</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card className={styles.Card} title="基础信息">
        <div style={{ marginBottom: '16px' }}>
          <Button onClick={addRow} className={styles.Button} type="primary">
            {' '}
            新增
          </Button>
        </div>
        <Table
          dataSource={dataSource.company}
          className={styles.Table}
          columns={columns}
        />
      </Card>
      <div className={styles.fixedButtons}>
        <Button
          className={styles.Button}
          onClick={() => {
            basicRef.current.submit();
            memberRef.current.submit();
          }}
          type="primary"
          style={{ marginRight: '20px' }}
        >
          提交
        </Button>
        <Button className={styles.Button} onClick={onCancel}>
          取消
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible.show}
          onOk={() => {
            const company = [...dataSource.company];
            company.splice(isModalVisible.index, 1);
            setDataSouce({
              ...dataSource,
              company,
            });
            setIsModalVisible({
              show: false,
              index: null,
              name: null,
            });
          }}
          onCancel={() =>
            setIsModalVisible({
              show: false,
              index: null,
              name: null,
            })
          }
        >
          <p>确定要删除公司：{isModalVisible.name}</p>
        </Modal>
      </div>
    </div>
  );
};

export default GroupForm;
