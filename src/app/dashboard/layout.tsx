import ProtectedLayout from "../components/ProtectedLayout";
import NavbarDashboard from "./navbar";
import SideBar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <div className="flex">
        <div className="transition-all w-full h-full  flex flex-col  duration-400 pl-[272px] max-[866px]:pl-0 max-tablet:pl-0">
          <div className="flex w-full flex-col px-8 max-[600px]:px-4 !flex-row pl-0">
            <div className="w-full py-6 flex flex-col mx-8 max-[600px]:mx-0 h-screen">
              <div className="flex flex-col  space-y-3 ">
                <NavbarDashboard></NavbarDashboard>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
