import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";
import FileEditor from "./FileEditor";

interface FileEditorWrapperProps {
  files: any[];
  currentlySelectedFilename: string;
  onFileEdited: (newContent: string) => void;
}

const FileEditorWrapper = ({
  files,
  currentlySelectedFilename,
  onFileEdited
}: FileEditorWrapperProps) => {
  const fileEditorComponents = [];
  for (let i = 0; i < files.length; i++) {
    const currentFile = files[i];
    const editor = (
      <FileEditor
        fileContent={currentFile.fileContent}
        fileType={currentFile.fileName.split(".").pop()}
        onFileEdited={onFileEdited}
      ></FileEditor>
    );
    fileEditorComponents.push(editor);
  }

  return (
    fileEditorComponents.find(
      (editor) => editor.props.fileType === currentlySelectedFilename
    ) || null
  );
};

export default FileEditorWrapper;
