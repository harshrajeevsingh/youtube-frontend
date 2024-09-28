import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./pages/WatchPage";
import SignUpPage from "./pages/SignUpPage";
import Layout from "./components/Layout";
import "./timeAgoConfig";
import VideoUploadPage from "./pages/VideoUploadPage";
import LoginPage from "./pages/LoginPage";
import LikedVideosPage from "./pages/LikedVideosPage";
import PrivateRoute from "./components/PrivateRoute";
import SubscriptionPage from "./pages/SubscriptionPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
export default function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Body />,
          children: [
            {
              path: "/",
              element: <MainContainer />,
            },
            {
              path: "watch",
              element: <WatchPage />,
            },
            {
              path: "videoupload",
              element: <VideoUploadPage />,
            },
            {
              path: "c/:profileId",
              element: <ProfilePage />,
            },
            {
              path: "c/:profileId/posts",
              element: <ProfilePage />,
            },
            {
              path: "likedVideo",
              element: (
                <PrivateRoute>
                  <LikedVideosPage />
                </PrivateRoute>
              ),
            },
            {
              path: "subscription",
              element: (
                <PrivateRoute>
                  <SubscriptionPage />
                </PrivateRoute>
              ),
            },
            {
              path: "history",
              element: (
                <PrivateRoute>
                  <HistoryPage />
                </PrivateRoute>
              ),
            },
            {
              path: "login",
              element: <LoginPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}
