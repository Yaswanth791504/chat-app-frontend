import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import AddFriendPage from "./pages/AddFriendPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import LoginOrSignUp from "./pages/LoginOrSignUp";
import ProfilePage from "./pages/ProfilePage";
import RequestsPage from "./pages/RequestsPage";
import AppLayout from "./ui/AppLayout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AuthenticatedRoute>
                <AppLayout />
              </AuthenticatedRoute>
            }
          >
            <Route
              path="/"
              element={<Navigate to="/mine/chats" replace={true} />}
            />
            <Route path="/mine/chats" element={<HomePage />} />
            <Route path="/mine/chats/:id" element={<ChatPage />} />
            <Route path="/mine/addfriend" element={<AddFriendPage />} />
            <Route path="/mine/requests" element={<RequestsPage />} />
            <Route path="/mine/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/auth" element={<LoginOrSignUp />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
