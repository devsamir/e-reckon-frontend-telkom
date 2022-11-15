import React, { useState, useMemo, useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { Footer } from "antd/lib/layout/layout";

import {
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  FormOutlined,
  ContainerOutlined,
  HddOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Image, Dropdown } from "antd";

import { AuthContext } from "../contexts/AuthContext";

const { Header, Content, Sider } = Layout;

interface Props {}

const mapMenu = {
  "/admin/dashboard": ["1"],
  "/admin/form-tl-sektor": ["2"],
  "/admin/first-tier": ["3"],
  "/admin/common": ["4"],
  "/admin/common/unit": ["4", "4-1"],
  "/admin/common/item": ["4", "4-2"],
  "/admin/common/mitra": ["4", "4-3"],
  "/admin/user": ["5"],
  "/admin/second-tier": ["6"],
  "/admin/warehouse-tier": ["7"],
};

const Template: React.FC<Props> = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(
    mapMenu?.[location.pathname]
  );
  const menu = useMemo(
    () => (
      <Menu
        items={[
          {
            key: "1",
            label: "Logout",
            icon: <LogoutOutlined />,
            onClick: logout,
          },
        ]}
      />
    ),
    [logout]
  );
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="m-2 flex items-center justify-center">
          <Image src={require("../assets/telkom_logo.png")} width={54} />
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
          <Menu.Item
            icon={<PieChartOutlined />}
            key={mapMenu["/admin/dashboard"][0]}
          >
            <Link to={"/admin/dashboard"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            icon={<FormOutlined />}
            key={mapMenu["/admin/form-tl-sektor"][0]}
          >
            <Link to={"/admin/form-tl-sektor"}>Form TL Sektor</Link>
          </Menu.Item>
          <Menu.Item
            icon={<ContainerOutlined />}
            key={mapMenu["/admin/first-tier"][0]}
          >
            <Link to={"/admin/first-tier"}>Tier 1</Link>
          </Menu.Item>
          <Menu.Item
            icon={<HddOutlined />}
            key={mapMenu["/admin/second-tier"][0]}
          >
            <Link to={"/admin/second-tier"}>Tier 2</Link>
          </Menu.Item>
          <Menu.Item
            icon={<AppstoreOutlined />}
            key={mapMenu["/admin/warehouse-tier"][0]}
          >
            <Link to={"/admin/warehouse-tier"}>Tier WH</Link>
          </Menu.Item>
          <Menu.SubMenu
            title="Common"
            icon={<SettingOutlined />}
            key={mapMenu["/admin/common"][0]}
          >
            <Menu.Item key={mapMenu["/admin/common/unit"][1]}>
              <Link to={"/admin/common/unit"}>Unit</Link>
            </Menu.Item>
            <Menu.Item key={mapMenu["/admin/common/item"][1]}>
              <Link to={"/admin/common/item"}>Item</Link>
            </Menu.Item>
            <Menu.Item key={mapMenu["/admin/common/mitra"][1]}>
              <Link to={"/admin/common/mitra"}>Mitra</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item icon={<UserOutlined />} key={mapMenu["/admin/user"][0]}>
            <Link to={"/admin/user"}>User</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "white",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Dropdown overlay={menu} trigger={["click"]}>
            <button className="h-full m-4 flex items-center gap-4 border-none bg-white cursor-pointer">
              <div className="flex flex-col justify-end text-right sm:hidden">
                <span className="font-medium text-base text-gray-800 tracking-wide leading-4 text-right">
                  John Doe
                </span>

                <span className="font-light text-gray-800 text-sm">Admin</span>
              </div>
              <img
                src={require("../assets/me.jpg")}
                alt="foto admin"
                className="rounded-full w-12 h-12"
              />
            </button>
          </Dropdown>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div style={{ minHeight: 360, padding: 16 }}>
            <Outlet />
          </div>
        </Content>
        <Footer className="flex justify-center mt-4 text-gray-500">
          Copyright © {new Date().getFullYear()} Telkom Co., Ltd. All Rights
          Reserved
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Template;
