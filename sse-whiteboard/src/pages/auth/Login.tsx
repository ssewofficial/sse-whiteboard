import { Link } from "react-router-dom";
import { useEffect, useActionState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { SubmitButton } from "../../components/submit-button";
import { login } from "../../actions";
import { useCurrentUserContext } from "../../context/user";

const initialState = {
  message: "",
  errors: null,
};

export default function Login() {
  const router = useNavigate();
  const { setCurrentUser } = useCurrentUserContext();
  const [state, formAction] = useActionState<any>(login as any, initialState);

  useEffect(() => {
    if (state.type === "success") {
      toast.success(state.message);
      setCurrentUser(state.data.data.user);
      router("/profile");
    }
  }, [state]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required name="password" />
              {state?.errors?.password && (
                <span id="password-error" className="text-red-600 text-sm">
                  {state.errors.password.join(",")}
                </span>
              )}
            </div>
            <SubmitButton name="Login" />
          </div>
        </form>
        <Link to="http://localhost:8080/api/v1/users/google">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </Link>
        <Link to="http://localhost:8080/api/v1/users/github">
          <Button variant="outline" className="w-full">
            Login with Github
          </Button>
        </Link>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
