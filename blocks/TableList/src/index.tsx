import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Pagination,
  Divider,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select
} from "antd";
import { SearchOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";

import styles from "./index.module.less";

const { Option } = Select;
const FormItem = Form.Item;

export interface IDataSource {
  tableData: Array<Record<string, unknown>>;
  tableColumn: any;
}
const mockTableData: Array<Record<string, unknown>> = [];
for (let i = 0; i <= 10; i += 1) {
  mockTableData.push({
    name: `品牌营销服务设计 ${String.fromCharCode(97 + i).toUpperCase()}`,
    type: Math.random() > 0.5 ? "24小时页面" : "Banner 广告A",
    demand: ["曾庆超", "阮小五", "公孙胜"][i % 3],
    interface: ["阮小二", "谢莉莉", "樊瑞"][i % 3],
    supplier: "博彦-李强",
    designer: ["李立", "曹正", "姚越洋"][i % 3],
    key: i
  });
}

const DEFAULT_DATA: IDataSource = {
  tableData: mockTableData,
  tableColumn: {
    name: "需求名称",
    type: "类型数量",
    demand: "需求方",
    interface: "接口人",
    supplier: "供应商接口人",
    designer: "设计师"
  }
};

interface ITableListProps {
  dataSource?: IDataSource;
}

const TableList: React.FunctionComponent<ITableListProps> = (
  props: ITableListProps
): JSX.Element => {
  const { dataSource = DEFAULT_DATA } = props;

  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const onOperation = () => {
    setLoading(true);
  };

  const onPaginationChange = () => {
    setLoading(true);
  };

  const toggleSeachList = () => {
    setExpand(!expand);
  };
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  return (
    <>
      <Card>
        <div>
          <Form labelAlign="right">
            <Row>
              <Col span={6}>
                <FormItem label="需求名称/编号" {...formLayout}>
                  <Input
                    placeholder="输入需求名称/编号进行搜索"
                    suffix={<SearchOutlined className={styles.searchIcon} />}
                  />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="需求方" {...formLayout}>
                  <Input placeholder="输入需求方进行搜索" />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="标签" {...formLayout}>
                  <Select placeholder="选择标签">
                    <Option value="small">标签A</Option>
                    <Option value="medium">标签B</Option>
                  </Select>
                </FormItem>
              </Col>
              {expand && (
                <>
                  <Col span={6}>
                    <FormItem label="需求名称/编号" {...formLayout}>
                      <Input
                        placeholder="输入需求名称/编号进行搜索"
                        suffix={
                          <SearchOutlined className={styles.searchIcon} />
                        }
                      />
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem label="需求方" {...formLayout}>
                      <Input placeholder="输入需求方进行搜索" />
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem label="标签" {...formLayout}>
                      <Select placeholder="选择标签">
                        <Option value="small">标签A</Option>
                        <Option value="medium">标签B</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem label="标签" {...formLayout}>
                      <Select placeholder="选择标签">
                        <Option value="small">标签A</Option>
                        <Option value="medium">标签B</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </>
              )}
              <Col span={6}>
                <div className={styles.btns}>
                  <Button type="primary" onClick={onOperation}>
                    查询
                  </Button>
                  <Button htmlType="reset">重置</Button>
                  <Button onClick={toggleSeachList}>
                    {expand ? (
                      <>
                        收起
                        <UpOutlined className={styles.icon} />
                      </>
                    ) : (
                      <>
                        展开 <DownOutlined className={styles.icon} />
                      </>
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <Divider dashed />
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary">新增</Button>
            <Button>下载</Button>
            <Button>
              更多操作
              <DownOutlined className={styles.icon} />
            </Button>
          </div>
          <Table
            className={styles.Table}
            dataSource={dataSource.tableData}
            loading={loading}
            pagination={false}
            rowSelection={{ fixed: true }}
          >
            {Object.keys(dataSource.tableColumn).map((col) => (
              <Table.Column
                title={dataSource.tableColumn[col]}
                dataIndex={col}
                key={col}
              />
            ))}
            <Table.Column
              title="操作"
              render={() => (
                <div className={styles.opt}>
                  <Button type="link" size="small">
                    编辑
                  </Button>
                  <Divider type="vertical" />
                  <Button type="link" size="small">
                    订阅
                  </Button>
                  <Divider type="vertical" />
                  <Button type="link" size="small">
                    删除
                  </Button>
                </div>
              )}
            />
          </Table>
          <div className={styles.footerPagination}>
            <div className={styles.total}>
              共<span>200</span>条需求
            </div>
            <Pagination
              showQuickJumper
              total={200}
              onChange={onPaginationChange}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default TableList;
