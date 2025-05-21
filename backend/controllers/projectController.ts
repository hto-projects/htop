import asyncHandler from "express-async-handler";
import Project from "../models/projectModel";
import { v4 as uuidv4 } from "uuid";
import generateToken from "../utils/generateToken";

const getUserId = (req, res) => {
  const user = req.user;
  let userId;
  if (!user) {
    userId = uuidv4();
    generateToken(res, userId);
  } else {
    userId = user._id;
  }

  return userId;
};

// @desc    Create a new project
// @route   POST /api/projects/create
// @access  Public
const createProject = asyncHandler(async (req: any, res) => {
  const userId = getUserId(req, res);

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
      projectId: newProjectId,
      projectOwnerId: userId
    });

    res.status(201).json({
      message: `Project "${projectName}" created!`,
      projectId: newProjectId,
      projectName: projectName,
      projectOwnerId: userId
    });
  } catch (error) {
    res.status(400);
    throw new Error(`Error creating project: ${error}`);
  }
});

const removeTrailingDigits = (text: string) => {
  return text.replace(/\d+$/, "");
};

const generateNewProjectName = async (
  projectName: string,
  count: number = 0
): Promise<string> => {
  let mult = 100;

  if (count > 10) {
    mult = 1000;
  }

  if (count > 20) {
    mult = 10000;
  }

  if (count > 30) {
    throw new Error("Too many attempts to generate a new project name");
  }

  const randomSuffix = Math.floor(Math.random() * mult);
  const newName = `${projectName}${randomSuffix}`;
  const existingProject = await Project.findOne({ projectName: newName });
  if (existingProject) {
    return generateNewProjectName(projectName, count + 1);
  } else {
    return newName;
  }
};

// @desc    Create a copy of an existing project
// @route   POST /api/projects/copy
// @access  Public
const copyProject = asyncHandler(async (req: any, res) => {
  const userId = getUserId(req, res);

  const { projectName } = req.body;
  let existingProject;

  try {
    existingProject = await Project.findOne({ projectName: projectName });
  } catch (e) {
    res.status(400);
    throw new Error(":( project not found :(");
  }

  const newProjectId = uuidv4();

  let newProjectName;

  try {
    newProjectName = await generateNewProjectName(
      removeTrailingDigits(projectName)
    );
  } catch (error) {
    res.status(400);
    throw new Error(`Error generating new project name: ${error}`);
  }

  try {
    const createdProject = await Project.create({
      projectName: newProjectName,
      projectOwnerId: userId,
      projectDescription: existingProject.projectDescription,
      projectHtml: existingProject.projectHtml,
      projectCss: existingProject.projectCss,
      projectJs: existingProject.projectJs,
      projectId: newProjectId
    });

    res.status(201).json({
      message: `Project "${createdProject.projectName}" created!`,
      projectId: createdProject.projectId,
      projectName: createdProject.projectName,
      userId: createdProject.projectOwnerId
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

// @desc    Check if the current user owns this project
// @route   POST /api/projects/check-ownership/:projectName
// @access  NOT Public
const checkOwnership = asyncHandler(async (req: any, res) => {
  const user = req.user;
  const projectName = req.params.projectName;

  const findProj = { projectName: projectName };
  const existingProject = await Project.findOne(findProj);
  if (!existingProject) {
    res.status(400);
    throw new Error(":( project not found :(");
  }

  if (existingProject.projectOwnerId !== user._id) {
    res.json({ isOwner: false });
  } else {
    res.json({ isOwner: true });
  }
});

// @desc    Update an existing project
// @route   POST /api/projects/update
// @access  NOT Public
const updateProject = asyncHandler(async (req: any, res) => {
  const user = req.user;
  const { projectName, projectFiles } = req.body;
  const newHtml = fileContentByName(projectFiles, "index.html");
  const newCss = fileContentByName(projectFiles, "style.css");
  const newJs = fileContentByName(projectFiles, "script.js");

  const findProj = { projectName: projectName };
  const existingProject = await Project.findOne(findProj);
  if (!existingProject) {
    res.status(400);
    throw new Error(":( project not found :(");
  }

  if (existingProject.projectOwnerId !== user._id) {
    res.status(401);
    throw new Error("Not authorized to update this project");
  }

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
      message: `Project ${projectName} updated!`,
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
  const projectName = req.params.projectName;
  let project;

  try {
    project = await Project.findOne({ projectName: projectName });
  } catch (e) {
    res.status(400);
    throw new Error(":( project not found :(");
  }

  res.send(project);
});

// @desc    Render a project file
// @route   GET /pf/:projectName/:filename
// @access  Public
const renderFile = asyncHandler(async (req: any, res) => {
  const projectName = req.params.projectName;
  let filename = req.params.filename;

  let project;

  try {
    project = await Project.findOne({ projectName: projectName });
  } catch (e) {
    res.status(400);
    throw new Error(":( project not found :(");
  }

  if (!filename) {
    if (req.originalUrl.endsWith("/")) {
      filename = "index.html";
    } else {
      res.redirect(req.originalUrl + "/");
      return;
    }
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

export {
  createProject,
  updateProject,
  checkOwnership,
  getProject,
  copyProject,
  renderFile
};
