import { Tabs, Tab } from "@nextui-org/react";
import { Home, ThumbsUp, Podcast, History } from "lucide-react";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  // const [placement, setPlacement] = useState("start");
  // const updatePlacement = () => {
  //   if (window.innerWidth < 1024) {
  //     setPlacement("bottom");
  //   } else {
  //     setPlacement("start");
  //   }
  // };

  // useEffect(() => {
  //   updatePlacement(); // Set initial placement
  //   window.addEventListener("resize", updatePlacement); // Listen for resize events
  //   return () => window.removeEventListener("resize", updatePlacement); // Clean up on unmount
  // }, []);
  return (
    <div className="w-48 sticky top-16  left-0 bottom-0 h-[calc(100vh_-_4rem)] pt-5 px-2 drop-shadow-lg">
      <Tabs
        className="w-full h-full"
        size="lg"
        aria-label="Options"
        color="primary"
        variant="light"
        isVertical={true}
      >
        <Tab
          key="home"
          title={
            <div className="flex text-base gap-3 w-36 ">
              <Home />
              <span>Home</span>
            </div>
          }
        />
        <Tab
          key="liked_videos"
          title={
            <div className="flex text-base gap-3 w-36">
              <ThumbsUp />
              <span>Liked videos</span>
            </div>
          }
        />
        <Tab
          key="subscriptions"
          title={
            <div className="flex text-base gap-3 w-36">
              <Podcast />
              <span>Subscriptions</span>
            </div>
          }
        />
        <Tab
          key="history"
          title={
            <div className="flex text-base gap-3 w-36">
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
