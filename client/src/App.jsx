import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddProject,
  Admin,
  AllProjects,
  Archive,
  DashboardLayout,
  EditProject,
  Error,
  HomeLayout,
  Landing,
  Login,
  MyProjects,
  MyProjectStats,
  Profile,
  Register,
  Stats,
  Tracker,
  MoreInfo,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addProjectAction } from "./pages/AddProject";
import { loader as allProjectsLoader } from "./pages/AllProjects";
import { loader as editProjectLoader } from "./pages/EditProject";
import { action as editProjectAction } from "./pages/EditProject";
import { loader as statsLoader } from "./pages/Stats";
import { loader as ganttLoader } from "./pages/Tracker";
import { loader as moreInfoLoader } from "./pages/MoreInfo";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout isDarkThemeEnabled />,
    loader: dashboardLoader,
    children: [
      {
        index: true,
        element: <AddProject />,
        action: addProjectAction,
      },
      {
        path: "stats",
        element: <Stats />,
        loader: statsLoader,
      },
      {
        path: "tracker",
        element: <Tracker />,
        loader: ganttLoader,
      },
      {
        path: "my-project-stats",
        element: <MyProjectStats />,
      },

      {
        path: "all-projects",
        element: <AllProjects />,
        loader: allProjectsLoader,
      },
      {
        path: "my-projects",
        element: <MyProjects />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "archive",
        element: <Archive />,
      },
      {
        path: "edit-project/:id",
        element: <EditProject />,
        loader: editProjectLoader,
        action: editProjectAction,
      },
      {
        path: "more-info/:id",
        element: <MoreInfo />,
        loader: moreInfoLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
