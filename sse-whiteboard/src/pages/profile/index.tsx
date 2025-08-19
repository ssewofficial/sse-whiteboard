"use client";

import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { SubmitButton } from "../../components/submit-button";

import {
  getCurrentUser,
  resendEmailVerification,
  changeAvatar,
} from "../../actions";
import { useCurrentUserContext } from "../../context/user";

const initialState = {
  message: "",
  errors: null,
};

function Loading() {
  return <h2 className="text-center">🌀 Loading...</h2>;
}

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const router = useNavigate();
  const [state, formAction] = useFormState<any>(
    changeAvatar as any,
    initialState
  );

  useEffect(() => {
    if (state.type === "success") {
      toast.success(state.message);
      setCurrentUser(state.data);
      setIsOpen(false);
    } else if (state.type === "error") {
      toast.error(state.message);
    }

    const fetchUser = async () => {
      if (currentUser) {
        return;
      }
      const result = await getCurrentUser();
      if (result.type === "error") {
        toast.error(result.message!);
      } else if (result.type === "redirect") {
        toast.error(result.message);
        router("/login");
      } else {
        setCurrentUser(result?.data?.data.user);
      }
    };
    fetchUser();
  }, [state, setCurrentUser]);

  if (!currentUser) {
    return <Loading />;
  }

  const sendEmailHandler = async () => {
    const result = await resendEmailVerification();
    if (result.type === "error") {
      toast.error(result.message!);
    } else {
      toast.success("Verification email sent!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="h-full w-full max-w-md mx-auto p-8 bg-gray-500 dark:bg-gray-700 flex flex-col items-center justify-between gap-6 rounded-lg shadow-lg">
        {/* Create box with light red and text "Email verified" */}
        <div className="w-full">
          {currentUser.isEmailVerified ? (
            <p className="text-green-600 text-sm">Email verified</p>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={sendEmailHandler}
            >
              Resend Verification Email
            </Button>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-300">
          {currentUser?.username || "User"} Profile
        </h2>

        <div className="flex items-center m-4">
          <img
            src={currentUser?.avatar?.url}
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {currentUser?.username}
            </h3>
            <p className="text-sm text-gray-600">{currentUser?.email}</p>
          </div>
        </div>
        <NavLink to="/profile/change-password">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
        </NavLink>
        <Drawer open={isOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Change Avatar
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <form action={formAction}>
              <DrawerHeader>
                <div className="grid gap-2">
                  <Label htmlFor="avatar">Avatar</Label>
                  <Input id="avatar" name="avatar" type="file" required />
                  {state?.errors?.email && (
                    <span id="email-error" className="text-red-600 text-sm">
                      {state.errors.email.join(",")}
                    </span>
                  )}
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <SubmitButton name="Submit" />
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
