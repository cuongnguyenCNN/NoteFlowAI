import ProtectedLayout from "../components/ProtectedLayout";
import SideBar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      {" "}
      <section>
        {" "}
        <SideBar></SideBar>
        {children}
      </section>
    </ProtectedLayout>
  );
}
