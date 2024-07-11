import { useEffect, useState } from "react";
import axiosInstance from "../helpers/axios";

export const MainContainer = () => {
  const [data, setData] = useState(null);

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
    return <div className="text-white">Loading...</div>;
  }
  return (
    <div>
      <span className="text-white">Message: {data.message}</span>
      <br />
      <span className="text-white">Success: {data.success.toString()}</span>
      <br />
      <span className="text-white">Status Code: {data.statusCode}</span>
    </div>
  );
};

export default MainContainer;
