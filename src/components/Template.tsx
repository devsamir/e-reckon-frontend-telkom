import React, { useState, useMemo } from 'react';
import {
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, MenuProps, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const generateItem = (navigate: any) => {
  return [
    {
      label: 'Dashboard',
      key: '1',
      icon: <PieChartOutlined />,
      onClick: () => {
        navigate('/admin/dashboard');
      },
    },
    {
      label: 'User',
      key: '2',
      icon: <UserOutlined />,
      onClick: () => {
        navigate('/admin/user');
      },
    },
  ] as MenuItem[];
};

interface Props {
  children: any;
}

const Template: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const menu = useMemo(
    () => (
      <Menu
        items={[
          {
            key: '1',
            label: 'Logout',
            icon: <LogoutOutlined />,
          },
        ]}
      />
    ),
    []
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="m-2 flex items-center justify-center">
          <Image src={require('../assets/telkom_logo.png')} width={54} />
          {!collapsed && (
            <div className="text-sm text-center text-gray-800 leading-[3rem] uppercase font-bold">
              E-Reckon
            </div>
          )}
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          selectedKeys={selectedKeys}
          onSelect={(e) => setSelectedKeys(e.keyPath)}
          mode="inline"
          items={generateItem(navigate)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: 'white',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Dropdown overlay={menu} trigger={['click']}>
            <button className="h-full m-4 flex items-center gap-4">
              <div className="flex flex-col justify-end text-right sm:hidden">
                <span className="font-medium text-base text-gray-800 tracking-wide leading-4 text-right">
                  John Doe
                </span>

                <span className="font-light text-gray-800 text-sm">Admin</span>
              </div>
              <img
                src={require('../assets/me.jpg')}
                alt="foto admin"
                className="rounded-full w-12 h-12"
              />
            </button>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ minHeight: 360, padding: 16 }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Telkom ©2022 Created by devsam
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Template;
