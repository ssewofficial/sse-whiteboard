import { z } from "zod";
import Cookies from "js-cookie";
import axios from "../lib/axios";
import { cookieStore } from "../lib/cookie";

//  Responce type
type Response = {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
};

// =============================== Register ===============================
const registerSchema = z.object({
  username: z.string().min(3, { message: "Must be 3 or more characters long" }),
  email: z.string().email("Please enter valid message").min(5),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  role: z.enum(["ADMIN", "USER"]),
});

export async function register(prevState: any, formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to register.",
    };
  }

  try {
    const result = await axios.post<Response>(
      "/users/register",
      validatedFields.data
    );

    if (result.data.success === false) {
      return {
        type: "error",
        message: result.data.message,
      };
    } else {
      return {
        type: "success",
        message: result.data.message,
      };
    }
  } catch (error: any) {
    console.log("Error", error.message);
    return {
      type: "error",
      message: "Database Error: Failed to register.",
    };
  }
}

// =============================== Login ===============================
const loginSchema = z.object({
  email: z.string().email("Please enter valid email"),
  password: z.string(),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to login.",
    };
  }

  try {
    const result = await axios.post<Response>(
      "/users/login",
      validatedFields.data
    );

    // // Check if success is true, if true set cookie and redirect to /
    if (result.data.success) {
      // Set cookie
      const oneDay = 24 * 60 * 60 * 1000;
      Cookies.set("accessToken", result.data.data.accessToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + oneDay),
      });
      // cookieStore.set({
      //   name: "accessToken",
      //   value: result.data.data.accessToken,
      //   httpOnly: true,
      //   secure: true,
      //   expires: new Date(Date.now() + oneDay),
      // });
      cookieStore.set({
        name: "refreshToken",
        value: result.data.data.refreshToken,
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + oneDay),
      });
      return {
        type: "success",
        message: result.data.message,
        data: result.data,
      };
    } else {
      return {
        type: "error",
        message: result.data.message,
      };
    }
  } catch (error: any) {
    console.log("Error", error.message);
    return {
      type: "error",
      message: "Database Error: Failed to login.",
    };
  }
}

// =============================== Logout ===============================
export async function logout() {
  try {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error: any) {
    console.log("Error", error.message);
  }
}

// =============================== Get Current User ===============================
export async function getCurrentUser() {
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if (!accessToken?.value) {
    return {
      type: "redirect",
      message: "Token expried! Please login again",
    };
  }

  try {
    const result = await axios.post<Response>(
      "/users/current-user",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );

    // Invalid Token
    if (result.data.statusCode === 401) {
      return {
        type: "redirect",
        message: "Please login to perform this action",
      };
    }

    if (result.data.success === false) {
      return {
        type: "error",
        message: result.data.message,
      };
    }

    return {
      type: "success",
      message: result.data.message,
      data: result.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      type: "error",
      message: "Database Error: Failed to get user details.",
    };
  }
}

// =============================== Forget Password ===============================
export async function forgetPassword(formData: FormData) {
  try {
    const email = formData.get("email");

    const result = await axios.post<Response>(
      "/users/forgot-password",
      JSON.stringify({ email: email })
    );

    return result;
  } catch (error) {
    console.log("error", error);
  }
}

// =============================== Reset Password ===============================
export async function resendEmailVerification() {
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken?.value) {
    return {
      type: "redirect",
      message: "Token expried! Please login again",
    };
  }

  try {
    const result = await axios.post<Response>(
      "/users/resend-email-verification",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );

    console.log(result);

    // Invalid Token
    if (result.data.statusCode === 401) {
      return {
        type: "redirect",
        message: "Please login to perform this action",
      };
    }

    if (result.data.success === false) {
      return {
        type: "error",
        message: result.data.message,
      };
    }

    return {
      type: "success",
      message: result.data.message,
      data: result.data,
    };
  } catch (error) {
    console.log("Error", error);
    return {
      type: "error",
      message: "Database Error: Failed to send email.",
    };
  }
}

// =============================== Change Password ===============================
const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" }),
  newPassword2: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" }),
});

export async function changePassword(prevState: any, formData: FormData) {
  const accessToken = cookieStore.get("accessToken");

  const validatedFields = changePasswordSchema.safeParse({
    oldPassword: formData.get("oldPassword"),
    newPassword: formData.get("newPassword"),
    newPassword2: formData.get("newPassword2"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Change the password.",
    };
  }

  if (formData.get("newPassword") !== formData.get("newPassword2")) {
    return {
      type: "error",
      message: "Password does not match",
    };
  }

  try {
    const result = await axios.post<Response>(
      "/users/change-password",
      JSON.stringify(validatedFields.data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );

    if (result.data.statusCode === 401) {
      return {
        type: "redirect",
        message: "Please login to perform this action",
      };
    }

    if (result.data.success === false) {
      return {
        type: "error",
        message: result.data.message,
      };
    }
  } catch (error) {
    console.log("Error", error);
    return {
      type: "error",
      message: "Database Error: Failed to change password.",
    };
  }

  // redirect("/profile");
  window.location.href = window.location.origin + "/profile";
}

// =============================== Change Avatar ===============================
export async function changeAvatar(prevState: any, formData: FormData) {
  const avatar = formData.get("avatar") as File;
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if (!accessToken?.value) {
    return {
      type: "redirect",
      message: "Token expried! Please login again",
    };
  }

  if (!avatar) {
    return {
      type: "error",
      message: "Please select an avatar",
    };
  }

  // Only images are allowed
  if (!avatar.type.includes("image")) {
    return {
      type: "error",
      message: "Only images are allowed",
    };
  }

  // make sure file is less than 2MB
  if (avatar.size > 2 * 1024 * 1024) {
    return {
      type: "error",
      message: "File size must be less than 2MB",
    };
  }

  try {
    const result = await axios.patch<Response>("/users/avatar", formData, {
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });

    // Invalid Token
    if (result.data.statusCode === 401) {
      return {
        type: "redirect",
        message: "Please login to perform this action",
      };
    }

    if (result.data.success === false) {
      return {
        type: "error",
        message: result.data.message,
      };
    }

    return {
      type: "success",
      message: result.data.message,
      data: result.data,
    };
  } catch (error: any) {
    console.log("error", error);
    return {
      type: "error",
      message: "Database Error: Failed to change avatar.",
    };
  }
}

// =============================== Verify Email ===============================
export async function verifyEmail(formData: FormData) {}
