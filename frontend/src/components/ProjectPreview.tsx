const ProjectPreview = ({ projectId, version }) => {
  const urlThing = `http://localhost:5000/pf/${projectId}/?version=${version}`;

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
        src={urlThing}
        style={{
          width: "100%",
          height: "100%"
        }}
      ></iframe>
      {version}
    </div>
  );
};

export default ProjectPreview;
