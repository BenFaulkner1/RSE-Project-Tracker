import React from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { ProjectsContainer, SearchContainer } from "../components";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/projects");

    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllProjectsContext = createContext();

const AllProjects = () => {
  const { data } = useLoaderData();
  console.log("hillbilly:", data);
  return (
    <AllProjectsContext.Provider value={{ data }}>
      <SearchContainer />
      <ProjectsContainer />
    </AllProjectsContext.Provider>
  );
};

export const useAllProjectsContext = () => useContext(AllProjectsContext);

export default AllProjects;
