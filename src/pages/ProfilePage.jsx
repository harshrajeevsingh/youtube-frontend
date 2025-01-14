import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Image, Tabs, Tab } from '@nextui-org/react';

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

  const coverImg = profileData?.data?.coverImg?.url;
  const profileImg = profileData?.data?.avatar?.url;
  const fullName = profileData?.data?.fullName;
  const username = profileData?.data?.username;
  const subscribersCount = profileData?.data?.subscribersCount;
  const creatorId = profileData?.data?._id;
  const isSubscribed = profileData?.data?.isSubscribed;

  useEffect(() => {
    if (location.state?.createPost) {
      setActiveTab('posts');
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  if (isLoading) return <CenteredMessage status="loading" />;

  if (error)
    return <CenteredMessage message={error.message} className="text-red-500" />;

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
      {coverImg && (
        <div className="w-full h-24 md:h-28 lg:h-40 xl:h-48 mt-2 rounded-xl md:px-4 px-2 relative">
          <img
            src={coverImg}
            alt="Cover"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}

      {/* Profile Details */}
      <div className="flex gap-5 w-full pt-5 pb-3 ">
        <div className="lg:w-1/12 w-1/6">
          <Image src={profileImg} radius="full" />
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold">{fullName}</h2>
          <p className="text-base md:text-lg ">@{username}</p>
          <p className="text-sm md:text-base ">
            {subscribersCount}{' '}
            {subscribersCount > 1 ? 'Subscribers' : 'Subscriber'}
          </p>
        </div>
        <div className="self-center">
          <SubscribeBtn
            getCreatorId={() => creatorId}
            getIsSubscribed={() => isSubscribed}
            getSubscribeButtonId={() => creatorId}
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
            <VideoTab userId={creatorId} />
          </Tab>
          <Tab key="posts" title="Posts">
            {isOwnProfile && <CreatePost />}
            {user ? (
              <PostsList userId={creatorId} />
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
