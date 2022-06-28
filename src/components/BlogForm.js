import { useState } from "react"

function BlogForm({ createBlog }) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>Url:</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button style={{ marginTop: "1rem" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default BlogForm
