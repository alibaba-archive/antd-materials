import React, { useEffect, useImperativeHandle } from 'react';
import { Select, Form, Input } from 'antd';
import { useForm } from '_antd@4.12.3@antd/lib/form/Form';

const FormItem = Form.Item;

export type ActionType = 'add' | 'edit' | 'preview';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export interface OperaitionProps {
  /**
   * 操作类型, 以此来标识是添加、编辑、还是查看
   */
  actionType: ActionType;

  /**
   * 数据源
   */
  dataSource: any;
  onOk?: () => void;
}

export interface OperationRef {
  getValues: (callback: (vals: Record<string, unknown>) => void) => void;
}

const Operation: React.ForwardRefRenderFunction<OperationRef, OperaitionProps> = (props, ref) => {
  const { actionType } = props;

  const dataSource = props.dataSource || {};
  const [form] = useForm();
  useEffect(() => {
    form.resetFields();
    if (dataSource) {
      const newValues = {
        nat: dataSource.nat,
        email: dataSource.email,
        phone: dataSource.phone,
        gender: dataSource.gender,
      };

      form.setFieldsValue(newValues);
    }
  }, [form, dataSource]);
  useImperativeHandle<OperationRef, OperationRef>(ref, () => {
    return {
      async getValues(callback: (vals: Record<string, unknown>) => void) {
        await form
          .validateFields()
          .then((res) => {
            callback(res);
          })
          .catch((res) => {
            const { errorFields } = res;
            console.log('error', errorFields);
          });
      },
    };
  });

  const isPreview = actionType === 'preview';

  return (
    <>
      <Form labelAlign={isPreview ? 'left' : 'right'} form={form} {...formItemLayout}>
        <FormItem
          label="nat:"
          required={!isPreview}
          name="nat"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          {isPreview ? <span>{dataSource.nat}</span> : <Input />}
        </FormItem>
        <FormItem
          label="邮箱:"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: '请输入正确的邮箱',
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            },
          ]}
          required={!isPreview}
          name="email"
        >
          {isPreview ? <span>{dataSource.email}</span> : <Input />}
        </FormItem>
        <FormItem
          label="手机号:"
          required={!isPreview}
          name="phone"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: '请输入正确的手机号',
              pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            },
          ]}
        >
          {isPreview ? <span>{dataSource.phone}</span> : <Input />}
        </FormItem>
        <FormItem
          label="性别:"
          required={!isPreview}
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          name="gender"
        >
          <Select
            disabled={isPreview}
            options={[
              { value: 'male', label: '男' },
              { value: 'female', label: '女' },
            ]}
          />
        </FormItem>
      </Form>
    </>
  );
};

export default React.forwardRef(Operation);
