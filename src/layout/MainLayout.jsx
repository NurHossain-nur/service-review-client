import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="bg-base-100 text-base-content min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
