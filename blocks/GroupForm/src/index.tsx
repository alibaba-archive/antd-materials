import React, { FC, useState, useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  // Box,
  Divider,
  MenuButton,
  // Dialog,
  // Field,
  Row,
  Col,
} from "antd";
import styles from "./index.module.less";

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
      key: "1",
      name: "蚂蚁证券投资有限公司 A",
      business: "金融证券代理",
      address: "1569 Cronin Ways Apt. 082",
      creatorName: "欧鹏",
    },
    {
      key: "2",
      name: "蚂蚁证券投资有限公司 B",
      business: "金融证券代理",
      address: "4016 Kautzer Route Suite 366",
      creatorName: "阮小五",
    },
    {
      key: "3",
      name: "蚂蚁证券投资有限公司 C",
      business: "金融证券代理",
      address: "22 Haag Manor",
      creatorName: "阮小二",
    },
    {
      key: "4",
      name: "蚂蚁证券投资有限公司 D",
      business: "金融证券代理",
      address: "1014 McLaughlin Unions",
      creatorName: "阮小七",
    },
    {
      key: "5",
      name: "蚂蚁证券投资有限公司 E",
      business: "金融证券代理",
      address: "8748 Devante Center",
      creatorName: "公孙胜",
    },
    {
      key: "6",
      name: "蚂蚁证券投资有限公司 F",
      business: "金融证券代理",
      address: "1014 McLaughlin Unions",
      creatorName: "曹正",
    },
    {
      key: "7",
      name: "蚂蚁证券投资有限公司 G",
      business: "金融证券代理",
      address: "8748 Devante Center",
      creatorName: "李立",
    },
    {
      key: "8",
      name: "蚂蚁证券投资有限公司 H",
      business: "金融证券代理",
      address: "1569 Cronin Ways Apt. 082",
      creatorName: "樊瑞",
    },
  ],
};

const GroupForm: FC<GroupFormProps> = (props) => {
  const {
    dataSource: defaultDataSource = DEFAULT_DATA,
    onSubmit = () => {},
    onCancel = () => {},
  } = props;

  const [dataSource, setDataSouce] = useState<DataSource>(defaultDataSource);
  // const basicField = Field.useField({ values: dataSource.basic });
  // const memberField = Field.useField({ values: dataSource.member });

  const containerRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  // useEffect(() => {
  //   // eslint-disable-next-line react/no-find-dom-node
  //   const dom = findDOMNode(containerRef.current) as HTMLDivElement;
  //   const rect = (dom && dom.getBoundingClientRect()) || null;
  //   setLeft(rect.left);
  //   setRight(document.documentElement.offsetWidth - rect.left - rect.width);
  // }, []);

  const changeRowData = (
    index: number,
    key: keyof Company,
    value: string | number | boolean | []
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
    Dialog.confirm({
      content: `确定要删除公司：${company[index].name} ?`,
      onOk: () => {
        company.splice(index, 1);
        setDataSouce({
          ...dataSource,
          company,
        });
      },
    });
  };

  const addRow = () => {
    setDataSouce({
      ...dataSource,
      company: [...dataSource.company, { edited: true }],
    });
  };

  const submit = () => {
    onSubmit({
      basic: basicField.getValues(),
      member: memberField.getValues(),
      company: dataSource.company,
    });
  };

  const renderEditCell = (
    v: string,
    i: number,
    row: { edited: boolean },
    key: keyof Company
  ) => {
    if (row.edited) {
      return (
        <Input
          style={{ width: "100%" }}
          onChange={(value) => changeRowData(i, key, value)}
          value={v || ""}
        />
      );
    }
    return v;
  };

  const formLayout = {
    labelCol:{span:6},
    wrapperCol:{span:30}
  }
  return (
    <div className={styles.GroupForm}>
      <Card
        // ref={containerRef}
        className={styles.Card}
        title="项目成员信息"
      >
        <Form 
        // field={basicField} 
         labelAlign="right">
           <Row>
             <Col span={8}>

          <Form.Item label="公司简称" required {...formLayout}>
            <Input name="companyName" placeholder="请输入公司简称" />
          </Form.Item>
             </Col>
             <Col span={8}>
               
          <Form.Item label="项目代号" required {...formLayout}>
            <Input name="projectNo" placeholder="请输入项目代号" />
          </Form.Item>
               </Col>
               <Col span={8}>
               
          <Form.Item label="投资委员会" required {...formLayout}>
            <Input name="investmentsCommittee" placeholder="请输入投资委员会" />
          </Form.Item>
               </Col>
               <Col span={8}>
               
          <Form.Item label="项目类型" required {...formLayout}>
            <Input name="projectType" placeholder="请输入项目类型" />
          </Form.Item>
               </Col>
               <Col span={8}>
               
          <Form.Item label="关联项目" required {...formLayout}>
            <Select
              name="projectId"
              id="relativeId"
              placeholder="请选择关联项目"
            >
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
        // field={memberField} 
         labelAlign="right">
           <Row>
             <Col span={8}>

          <Form.Item label="合同类型" required {...formLayout}>
            <Select name="contractType" placeholder="请选择合同类型">
              <Select.Option value={1}>合同一</Select.Option>
              <Select.Option value={2}>合同二</Select.Option>
              <Select.Option value={3}>合同三</Select.Option>
            </Select>
          </Form.Item>
             </Col>
             <Col span={8}>
               
          <Form.Item label="IC成员" required {...formLayout}>
            <Select name="icMemberId" placeholder="请选择IC成员">
              <Select.Option value={1}>成员一</Select.Option>
              <Select.Option value={2}>成员二</Select.Option>
              <Select.Option value={3}>成员三</Select.Option>
            </Select>
          </Form.Item>
             </Col>
             <Col span={8}>
               
          <Form.Item label="法务评审会" required {...formLayout}>
            <Select name="forensicId" placeholder="请选择法务评审">
              <Select.Option value={1}>法务一</Select.Option>
              <Select.Option value={2}>法务二</Select.Option>
              <Select.Option value={3}>法务三</Select.Option>
            </Select>
          </Form.Item>
             </Col>
             <Col span={8}>
               
          <Form.Item label="财务评审" required {...formLayout}>
            <Select name="financeId" placeholder="请选择财务评审">
              <Select.Option value={1}>财务一</Select.Option>
              <Select.Option value={2}>财务二</Select.Option>
              <Select.Option value={3}>财务三</Select.Option>
            </Select>
          </Form.Item>
             </Col>
             <Col span={8}>
               
          <Form.Item label="项目评审" required {...formLayout}>
            <Select name="projectId" placeholder="请选择项目评审">
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
        <div 
        // direction="row" margin={[0, 0, 16, 0]}
        >
          <Button onClick={addRow} className={styles.Button} type="primary">
            {" "}
            新增
          </Button>
        </div>
        <Table
          dataSource={dataSource.company}
          className={styles.Table}
        >
          <Table.Column
            title="目标公司"
            // cell={(v: string, i: number, row: { edited: boolean }) =>
            //   renderEditCell(v, i, row, "name")
            // }
            dataIndex="name"
          />
          <Table.Column
            title="主营业务"
            // cell={(v: string, i: number, row: { edited: boolean }) =>
            //   renderEditCell(v, i, row, "business")
            // }
            dataIndex="business"
          />
          <Table.Column
            title="注册地"
            // cell={(v: string, i: number, row: { edited: boolean }) =>
            //   renderEditCell(v, i, row, "address")
            // }
            dataIndex="address"
          />
          <Table.Column
            title="创始人"
            // cell={(v: string, i: number, row: { edited: boolean }) =>
            //   renderEditCell(v, i, row, "creatorName")
            // }
            dataIndex="creatorName"
          />
          <Table.Column
            title="操作"
            // cell={(v: string, i: number, row: { edited: boolean }) => {
            //   if (row.edited) {
            //     return (
            //       <div>
            //         <Button
            //           // text
            //           type="primary"
            //           onClick={() => changeRowData(i, "edited", false)}
            //         >
            //           保存
            //         </Button>
            //         <Divider type="vertical" />
            //         <Button 
            //         // text 
            //         type="primary" onClick={() => deleteRow(i)}>
            //           删除
            //         </Button>
            //       </div>
            //     );
            //   }

            //   return (
            //     <div>
            //       <Button
            //         type="primary"
            //         onClick={() => changeRowData(i, "edited", true)}
            //         // text
            //       >
            //         编辑
            //       </Button>
            //       <Divider type="vertical" />
            //       <Button type="primary" 
            //       // text 
            //       onClick={() => deleteRow(i)}>
            //         删除
            //       </Button>
            //       <Divider type="vertical" />
            //       <MenuButton
            //         type="primary"
            //         popupTriggerType="hover"
            //         label="更多"
            //         text
            //       >
            //         <MenuButton.Item>操作一</MenuButton.Item>
            //         <MenuButton.Item>操作二</MenuButton.Item>
            //         <MenuButton.Item>操作三</MenuButton.Item>
            //       </MenuButton>
            //     </div>
            //   );
            // }}
          />
        </Table>
      </Card>
      <div
        // spacing={16}
        style={{ left, right }}
        className={styles.fixedButtons}
      >
        <Button className={styles.Button} onClick={submit} type="primary">
          提交
        </Button>
        <Button className={styles.Button} onClick={onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
};

export default GroupForm;
