import React, { useRef, useCallback } from 'react';

import Operation, { ActionType, OperaitionProps, OperationRef } from './Operation';
import { Modal } from 'antd';

const getDialogTitle = (actionType: ActionType): string => {
  switch (actionType) {
    case 'add':
    default:
      return '添加员工';

    case 'edit':
      return '编辑员工';

    case 'preview':
      return '预览员工';
  }
};
export interface VisibleProps {
  visible: boolean;
  onClose: () => void;
  onCancel: () => void;
}
const DialogOperation: React.FC<OperaitionProps & VisibleProps> = (props) => {
  const { actionType, dataSource, onOk = () => {}, ...lastProps } = props;
  const operationRef = useRef<OperationRef>(null);

  const handleOk = useCallback(() => {
    if (actionType === 'preview') {
      // @ts-ignore
      return onOk(null);
    }
    console.log(operationRef.current);

    operationRef.current?.getValues((values) => {
      console.log(values);
      // @ts-ignore
      onOk(values);
    });
  }, [actionType, onOk]);

  return (
    <Modal title={getDialogTitle(actionType)} style={{ width: 600 }} {...lastProps} onOk={handleOk}>
      <Operation ref={operationRef} actionType={actionType} dataSource={dataSource} />
    </Modal>
  );
};

export default DialogOperation;
