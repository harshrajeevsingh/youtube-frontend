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
    <div className="md:w-48 w-full sticky  md:top-16  md:left-0 bottom-0 md:h-[calc(100vh_-_4rem)] md:pt-5 md:px-2 drop-shadow-lg">
      <Tabs
        className="w-full h-full"
        size="lg"
        aria-label="Options"
        color="primary"
        variant="light"
        placement={placement}
        // isVertical={true}
      >
        <Tab
          key="home"
          title={
            <div className="flex justify-center md:text-base md:gap-3 md:w-36 w-20">
              <Home />
              <span className="hidden md:block">Home</span>
            </div>
          }
        />
        <Tab
          key="liked_videos"
          title={
            <div className="flex justify-center md:text-base md:gap-3 md:w-36 w-20">
              <ThumbsUp />
              <span className="hidden md:block">Liked videos</span>
            </div>
          }
        />
        <Tab
          key="subscriptions"
          title={
            <div className="flex justify-center md:text-base md:gap-3 md:w-36  w-20">
              <Podcast />
              <span className="hidden md:block">Subscriptions</span>
            </div>
          }
        />
        <Tab
          key="history"
          title={
            <div className="flex justify-center md:text-base md:gap-3 md:w-36 w-20 ">
              <History />
              <span className="hidden md:block">History</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};
export default Sidebar;
