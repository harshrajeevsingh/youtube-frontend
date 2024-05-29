import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Body = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Body;
