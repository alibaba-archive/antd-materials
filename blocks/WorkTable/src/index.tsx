import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Typography,
  Tag,
  Row,
  Col,
  Tabs,
  Card,
  Table,
  Calendar,
  Timeline,
  List,
} from 'antd';
import mock from './mock';

import styles from './index.module.less';

const TimelineItem = Timeline.Item;

interface OrderItem {
  name?: string;
  state?: string;
  level?: string;
}

interface ProjectItem {
  projectId?: number;
  projectName?: string;
  projectDesc?: string;
  createTime?: string;
  img?: string;
  update?: string;
}

interface TimeLineItem {
  planName?: string;
  planAddress?: string;
  planTime?: string;
  planDuaring?: string;
}

interface UpdateItem {
  projectItem?: string;
  project?: string;
  time?: string;
  name?: string;
  action?: string;
  avatar?: string;
  key?: string;
}

interface EntranceItem {
  name?: string;
  link?: string;
  key?: string;
}

export interface DataSource {
  orderList?: OrderItem[];
  projectList?: ProjectItem[];
  timeLineList?: TimeLineItem[];
  updateList?: UpdateItem[];
  entranceList?: EntranceItem[];
  person?: {
    avatar?: string;
    surname?: string;
    name?: string;
    email?: string;
  };
}

const DEFAULT_DATA: DataSource = {
  person: {
    avatar:
      'https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png',
    surname: '谢',
    name: '莉莉',
    email: 'xielili@aliwork-inc.com',
  },
  orderList: mock.orderList,
  projectList: mock.projectList,
  timeLineList: mock.timeLineList,
  updateList: mock.updateList,
  entranceList: mock.entrances,
};
export interface WorkTableProps {
  dataSource?: DataSource;
}
interface ColorMap {
  high?: string;
  middle?: string;
  low?: string;
}
const colorMap: ColorMap = {
  high: 'red',
  middle: 'yellow',
  low: 'green',
};

const WorkTable: React.FunctionComponent<WorkTableProps> = (
  props: WorkTableProps,
): JSX.Element => {
  const { dataSource = DEFAULT_DATA } = props;

  const {
    person,
    orderList,
    projectList,
    timeLineList,
    updateList,
    entranceList,
  } = dataSource;

  const [tab, setTab] = useState('1');

  const changeTab = (val: string) => setTab(val);

  const renderLevel = (text: 'high' | 'middle' | 'low') => {
    return (
      <span key={text}>
        <Tag color={colorMap[text]}>{text}</Tag>
      </span>
    );
  };
  return (
    <div className={styles.WorkTable}>
      <div className={styles.workerContainor}>
        <div>
          <div className={styles.userlist}>
            <Avatar size={40} src={person?.avatar} className={styles.avatar} />
            <div className={styles.user}>
              <Typography.Text className={styles.TitleName}>
                {person?.surname}
                {person?.name}
              </Typography.Text>
              <Typography.Text className={styles.TitleInfo}>
                {person?.email}
              </Typography.Text>
            </div>
          </div>
          <Tabs activeKey={tab} className={styles.tab} onChange={changeTab}>
            <Tabs.TabPane tab="选项卡一" key="1" />
            <Tabs.TabPane tab="选项卡二" key="2" />
            <Tabs.TabPane tab="选项卡三" key="3" />
          </Tabs>
        </div>
      </div>
      <div className={styles.workTableContent}>
        <Row gutter={20}>
          <Col span={16}>
            <Card style={{ height: '100%' }} title="我的任务">
              <Table
                dataSource={orderList}
                pagination={false}
                rowSelection={{
                  type: 'checkbox',
                  getCheckboxProps: (record: OrderItem): any => ({
                    name: record.name,
                  }),
                }}
              >
                <Table.Column title="任务名称" dataIndex="name" width={330} />
                <Table.Column title="所属阶段" dataIndex="state" width={230} />
                <Table.Column
                  title="优先级"
                  dataIndex="level"
                  render={renderLevel}
                  width={150}
                />
              </Table>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="我的日程">
              <div>
                <Calendar fullscreen={false} />
                <Typography.Text className={styles.planNumber}>
                  共{' '}
                  <span className={styles.strong}>{timeLineList?.length}</span>
                  个日程
                </Typography.Text>
                <Timeline
                  mode="left"
                  style={{ marginLeft: '-250px', marginTop: '20px' }}
                >
                  {timeLineList?.map(
                    (item): JSX.Element => (
                      <TimelineItem
                        key={item.planTime}
                        label={
                          <>
                            <span style={{ color: '#999', fontSize: '12px' }}>
                              {item.planTime}
                            </span>
                            <br />
                            <span style={{ color: '#999', fontSize: '12px' }}>
                              {item.planDuaring}
                            </span>
                          </>
                        }
                      >
                        <div style={{ fontSize: '12px', color: '#333' }}>
                          {item.planName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {item.planAddress}
                        </div>
                      </TimelineItem>
                    ),
                  )}
                </Timeline>
              </div>
            </Card>
          </Col>
          <Col span={16}>
            <Card title="近期项目">
              <List>
                {projectList?.map((project) => {
                  return (
                    <List.Item key={project.projectName}>
                      <List.Item.Meta
                        avatar={<Avatar src={project.img} />}
                        title={project.projectName}
                        description={project.projectDesc}
                      />
                    </List.Item>
                  );
                })}
                <List.Item>查看全部任务</List.Item>
              </List>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: '100%' }} title="我的项目">
              <List>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.alicdn.com/tfs/TB1SFZAvQL0gK0jSZFAXXcA9pXa-200-200.png" />
                    }
                    title="Fusion Design"
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.alicdn.com/tfs/TB1QwMzvHr1gK0jSZR0XXbP8XXa-200-200.png" />
                    }
                    title="Alibaba ICS"
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.alicdn.com/tfs/TB1qxgDvG61gK0jSZFlXXXDKFXa-200-200.png" />
                    }
                    title="Retcode 前端监控"
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.alicdn.com/tfs/TB1TfwDvQT2gK0jSZFkXXcIQFXa-200-200.png" />
                    }
                    title="新零售事业部"
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.alicdn.com/tfs/TB1GgMzvHr1gK0jSZR0XXbP8XXa-200-200.png" />
                    }
                    title="前端物料中心"
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.alicdn.com/tfs/TB1tHozvQP2gK0jSZPxXXacQpXa-200-200.png" />
                    }
                    title="大财鲸"
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.alicdn.com/tfs/TB1QwMzvHr1gK0jSZR0XXbP8XXa-200-200.png" />
                    }
                    title="Alibaba ICS"
                  />
                </List.Item>
              </List>
            </Card>
          </Col>
          <Col span={16}>
            <Card title="动态">
              <List>
                {updateList?.map((one) => {
                  let title;
                  switch (one.action) {
                    case 'create':
                      title = (
                        <div key={one.key}>
                          {one.name} 在 <a href="/">{one.project}</a> 新建项目{' '}
                          <a href="/">{one.projectItem}</a>{' '}
                        </div>
                      );
                      break;
                    case 'release':
                      title = (
                        <div key={one.key}>
                          {one.name} 将 <a href="/">{one.project}</a>{' '}
                          更新至发布状态{' '}
                        </div>
                      );
                      break;
                    case 'note':
                      title = (
                        <div key={one.key}>
                          {one.name} 在 <a href="/">{one.project}</a> 发布了{' '}
                          <a href="/">{one.projectItem}</a>{' '}
                        </div>
                      );
                      break;
                    default:
                      break;
                  }

                  return (
                    <List.Item key={one.key}>
                      <List.Item.Meta
                        avatar={<Avatar src={one.avatar} />}
                        title={title}
                        description={one.time}
                      />
                    </List.Item>
                  );
                })}
              </List>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="快捷入口"
              extra={
                <Button type="link" size="large" href="#/">
                  设置
                </Button>
              }
            >
              <div>
                {entranceList?.map((item) => {
                  return (
                    <Button key={item.key} size="large" href={item.link} type="text">
                      {item.name}
                    </Button>
                  );
                })}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WorkTable;
