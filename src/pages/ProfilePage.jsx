import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Image, Spinner, Tabs, Tab } from '@nextui-org/react';

import { useUserById } from '../api/userApi';
import { useUserStoreSelectors } from '../store/userSlice';

import CenteredMessage from '../components/ui/centeredMessage';
import VideoTab from '../components/ui/profile-channel/videoTab';
import { SubscribeBtn } from '../components/ui/watch-page-video/subscribeBtn';
import CreatePost from '../components/ui/createPost';
import PostsList from '../components/ui/profile-channel/postList';

const ProfilePage = () => {
  const { profileId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUserStoreSelectors.use.user();

  const [activeTab, setActiveTab] = useState(() => {
    return location.pathname.endsWith('/posts') ? 'posts' : 'videos';
  });

  const { data: profileData, isLoading, error } = useUserById(profileId);

  useEffect(() => {
    if (location.state?.createPost) {
      setActiveTab('posts');
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  if (isLoading) return <CenteredMessage status="loading" />;

  if (error)
    return <CenteredMessage message={error.message} className="text-red-500" />;

  // Check if the logged-in user matches the profile being viewed
  const isOwnProfile = user && user.username === profileData.data.username;

  const handleTabChange = (key) => {
    setActiveTab(key);
    navigate(`/c/${profileId}${key === 'posts' ? '/posts' : ''}`, {
      replace: true,
    });
  };

  return (
    <div className="w-full min-h-svh flex flex-col md:px-10  px-1">
      {/* Cover Image */}
      <div className="w-full h-24 md:h-28 lg:h-40 xl:h-48 mt-2 rounded-xl md:px-4 px-2 relative">
        <img
          src={profileData?.data?.coverImg?.url}
          alt="Cover"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Profile Details */}
      <div className="flex gap-5 w-full p-4 ">
        <div className="lg:w-1/12 w-1/6">
          <Image src={profileData?.data?.avatar?.url} radius="full" />
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold">
            {profileData?.data?.fullName}
          </h2>
          <p className="text-base md:text-lg ">
            @{profileData?.data?.username}
          </p>
          <p className="text-sm md:text-base ">
            {profileData?.data?.subscribersCount}{' '}
            {profileData?.data?.subscribersCount > 1
              ? 'Subscribers'
              : 'Subscriber'}
          </p>
        </div>
        <div className="self-center">
          <SubscribeBtn
            getCreatorId={() => profileData?.data?._id}
            getIsSubscribed={() => profileData?.data?.isSubscribed}
            getSubscribeButtonId={() => profileData?.data?._id}
          />
        </div>
      </div>

      {/* Tabs: Video & Posts */}
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          variant="underlined"
          size="lg"
          selectedKey={activeTab}
          onSelectionChange={handleTabChange}
        >
          <Tab key="videos" title="Videos">
            <VideoTab userId={profileData?.data?._id} />
          </Tab>
          <Tab key="posts" title="Posts">
            {isOwnProfile && <CreatePost />}
            {user ? (
              <PostsList userId={profileData?.data?._id} />
            ) : (
              <p>Please login to view posts</p>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
