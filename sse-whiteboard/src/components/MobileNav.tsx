import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../actions";
import { useCurrentUserContext } from "../context/user";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  CircleUserRound,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  Presentation,
  UserPlus,
} from "lucide-react";

const MobileNav = () => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  const logoutHandler = async () => {
    await logout();
    setCurrentUser(null);
    toast.success("Logout successful");
    navigate("/auth/login");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <span>SSE Auth</span>
          </NavLink>
          <NavLink
            to="/"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
              pathname === "/"
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            } `}
          >
            <Home className="h-5 w-5" />
            Home
          </NavLink>
          {currentUser && (
            <>
              <NavLink
                to="/whiteboard"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  pathname === "/whiteboard"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Presentation className="h-4 w-4" />
                Whiteboard
              </NavLink>
              <NavLink
                to="/profile"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  pathname === "/profile"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
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
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  pathname === "/auth/login"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <LogIn className="h-5 w-5" />
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  pathname === "/auth/register"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                } `}
              >
                <UserPlus className="h-5 w-5" />
                Register
              </NavLink>
              <NavLink
                to="/about"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  pathname === "/about"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                } `}
              >
                <Info className="h-5 w-5" />
                About
              </NavLink>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
