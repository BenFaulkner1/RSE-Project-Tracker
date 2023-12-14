import mongoose from "mongoose";
import { PROJECT_STATUS, SITE_TYPE } from "../utils/constants.js";

const ProjectSchema = new mongoose.Schema(
  {
    projectNumber: Number,
    projectTitle: String,
    chemicals: Array,
    projectStatus: {
      type: String,
      enum: Object.values(PROJECT_STATUS),
      default: "design",
    },
    siteType: {
      type: String,
      enum: Object.values(SITE_TYPE),
      default: "WTW",
    },
    contractType: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
