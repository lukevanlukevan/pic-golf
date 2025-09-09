import fs from "fs/promises";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return new Response(JSON.stringify({ error: "Path is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const dirPath = path.join(process.cwd(), "public", filePath);
    const files = await fs.readdir(dirPath);
    const filePaths = files.map((file) => path.join(filePath, file));
    return new Response(JSON.stringify({ files: filePaths }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to read directory" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
