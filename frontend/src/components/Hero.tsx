import { Container, Card, Button } from "react-bootstrap";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";
import { useState } from "react";

const Hero = () => {
  const onFileEdited = (newContent: string) => {
    console.log("File content changed:", newContent);
  };

  const [fileContent, setFileContent] = useState<string>("<h1>hi</h1>");
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN AUTH TS</h1>
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library. It has been adapted to use TypeScript.
          </p>
          <div className="d-flex">
            <Button variant="secondary" href="/create-project">
              Create Project
            </Button>
          </div>
        </Card>
      </Container>
      <div
        style={{ width: "200px", height: "300px", border: "1px solid black" }}
      >
        <Editor
          style={{ width: "100%", height: "100%", fontFamily: "monospace" }}
          highlight={(code) => highlight(code, languages.html)}
          onValueChange={setFileContent}
          value={fileContent}
          padding={10}
        ></Editor>
      </div>
    </div>
  );
};

export default Hero;
