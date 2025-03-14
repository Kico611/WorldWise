import styles from "./User.module.css";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function User() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  function handleClick() {
    logout(), navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={FAKE_USER.avatar} alt={FAKE_USER.name} />
      <span>Welcome, {FAKE_USER.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
