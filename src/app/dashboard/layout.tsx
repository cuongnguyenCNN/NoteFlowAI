"use client";
import { useEffect, useState } from "react";
import ProtectedLayout from "../components/ProtectedLayout";
import NavbarDashboard from "./navbar";
import SideBar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 866) {
        setOpenSidebar(true); // Desktop: mở
      } else {
        setOpenSidebar(false); // Mobile: đóng
      }
    };

    handleResize(); // Gọi ngay lần đầu tiên
  }, []);
  return (
    <ProtectedLayout>
      <SideBar isOpen={openSidebar} toggleSidebar={toggleSidebar}></SideBar>
      <div className="transition-all w-full h-full  flex flex-col  duration-400 pl-[272px] max-[866px]:pl-0 max-tablet:pl-0">
        <div className="flex w-full flex-col px-8 max-[600px]:px-4 !flex-row pl-0">
          <div className="w-full py-6 flex flex-col mx-8 max-[600px]:mx-0 h-screen">
            <NavbarDashboard toggleSidebar={toggleSidebar}></NavbarDashboard>
            {children}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
