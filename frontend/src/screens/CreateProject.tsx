import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useCreateProjectMutation } from "../slices/projectsApiSlice";

const CreateProjectScreen = () => {
  console.log("CreateProjectScreen");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectHtml, setProjectHtml] = useState("");
  const [projectCss, setProjectCss] = useState("");
  const [projectJs, setProjectJs] = useState("");

  const [createdProjectId, setCreatedProjectId] = useState("");

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createProject({
        projectName,
        projectDescription,
        projectHtml,
        projectCss,
        projectJs
      }).unwrap();
      toast.success(res.message);
      setCreatedProjectId(res.projectId);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <h1>Make a new project</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="projectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="projectName"
            placeholder="Enter projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="projectDescription">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            type="projectDescription"
            placeholder="Enter projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="projectHtml">
          <Form.Label>HTML</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Enter projectHtml"
            value={projectHtml}
            onChange={(e) => setProjectHtml(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="projectCss">
          <Form.Label>CSS</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Enter projectCss"
            value={projectCss}
            onChange={(e) => setProjectCss(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="projectJs">
          <Form.Label>Js</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Enter projectJs"
            value={projectJs}
            onChange={(e) => setProjectJs(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Create Project
        </Button>
        {createdProjectId ? (
          <a href={`/edit-project/${createdProjectId}`}>Edit Project</a>
        ) : (
          ""
        )}
      </Form>

      {isLoading && <Loader />}
    </>
  );
};

export default CreateProjectScreen;
