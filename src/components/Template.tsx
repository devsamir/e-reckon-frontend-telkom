import React, { useState, useMemo, useContext } from 'react';
import {
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, MenuProps, Dropdown } from 'antd';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface Props {}

const Template: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const menu = useMemo(
    () => (
      <Menu
        items={[
          {
            key: '1',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: logout,
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
          selectedKeys={selectedKeys}
          onSelect={(e) => setSelectedKeys(e.keyPath)}
          mode="inline"
        >
          <Menu.Item icon={<PieChartOutlined />} key="1">
            <Link to={'/admin/dashboard'}>Dashboard</Link>
          </Menu.Item>
          <Menu.SubMenu title="Common" icon={<SettingOutlined />} key="2">
            <Menu.Item key="2-1">
              <Link to={'/admin/common/unit'}>Unit</Link>
            </Menu.Item>
            <Menu.Item key="2-2">
              <Link to={'/admin/common/item'}>Item</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item icon={<UserOutlined />} key="3">
            <Link to={'/admin/user'}>User</Link>
          </Menu.Item>
        </Menu>
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
            <button className="h-full m-4 flex items-center gap-4 border-none bg-white cursor-pointer">
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
          <div style={{ minHeight: 360, padding: 16 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Template;
