import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ChatPage from "./pages/ChatPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/features/auth";
import { UnreadGroupMsgContext } from "./context/features/unreadGroupMsg";
import { UnreadMsgContext } from "./context/features/unreadMsg";
import Redirect from "./pages/Redirect";

const App = () => {
  const { user } = useContext(AuthContext);

  const { fetchUnreadGroupMsgs } = useContext(UnreadGroupMsgContext);
  const { fetchUnreadMsgs } = useContext(UnreadMsgContext);

  useEffect(() => {
    fetchUnreadGroupMsgs();
    fetchUnreadMsgs();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/signin"
        element={user?.id ? <Navigate to={"/"} /> : <SignIn />}
      />
      <Route
        path="/signup"
        element={user?.id ? <Navigate to={"/"} /> : <SignUp />}
      />
      <Route
        path="/chat"
        element={!user?.id ? <Navigate to={"/"} /> : <ChatPage />}
      />
      <Route path="/redirect" element={<Redirect />} />
    </Routes>
  );
};

export default App;
