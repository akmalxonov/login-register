import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import type { MenuProps } from "antd";
import { Breadcrumb, Menu } from "antd";
import { TbUsers, TbUsersPlus } from "react-icons/tb";
import { FaChalkboardTeacher, FaMoneyBill } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { LuBookOpen, LuCircleUser, LuUsers } from "react-icons/lu";
import { IoSettingsOutline, IoSunnyOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RxExit } from "react-icons/rx";
import { Outlet, useNavigate, useLocation } from "react-router";
import "../mainLayout/mainlayout.scss";
import { HiOutlineMoon } from "react-icons/hi";
type MenuItem = Required<MenuProps>["items"][number];

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    const key = e.key;
    const routes: Record<string, string> = {
      "1": "/",
      "2": "/menagers",
      "3": "/admins",
      "4": "/teachers",
    };

    const path = routes[key];
    if (path) navigate(path);
  };

  const items: MenuItem[] = [
    {
      key: "sub1",
      label: "Admin CRM",
      children: [
        {
          key: "g1",
          label: "Menu",
          type: "group",
          children: [
            { key: "1", label: "Asosiy", icon: <AiOutlineHome /> },
            { key: "2", label: "Menagerlar", icon: <TbUsersPlus /> },
            { key: "3", label: "Adminlar", icon: <TbUsersPlus /> },
            { key: "4", label: "Ustozlar", icon: <FaChalkboardTeacher /> },
            { key: "5", label: "Sutudentlar", icon: <PiStudent /> },
            { key: "6", label: "Guruhlar", icon: <LuUsers /> },
            { key: "7", label: "Kurlar", icon: <LuBookOpen /> },
            { key: "8", label: "Payment", icon: <FaMoneyBill /> },
          ],
        },
        {
          key: "g2",
          label: "Boshqalar",
          type: "group",
          children: [
            { key: "9", label: "Sozlamalar", icon: <IoSettingsOutline /> },
            { key: "10", label: "Profil", icon: <CgProfile /> },
            { key: "11", label: "Chiqish", icon: <RxExit /> },
          ],
        },
      ],
    },
  ];

  const location = useLocation();

  const pathNameMap: Record<string, string[]> = {
    "/": ["Asosiy"],
    "/menagers": ["Asosiy", "Menagerlar"],
    "/admins": ["Asosiy", "Adminlar"],
    "/teachers": ["Asosiy", "Ustozlar"],
  };

  const breadcrumbItems =
    pathNameMap[location.pathname]?.map((title) => ({ title })) || [];

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark";
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="main-layout">
      <Menu
        onClick={onClick}
        className="sidebar"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        style={{
          fontSize: "16px",
        }}
      />

      <div className="content">
        <div className="header-bar">
          <Breadcrumb className="breadcrumb" items={breadcrumbItems} />

          <div className="profile">
            <button className="toggle-theme" onClick={toggleTheme}>
              {theme === "light" ? <HiOutlineMoon /> : <IoSunnyOutline />}
            </button>
            <div className="user-info">
              <div className="username">Usern88 Usern88</div>
              <div className="role">
                <TbUsers /> Manager
              </div>
            </div>
            <div className="avatar">
              <LuCircleUser />
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
