import React from "react";
import Project from "./Project";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllProjectsContext } from "../pages/AllProjects";

const ProjectsContainer = () => {
  const { data } = useAllProjectsContext();
  console.log(data);
  const { projects } = data;
  if (projects.length === 0) {
    return (
      <Wrapper>
        <h2>No Projects to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {projects.map((project) => {
          return <Project key={project._id} {...project} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ProjectsContainer;
