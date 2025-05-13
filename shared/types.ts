export interface IProjectFile {
  fileName: string;
  fileContent: string;
}

export interface IProject {
  projectName: string;
  projectFiles: IProjectFile[];
}
