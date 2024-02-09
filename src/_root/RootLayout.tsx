import Bottombar from "@/components/shared/Bottombar";
import LefSidetbar from "@/components/shared/LefSidetbar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LefSidetbar />

      <section className="flex flex1 h-full w-svw">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
