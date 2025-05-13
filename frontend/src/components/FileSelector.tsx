const FileSelector = ({
  filenamesList,
  newFilenameSelected,
  selectedFilename
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {filenamesList.map((filename, index) => (
        <div
          key={index}
          className={`file-selector ${
            selectedFilename === filename ? "selected" : ""
          }`}
          onClick={() => newFilenameSelected(filename)}
          style={{
            padding: "10px",
            cursor: "pointer",
            fontFamily: "Inter",
            backgroundColor: selectedFilename === filename ? "#e0e0e0" : "#fff",
            borderBottom: "1px solid #ccc"
          }}
        >
          {filename}
        </div>
      ))}
    </div>
  );
};

export default FileSelector;
