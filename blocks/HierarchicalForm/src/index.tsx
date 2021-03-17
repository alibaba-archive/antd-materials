import React, { FC } from 'react';
import { Card, Form, Input, Radio, Select, Button, Row, Col } from 'antd';
import styles from './index.module.less';

export interface DataSource {
  name?: string;
  categoryId?: number;
  authType?: number;
  authScope?: number;
  authMembers?: number[];
  authId?: string;
  authCode?: string;
  description?: string;
}

export interface HierarchicalFormProps {
  dataSource?: DataSource;
  onSubmit?: (data: DataSource) => void;
  onCancel?: () => void;
}

const HierarchicalForm: FC<HierarchicalFormProps> = (props) => {
  const [form] = Form.useForm();
  const {
    dataSource = {
      authType: 1
    },
    onSubmit = () => {},
    onCancel = () => {}
  } = props;

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 }
  };
  return (
    <Card className={styles.Card}>
      <Form
        form={form}
        className={styles.HierarchicalForm}
        initialValues={dataSource}
        onFinish={(value) => onSubmit(value)}
        onFinishFailed={({ errorFields }) => console.log(errorFields)}
      >
        <Form.Item
          label="项目名称"
          {...formLayout}
          name="name"
          rules={[
            {
              required: true,
              message: '请输入项目名称'
            }
          ]}
        >
          <Input placeholder="给项目起个名字" />
        </Form.Item>
        <Form.Item
          label="项目所属分类"
          {...formLayout}
          rules={[
            {
              required: true,
              message: '请选择项目所属分类'
            }
          ]}
          name="categoryId"
        >
          <Select placeholder="请选择项目所属分类">
            <Select.Option value={1}>项目类型一</Select.Option>
            <Select.Option value={2}>项目类型二</Select.Option>
            <Select.Option value={3}>项目类型三</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="项目权限"
          {...formLayout}
          name="authType"
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.authType !== currentValues.authType
          }
        >
          <Radio.Group>
            <Radio value={1}>私密项目</Radio>
            <Radio value={2}>内部项目</Radio>
            <Radio value={3}>开放项目</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.authType !== currentValues.authType
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('authType') === 1 ||
            getFieldValue('authType') === 2 ? (
                <Row>
                  <Col span={15} push={6}>
                    <Form.Item label="权限范围" name="authScope" {...formLayout}>
                      <Select placeholder="请选择权限范围">
                        <Select.Option value={1}>公司内部</Select.Option>
                        <Select.Option value={2}>团队内部</Select.Option>
                        <Select.Option value={3}>个人</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={15} push={6}>
                    <Form.Item
                      label="权限成员"
                      name="authMembers"
                      {...formLayout}
                    >
                      <Select
                        maxTagCount={2}
                        maxTagPlaceholder={(values: []) =>
                          `+${values.length - 2}`
                        }
                        placeholder="请选择权限成员"
                      >
                        <Select.Option value={1}>张三</Select.Option>
                        <Select.Option value={2}>李四</Select.Option>
                        <Select.Option value={3}>王五</Select.Option>
                        <Select.Option value={4}>阮小二</Select.Option>
                        <Select.Option value={5}>阮小五</Select.Option>
                        <Select.Option value={6}>阮小七</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ) : null
          }
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.authType !== currentValues.authType
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('authType') === 1 ? (
              <Row>
                <Col span={15} push={6}>
                  <Form.Item label="私密ID" {...formLayout} name="authId">
                    <Input placeholder="输入私密 ID" />
                  </Form.Item>
                </Col>
                <Col span={15} push={6}>
                  <Form.Item label="项目通行码" {...formLayout} name="authCode">
                    <Input name="authCode" placeholder="请输入项目通行码" />
                  </Form.Item>
                </Col>
              </Row>
            ) : null
          }
        </Form.Item>
        <Form.Item label="项目描述" {...formLayout} name="description">
          <Input.TextArea
            name="description"
            placeholder="请输入项目详细信息"
            rows={4}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 20, offset: 6 }}>
          <div>
            <Button
              htmlType="submit"
              className={styles.Button}
              style={{ marginRight: '10px' }}
              type="primary"
            >
              提交
            </Button>
            <Button className={styles.Button} onClick={onCancel}>
              退回
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default HierarchicalForm;
