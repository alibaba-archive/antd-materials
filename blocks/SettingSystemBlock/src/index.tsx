import React, { useState, useEffect } from 'react';
import { Avatar, Card, Tabs, Table, Typography, Upload, Button, Form, Input, message, Radio, Row, Col, UploadProps, Modal } from 'antd';
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const FormItem = Form.Item;

const MockData = [
  {
    name: '阿不思·布萊恩·鄧不利多',
    logo: 'https://img.alicdn.com/tfs/TB1WsE2n5_1gK0jSZFqXXcpaXXa-183-183.png',
    privilege: '管理员',
    key: 1
  },
  {
    name: '戒钱',
    logo: 'https://img.alicdn.com/tfs/TB1cjwYnVT7gK0jSZFpXXaTkpXa-183-183.png',
    privilege: '管理员',
    key: 2
  },
  {
    name: '格林德沃',
    logo: 'https://img.alicdn.com/tfs/TB1l7g0nYr1gK0jSZR0XXbP8XXa-183-183.png',
    privilege: '管理员',
    key: 3
  },
  {
    name: '哈利玻特',
    logo: 'https://img.alicdn.com/tfs/TB1WUurnubviK0jSZFNXXaApXXa-183-183.png',
    privilege: '管理员',
    key: 4
  },
  {
    name: '小天狼星',
    logo: 'https://img.alicdn.com/tfs/TB10Ts2n1L2gK0jSZFmXXc7iXXa-183-183.png',
    privilege: '成员',
    key: 5
  },
  {
    name: '罗恩',
    logo: 'https://img.alicdn.com/tfs/TB1HHwYnVY7gK0jSZKzXXaikpXa-183-183.png',
    privilege: '成员',
    key: 6
  },
  {
    name: '伏地魔',
    logo: 'https://img.alicdn.com/tfs/TB1T_WrnubviK0jSZFNXXaApXXa-183-183.png',
    privilege: '成员',
    key: 7
  },
  {
    name: '赫敏',
    logo: 'https://img.alicdn.com/tfs/TB1D_GrnubviK0jSZFNXXaApXXa-183-183.png',
    privilege: '成员',
    key: 8
  },
];

export interface DataSource {
  name?: string;
  category?: string;
  description?: string;
  type?: string;
  pic?: UploadProps[];
}

export interface PriList {
  name?: string;
  logo?: string;
  privilege?: string;
}
export interface SettingSystemProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  name: 'lily',
  type: 'private',
  description: 'Fusion是一套企业级中后台设计系统解决方案，致力于解决产品体验一致性问题、设计研发协同问题，以及UI开发效率问题。',
};

const DEFAULT_ON_SUBMIT = (values: SettingSystemProps, errors?: unknown): void => {

  if (errors) {
    console.log('errors', errors);
    return;
  }
  console.log('values:', values);
  message.success('更新成功');
};

const SettingSystemBlock: React.FC<SettingSystemProps> = (props: SettingSystemProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    onSubmit = DEFAULT_ON_SUBMIT,
  } = props;

  const [priList, setPriList] = useState<PriList[]>([]);
  const [inited, setInited] = useState(false);
  const [postData, setValue] = useState<DataSource>(dataSource);
  const [isDialog, setIsDialog] = useState(false);

  useEffect(() => {
    setPriList(MockData);
    setInited(true);
  }, [inited]);


  const formChange = (values: DataSource): void => {
    setValue(values);
  };

  const onExitButtonClicked = (): void => {
    setIsDialog(true)
  };
  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 20 }
  }
  return (
    <div className={styles.SettingPersonBlock}>
      <Tabs className={styles.customTab}
      //  navClassName={styles.customTabHead}
      >
        <Tabs.TabPane tab="基础设置" key="basic">
          <Card >
            <div className={styles.baseSettingContainer}>
              <Form
                className={styles.baseSetting}
                initialValues={postData}
                labelAlign="right"
                onChange={formChange}
                onFinish={(value) => onSubmit(value)}
                onFinishFailed={(value) => onSubmit(value.values, value.errorFields)}
              >
                <Row>
                  <Col span={24}>
                    <div>项目封面</div>
                    <FormItem >
                      <Row gutter={10}>
                        <Col span={4}><Avatar shape="circle" size={64} icon={<UserOutlined />} /></Col>
                        <Col span={20} className={styles.changeLogo}>
                          <div >
                            <FormItem>
                              <Upload name="pic">
                                <Button className={styles.uploadButton}>更新头像</Button>
                              </Upload>
                            </FormItem>
                            <div>
                              <p>* 头像尽量上传超过 80px*80px, 但不要太大了。</p>
                              <p>* 请上传两倍图保证清晰度</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem label="项目名称" required rules={[{
                      required: true,
                      message: "必填"
                    }]} {...formLayout} name="name">
                      <Input placeholder="请输入项目名称" />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem label="项目所属分类" required rules={[{
                      required: true,
                      message: "必填"
                    }]} {...formLayout} name="category">
                      <Input placeholder="请输入你的分类" />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem label="项目权限" {...formLayout} name="type">
                      <Radio.Group aria-labelledby="authority of project">
                        <Radio id="private" value="private">私密项目</Radio>
                        <Radio id="internal" value="internal">内部项目</Radio>
                        <Radio id="public" value="public">开放项目</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem label="项目描述" {...formLayout} name="description">
                      <Input.TextArea placeholder="请输入项目描述" />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem wrapperCol={{ span: 20, offset: 5 }}>
                      <div>
                        <Button
                          type="primary"
                          htmlType="submit"
                        >保存
                      </Button>
                      </div>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="权限设置" key="privilege">
          <Card
            title="权限设置"
            extra={
              <div>
                <Button style={{ marginRight: '15px' }}>设置角色 1 权限</Button>
                <Button type="primary">新增</Button>
              </div>
            }
          >
            <Table dataSource={priList}>
              <Table.Column dataIndex="logo" render={(url: string) => <Avatar src={url} />} width={50} />
              <Table.Column dataIndex="name" />
              <Table.Column dataIndex="privilege" />
              <Table.Column render={() => <EllipsisOutlined />} />
            </Table>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="更多设置" key="more">
          <Card >
            <div>
              <Typography.Title level={4} className={styles.h3}>退出项目</Typography.Title>
              <Typography.Text className={styles.p}>一旦你退出这个项目，你将无法访问这个项目的任何内容。</Typography.Text>
              <div style={{ marginTop: '15px' }}>
                <Button
                  onClick={onExitButtonClicked}
                  danger
                >退出项目</Button>
                <Modal title="退出项目" visible={isDialog} onOk={() => setIsDialog(false)} onCancel={() => setIsDialog(false)} cancelText="取消" okText="确认">
                  <p>确定退出该项目？</p>
                </Modal>
              </div>
            </div>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SettingSystemBlock;
