import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./pages/WatchPage";
import SignUpPage from "./pages/SignUpPage";
import Layout from "./components/Layout";

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
