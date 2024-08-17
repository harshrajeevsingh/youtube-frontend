import { Tabs, Tab } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { Home, ThumbsUp, Podcast, History } from "lucide-react";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const location = useLocation();
  const [placement, setPlacement] = useState("start");
  const updatePlacement = () => {
    if (window.innerWidth < 768) {
      setPlacement("bottom");
    } else {
      setPlacement("start");
    }
  };

  useEffect(() => {
    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    return () => window.removeEventListener("resize", updatePlacement);
  }, []);
  return (
    <div className=" md:w-40 xl:w-44 w-full sticky z-30 md:top-16 bg-background md:left-0 bottom-0 md:h-[calc(100vh_-_4rem)] md:pt-5 py-2 px-2 drop-shadow-lg">
      <Tabs
        fullWidth
        className="w-full h-full "
        size="lg"
        aria-label="Options"
        color="primary"
        variant="light"
        placement={placement}
        selectedKey={location.pathname}
      >
        <Tab
          key="/"
          title={
            <Link
              to="/"
              className="flex justify-center md:justify-normal md:text-base sm:gap-3 md:w-32 w-full"
            >
              <Home />
              <span className="hidden sm:block">Home</span>
            </Link>
          }
        />
        <Tab
          key="liked_videos"
          title={
            <div className="flex justify-center md:justify-normal md:text-base sm:gap-3  md:w-32 w-full">
              <ThumbsUp />
              <span className="hidden sm:block">Liked videos</span>
            </div>
          }
        />
        <Tab
          key="subscriptions"
          title={
            <div className="flex justify-center md:justify-normal md:text-base sm:gap-3 md:w-32 w-full ">
              <Podcast />
              <span className="hidden sm:block">Subscription</span>
            </div>
          }
        />
        <Tab
          key="history"
          title={
            <div className="flex justify-center md:justify-normal md:text-base sm:gap-3 md:w-32  w-full">
              <History />
              <span className="hidden sm:block">History</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};
export default Sidebar;
