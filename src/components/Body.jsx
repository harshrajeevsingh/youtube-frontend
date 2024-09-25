import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Body = () => {
  return (
    <div className="flex flex-col-reverse w-full gap-4 md:flex-row mt-0">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Body;
