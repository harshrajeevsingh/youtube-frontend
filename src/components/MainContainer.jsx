import { useEffect, useState } from "react";
import axiosInstance from "../helpers/axios";
import { useCountSelectors } from "../store/useCountStore";

export const MainContainer = () => {
  const [data, setData] = useState(null);

  const count = useCountSelectors.use.count();
  const increment = useCountSelectors.use.increment();
  const decrement = useCountSelectors.use.decrement();

  useEffect(() => {
    axiosInstance
      .get("/healthcheck")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!data) {
    return (
      <div className=" flex-col bg-slate-100 dark:bg-gray-800 min-h-svh md:min-h-full w-full pt-5 px-3">
        <button
          onClick={increment}
          className="p-2 bg-cyan-600 text-lg rounded-full"
        >
          +
        </button>
        <span> Count: {count}</span>
        <button
          onClick={decrement}
          className="p-2 bg-cyan-600 text-lg rounded-full"
        >
          -
        </button>
      </div>
    );
  }
  return (
    <div className=" bg-slate-100 dark:bg-gray-950 min-h-svh px-3 pt-5">
      <span className="text-gray-700 dark:text-white">
        Message: {data.message}
      </span>
      <br />
      <span className="text-gray-700 dark:text-white">
        Success: {data.success.toString()}
      </span>
      <br />
      <span className="text-gray-700 dark:text-white">
        Status Code: {data.statusCode}
      </span>
    </div>
  );
};

export default MainContainer;
