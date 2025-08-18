import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { Button } from "./ui/button";
import * as dropdown from "./ui/dropdown-menu";

import { useCurrentUserContext } from "../context/user";
import { logout } from "../actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const Profile = () => {
  const router = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  const logoutHandler = async () => {
    await logout();

    setCurrentUser(null);
    toast.success("Logout successful");
    router("/");
  };

  return (
    <>
      {currentUser ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={currentUser?.avatar?.url} />
                  <AvatarFallback>{currentUser?.username}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <h1>User Not Found</h1>
      )}
    </>
  );
};

export default Profile;
