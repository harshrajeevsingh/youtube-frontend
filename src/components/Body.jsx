import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Body = () => {
  return (
    <div className="flex gap-10 flex-col-reverse lg:flex-row mt-3">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Body;
