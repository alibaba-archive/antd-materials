import React, { useState } from "react";
import { Badge, Dropdown, Avatar, message, List } from "antd";
import { MessageFilled, CloseCircleFilled } from "@ant-design/icons";
import styles from "./index.module.less";

export interface INotcieItem {
  id: number;
  name: string;
  message: string;
  avatar: string;
}

const defaultNoticeList: INotcieItem[] = [
  {
    id: 1,
    name: "Aric",
    avatar:
      "https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png",
    message: "新标识怎么去掉？",
  },
  {
    id: 2,
    name: "Mark",
    avatar:
      "https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png",
    message: "如何查看新增页面？",
  },
];
export interface NoticeProps {
  noticeList?: INotcieItem[];
}

const Notice: React.FC<NoticeProps> = ({ noticeList }) => {
  const [badgeCount, setBageCount] = useState(2);
  const [readList, setReadList] = useState<number[]>([]);

  function markAsRead(id: number) {
    setReadList([...readList, id]);
    setBageCount(badgeCount - 1);
  }

  function clearNotice() {
    const noticeIds = (noticeList as INotcieItem[]).map((item) => item.id);
    setBageCount(0);
    setReadList(noticeIds);
  }

  function viewMore() {
    message.success("点击了查看更多操作");
  }

  const renderList = (noticeList as INotcieItem[]).filter(
    (item) => readList.indexOf(item.id) === -1
  );
  const menu = (
    <List
      size="small"
      split={false}
      className={styles.noticeContainer}
      header={
        <div className={styles.title}>
          <h4>通知</h4>
          <span className={styles.clear} onClick={clearNotice}>
            清空通知
          </span>
        </div>
      }
      footer={
        <div className={styles.footer}>
          <a onClick={viewMore}>查看更多</a>
        </div>
      }
    >
      {renderList.map((noticeItem: INotcieItem) => {
        const { id, name, avatar, message } = noticeItem;
        return (
          <List.Item
            className={styles.noticeItem}
            key={id}
            extra={
              <span className={styles.close} onClick={() => markAsRead(id)}>
                <CloseCircleFilled />
              </span>
            }
          >
            <List.Item.Meta
              avatar={<Avatar size={32} src={avatar} alt="avatar" />}
              title={<div><div style={{fontSize:'14px'}}>{name}</div><div style={{fontSize:'12px'}}>{message}</div></div>}
            />
          </List.Item>
        );
      })}
      {renderList.length === 0 && (
        <List.Item className={styles.empty}>你已查看所有通知</List.Item>
      )}
    </List>
  );
  return (
    <Dropdown trigger={["click"]} overlay={menu}>
      <div className={styles.noticeIcon}>
        <Badge count={badgeCount}>
          <MessageFilled style={{fontSize:'20px',color:"#fff"}}/>
        </Badge>
      </div>
    </Dropdown>
  );
};

Notice.defaultProps = {
  noticeList: defaultNoticeList,
};
export default Notice;
