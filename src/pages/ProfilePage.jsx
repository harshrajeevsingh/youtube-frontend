import React from "react";
import { useParams } from "react-router-dom";
import { useUserById } from "../api/userApi";
import { Image, Spinner, Button } from "@nextui-org/react";

const ProfilePage = () => {
  const { profileId } = useParams();

  const { data, isLoading, error } = useUserById(profileId);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading profile</p>;

  return (
    <div className="w-full min-h-svh flex flex-col md:px-10  px-1">
      {/* Cover Image */}
      <div className="w-full h-20 md:h-28 lg:h-40 xl:h-48 mt-2 rounded-xl relative">
        <img
          src={data?.data?.coverImg?.url}
          alt="Cover"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Profile Details */}
      <div className="flex gap-5 w-full p-4 ">
        <div className="lg:w-1/12 w-1/6">
          <Image src={data?.data?.avatar?.url} radius="full" />
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-bold">
            {data?.data?.fullName}
          </h2>
          <p className="text-base md:text-lg font-semibold">
            @{data?.data?.username}
          </p>
          <p className="text-sm md:text-base font-semibold">
            {data?.data?.subscribersCount} Subsribers
          </p>
        </div>
        <Button
          color="primary"
          radius="full"
          size="lg"
          className="self-center "
        >
          {data?.data?.isSubscribed ? "Unsubscribe" : "Subsribe"}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
