// import { useEffect, useState } from "react";
// import axiosInstance from "../helpers/axios";
// import { SkeletonVideoCard } from "./ui/skeletonVideoCard";
import VideoListMain from "./VideoListMain";

// export const MainContainer = () => {
//   const [data, setData] = useState(null);

//   const skeletonVideoArray = Array.from({ length: 10 });

//   useEffect(() => {
//     axiosInstance
//       .get("/healthcheckGalatHai")
//       .then((response) => {
//         console.log(response);
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   if (!data) {
//     return (
//       <div className="flex flex-wrap justify-center md:gap-5 gap-1 mt-7 mx-0 lg:mr-2">
//         {skeletonVideoArray.map((_, index) => (
//           <SkeletonVideoCard key={index} />
//         ))}
//       </div>
//     );
//   }
//   return (
//     <div className=" bg-slate-100 dark:bg-gray-950 min-h-svh px-3 pt-5">
//       <span className="text-gray-700 dark:text-white">
//         Message: {data.message}
//       </span>
//       <br />
//       <span className="text-gray-700 dark:text-white">
//         Success: {data.success.toString()}
//       </span>
//       <br />
//       <span className="text-gray-700 dark:text-white">
//         Status Code: {data.statusCode}
//       </span>
//     </div>
//   );
// };

export const MainContainer = () => {
  return (
    <div className="min-h-svh">
      <VideoListMain />
    </div>
    // <>
    //   <VideoListMain />
    // </>
  );
};
export default MainContainer;
