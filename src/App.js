import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import UserInfo from "./components/UserInfo"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginServices from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
    type: "",
    show: false,
  })

  useEffect(() => {
    async function fetchBlog() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlog()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({ username, password })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception)
      setNotificationMessage({
        message: "Wrong username or password",
        type: "error",
        show: true,
      })
      setTimeout(() => {
        setNotificationMessage({
          message: "",
          type: "",
          show: false,
        })
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogappUser")
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    setTitle("")
    setAuthor("")
    setUrl("")
    setNotificationMessage({
      message: `a new blog ${blog.title} by ${blog.author} added`,
      type: "success",
      show: true,
    })
    setTimeout(() => {
      setNotificationMessage({
        message: "",
        type: "",
        show: false,
      })
    }, 5000)
  }

  return (
    <div>
      {user === null && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onSubmit={handleLogin}
        />
      )}
      {notificationMessage.show && (
        <Notification
          message={notificationMessage.message}
          type={notificationMessage.type}
        />
      )}
      {user !== null && (
        <div>
          <h1>Blogs</h1>
          <UserInfo user={user} handleLogout={handleLogout} />
          <BlogForm
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            onSubmit={handleCreateBlog}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
