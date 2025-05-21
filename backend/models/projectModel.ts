import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      unique: true
    },
    projectDescription: {
      type: String,
      required: false
    },
    projectOwnerId: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    },
    projectStatus: {
      type: String,
      required: true,
      enum: ["public", "private", "deleted"],
      default: "public"
    },
    projectHtml: {
      type: String,
      required: false
    },
    projectCss: {
      type: String,
      required: false
    },
    projectJs: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
