import React from "react";
import { useParams } from "react-router-dom";
import { Image, Spinner, Button, Tabs, Tab } from "@nextui-org/react";

import { useUserById } from "../api/userApi";
import VideoTab from "../components/ui/profile-channel/videoTab";
import { SubscribeBtn } from "../components/ui/watch-page-video/subscribeBtn";

const ProfilePage = () => {
  const { profileId } = useParams();

  const { data, isLoading, error } = useUserById(profileId);

  if (isLoading)
    return (
      <div className="w-full grid place-content-center">
        {" "}
        <Spinner />{" "}
      </div>
    );
  if (error)
    return (
      <div className="w-full grid place-content-center">
        <p className="text-red-500">Error loading profile</p>
      </div>
    );

  return (
    <div className="w-full min-h-svh flex flex-col md:px-10  px-1">
      {/* Cover Image */}
      <div className="w-full h-24 md:h-28 lg:h-40 xl:h-48 mt-2 rounded-xl md:px-4 px-2 relative">
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
          <h2 className="text-xl md:text-3xl font-semibold">
            {data?.data?.fullName}
          </h2>
          <p className="text-base md:text-lg ">@{data?.data?.username}</p>
          <p className="text-sm md:text-base ">
            {data?.data?.subscribersCount}{" "}
            {data?.data?.subscribersCount > 1 ? "Subscribers" : "Subscriber"}
          </p>
        </div>
        <div className="self-center">
          <SubscribeBtn
            getCreatorId={() => data?.data?._id}
            getIsSubscribed={() => data?.data?.isSubscribed}
            getSubscribeButtonId={() => data?.data?._id}
          />
        </div>
      </div>

      {/* Tabs: Video & Posts */}
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" variant="underlined" size="lg">
          <Tab key="videos" title="Videos">
            <VideoTab userId={data?.data?._id} />
          </Tab>
          <Tab key="posts" title="Posts">
            <p>This feature is under development. Wait for few days.</p>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
