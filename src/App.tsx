import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { Spin } from "antd";

import Template from "./components/Template";
import { AuthContext } from "./contexts/AuthContext";
import ItemPrice from "./pages/Admin/Commerce/ItemPrice";
import CommerceOrder from "./pages/Admin/Commerce/List";
import JobType from "./pages/Admin/Common/JobType";
import Unit from "./pages/Admin/Common/Unit";
import Dashboard from "./pages/Admin/Dashboard";
import DetailFirstTier from "./pages/Admin/FirstTier/DetailFirstTier/DetailFirstTier";
import FirstTierList from "./pages/Admin/FirstTier/List";
import DetailSecondTier from "./pages/Admin/SecondTier/DetailSecondTier/DetailSecondTier";
import SecondTierList from "./pages/Admin/SecondTier/List";
import TlSektor from "./pages/Admin/TlSektor";
import User from "./pages/Admin/User";
import DetailWarehouseTier from "./pages/Admin/Warehouse/DetailWarehouse/DetailWarehouseTier";
import Item from "./pages/Admin/Warehouse/Item";
import WarehouseList from "./pages/Admin/Warehouse/List";
import Login from "./pages/Login";

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { initialLoading, isLogin, user } = useContext(AuthContext);

  useEffect(() => {
    if (pathname === "/") {
      navigate("/login");
    }
    if (initialLoading === false) {
      if (pathname.startsWith("/admin")) {
        if (!isLogin) navigate("/login");
      }
      if (pathname === "/login") {
        if (isLogin) navigate("/admin/dashboard");
      }
    }
  }, [pathname, navigate, isLogin, initialLoading]);

  if (initialLoading) {
    return (
      <div className="fixed w-screen h-screen bg-white flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      {isLogin && (
        <Route path="admin" element={<Template />}>
          <Route path="dashboard" element={<Dashboard />} />
          {["admin", "tl"].includes(user?.role) && (
            <Route path="form-tl-sektor" element={<TlSektor />} />
          )}
          {["admin", "first_tier"].includes(user?.role) && (
            <Route path="first-tier" element={<FirstTierList />} />
          )}
          {["admin", "first_tier"].includes(user?.role) && (
            <Route path="first-tier/detail" element={<DetailFirstTier />} />
          )}
          {["admin", "mitra"].includes(user?.role) && (
            <Route path="mitra" element={<SecondTierList />} />
          )}
          {["admin", "mitra"].includes(user?.role) && (
            <Route path="mitra/detail" element={<DetailSecondTier />} />
          )}
          {["admin", "wh"].includes(user?.role) && (
            <Route path="warehouse/item" element={<Item />} />
          )}
          {["admin", "wh"].includes(user?.role) && (
            <Route path="warehouse/order" element={<WarehouseList />} />
          )}
          {["admin", "wh"].includes(user?.role) && (
            <Route
              path="warehouse-tier/detail"
              element={<DetailWarehouseTier />}
            />
          )}
          {["admin", "commerce"].includes(user?.role) && (
            <Route path="commerce/item-price" element={<ItemPrice />} />
          )}
          {["admin", "commerce"].includes(user?.role) && (
            <Route path="commerce/order" element={<CommerceOrder />} />
          )}
          {/* COMMON */}
          {["admin"].includes(user?.role) && (
            <Route path="master/unit" element={<Unit />} />
          )}
          {["admin"].includes(user?.role) && (
            <Route path="master/job-type" element={<JobType />} />
          )}
          {["admin"].includes(user?.role) && (
            <Route path="user" element={<User />} />
          )}
        </Route>
      )}
    </Routes>
  );
};

export default App;
