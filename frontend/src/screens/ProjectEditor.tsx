import React, { useState, useEffect } from "react";
import FileSelector from "../components/FileSelector";
import FileEditor from "../components/FileEditor";
import ProjectPreview from "../components/ProjectPreview";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../slices/projectsApiSlice";
import { useUpdateProjectMutation } from "../slices/projectsApiSlice";
import Loader from "../components/Loader";

interface ProjectFile {
  fileName: string;
  fileContent: string;
}

const ProjectEditor = () => {
  const { projectId } = useParams();

  const filesStarter: ProjectFile[] = [
    {
      fileName: "index.html",
      fileContent: ""
    },
    {
      fileName: "style.css",
      fileContent: ""
    },
    {
      fileName: "script.js",
      fileContent: ""
    }
  ];

  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>(filesStarter);
  const [currentlySelectedFilename, setCurrentlySelectedFilename] =
    useState<string>("index.html");

  const projectData: any = useGetProjectQuery(projectId);
  const [projectVersion, setProjectVersion] = useState<number>(0);
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  React.useEffect(() => {
    if (!projectData || !projectData.data) return;

    setProjectFiles([
      {
        fileName: "index.html",
        fileContent: projectData.data.projectHtml
      },
      {
        fileName: "style.css",
        fileContent: projectData.data.projectCss
      },
      {
        fileName: "script.js",
        fileContent: projectData.data.projectJs
      }
    ]);
  }, [projectData]);

  const fileSelection = (filename: string) => {
    setCurrentlySelectedFilename(filename);
  };

  const currentFile: ProjectFile = projectFiles.find(
    (f) => f.fileName === currentlySelectedFilename
  );

  const save = async () => {
    try {
      const res = await updateProject({
        projectFiles,
        projectId
      }).unwrap();

      setProjectVersion(projectVersion + 1);
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  const handleFileEdit = (newContent: string) => {
    const updatedFiles: ProjectFile[] = projectFiles.map(
      (file: ProjectFile) => {
        if (file.fileName === currentlySelectedFilename) {
          return {
            fileName: currentlySelectedFilename,
            fileContent: newContent
          };
        }

        return file;
      }
    );

    setProjectFiles(updatedFiles);
  };

  if (projectData.isLoading) return <p>Loading...</p>;
  if (projectData.error) return <p>Error loading project</p>;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <div style={{ height: "100%" }}>
        <button onClick={save}>SAVE</button>
        {isLoading && <Loader />}
      </div>
      <FileSelector
        filenamesList={projectFiles.map((file: ProjectFile) => file.fileName)}
        selectedFilename={currentlySelectedFilename}
        newFilenameSelected={fileSelection}
      ></FileSelector>
      <FileEditor
        fileContent={currentFile.fileContent}
        fileType={currentFile.fileName.split(".").pop()}
        onFileEdited={handleFileEdit}
      ></FileEditor>
      <ProjectPreview
        projectId={projectId}
        version={projectVersion}
      ></ProjectPreview>
    </div>
  );
};

export default ProjectEditor;
