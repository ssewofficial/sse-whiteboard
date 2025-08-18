import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Draw from "./pages/Draw";
import Login from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import { Toaster } from "./components/ui/sonner";
// import Profile from "./pages/Profile";
import MainLayout from "./layout/main";

function App() {
  document.body.classList.add(
    "antialiased",
    "bg-white",
    "dark:bg-black",
    "geistSans-variable",
    "geistMono-variable"
  );

  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route path="/room/:roomId" element={<Draw />} />
        {/* <Route path="/profile" element={<Profile />} /> */}

        <Route path="/auth">
          <Route path="login" index element={<Login />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
