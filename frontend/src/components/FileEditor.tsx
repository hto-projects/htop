import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";

interface FileEditorProps {
  fileType: string;
  fileContent: string;
  onFileEdited: (newContent: string) => void;
  readOnly: boolean;
}

const FileEditor = ({
  fileContent,
  fileType,
  onFileEdited,
  readOnly
}: FileEditorProps) => {
  const lang: string = fileType || "txt";
  const handleFileChange = (newContent: string): void => {
    onFileEdited(newContent);
  };

  if (!fileContent) {
    fileContent = "";
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h1>File Editor</h1>
      <div style={{ width: "100%", height: "100%", border: "1px solid black" }}>
        <Editor
          style={{ width: "100%", height: "100%", fontFamily: "monospace" }}
          highlight={(code) => highlight(code, languages[lang])}
          onValueChange={handleFileChange}
          value={fileContent || ""}
          padding={10}
          readOnly={readOnly}
        ></Editor>
      </div>
    </div>
  );
};

export default FileEditor;
