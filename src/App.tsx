import { Routes, Route } from "react-router-dom";
import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* {public routes} */}
        {/* outlet of AuthLayout will render child depend on route path */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* {privet routes} */}
        {/* outlet of RootLayout will render child depend on route path */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          {/* do i need 2 explore routes??? probably not */}
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
