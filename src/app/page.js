import fs from "fs/promises";
import Image from "next/image";
import path from "path";

async function Home() {
  let filePaths = [];
  let error = null;

  let currentDate = new Date().toJSON().slice(0, 10).split("-").join("");
  const diskPath = "D:/Code/pic-golf/public/" + currentDate;

  try {
    // Resolve the absolute path relative to the project root
    const resolvedPath = path.join(diskPath);
    const files = await fs.readdir(resolvedPath);
    filePaths = files.map((file) => {
      console.log(currentDate);
      const out = "/" + currentDate + "/" + file;
      const time = file.split("_")[0];
      const hr = (parseInt(time.substring(0, 2)) + 1).toString();
      const min = time.substring(2, 4);
      const sec = time.substring(4, 7);
      const outTime = `${hr}:${min}:${sec}`;
      return [out, outTime];
      // path.join(diskPath, file);
    });
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div>
        <h2>Error reading files from {diskPath}</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {filePaths.reverse().map((file, index) => {
        return (
          <div
            key={index}
            className="holder p-4 outline-1 rounded-2xl outline-white/10"
          >
            <span className="font-medium font-mono">{file[1]}</span>
            <Image
              className="rounded-md mt-2"
              key={index}
              src={file[0]}
              height={1000}
              width={1000}
              alt="fooo"
            />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
