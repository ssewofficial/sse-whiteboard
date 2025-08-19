import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 text-center">
      <div className="flex justify-around items-center py-4">
        <div>
          <p className="text-sm font-semibold">© {year} SSE Auth</p>
        </div>
        <div>
          <NavLink to="/about" className="text-sm font-semibold">
            About
          </NavLink>
        </div>
      </div>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
