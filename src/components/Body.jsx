import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Body = () => {
  return (
    <div className="flex flex-col-reverse gap-5 lg:flex-row mt-0">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Body;
