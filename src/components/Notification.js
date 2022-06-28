import "../assets/css/notifications.css"

function Notification({ message, type }) {
  return <div className={`notification ${type}`}>{message}</div>
}

export default Notification
