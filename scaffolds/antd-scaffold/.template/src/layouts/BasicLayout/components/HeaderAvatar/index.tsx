import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, EditOutlined, ImportOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const { Item } = Menu;

export interface Props {
  name: string;
  avatar: string;
  mail: string;
}

const UserProfile = ({ name, avatar, mail }: Props) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar src={avatar} alt="用户头像" />
      </div>
      <div className={styles.content}>
        <h4>{name}</h4>
        <span>{mail}</span>
      </div>
    </div>
  );
};

const HeaderAvatar = (props: Props) => {
  const { name, avatar } = props;
  const menu = (
    <div className={styles.avatarPopup}>
      <UserProfile {...props} />
      <Menu className={styles.menu}>
        <Item>
          <UserOutlined />
          个人设置
        </Item>
        <Item>
          <EditOutlined />
          系统设置
        </Item>
        <Item>
          {' '}
          <ImportOutlined />
          退出
        </Item>
      </Menu>
    </div>
  );
  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <div className={styles.headerAvatar}>
        <Avatar size="small" src={avatar} alt="用户头像" />
        <span style={{ marginLeft: 10 }}>{name}</span>
      </div>
    </Dropdown>
  );
};

HeaderAvatar.defaultProps = {
  name: 'MyName',
  mail: 'name@gmail.com',
  avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
};

export default HeaderAvatar;
