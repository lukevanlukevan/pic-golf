"use client";
import { useState, useEffect } from "react";

const FileLoader = ({ path }) => {
  const [filePaths, setFilePaths] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `/api/files?path=${encodeURIComponent(path)}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = await response.json();
        setFilePaths(data.files || []);
      } catch (err) {
        setError(err.message);
        setFilePaths([]);
      }
    };

    if (path) {
      fetchFiles();
    }
  }, [path]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Files from {path}</h2>
      <ul>
        {filePaths.length > 0 ? (
          filePaths.map((filePath, index) => <li key={index}>{filePath}</li>)
        ) : (
          <li>No files found</li>
        )}
      </ul>
    </div>
  );
};

export default FileLoader;
