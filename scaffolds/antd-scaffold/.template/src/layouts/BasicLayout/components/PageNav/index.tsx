import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'ice';
import { Menu } from 'antd';
import { asideMenuConfig } from '../../menuConfig';
import { DatabaseOutlined, FormOutlined,UnorderedListOutlined, CalendarOutlined, WarningOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;
const MenuItem = Menu.Item;
// mock the auth object
// Ref: https://ice.work/docs/guide/advance/auth#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%9D%83%E9%99%90%E6%95%B0%E6%8D%AE
const AUTH_CONFIG = {
  admin: true,
  guest: false,
};

export interface IMenuItem {
  name: string;
  path: string;
  icon?: any;
  children?: IMenuItem[];
}
function getNavMenuItems(menusData: any[], initIndex?: number | string, auth?: any) {
  if (!menusData) {
    return [];
  }

  return menusData
    .filter((item) => {
      let roleAuth = true;
      // if item.roles is [] or undefined, roleAuth is true
      if (auth && item.auth && item.auth instanceof Array) {
        if (item.auth.length) {
          roleAuth = item.auth.some((key) => auth[key]);
        }
      }
      return item.name && !item.hideInMenu && roleAuth;
    })
    .map((item, index) => {
      return getSubMenuOrItem(item, `${initIndex}-${index}`, auth);
    });
}

function getSubMenuOrItem(item: IMenuItem, index?: number | string, auth?: any) {
  if (item.children && item.children.some((child) => child.name)) {
    const childrenItems = getNavMenuItems(item.children, index, auth);
    if (childrenItems && childrenItems.length > 0) {
      const subMenu = (
        <SubMenu
          key={item.name}
          title={item.name}
          // icon={<item.icon />}
        >
          {childrenItems}
        </SubMenu>
      );

      return subMenu;
    }
    return null;
  }
  const menuItem = (
    <MenuItem key={item.path} icon={item.icon}>
      <Link to={item.path}>
        {item.name}
      </Link>
    </MenuItem>
  );

  return menuItem;
}

const Navigation = (props, context) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { location } = props;
  const { pathname } = location;
  const { isCollapse } = context;
  

  useEffect(() => {
    const curSubNav = asideMenuConfig.find((menuConfig) => {
      return menuConfig.children && checkChildPathExists(menuConfig);
    });

    function checkChildPathExists(menuConfig) {
      return menuConfig.children.some((child) => {
        return child.children ? checkChildPathExists(child) : child.path === pathname;
      });
    }

    if (curSubNav && !openKeys.includes(curSubNav.name)) {
      setOpenKeys([...openKeys, curSubNav.name]);
    }
  }, [pathname]);

  
  return (
    <Menu
      openKeys={openKeys}
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      mode={isCollapse ? 'vertical' : 'inline'}
      onOpenChange={(keys) => {
        // @ts-ignore
        setOpenKeys(keys);
      }}
    >
      {getNavMenuItems(asideMenuConfig, 0, AUTH_CONFIG)}
    </Menu>
  );
};

Navigation.contextTypes = {
  isCollapse: PropTypes.bool,
};

const PageNav = withRouter(Navigation);

export default PageNav;
