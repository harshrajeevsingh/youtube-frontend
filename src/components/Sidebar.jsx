import { Tabs, Tab } from "@nextui-org/react";
import { Home, ThumbsUp, Podcast, History } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [placement, setPlacement] = useState("start");
  return (
    <div className=" w-1/6 h-full mt-10">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="light"
        placement={placement}
      >
        <Tab
          key="home"
          title={
            <div className="flex items-center space-x-2">
              <Home />
              <span>Home</span>
            </div>
          }
        />
        <Tab
          key="liked_videos"
          title={
            <div className="flex items-center space-x-2">
              <ThumbsUp />
              <span>Liked videos</span>
            </div>
          }
        />
        <Tab
          key="subscriptions"
          title={
            <div className="flex items-center space-x-2">
              <Podcast />
              <span>Subscriptions</span>
            </div>
          }
        />
        <Tab
          key="history"
          title={
            <div className="flex items-center space-x-2">
              <History />
              <span>History</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};
export default Sidebar;
