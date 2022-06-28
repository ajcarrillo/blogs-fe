import PropTypes from "prop-types"

const BlogDetail = ({ blog, like, deleteBlog }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>
        <span>{blog.likes}</span> <button onClick={like(blog.id)}>like</button>
      </p>
      <p>{blog.user.name}</p>
      <button onClick={deleteBlog(blog)}>remove</button>
    </div>
  )
}

BlogDetail.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default BlogDetail
