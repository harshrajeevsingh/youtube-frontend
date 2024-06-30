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
    <div className=" md:w-auto min-w-max h-full">
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
            <div>
              <Home />
              {/* <span>Home</span> */}
            </div>
          }
        />
        <Tab
          key="liked_videos"
          title={
            <div>
              <ThumbsUp />
              {/* <span>Liked videos</span> */}
            </div>
          }
        />
        <Tab
          key="subscriptions"
          title={
            <div>
              <Podcast />
              {/* <span>Subscriptions</span> */}
            </div>
          }
        />
        <Tab
          key="history"
          title={
            <div>
              <History />
              {/* <span>History</span> */}
            </div>
          }
        />
      </Tabs>
    </div>
  );
};
export default Sidebar;
