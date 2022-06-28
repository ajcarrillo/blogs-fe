import "../assets/css/blogs.css"
import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="blog">
      <span>
        {blog.title} {blog.author}
      </span>{" "}
      <button onClick={() => setVisible(!visible)}>view</button>
      {visible && children}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
