function UserInfo({ user, handleLogout }) {
  return (
    <div>
      <span>{user.name} logged in</span>{" "}
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserInfo
