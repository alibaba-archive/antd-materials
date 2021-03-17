import React, { useState } from 'react';
// import { Shell, ConfigProvider } from '@alifd/next';
import { Layout, Tooltip } from 'antd';
import PageNav from './components/PageNav';
import GlobalSearch from './components/GlobalSearch';
import Notice from './components/Notice';
import SolutionLink from './components/SolutionLink';
import HeaderAvatar from './components/HeaderAvatar';
import Logo from './components/Logo';
import Bottom from './components/Footer';

const { Header, Content, Footer, Sider } = Layout;
(function () {
  const throttle = function (type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}
export default function BasicLayout({ children }: { children: React.ReactNode }) {
  const getDevice: IGetDevice = (width) => {
    const isPhone = typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [device, setDevice] = useState(getDevice(NaN));

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth = (e && e.target && (e.target as Window).innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
        <Logo image="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png" text="Logo" />
        </div>
        <div style={{display:'flex',height:'100%',alignItems:"center"}}>
        <GlobalSearch />
        <Notice />
        <SolutionLink />
        <HeaderAvatar />
        </div>
      </Header>
      <Layout>
        <Sider collapsible style={{ background: '#fff' }}>
          <PageNav />
        </Sider>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Content></Content>
          <Footer>
            <Bottom />
          </Footer>
        </div>
      </Layout>
    </Layout>
  );
}
