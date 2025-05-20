const ProjectPreview = ({ projectId, version }) => {
  const urlThing = `${import.meta.env.VITE_BACKEND_URL}/pf/${projectId}/`;
  const urlWithVersion = `${urlThing}?v=${version}`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          width: "100%"
        }}
      >
        {urlThing}
      </div>
      <iframe
        src={urlWithVersion}
        style={{
          width: "100%",
          height: "100%"
        }}
      ></iframe>
    </div>
  );
};

export default ProjectPreview;
