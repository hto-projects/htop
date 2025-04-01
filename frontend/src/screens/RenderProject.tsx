import { useParams } from "react-router-dom";
import { useRenderProjectQuery } from "../slices/projectsApiSlice";

const RenderProjectScreen = () => {
  const { projectId } = useParams();

  const result = useRenderProjectQuery(projectId);

  if (result.isLoading) return <p>Loading...</p>;
  if (result.error) return <p>Error loading team info</p>;
  return (
    <html>
      <head>
        <style></style>
      </head>
      <body></body>
    </html>
  );
};

export default RenderProjectScreen;
