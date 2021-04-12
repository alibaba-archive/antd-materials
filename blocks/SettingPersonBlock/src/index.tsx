import React, { useState } from 'react';
import {
  Divider,
  Card,
  Avatar,
  Upload,
  Button,
  Form,
  Input,
  message,
  UploadProps,
  Row,
  Col,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const FormItem = Form.Item;

export interface DataSource {
  name?: string;
  phone?: string;
  vcode?: string;
  pic?: UploadProps[];
}

export interface SettingPersonProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  name: '阿里-Amy',
};

const DEFAULT_ON_SUBMIT = (
  values: SettingPersonProps,
  errors?: object[],
): void => {
  if (errors) {
    console.log('errors', errors);
    return;
  }
  console.log('values:', values);
  message.success('更新成功');
};

const SettingPersonBlock: React.FC<SettingPersonProps> = (
  props: SettingPersonProps,
): JSX.Element => {
  const { dataSource = DEFAULT_DATA, onSubmit = DEFAULT_ON_SUBMIT } = props;

  const [postData, setValue] = useState<DataSource>(dataSource);
  const [buttonText, setButtonText] = useState('发送验证码');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const formChange = (values: DataSource): void => {
    setValue(values);
  };

  let coutDownTimer: NodeJS.Timeout;
  let countDown = 60;

  // 获取验证码按钮点击示例
  const onValideCodeButtonClicked = (): void => {
    setButtonDisabled(true);
    countDown = 60;
    setButtonText(`${countDown}s`);

    coutDownTimer = setInterval(() => {
      if (--countDown <= 0) {
        if (coutDownTimer) clearInterval(coutDownTimer);
        setButtonText('获取验证码');
        setButtonDisabled(false);
        return;
      }

      setButtonText(`${countDown}s`);
    }, 1000);
  };
  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <Card className={styles.SettingPersonBlock}>
      <Form
        initialValues={postData}
        labelAlign="right"
        onValuesChange={formChange}
        onFinish={(value) => onSubmit(value)}
        onFinishFailed={(value) => onSubmit(value.values, value.errorFields)}
      >
        <Row>
          <Col span={24}>
            <FormItem label="" {...formLayout}>
              <Row gutter={10}>
                <Col span={4}>
                  <Avatar shape="circle" size={64} icon={<UserOutlined />} />
                </Col>
                <Col span={20} className={styles.changeLogo}>
                  <div>
                    <FormItem name="pic">
                      <Upload>
                        <Button className={styles.uploadButton}>
                          更新头像
                        </Button>
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
            <FormItem>
              <Divider />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="昵称"
              {...formLayout}
              name="name"
              required
              rules={[
                {
                  required: true,
                  message: '必填',
                },
              ]}
            >
              <Input placeholder="请输入昵称" />
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem label="手机：" {...formLayout} name="phone">
              <Row gutter={10}>
                <Col span={16}>
                  <Input
                    className={styles.validateCodeInput}
                    placeholder="请输入手机"
                  />
                </Col>
                <Col span={8}>
                  <Button
                    className={styles.valideCodeButton}
                    disabled={buttonDisabled}
                    onClick={onValideCodeButtonClicked}
                  >
                    {buttonText}
                  </Button>
                </Col>
              </Row>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem label="验证码" {...formLayout} name="vcode">
              <Input placeholder="请输入验证码" />
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem wrapperCol={{ offset: 4 }}>
              <div>
                <Button type="primary" htmlType="submit">
                  更新信息
                </Button>
              </div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SettingPersonBlock;
