import { Tabs, Tab } from "@nextui-org/react";
import { Home, ThumbsUp, Podcast, History } from "lucide-react";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const [placement, setPlacement] = useState("start");
  const updatePlacement = () => {
    if (window.innerWidth < 1024) {
      setPlacement("bottom");
    } else {
      setPlacement("start");
    }
  };

  useEffect(() => {
    updatePlacement(); // Set initial placement
    window.addEventListener("resize", updatePlacement); // Listen for resize events
    return () => window.removeEventListener("resize", updatePlacement); // Clean up on unmount
  }, []);
  return (
    <div className=" lg:w-1/6 w-auto h-full">
      <Tabs
        className="max-w-full w-full"
        aria-label="Options"
        color="primary"
        variant="light"
        placement={placement}
      >
        <Tab
          key="home"
          title={
            <div className="flex space-x-2 items-center ">
              <Home className="mr-5" />
              <span>Home</span>
            </div>
          }
        />
        <Tab
          key="liked_videos"
          title={
            <div className="flex space-x-2 items-center">
              <ThumbsUp className="mr-5" />
              <span>Liked videos</span>
            </div>
          }
        />
        <Tab
          key="subscriptions"
          title={
            <div className="flex space-x-2 items-center">
              <Podcast />
              <span>Subscriptions</span>
            </div>
          }
        />
        <Tab
          key="history"
          title={
            <div className="flex space-x-2 items-center">
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
