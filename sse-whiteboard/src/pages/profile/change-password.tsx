import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { SubmitButton } from "../../components/submit-button";
import { changePassword } from "../../actions";

const initialState = {
  message: "",
  errors: null,
};

const ChnagePasswordPage = () => {
  const [state, formAction] = useFormState<any>(
    changePassword as any,
    initialState
  );
  const router = useNavigate();

  useEffect(() => {
    if (state.type === "redirect") {
      toast.error(state.message);
      router("/login");
    }
  }, [state]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Change Password</h1>
          <p className="text-balance text-muted-foreground">
            Change your password!
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
                <Label htmlFor="oldPassword">Password</Label>
              </div>
              <Input
                id="oldPassword"
                type="password"
                required
                name="oldPassword"
              />
              {state?.errors?.oldPassword && (
                <span id="oldPassword-error" className="text-red-600 text-sm">
                  {state.errors.oldPassword.join(",")}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="newPassword">newPassword</Label>
              </div>
              <Input
                id="newPassword"
                type="password"
                required
                name="newPassword"
              />
              {state?.errors?.newPassword && (
                <span id="newPassword-error" className="text-red-600 text-sm">
                  {state.errors.newPassword.join(",")}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="newPassword2">Repet your password</Label>
              </div>
              <Input
                id="newPassword2"
                type="password"
                required
                name="newPassword2"
              />
              {state?.errors?.newPassword2 && (
                <span id="newPassword2-error" className="text-red-600 text-sm">
                  {state.errors.newPassword2.join(",")}
                </span>
              )}
            </div>
            <SubmitButton name="Change password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChnagePasswordPage;
