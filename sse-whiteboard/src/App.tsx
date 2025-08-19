import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Draw from "./pages/Draw";
import Login from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import { Toaster } from "./components/ui/sonner";
// import Profile from "./pages/Profile";
import MainLayout from "./layout/main";
import { FileUploadDemo } from "./components/PhotoUpload";
import ProfilePage from "./pages/profile";
import ProfileEditPage from "./pages/profile/edit";
import ChnagePasswordPage from "./pages/profile/change-password";

function App() {
  document.body.classList.add(
    "antialiased",
    "bg-white",
    "dark:bg-black",
    "geistSans-variable",
    "geistMono-variable",
    "inter-variable"
  );

  return (
    <div>
      <MainLayout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/room/:roomId" element={<Draw />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/demo" element={<FileUploadDemo />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route
            path="/profile/change-password"
            element={<ChnagePasswordPage />}
          />

          <Route path="/auth">
            <Route path="login" index element={<Login />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </MainLayout>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
