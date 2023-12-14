import Project from "../models/projectModel.js";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ projects });
};

export const createProject = async (req, res) => {
  console.log("Hi hello");
  req.body.createdBy = req.user.userId;
  console.log(req.body);
  const project = await Project.create(req.body);
  console.log("nae way");
  res.status(200).json({ project });
  //res.send("hello");
  console.log("Hell no");
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  res.status(StatusCodes.OK).json({ project });
};

export const updateSingleProject = async (req, res) => {
  const { id } = req.params;
  const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ project: updatedProject });
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const removedProject = await Project.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: removedProject });
};
