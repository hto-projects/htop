import asyncHandler from "express-async-handler";
import Project from "../models/projectModel";
import { v4 as uuidv4 } from "uuid";

// @desc    Create a new project
// @route   POST /api/projects/create
// @access  Public
const createProject = asyncHandler(async (req: any, res) => {
  const {
    projectName,
    projectDescription,
    projectHtml,
    projectCss,
    projectJs
  } = req.body;

  const newProjectId = uuidv4();

  try {
    await Project.create({
      projectName,
      projectDescription,
      projectHtml,
      projectCss,
      projectJs,
      projectId: newProjectId
    });

    res.status(201).json({
      message: `Project "${projectName}" created!`,
      projectId: newProjectId
    });
  } catch (error) {
    res.status(400);
    throw new Error(`Error creating project: ${error}`);
  }
});

const fileContentByName = (projectFiles: any[], fileName: string): string => {
  const projectFile = projectFiles.find((f) => f.fileName === fileName);
  if (projectFile) {
    return projectFile.fileContent;
  } else {
    return null;
  }
};

// @desc    Update an existing project
// @route   POST /api/projects/update
// @access  NOT Public
const updateProject = asyncHandler(async (req: any, res) => {
  const { projectId, projectFiles } = req.body;
  console.log(projectFiles);
  const newHtml = fileContentByName(projectFiles, "index.html");
  console.log(newHtml);
  const newCss = fileContentByName(projectFiles, "style.css");
  const newJs = fileContentByName(projectFiles, "script.js");

  const findProj = { projectId: projectId };
  const updates: any = {};

  if (newHtml) {
    updates.projectHtml = newHtml;
  }

  if (newCss) {
    updates.projectCss = newCss;
  }

  if (newJs) {
    updates.projectJs = newJs;
  }

  try {
    await Project.findOneAndUpdate(findProj, updates);
    res.status(201).json({
      message: `Project ${projectId} updated!`,
      newHtml: newHtml,
      newCss: newCss,
      newJs: newJs
    });
  } catch (error) {
    res.status(400);
    throw new Error(`Error updating project: ${error}`);
  }
});

// @desc    Get a project
// @route   GET /get/:projectId
// @access  Public
const getProject = asyncHandler(async (req: any, res) => {
  const projectId = req.params.projectId;
  let project;

  try {
    project = await Project.findOne({ projectId: projectId });
  } catch (e) {
    res.status(400);
    throw new Error(":( project not found :(");
  }

  res.send(project);
});

// @desc    Render a project file
// @route   GET /pf/:projectId/:filename
// @access  Public
const renderFile = asyncHandler(async (req: any, res) => {
  const projectId = req.params.projectId;
  const filename = req.params.filename || "index.html";

  let project;

  try {
    project = await Project.findOne({ projectId: projectId });
  } catch (e) {
    res.status(400);
    throw new Error(":( project not found :(");
  }

  if (filename === "index.html") {
    res.setHeader("Content-Type", "text/html");
    res.send(project.projectHtml);
    return;
  }

  if (filename === "style.css") {
    res.setHeader("Content-Type", "text/css");
    res.send(project.projectCss);
    return;
  }

  if (filename === "script.js") {
    res.setHeader("Content-Type", "text/javascript");
    res.send(project.projectJs);
    return;
  }
});

// @desc    Render a project
// @route   GET /p/:projectId
// @access  Public
const renderProject = asyncHandler(async (req: any, res) => {
  const projectId = req.params.projectId;
  let project;

  try {
    project = await Project.findOne({ projectId: projectId });
  } catch (e) {
    res.status(400);
    throw new Error(":( project not found :(");
  }

  const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
  ${project.projectCss}
  </style>
</head>
<body>
${project.projectHtml}
<script>
  ${project.projectJs}
</script>
</body>
</html>`;

  res.send(htmlString);
});

export { createProject, updateProject, getProject, renderProject, renderFile };
