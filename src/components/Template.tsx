import React, { useState, useMemo, useContext, useEffect } from "react";
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
  AuditOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Image, Dropdown } from "antd";

import { AuthContext } from "../contexts/AuthContext";

const { Header, Content, Sider } = Layout;

interface Props {}

const mapMenu = {
  "/admin/dashboard": ["1"],
  "/admin/form-tl-sektor": ["2"],
  "/admin/first-tier": ["3"],
  "/admin/master": ["4"],
  "/admin/master/job-type": ["4", "4-1"],
  "/admin/master/unit": ["4", "4-2"],
  "/admin/user": ["5"],
  "/admin/second-tier": ["6"],
  "/admin/third-tier": ["7"],
  "/admin/warehouse": ["8"],
  "/admin/warehouse/item": ["8", "8-1"],
  "/admin/warehouse/order": ["8", "8-2"],
  "/admin/commerce": ["9"],
  "/admin/commerce/item-price": ["9", "9-1"],
  "/admin/commerce/order": ["9", "9-2"],
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

  // useEffect(() => {
  //   setSelectedKeys(mapMenu[location.pathname]);
  // }, [location.pathname]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="m-2 flex items-center justify-center">
          <Image
            preview={false}
            src={require("../assets/telkom_logo.png")}
            width={54}
          />
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
            <Link to={"/admin/form-tl-sektor"}>Form TL</Link>
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
            <Link to={"/admin/second-tier"}>Mitra</Link>
          </Menu.Item>
          <Menu.SubMenu
            title="Warehouse"
            icon={<AppstoreOutlined />}
            key={mapMenu["/admin/warehouse"][0]}
          >
            <Menu.Item key={mapMenu["/admin/warehouse/item"][1]}>
              <Link to={"/admin/warehouse/item"}>Item</Link>
            </Menu.Item>
            <Menu.Item key={mapMenu["/admin/warehouse/order"][1]}>
              <Link to={"/admin/warehouse/order"}>Order</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            title="Commerce"
            icon={<AppstoreOutlined />}
            key={mapMenu["/admin/commerce"][0]}
          >
            <Menu.Item key={mapMenu["/admin/commerce/item-price"][1]}>
              <Link to={"/admin/commerce/item-price"}>Item Price</Link>
            </Menu.Item>
            {/* <Menu.Item key={mapMenu["/admin/commerce/order"][1]}>
              <Link to={"/admin/commerce/order"}>Order</Link>
            </Menu.Item> */}
          </Menu.SubMenu>

          <Menu.SubMenu
            title="Master"
            icon={<SettingOutlined />}
            key={mapMenu["/admin/master"][0]}
          >
            <Menu.Item key={mapMenu["/admin/master/job-type"][1]}>
              <Link to={"/admin/master/job-type"}>Jenis Pekerjaan</Link>
            </Menu.Item>
            <Menu.Item key={mapMenu["/admin/master/unit"][1]}>
              <Link to={"/admin/master/unit"}>Unit</Link>
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
