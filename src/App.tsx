import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { Spin } from "antd";

import Template from "./components/Template";
import { AuthContext } from "./contexts/AuthContext";
import Item from "./pages/Admin/Common/Item";
import JobType from "./pages/Admin/Common/JobType";
import Mitra from "./pages/Admin/Common/Mitra";
import Unit from "./pages/Admin/Common/Unit";
import Dashboard from "./pages/Admin/Dashboard";
import FirstTier from "./pages/Admin/FirstTier";
import DetailFirstTier from "./pages/Admin/FirstTier/DetailFirstTier/DetailFirstTier";
import SecondTier from "./pages/Admin/SecondTier";
import DetailSecondTier from "./pages/Admin/SecondTier/DetailSecondTier/DetailSecondTier";
import TlSektor from "./pages/Admin/TlSektor";
import User from "./pages/Admin/User";
import WarehouseTier from "./pages/Admin/Warehouse";
import DetailWarehouseTier from "./pages/Admin/Warehouse/DetailWarehouse/DetailWarehouseTier";
import Login from "./pages/Login";

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { initialLoading, isLogin } = useContext(AuthContext);

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
          <Route path="form-tl-sektor" element={<TlSektor />} />
          <Route path="first-tier" element={<FirstTier />} />
          <Route path="first-tier/detail" element={<DetailFirstTier />} />
          <Route path="second-tier" element={<SecondTier />} />
          <Route path="second-tier/detail" element={<DetailSecondTier />} />
          <Route path="warehouse/item" element={<Item />} />
          <Route path="warehouse/order" element={<WarehouseTier />} />
          <Route
            path="warehouse-tier/detail"
            element={<DetailWarehouseTier />}
          />
          <Route path="commerce/item-price" element={<Item />} />
          {/* COMMON */}
          <Route path="master/unit" element={<Unit />} />
          <Route path="master/job-type" element={<JobType />} />
          <Route path="user" element={<User />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
