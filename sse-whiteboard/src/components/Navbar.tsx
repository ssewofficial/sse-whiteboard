import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useCurrentUserContext } from "../context/user";
import { logout } from "../actions";
import {
  CircleUserRound,
  Home,
  InfoIcon,
  LogIn,
  LogOut,
  Presentation,
  UserPlus,
} from "lucide-react";

const Navbar = () => {
  const pathname = window.location.pathname;
  const router = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  const logoutHandler = async () => {
    await logout();
    setCurrentUser(null);
    toast.success("Logout successful");
    router("/");
  };

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 lg:mt-2">
      <NavLink
        to="/"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
          pathname === "/" ? "bg-muted text-primary" : "text-muted-foreground"
        } `}
      >
        <Home className="h-4 w-4" />
        Home
      </NavLink>

      {currentUser && (
        <>
          <NavLink
            to="/whiteboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              pathname === "/whiteboard"
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            } `}
          >
            <Presentation className="h-4 w-4" />
            Whiteboard
          </NavLink>
          <NavLink
            to="/profile"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              pathname === "/profile"
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            } `}
          >
            <CircleUserRound className="h-4 w-4" />
            Profile
          </NavLink>
          <button
            onClick={logoutHandler}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              pathname === "/logout"
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            } `}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </>
      )}
      {!currentUser && (
        <>
          <NavLink
            to="/auth/login"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              pathname === "/auth/login"
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            } `}
          >
            <LogIn className="h-4 w-4" />
            Login
          </NavLink>
          <NavLink
            to="/auth/register"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              pathname === "/auth/register"
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            } `}
          >
            <UserPlus className="h-4 w-4" />
            Register
          </NavLink>
          <NavLink
            to="/about"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              pathname === "/about"
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            } `}
          >
            <InfoIcon className="h-4 w-4" />
            About
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
