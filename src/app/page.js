import Image from "next/image"

async function Home() {
  let filePaths = []
  let error = null
  var currentDate = new Date().toJSON().slice(0, 10).split("-").join("")
  // currentDate = "20250909" // Uncomment for testing a specific date

  try {
    const response = await fetch("http://192.168.9.231:8000/images", {
      next: { revalidate: 10 }, // ISR: Revalidate every 10 seconds
    })
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }
    const images = await response.json()

    // Filter by current date (optional; remove filter to show all images)
    const filteredImages = images.filter((img) => img.date === currentDate)

    filePaths = filteredImages.map((img) => {
      // Parse time from filename (e.g., "123456_hole_tag.jpg" -> "12:34:56")
      const time = img.filename.split("_")[0]
      const hr = (parseInt(time.substring(0, 2)) + 1)
        .toString()
        .padStart(2, "0")
      const min = time.substring(2, 4)
      const sec = time.substring(4, 6)
      const outTime = `${hr}:${min}:${sec}`
      const name = img.tag // Tag from API
      const url = `http://192.168.9.231:8000${img.url}` // Full URL for image
      return [url, outTime, name]
    })
  } catch (err) {
    error = err.message
  }

  if (error) {
    return (
      <div>
        <h2>Error fetching images</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {filePaths.reverse().map((file, index) => {
        return (
          <div
            key={index}
            className="holder p-4 outline-1 rounded-2xl outline-foreground/10"
          >
            <div className="class flex gap-2 font-mono">
              <span className="font-medium">{file[1]}</span>
              <div
                className="bg-foreground rounded-full text-background px-2 font-medium"
                // onClick={() => setFilter(file[2])}
              >
                {file[2]}
              </div>
            </div>
            <Image
              className="rounded-md mt-2"
              key={index}
              src={file[0]}
              height={1000}
              width={1000}
              alt="Golf image"
            />
          </div>
        )
      })}
    </div>
  )
}

export default Home
