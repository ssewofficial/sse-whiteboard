import { NavLink } from "react-router-dom";
import { toast } from "sonner";

import { useCurrentUserContext } from "../context/user";
import { logout } from "../actions";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {currentUser ? (
          <>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
