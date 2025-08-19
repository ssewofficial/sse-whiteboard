import { Link } from "react-router-dom";
import { useEffect, useActionState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { SubmitButton } from "../../components/submit-button";
import { register } from "../../actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const initialState = {
  message: "",
  errors: null,
};

export default function RegisterPage() {
  const router = useNavigate();
  const [state, formAction] = useActionState<any>(register as any, initialState);

  useEffect(() => {
    if (state.type === "success") {
      toast.success(state.message);
      router("/auth/login");
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold mt-3">Register</h1>
          <p className="text-balance text-muted-foreground">
            Fill your details below to register to your account
          </p>
        </div>
        <form action={formAction}>
          <div className="grid gap-4">
            {state?.type === "error" && (
              <p className="text-lg mb-2 bg-green-951 text-red-600 border-2 border-gray-300 rounded-md p-2 my-4">
                {state.message}
              </p>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="username">Username</Label>
              </div>
              <Input
                id="username"
                type="input"
                name="username"
                placeholder="username"
                required
              />
              {state?.errors?.username && (
                <span id="username-error" className="text-red-600 text-sm">
                  {state.errors.username.join(",")}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                required
              />
              {state?.errors?.email && (
                <span id="email-error" className="text-red-600 text-sm">
                  {state.errors.email.join(",")}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select name="role">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state?.errors?.role && (
                <span id="role-error" className="text-red-600 text-sm">
                  {state.errors.role.join(",")}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" name="password" required />
              {state?.errors?.password && (
                <span id="password-error" className="text-red-600 text-sm">
                  {state.errors.password.join(",")}
                </span>
              )}
            </div>
            <SubmitButton name="register" />
          </div>
        </form>
        <Button variant="outline" className="w-full">
          Register with Google
        </Button>
        <Button variant="outline" className="w-full">
          Register with Github
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
